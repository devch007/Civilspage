import { db } from '@/db';
import { notes } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { CreateNoteInput, UpdateNoteInput } from '@/lib/validations/note';

export async function getNotes(subject?: string) {
  if (subject) {
    return db.select().from(notes).where(eq(notes.subject, subject)).orderBy(desc(notes.createdAt));
  }
  return db.select().from(notes).orderBy(desc(notes.createdAt));
}

/** uploadMetadata: save R2 URLs into PostgreSQL (no file stored in Supabase) */
export async function uploadMetadata(input: CreateNoteInput) {
  const [note] = await db
    .insert(notes)
    .values({ ...input, thumbnail: input.thumbnail || null })
    .returning();
  return note;
}

export async function updateNote(input: UpdateNoteInput) {
  const { id, ...rest } = input;
  const [note] = await db
    .update(notes)
    .set({ ...rest, updatedAt: new Date() })
    .where(eq(notes.id, id))
    .returning();
  return note;
}

export async function deleteNote(id: string) {
  await db.delete(notes).where(eq(notes.id, id));
}

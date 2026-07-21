import { db } from '@/db';
import { currentAffairs } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import type { CreateCurrentAffairInput, UpdateCurrentAffairInput } from '@/lib/validations/current-affairs';

function generateSlug(title: string) {
  return title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

export async function getCurrentAffairs(limit = 20) {
  return db
    .select()
    .from(currentAffairs)
    .where(eq(currentAffairs.published, true))
    .orderBy(desc(currentAffairs.date))
    .limit(limit);
}

export async function getAllCurrentAffairs() {
  return db.select().from(currentAffairs).orderBy(desc(currentAffairs.date));
}

export async function createCurrentAffair(input: CreateCurrentAffairInput) {
  const slug = input.slug || generateSlug(input.title);
  const [affair] = await db
    .insert(currentAffairs)
    .values({ ...input, slug, featuredImage: input.featuredImage || null, pdfUrl: input.pdfUrl || null })
    .returning();
  return affair;
}

export async function updateCurrentAffair(input: UpdateCurrentAffairInput) {
  const { id, ...rest } = input;
  const [affair] = await db
    .update(currentAffairs)
    .set({ ...rest, updatedAt: new Date() })
    .where(eq(currentAffairs.id, id))
    .returning();
  return affair;
}

export async function deleteCurrentAffair(id: string) {
  await db.delete(currentAffairs).where(eq(currentAffairs.id, id));
}

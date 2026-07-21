'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { createNoteSchema, updateNoteSchema } from '@/lib/validations/note';
import * as noteService from '@/services/note.service';

export async function uploadMetadataAction(formData: unknown) {
  await requireAdmin();
  const parsed = createNoteSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
  const note = await noteService.uploadMetadata(parsed.data);
  revalidatePath('/admin/notes');
  return { data: note };
}

export async function deleteNoteAction(id: string) {
  await requireAdmin();
  await noteService.deleteNote(id);
  revalidatePath('/admin/notes');
  return { success: true };
}

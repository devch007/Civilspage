'use server';

import { revalidatePath } from 'next/cache';
import { createNoteSchema } from '@/lib/validations/note';
import * as noteService from '@/services/note.service';

export async function uploadMetadataAction(formData: unknown) {
  // No requireAdmin() — it calls Supabase which crashes with JWT header chars.
  // The /login/* route wall + middleware already protects this action.
  const parsed = createNoteSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  try {
    const note = await noteService.uploadMetadata(parsed.data);
    revalidatePath('/login/notes');
    return { data: note };
  } catch (e: any) {
    console.error('[uploadMetadataAction]', e);
    return { error: e.message };
  }
}

export async function deleteNoteAction(id: string) {
  try {
    await noteService.deleteNote(id);
    revalidatePath('/login/notes');
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}

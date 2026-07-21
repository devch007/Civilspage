'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { createNoteSchema } from '@/lib/validations/note';
import * as noteService from '@/services/note.service';
import { logAudit } from '@/lib/audit';


export async function uploadMetadataAction(formData: unknown) {
  await requireAdmin();
  const parsed = createNoteSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const note = await noteService.uploadMetadata(parsed.data);

  await logAudit({
    action: 'note.uploaded',
    resourceType: 'note',
    resourceId: note.id,
    resourceTitle: note.title,
    metadata: { subject: note.subject, category: note.category, pdfUrl: note.pdfUrl },
  });

  revalidatePath('/admin/notes');
  return { data: note };
}

export async function deleteNoteAction(id: string) {
  await requireAdmin();
  await noteService.deleteNote(id);

  await logAudit({
    action: 'note.deleted',
    resourceType: 'note',
    resourceId: id,
  });

  revalidatePath('/admin/notes');
  return { success: true };
}

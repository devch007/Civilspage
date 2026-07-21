'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { createCurrentAffairSchema, updateCurrentAffairSchema } from '@/lib/validations/current-affairs';
import * as caService from '@/services/current-affairs.service';

export async function createCurrentAffairAction(formData: unknown) {
  await requireAdmin();
  const parsed = createCurrentAffairSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
  const affair = await caService.createCurrentAffair(parsed.data);
  revalidatePath('/admin/current-affairs');
  revalidatePath('/updates');
  return { data: affair };
}

export async function updateCurrentAffairAction(formData: unknown) {
  await requireAdmin();
  const parsed = updateCurrentAffairSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
  const affair = await caService.updateCurrentAffair(parsed.data);
  revalidatePath('/admin/current-affairs');
  return { data: affair };
}

export async function deleteCurrentAffairAction(id: string) {
  await requireAdmin();
  await caService.deleteCurrentAffair(id);
  revalidatePath('/admin/current-affairs');
  return { success: true };
}

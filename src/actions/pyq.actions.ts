'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { createPyqSchema, updatePyqSchema } from '@/lib/validations/pyq';
import * as pyqService from '@/services/pyq.service';

export async function createPyqAction(formData: unknown) {
  await requireAdmin();
  const parsed = createPyqSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
  const pyq = await pyqService.createPyq(parsed.data);
  revalidatePath('/admin/pyqs');
  return { data: pyq };
}

export async function updatePyqAction(formData: unknown) {
  await requireAdmin();
  const parsed = updatePyqSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
  const pyq = await pyqService.updatePyq(parsed.data);
  revalidatePath('/admin/pyqs');
  return { data: pyq };
}

export async function deletePyqAction(id: string) {
  await requireAdmin();
  await pyqService.deletePyq(id);
  revalidatePath('/admin/pyqs');
  return { success: true };
}

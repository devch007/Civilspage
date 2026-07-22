'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { createPyqSchema, updatePyqSchema } from '@/lib/validations/pyq';
import * as pyqService from '@/services/pyq.service';
import { logAudit } from '@/lib/audit';

export async function createPyqAction(formData: unknown) {
  await requireAdmin();
  const parsed = createPyqSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const pyq = await pyqService.createPyq(parsed.data);

  await logAudit({
    action: 'pyq.created',
    resourceType: 'pyq',
    resourceId: pyq.id,
    resourceTitle: pyq.question.substring(0, 80),
    metadata: { year: pyq.year, subject: pyq.subject, difficulty: pyq.difficulty },
  });

  revalidatePath('/login/pyqs');
  return { data: pyq };
}

export async function updatePyqAction(formData: unknown) {
  await requireAdmin();
  const parsed = updatePyqSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const pyq = await pyqService.updatePyq(parsed.data);

  await logAudit({
    action: 'pyq.updated',
    resourceType: 'pyq',
    resourceId: pyq.id,
    resourceTitle: pyq.question.substring(0, 80),
  });

  revalidatePath('/login/pyqs');
  return { data: pyq };
}

export async function deletePyqAction(id: string) {
  await requireAdmin();
  await pyqService.deletePyq(id);

  await logAudit({
    action: 'pyq.deleted',
    resourceType: 'pyq',
    resourceId: id,
  });

  revalidatePath('/login/pyqs');
  return { success: true };
}

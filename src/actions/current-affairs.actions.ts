'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { createCurrentAffairSchema, updateCurrentAffairSchema } from '@/lib/validations/current-affairs';
import * as caService from '@/services/current-affairs.service';
import { logAudit } from '@/lib/audit';

export async function createCurrentAffairAction(formData: unknown) {
  await requireAdmin();
  const parsed = createCurrentAffairSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const affair = await caService.createCurrentAffair(parsed.data);

  await logAudit({
    action: 'current_affair.created',
    resourceType: 'current_affair',
    resourceId: affair.id,
    resourceTitle: affair.title,
    metadata: { date: affair.date, category: affair.category },
  });

  revalidatePath('/login/current-affairs');
  revalidatePath('/updates');
  return { data: affair };
}

export async function updateCurrentAffairAction(formData: unknown) {
  await requireAdmin();
  const parsed = updateCurrentAffairSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const affair = await caService.updateCurrentAffair(parsed.data);

  await logAudit({
    action: 'current_affair.updated',
    resourceType: 'current_affair',
    resourceId: affair.id,
    resourceTitle: affair.title,
  });

  revalidatePath('/login/current-affairs');
  return { data: affair };
}

export async function deleteCurrentAffairAction(id: string) {
  await requireAdmin();
  await caService.deleteCurrentAffair(id);

  await logAudit({
    action: 'current_affair.deleted',
    resourceType: 'current_affair',
    resourceId: id,
  });

  revalidatePath('/login/current-affairs');
  return { success: true };
}

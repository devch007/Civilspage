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

  try {
    const affair = await caService.createCurrentAffair(parsed.data);

    // Non-blocking audit — never let this crash the main action
    logAudit({
      action: 'current_affair.created',
      resourceType: 'current_affair',
      resourceId: affair.id,
      resourceTitle: affair.title,
      metadata: { date: affair.date, category: affair.category },
    }).catch(() => {});

    revalidatePath('/login/current-affairs');
    revalidatePath('/updates');
    return { data: affair };
  } catch (err: any) {
    console.error('[createCurrentAffairAction] error:', err);
    return { error: { _form: [err?.message ?? 'Failed to save. Please try again.'] } };
  }
}

export async function updateCurrentAffairAction(formData: unknown) {
  await requireAdmin();
  const parsed = updateCurrentAffairSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  try {
    const affair = await caService.updateCurrentAffair(parsed.data);
    logAudit({
      action: 'current_affair.updated',
      resourceType: 'current_affair',
      resourceId: affair.id,
      resourceTitle: affair.title,
    }).catch(() => {});
    revalidatePath('/login/current-affairs');
    return { data: affair };
  } catch (err: any) {
    return { error: { _form: [err?.message ?? 'Update failed.'] } };
  }
}

export async function deleteCurrentAffairAction(id: string) {
  await requireAdmin();
  try {
    await caService.deleteCurrentAffair(id);
    logAudit({
      action: 'current_affair.deleted',
      resourceType: 'current_affair',
      resourceId: id,
    }).catch(() => {});
    revalidatePath('/login/current-affairs');
  } catch (err: any) {
    console.error('[deleteCurrentAffairAction] error:', err);
  }
  return { success: true };
}

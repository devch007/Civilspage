'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import * as commentService from '@/services/comment.service';
import { logAudit } from '@/lib/audit';

export async function approveCommentAction(id: string) {
  await requireAdmin();
  await commentService.approveComment(id);
  await logAudit({ action: 'comment.approved', resourceType: 'comment', resourceId: id });
  revalidatePath('/admin/comments');
  return { success: true };
}

export async function rejectCommentAction(id: string) {
  await requireAdmin();
  await commentService.rejectComment(id);
  await logAudit({ action: 'comment.rejected', resourceType: 'comment', resourceId: id });
  revalidatePath('/admin/comments');
  return { success: true };
}

'use server';

import { revalidatePath } from 'next/cache';
import * as commentService from '@/services/comment.service';
import { logAudit } from '@/lib/audit';

export async function approveCommentAction(id: string) {
  await commentService.approveComment(id);
  await logAudit({ action: 'comment.approved', resourceType: 'comment', resourceId: id });
  revalidatePath('/login/comments');
  return { success: true };
}

export async function rejectCommentAction(id: string) {
  await commentService.rejectComment(id);
  await logAudit({ action: 'comment.rejected', resourceType: 'comment', resourceId: id });
  revalidatePath('/login/comments');
  return { success: true };
}

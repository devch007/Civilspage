'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import * as commentService from '@/services/comment.service';

export async function approveCommentAction(id: string) {
  await requireAdmin();
  await commentService.approveComment(id);
  revalidatePath('/admin/comments');
  return { success: true };
}

export async function rejectCommentAction(id: string) {
  await requireAdmin();
  await commentService.rejectComment(id);
  revalidatePath('/admin/comments');
  return { success: true };
}

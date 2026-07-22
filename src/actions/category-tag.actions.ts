'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import * as catTagService from '@/services/category-tag.service';
import { logAudit } from '@/lib/audit';

export async function createCategoryAction(name: string) {
  await requireAdmin();
  const cat = await catTagService.createCategory(name);
  await logAudit({ action: 'category.created', resourceType: 'category', resourceId: cat.id, resourceTitle: cat.name });
  revalidatePath('/login/categories');
  revalidatePath('/login/blogs');
  return { data: cat };
}

export async function deleteCategoryAction(id: string) {
  await requireAdmin();
  await catTagService.deleteCategory(id);
  await logAudit({ action: 'category.deleted', resourceType: 'category', resourceId: id });
  revalidatePath('/login/categories');
  return { success: true };
}

export async function createTagAction(name: string) {
  await requireAdmin();
  const tag = await catTagService.createTag(name);
  await logAudit({ action: 'tag.created', resourceType: 'tag', resourceId: tag.id, resourceTitle: tag.name });
  revalidatePath('/login/categories');
  return { data: tag };
}

export async function deleteTagAction(id: string) {
  await requireAdmin();
  await catTagService.deleteTag(id);
  await logAudit({ action: 'tag.deleted', resourceType: 'tag', resourceId: id });
  revalidatePath('/login/categories');
  return { success: true };
}

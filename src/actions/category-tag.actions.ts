'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import * as catTagService from '@/services/category-tag.service';

export async function createCategoryAction(name: string) {
  await requireAdmin();
  const cat = await catTagService.createCategory(name);
  revalidatePath('/admin/categories');
  revalidatePath('/admin/blogs');
  return { data: cat };
}

export async function deleteCategoryAction(id: string) {
  await requireAdmin();
  await catTagService.deleteCategory(id);
  revalidatePath('/admin/categories');
  return { success: true };
}

export async function createTagAction(name: string) {
  await requireAdmin();
  const tag = await catTagService.createTag(name);
  revalidatePath('/admin/categories');
  return { data: tag };
}

export async function deleteTagAction(id: string) {
  await requireAdmin();
  await catTagService.deleteTag(id);
  revalidatePath('/admin/categories');
  return { success: true };
}

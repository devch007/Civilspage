'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { createBlogSchema, updateBlogSchema } from '@/lib/validations/blog';
import * as blogService from '@/services/blog.service';
import { getUserProfile } from '@/lib/auth';

export async function createBlogAction(formData: unknown) {
  const session = await requireAdmin();
  const user = await getUserProfile();
  if (!user) throw new Error('Unauthorized');

  const parsed = createBlogSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const blog = await blogService.createBlog(parsed.data, user.id);
  revalidatePath('/admin/blogs');
  revalidatePath('/');
  return { data: blog };
}

export async function updateBlogAction(formData: unknown) {
  await requireAdmin();

  const parsed = updateBlogSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const blog = await blogService.updateBlog(parsed.data);
  revalidatePath('/admin/blogs');
  revalidatePath(`/blogs/${blog.slug}`);
  return { data: blog };
}

export async function deleteBlogAction(id: string) {
  await requireAdmin();
  await blogService.deleteBlog(id);
  revalidatePath('/admin/blogs');
  return { success: true };
}

export async function getLatestBlogsAction(limit = 10) {
  return blogService.getLatestBlogs(limit);
}

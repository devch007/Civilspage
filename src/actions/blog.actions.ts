'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { createBlogSchema, updateBlogSchema } from '@/lib/validations/blog';
import * as blogService from '@/services/blog.service';
import { getUserProfile } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export async function createBlogAction(formData: unknown) {
  const session = await requireAdmin();
  const user = await getUserProfile();
  if (!user) throw new Error('Unauthorized');

  const parsed = createBlogSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const blog = await blogService.createBlog(parsed.data, user.id);

  await logAudit({
    action: 'blog.created',
    resourceType: 'blog',
    resourceId: blog.id,
    resourceTitle: blog.title,
    metadata: { slug: blog.slug, published: blog.published },
  });

  revalidatePath('/admin/blogs');
  revalidatePath('/');
  return { data: blog };
}

export async function updateBlogAction(formData: unknown) {
  await requireAdmin();

  const parsed = updateBlogSchema.safeParse(formData);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  const blog = await blogService.updateBlog(parsed.data);

  await logAudit({
    action: parsed.data.published ? 'blog.published' : 'blog.updated',
    resourceType: 'blog',
    resourceId: blog.id,
    resourceTitle: blog.title,
  });

  revalidatePath('/admin/blogs');
  revalidatePath(`/blogs/${blog.slug}`);
  return { data: blog };
}

export async function deleteBlogAction(id: string) {
  await requireAdmin();
  const blog = await blogService.getBlogById(id);
  await blogService.deleteBlog(id);

  await logAudit({
    action: 'blog.deleted',
    resourceType: 'blog',
    resourceId: id,
    resourceTitle: blog?.title ?? id,
  });

  revalidatePath('/admin/blogs');
  return { success: true };
}

export async function getLatestBlogsAction(limit = 10) {
  return blogService.getLatestBlogs(limit);
}

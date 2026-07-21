import { db } from '@/db';
import { blogs, blogTags } from '@/db/schema';
import { eq, desc, and, ilike } from 'drizzle-orm';
import { generateSlug } from '@/lib/validations/blog';
import type { CreateBlogInput, UpdateBlogInput } from '@/lib/validations/blog';

export async function getLatestBlogs(limit = 10) {
  return db
    .select()
    .from(blogs)
    .where(eq(blogs.published, true))
    .orderBy(desc(blogs.publishedAt))
    .limit(limit);
}

export async function getAllBlogs(search?: string) {
  if (search) {
    return db
      .select()
      .from(blogs)
      .where(ilike(blogs.title, `%${search}%`))
      .orderBy(desc(blogs.createdAt));
  }
  return db.select().from(blogs).orderBy(desc(blogs.createdAt));
}

export async function getBlogBySlug(slug: string) {
  const [blog] = await db
    .select()
    .from(blogs)
    .where(and(eq(blogs.slug, slug), eq(blogs.published, true)))
    .limit(1);
  return blog ?? null;
}

export async function getBlogById(id: string) {
  const [blog] = await db.select().from(blogs).where(eq(blogs.id, id)).limit(1);
  return blog ?? null;
}

export async function createBlog(input: CreateBlogInput, authorId: string) {
  const slug = input.slug || generateSlug(input.title);
  const [blog] = await db
    .insert(blogs)
    .values({
      ...input,
      slug,
      authorId,
      featuredImage: input.featuredImage || null,
      pdfUrl: input.pdfUrl || null,
      seoTitle: input.seoTitle || null,
      seoDescription: input.seoDescription || null,
      publishedAt: input.published ? new Date() : null,
    })
    .returning();
  return blog;
}

export async function updateBlog(input: UpdateBlogInput) {
  const { id, tagIds, ...rest } = input;
  const [blog] = await db
    .update(blogs)
    .set({
      ...rest,
      updatedAt: new Date(),
      publishedAt: rest.published ? new Date() : undefined,
    })
    .where(eq(blogs.id, id))
    .returning();
  return blog;
}

export async function deleteBlog(id: string) {
  await db.delete(blogs).where(eq(blogs.id, id));
}

export async function publishBlog(id: string) {
  const [blog] = await db
    .update(blogs)
    .set({ published: true, publishedAt: new Date(), updatedAt: new Date() })
    .where(eq(blogs.id, id))
    .returning();
  return blog;
}

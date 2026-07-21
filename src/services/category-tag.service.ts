import { db } from '@/db';
import { categories, tags, blogTags } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

function slug(text: string) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

// ── CATEGORIES ────────────────────────────────────────────
export async function getCategories() {
  return db.select().from(categories).orderBy(categories.name);
}

export async function createCategory(name: string) {
  const [cat] = await db.insert(categories).values({ name, slug: slug(name) }).returning();
  return cat;
}

export async function deleteCategory(id: string) {
  await db.delete(categories).where(eq(categories.id, id));
}

// ── TAGS ──────────────────────────────────────────────────
export async function getTags() {
  return db.select().from(tags).orderBy(tags.name);
}

export async function createTag(name: string) {
  const [tag] = await db.insert(tags).values({ name, slug: slug(name) }).returning();
  return tag;
}

export async function deleteTag(id: string) {
  await db.delete(tags).where(eq(tags.id, id));
}

import { db } from '@/db';
import { courses } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { CreateCourseInput, UpdateCourseInput } from '@/lib/validations/course';

export async function getCourses(publishedOnly = false) {
  if (publishedOnly) {
    return db.select().from(courses).where(eq(courses.published, true)).orderBy(desc(courses.createdAt));
  }
  return db.select().from(courses).orderBy(desc(courses.createdAt));
}

export async function getCourseById(id: string) {
  const [course] = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
  return course ?? null;
}

export async function createCourse(input: CreateCourseInput) {
  const [course] = await db
    .insert(courses)
    .values({
      ...input,
      price: input.price.toString(),
      thumbnail: input.thumbnail || null,
    })
    .returning();
  return course;
}

export async function updateCourse(input: UpdateCourseInput) {
  const { id, ...rest } = input;
  const [course] = await db
    .update(courses)
    .set({ ...rest, price: rest.price?.toString(), updatedAt: new Date() })
    .where(eq(courses.id, id))
    .returning();
  return course;
}

export async function deleteCourse(id: string) {
  await db.delete(courses).where(eq(courses.id, id));
}

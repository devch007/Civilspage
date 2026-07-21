import { db } from '@/db';
import { lessons } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import type { NewLesson } from '@/db/schema';

export async function getLessons(courseId: string) {
  return db
    .select()
    .from(lessons)
    .where(eq(lessons.courseId, courseId))
    .orderBy(asc(lessons.order));
}

export async function createLesson(input: Omit<NewLesson, 'id' | 'createdAt' | 'updatedAt'>) {
  const [lesson] = await db.insert(lessons).values(input).returning();
  return lesson;
}

export async function updateLesson(id: string, input: Partial<Omit<NewLesson, 'id' | 'createdAt' | 'updatedAt'>>) {
  const [lesson] = await db
    .update(lessons)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(lessons.id, id))
    .returning();
  return lesson;
}

export async function deleteLesson(id: string) {
  await db.delete(lessons).where(eq(lessons.id, id));
}

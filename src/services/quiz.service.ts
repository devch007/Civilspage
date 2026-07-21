import { db } from '@/db';
import { quizzes } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { NewQuiz } from '@/db/schema';

export async function getQuizzes(activeOnly = false) {
  if (activeOnly) {
    return db.select().from(quizzes).where(eq(quizzes.active, true)).orderBy(desc(quizzes.createdAt));
  }
  return db.select().from(quizzes).orderBy(desc(quizzes.createdAt));
}

export async function getQuizById(id: string) {
  const [quiz] = await db.select().from(quizzes).where(eq(quizzes.id, id)).limit(1);
  return quiz ?? null;
}

export async function createQuiz(input: Omit<NewQuiz, 'id' | 'createdAt' | 'updatedAt'>) {
  const [quiz] = await db.insert(quizzes).values(input).returning();
  return quiz;
}

export async function updateQuiz(id: string, input: Partial<Omit<NewQuiz, 'id' | 'createdAt' | 'updatedAt'>>) {
  const [quiz] = await db
    .update(quizzes)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(quizzes.id, id))
    .returning();
  return quiz;
}

export async function deleteQuiz(id: string) {
  await db.delete(quizzes).where(eq(quizzes.id, id));
}

export async function toggleQuizActive(id: string, active: boolean) {
  const [quiz] = await db
    .update(quizzes)
    .set({ active, updatedAt: new Date() })
    .where(eq(quizzes.id, id))
    .returning();
  return quiz;
}

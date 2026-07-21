import { db } from '@/db';
import { pyqs } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import type { CreatePyqInput, UpdatePyqInput } from '@/lib/validations/pyq';

export async function getPyqs(subject?: string, year?: number) {
  const conditions = [];
  if (subject) conditions.push(eq(pyqs.subject, subject));
  if (year) conditions.push(eq(pyqs.year, year));
  return db
    .select()
    .from(pyqs)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(pyqs.year));
}

export async function getPyqById(id: string) {
  const [pyq] = await db.select().from(pyqs).where(eq(pyqs.id, id)).limit(1);
  return pyq ?? null;
}

export async function createPyq(input: CreatePyqInput) {
  const [pyq] = await db.insert(pyqs).values(input).returning();
  return pyq;
}

export async function updatePyq(input: UpdatePyqInput) {
  const { id, ...rest } = input;
  const [pyq] = await db
    .update(pyqs)
    .set({ ...rest, updatedAt: new Date() })
    .where(eq(pyqs.id, id))
    .returning();
  return pyq;
}

export async function deletePyq(id: string) {
  await db.delete(pyqs).where(eq(pyqs.id, id));
}

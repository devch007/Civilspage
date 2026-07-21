import { db } from '@/db';
import { newsletterSubscribers } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function getSubscribers(activeOnly = false) {
  if (activeOnly) {
    return db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.active, true)).orderBy(desc(newsletterSubscribers.createdAt));
  }
  return db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.createdAt));
}

export async function subscribeEmail(email: string, name?: string) {
  const [sub] = await db
    .insert(newsletterSubscribers)
    .values({ email, name: name || null })
    .onConflictDoNothing()
    .returning();
  return sub;
}

export async function unsubscribe(id: string) {
  const [sub] = await db
    .update(newsletterSubscribers)
    .set({ active: false })
    .where(eq(newsletterSubscribers.id, id))
    .returning();
  return sub;
}

export async function deleteSubscriber(id: string) {
  await db.delete(newsletterSubscribers).where(eq(newsletterSubscribers.id, id));
}

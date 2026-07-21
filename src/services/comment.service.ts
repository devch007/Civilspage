import { db } from '@/db';
import { comments, users, blogs } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';

export async function getComments(approvedOnly = false) {
  return db
    .select({
      id: comments.id,
      content: comments.content,
      approved: comments.approved,
      createdAt: comments.createdAt,
      userId: comments.userId,
      blogId: comments.blogId,
      userEmail: users.email,
      userName: users.name,
      blogTitle: blogs.title,
    })
    .from(comments)
    .leftJoin(users, eq(comments.userId, users.id))
    .leftJoin(blogs, eq(comments.blogId, blogs.id))
    .where(approvedOnly ? eq(comments.approved, true) : undefined)
    .orderBy(desc(comments.createdAt));
}

export async function approveComment(id: string) {
  const [comment] = await db
    .update(comments)
    .set({ approved: true, updatedAt: new Date() })
    .where(eq(comments.id, id))
    .returning();
  return comment;
}

export async function rejectComment(id: string) {
  await db.delete(comments).where(eq(comments.id, id));
}

export async function getPendingCommentsCount() {
  const pending = await db.select().from(comments).where(eq(comments.approved, false));
  return pending.length;
}

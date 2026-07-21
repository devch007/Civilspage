import { db } from '@/db';
import { users } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { supabaseAdmin } from '@/lib/supabase/admin';
import type { UserRole } from '@/lib/auth';

export async function getAllUsers() {
  return db.select().from(users).orderBy(desc(users.createdAt));
}

export async function getUserById(id: string) {
  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return user ?? null;
}

export async function getUserByAuthId(authId: string) {
  const [user] = await db.select().from(users).where(eq(users.authId, authId)).limit(1);
  return user ?? null;
}

export async function createUserProfile(authId: string, email: string, name?: string, role: UserRole = 'student') {
  const [user] = await db
    .insert(users)
    .values({ authId, email, name: name || null, role })
    .onConflictDoNothing()
    .returning();
  return user;
}

export async function updateUserRole(userId: string, role: UserRole) {
  const [user] = await db
    .update(users)
    .set({ role, updatedAt: new Date() })
    .where(eq(users.id, userId))
    .returning();
  return user;
}

export async function inviteUser(email: string, role: UserRole = 'educator') {
  const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
    data: { role },
  });
  if (error) throw new Error(error.message);
  return data.user;
}

export async function deleteUser(userId: string, authId: string) {
  await db.delete(users).where(eq(users.id, userId));
  await supabaseAdmin.auth.admin.deleteUser(authId);
}

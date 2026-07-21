import { redirect } from 'next/navigation';
import { getSupabaseServerClient } from './supabase/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import type { User } from '@/db/schema';

export type UserRole = 'super_admin' | 'educator' | 'editor' | 'student';

export async function getSession() {
  const supabase = await getSupabaseServerClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) return null;
  return session;
}

export async function getAuthUser() {
  const supabase = await getSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}

export async function getUserProfile(): Promise<User | null> {
  const authUser = await getAuthUser();
  if (!authUser) return null;

  const [profile] = await db
    .select()
    .from(users)
    .where(eq(users.authId, authUser.id))
    .limit(1);

  return profile ?? null;
}

export async function getUserRole(): Promise<UserRole | null> {
  const profile = await getUserProfile();
  return profile?.role ?? null;
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  return session;
}

export async function requireRole(allowedRoles: UserRole[]) {
  await requireAuth();
  const role = await getUserRole();
  if (!role || !allowedRoles.includes(role)) {
    redirect('/');
  }
  return role;
}

export async function requireAdmin() {
  return requireRole(['super_admin', 'educator', 'editor']);
}

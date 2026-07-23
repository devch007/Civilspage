import { redirect } from 'next/navigation';
import { cache } from 'react';
import { getSupabaseServerClient } from './supabase/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import type { User } from '@/db/schema';

// Hard timeout for any DB call — prevents 504 on Vercel Hobby (10s limit)
function withDbTimeout<T>(p: Promise<T>, fallback: T, ms = 4000): Promise<T> {
  return Promise.race([p, new Promise<T>((r) => setTimeout(() => r(fallback), ms))]);
}

export type UserRole = 'super_admin' | 'educator' | 'editor' | 'student';

// cache() memoizes per request — Supabase is only called once no matter
// how many times getAuthUser() is invoked in layouts, pages, and helpers.
export const getAuthUser = cache(async () => {
  try {
    const supabase = await getSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user;
  } catch {
    return null;
  }
});

export const getUserProfile = cache(async (): Promise<User | null> => {
  const authUser = await getAuthUser();
  if (!authUser) return null;

  try {
    const queryPromise = db
      .select()
      .from(users)
      .where(eq(users.authId, authUser.id))
      .limit(1)
      .then(([p]) => p ?? null);

    const profile = await withDbTimeout(queryPromise, null);

    // Auto-provision super_admin row on first login (with timeout)
    if (!profile) {
      try {
        const insertPromise = db
          .insert(users)
          .values({
            authId: authUser.id,
            email: authUser.email ?? '',
            name: authUser.user_metadata?.full_name ?? authUser.email?.split('@')[0] ?? 'Admin',
            role: 'super_admin',
          })
          .returning()
          .then(([c]) => c ?? null);
        return await withDbTimeout(insertPromise, null);
      } catch {
        return null;
      }
    }

    return profile;
  } catch {
    // DB unavailable — return a synthetic profile so admin still works
    return {
      id: authUser.id,
      authId: authUser.id,
      email: authUser.email ?? '',
      name: 'Admin',
      role: 'super_admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User;
  }
});

export async function getUserRole(): Promise<UserRole | null> {
  const profile = await getUserProfile();
  return (profile?.role as UserRole) ?? null;
}

/**
 * Require a valid Supabase auth session.
 * If the user has a session, let them through — don't block on DB availability.
 */
export async function requireAuth() {
  const user = await getAuthUser();
  if (!user) {
    redirect('/login');
  }
  return user;
}

export async function requireRole(allowedRoles: UserRole[]) {
  const user = await requireAuth();
  // If we can get a role from DB, check it — otherwise trust the auth session
  try {
    const role = await getUserRole();
    if (role && !allowedRoles.includes(role)) {
      redirect('/');
    }
  } catch {
    // DB unavailable — auth session is enough to proceed
  }
  return user;
}

export async function requireAdmin() {
  return requireRole(['super_admin', 'educator', 'editor']);
}

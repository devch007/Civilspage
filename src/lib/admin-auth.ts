import crypto from 'crypto';
import { cookies } from 'next/headers';
import { getSupabaseServerClient } from './supabase/server';

const SESSION_SECRET = process.env.JWT_SECRET || 'civilspage-super-secret-key-2026';

/**
 * Generates HMAC-SHA256 session token.
 */
export function generateAdminSessionToken(): string {
  return crypto
    .createHmac('sha256', SESSION_SECRET)
    .update('admin-session')
    .digest('hex');
}

/**
 * Timing-safe string comparison to protect against side-channel timing attacks.
 */
export function timingSafeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) {
      // Hash both to equalize buffer lengths before comparing
      const hashA = crypto.createHash('sha256').update(a).digest();
      const hashB = crypto.createHash('sha256').update(b).digest();
      return crypto.timingSafeEqual(hashA, hashB);
    }
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * Verifies if the request possesses a valid Super Admin session.
 * Supports both HMAC session cookie and Supabase user session.
 */
export async function verifyAdminSession(): Promise<boolean> {
  try {
    // 1. Check custom HMAC admin session cookie
    const cookieStore = await cookies();
    const adminToken = cookieStore.get('civilspage_admin_session')?.value;

    if (adminToken) {
      const expectedToken = generateAdminSessionToken();
      if (timingSafeCompare(adminToken, expectedToken)) {
        return true;
      }
    }

    // 2. Check Supabase auth session
    try {
      const supabase = await getSupabaseServerClient();
      const { data: { user }, error } = await supabase.auth.getUser();
      if (!error && user) {
        return true;
      }
    } catch {}

    return false;
  } catch {
    return false;
  }
}

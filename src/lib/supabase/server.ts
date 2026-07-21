import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Hardcoded public config — the anon key is Supabase's "publishable" key,
// safe to be in source code (same as Stripe publishable key).
// Hardcoding bypasses env var corruption (extra chars/Unicode) in Vercel.
const SUPABASE_URL = 'https://aqczscppwjibyxaymdym.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxY3pzY3Bwd2ppYnl4YXltZHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2NDE4MTcsImV4cCI6MjEwMDIxNzgxN30.' +
  'YeoJIa_8uhcmEJfmVc1Gbnswl1xA5GtM-Cf71K9L-vo';

export async function getSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Ignore in Server Components — middleware handles refresh
        }
      },
    },
  });
}

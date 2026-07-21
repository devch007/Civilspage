'use client';

import { createBrowserClient } from '@supabase/ssr';

// ── Supabase public config ────────────────────────────────────────────────────
// The anon/publishable key is intentionally public — it's the same key
// Supabase tells you to put in client-side code and version control.
// The SECRET is the service_role key (server-only, never here).
const SUPABASE_URL = 'https://aqczscppwjibyxaymdym.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxY3pzY3Bwd2ppYnl4YXltZHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2NDE4MTcsImV4cCI6MjEwMDIxNzgxN30.' +
  'YeoJIa_8uhcmEJfmVc1Gbnswl1xA5GtM-Cf71K9L-vo';

let client: ReturnType<typeof createBrowserClient> | undefined;

export function getSupabaseBrowserClient() {
  if (client) return client;
  client = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return client;
}

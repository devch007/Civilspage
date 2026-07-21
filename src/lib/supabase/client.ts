'use client';

import { createBrowserClient } from '@supabase/ssr';

let client: ReturnType<typeof createBrowserClient> | undefined;

/**
 * Strip any characters outside printable ASCII (0x20–0x7E).
 * Prevents "non ISO-8859-1 code point" Fetch errors caused by
 * invisible Unicode chars (BOM, ZWSP, etc.) copied into env vars.
 */
function sanitize(value: string | undefined): string {
  return (value ?? '').replace(/[^\x20-\x7E]/g, '').trim();
}

export function getSupabaseBrowserClient() {
  if (client) return client;
  const url = sanitize(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const key = sanitize(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (!url || !key) {
    throw new Error('Supabase env vars not set. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.');
  }

  client = createBrowserClient(url, key);
  return client;
}

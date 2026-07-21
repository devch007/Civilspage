import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://aqczscppwjibyxaymdym.supabase.co';

// Service Role key — server-only, never exposed to browser.
// Hardcoded to avoid Vercel env var corruption (extra Unicode chars).
const SERVICE_ROLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxY3pzY3Bwd2ppYnl4YXltZHltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDY0MTgxNywiZXhwIjoyMTAwMjE3ODE3fQ.' +
  'ZwDq3iwFA5PzSz-Wew1h_r99rtGjM_AZ0xDoFg779YU';

// Service role client — NEVER use on client side
export const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

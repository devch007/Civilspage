import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { logAudit } from '@/lib/audit';

export async function POST(req: Request) {
  try {
    await logAudit({
      action: 'auth.logout',
      resourceType: 'auth',
      resourceTitle: 'Admin Session Logout'
    });
  } catch {}

  try {
    const supabase = await getSupabaseServerClient();
    await supabase.auth.signOut();
  } catch {}

  const cookieStore = await cookies();
  cookieStore.delete('civilspage_admin_session');

  const origin = new URL(req.url).origin;
  return NextResponse.redirect(new URL('/login', origin));
}

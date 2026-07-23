import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const SUPABASE_URL = 'https://aqczscppwjibyxaymdym.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxY3pzY3Bwd2ppYnl4YXltZHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2NDE4MTcsImV4cCI6MjEwMDIxNzgxN30.' +
  'YeoJIa_8uhcmEJfmVc1Gbnswl1xA5GtM-Cf71K9L-vo';

export async function POST(request: NextRequest) {
  try {
    const { email, password, next } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const response = NextResponse.json({ redirectTo: next || '/login/dashboard' });

    const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    });

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('[auth/login] Supabase error:', error.message, error.status);
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    if (!data?.session) {
      return NextResponse.json(
        { error: 'Login failed — no session returned.' },
        { status: 401 }
      );
    }

    return response;
  } catch (err: any) {
    console.error('[auth/login] Unexpected error:', err);
    return NextResponse.json(
      { error: `Server error: ${err?.message ?? String(err)}` },
      { status: 500 }
    );
  }
}

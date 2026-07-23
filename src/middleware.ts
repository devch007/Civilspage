import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Hardcoded to avoid Vercel env var corruption (invisible Unicode chars).
// The anon key is Supabase's publishable key — safe in source code.
const SUPABASE_URL = 'https://aqczscppwjibyxaymdym.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxY3pzY3Bwd2ppYnl4YXltZHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2NDE4MTcsImV4cCI6MjEwMDIxNzgxN30.' +
  'YeoJIa_8uhcmEJfmVc1Gbnswl1xA5GtM-Cf71K9L-vo';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Refresh session — DO NOT remove (required by @supabase/ssr)
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Redirect /admin/* → /login/* permanently
  if (pathname.startsWith('/admin')) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = pathname.replace('/admin', '/login');
    return NextResponse.redirect(newUrl, 308);
  }

  // Protect all /login/* sub-routes (except /login itself which shows the form)
  const isAdminSubRoute =
    pathname.startsWith('/login/') && pathname !== '/login';
  if (isAdminSubRoute && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users from /login → /login/dashboard
  if (pathname === '/login' && user) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = '/login/dashboard';
    return NextResponse.redirect(dashboardUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     * - _next/static, _next/image (Next.js internals)
     * - favicon and static assets
     * - /api/* routes (they handle auth themselves and must NOT have Supabase
     *   session refresh run on them — the JWT forwarded as Authorization header
     *   contains characters that Node.js rejects as invalid HTTP headers)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

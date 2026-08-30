import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { timingSafeCompare, generateAdminSessionToken } from '@/lib/admin-auth';

const DEFAULT_EMAIL = 'admin@civilspage.com';
const DEFAULT_PASSWORD = 'CivilsPageAdmin2026!';

export async function POST(request: Request) {
  try {
    // 1. IP-based rate limiting (Max 5 attempts per 15 minutes)
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      request.headers.get('cf-connecting-ip') ??
      '127.0.0.1';

    const rateLimit = checkRateLimit(`login-attempt:${ip}`, {
      intervalMs: 15 * 60 * 1000,
      maxRequests: 5,
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many failed login attempts. Please try again in ${rateLimit.reset} seconds.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.reset),
          },
        }
      );
    }

    const { email, password } = await request.json();

    const expectedEmail = process.env.ADMIN_EMAIL || DEFAULT_EMAIL;
    const expectedPassword = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;

    // 2. Timing-safe credential comparison
    const isEmailMatch = typeof email === 'string' && timingSafeCompare(email.trim().toLowerCase(), expectedEmail.toLowerCase());
    const isPasswordMatch = typeof password === 'string' && timingSafeCompare(password, expectedPassword);

    if (isEmailMatch && isPasswordMatch) {
      const sessionToken = generateAdminSessionToken();
      const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });

      // Set cookie securely (HTTP-only)
      response.cookies.set({
        name: 'civilspage_admin_session',
        value: sessionToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      });

      try {
        const { logAudit } = await import('@/lib/audit');
        await logAudit({
          action: 'auth.login',
          resourceType: 'auth',
          resourceTitle: 'Admin Session Login',
          userEmail: email,
          userName: 'Rajiv Ranjan Singh',
          userRole: 'super_admin',
        });
      } catch {}

      return response;
    }

    // Artificial delay on failure to mitigate brute-force attempts
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json(
      {
        success: false,
        error: `Invalid email or password. ${rateLimit.remaining} attempts remaining.`,
      },
      { status: 401 }
    );
  } catch (err) {
    console.error('Error during admin login api:', err);
    return NextResponse.json(
      { success: false, error: 'Server authentication error' },
      { status: 500 }
    );
  }
}

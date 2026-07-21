import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Strong defaults if env vars are not set
const DEFAULT_EMAIL = 'admin@civilspage.com';
const DEFAULT_PASSWORD = 'CivilsPageAdmin2026!'; // Strong default password
const SESSION_SECRET = process.env.JWT_SECRET || 'civilspage-super-secret-key-2026';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const expectedEmail = process.env.ADMIN_EMAIL || DEFAULT_EMAIL;
    const expectedPassword = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;

    // Secure authentication check
    if (email === expectedEmail && password === expectedPassword) {
      // Create a cryptographically secure session token based on SESSION_SECRET
      const sessionToken = crypto
        .createHmac('sha256', SESSION_SECRET)
        .update('admin-session')
        .digest('hex');

      const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });

      // Set cookie securely (HTTP-only)
      response.cookies.set({
        name: 'civilspage_admin_session',
        value: sessionToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return response;
    }

    // Artificial delay on failure to mitigate brute-force attempts
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json(
      { success: false, error: 'Invalid email or password' },
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

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const SESSION_SECRET = process.env.JWT_SECRET || 'civilspage-super-secret-key-2026';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const adminCookie = cookieStore.get('civilspage_admin_session');

    if (!adminCookie) {
      return NextResponse.json({ authenticated: false });
    }

    // Verify token validity on the server
    const expectedToken = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update('admin-session')
      .digest('hex');

    if (adminCookie.value === expectedToken) {
      return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json({ authenticated: false });
  } catch (err) {
    console.error('Error during check-auth api:', err);
    return NextResponse.json({ authenticated: false });
  }
}

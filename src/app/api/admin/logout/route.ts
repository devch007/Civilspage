import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ success: true, message: 'Logged out successfully' });

    // Delete cookie by setting expiration in the past
    response.cookies.set({
      name: 'civilspage_admin_session',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(0) // Expire immediately
    });

    return response;
  } catch (err) {
    console.error('Error during admin logout api:', err);
    return NextResponse.json(
      { success: false, error: 'Server logout error' },
      { status: 500 }
    );
  }
}

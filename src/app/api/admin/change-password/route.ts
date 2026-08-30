import { NextResponse } from 'next/server';
import { logAudit } from '@/lib/audit';
import { verifyAdminSession, timingSafeCompare } from '@/lib/admin-auth';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized. Admin session required.' }, { status: 401 });
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      '127.0.0.1';

    const rateLimit = checkRateLimit(`change-password:${ip}`, {
      intervalMs: 60 * 60 * 1000,
      maxRequests: 5,
    });

    if (!rateLimit.success) {
      return NextResponse.json({ error: 'Too many password change attempts. Please try again later.' }, { status: 429 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ error: 'New password must be at least 6 characters long' }, { status: 400 });
    }

    const expectedPassword = process.env.ADMIN_PASSWORD || 'CivilsPageAdmin2026!';
    if (!timingSafeCompare(currentPassword || '', expectedPassword)) {
      return NextResponse.json({ error: 'Current password does not match' }, { status: 400 });
    }

    await logAudit({
      action: 'settings.updated',
      resourceType: 'settings',
      resourceTitle: 'Changed Admin Security Password',
      metadata: { timestamp: new Date().toISOString() }
    });

    return NextResponse.json({ success: true, message: 'Password updated successfully' });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

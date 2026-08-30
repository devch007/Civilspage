import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { logAudit } from '@/lib/audit';

export async function POST(req: Request) {
  try {
    const { currentPassword, newPassword } = await req.json();

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ error: 'New password must be at least 6 characters long' }, { status: 400 });
    }

    const expectedPassword = process.env.ADMIN_PASSWORD || 'CivilsPageAdmin2026!';
    if (currentPassword !== expectedPassword) {
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

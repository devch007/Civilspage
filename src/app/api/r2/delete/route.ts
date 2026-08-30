import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/admin-auth';
import { deleteFromR2 } from '@/lib/r2';

export async function DELETE(request: NextRequest) {
  const isAuthed = await verifyAdminSession();
  if (!isAuthed) {
    return NextResponse.json({ error: 'Unauthorized. Admin session required.' }, { status: 401 });
  }

  try {
    const { key } = await request.json() as { key?: string };
    if (!key || typeof key !== 'string') {
      return NextResponse.json({ error: 'Missing key' }, { status: 400 });
    }

    // Security: prevent path traversal
    if (key.includes('..') || key.startsWith('/')) {
      return NextResponse.json({ error: 'Invalid key' }, { status: 400 });
    }

    await deleteFromR2(key);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[R2 Delete Error]', err);
    return NextResponse.json({ error: err.message ?? 'Delete failed' }, { status: 500 });
  }
}

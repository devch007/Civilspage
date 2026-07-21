import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { deleteFromR2 } from '@/lib/r2';

export async function DELETE(request: NextRequest) {
  // ── Auth + role check ───────────────────────────────────────────────────────
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

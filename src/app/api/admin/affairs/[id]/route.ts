import { NextResponse } from 'next/server';
import { db } from '@/db';
import { currentAffairs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth';

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    await db.delete(currentAffairs).where(eq(currentAffairs.id, id));
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

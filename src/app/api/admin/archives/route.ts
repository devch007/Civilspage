import { NextResponse } from 'next/server';
import { db } from '@/db';
import { currentAffairs } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    await requireAdmin();
    const rows = await db
      .select()
      .from(currentAffairs)
      .where(eq(currentAffairs.isArchived, true))
      .orderBy(desc(currentAffairs.archivedAt), desc(currentAffairs.updatedAt));
    return NextResponse.json(rows);
  } catch (err: any) {
    console.error('[GET /api/admin/archives]', err);
    return NextResponse.json([], { status: 200 });
  }
}

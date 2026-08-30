import { NextResponse } from 'next/server';
import { db } from '@/db';
import { currentAffairs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth';

/**
 * PUT: Restore an archived entry back to active Current News & Views
 */
export async function PUT(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const [restored] = await db
      .update(currentAffairs)
      .set({
        isArchived: false,
        archivedAt: null,
        published: true, // Make visible upon restoration
        updatedAt: new Date(),
      })
      .where(eq(currentAffairs.id, id))
      .returning();

    if (!restored) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, restored });
  } catch (err: any) {
    console.error('[PUT /api/admin/archives/[id]]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * DELETE: Permanently delete an entry from the database
 */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    await db.delete(currentAffairs).where(eq(currentAffairs.id, id));
    return NextResponse.json({ success: true, permanent: true });
  } catch (err: any) {
    console.error('[DELETE /api/admin/archives/[id]]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

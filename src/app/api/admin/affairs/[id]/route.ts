import { NextResponse } from 'next/server';
import { db } from '@/db';
import { currentAffairs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const { title, date, category, content, featuredImage, pdfUrl, published } = body;

    if (!title?.trim()) return NextResponse.json({ error: 'Title required' }, { status: 400 });
    if (!date) return NextResponse.json({ error: 'Date required' }, { status: 400 });

    const [updated] = await db
      .update(currentAffairs)
      .set({
        title,
        date,
        category: category || 'General',
        content: content || null,
        featuredImage: featuredImage || null,
        pdfUrl: pdfUrl || null,
        published: published ?? false,
        updatedAt: new Date(),
      })
      .where(eq(currentAffairs.id, id))
      .returning();

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error('[PUT /api/admin/affairs/[id]]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    await db
      .update(currentAffairs)
      .set({
        isArchived: true,
        archivedAt: new Date(),
        published: false,
        updatedAt: new Date(),
      })
      .where(eq(currentAffairs.id, id));
    return NextResponse.json({ success: true, archived: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

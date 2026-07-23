import { NextResponse } from 'next/server';
import { db } from '@/db';
import { currentAffairs } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    await requireAdmin();
    const rows = await db.select().from(currentAffairs).orderBy(desc(currentAffairs.date));
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = await req.json();
    const { title, date, category, content, featuredImage, pdfUrl, published } = body;

    if (!title?.trim()) return NextResponse.json({ error: 'Title required' }, { status: 400 });
    if (!date) return NextResponse.json({ error: 'Date required' }, { status: 400 });

    // unique slug with timestamp
    const base = title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    const slug = `${base}-${Date.now().toString(36)}`;

    const [affair] = await db
      .insert(currentAffairs)
      .values({
        title,
        slug,
        date,
        category: category || 'General',
        content: content || null,
        featuredImage: featuredImage || null,
        pdfUrl: pdfUrl || null,
        published: published ?? false,
      })
      .returning();

    return NextResponse.json(affair);
  } catch (err: any) {
    console.error('[POST /api/admin/affairs]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

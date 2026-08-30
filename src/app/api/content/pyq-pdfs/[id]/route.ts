import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { logAudit } from '@/lib/audit';

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { verifyAdminSession } = await import('@/lib/admin-auth');
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
    }

    const { id } = await params;
    const { title, tags, pdfUrl, subject, year, examType } = await req.json();
    if (!title?.trim()) return NextResponse.json({ error: 'Title required' }, { status: 400 });
    if (!pdfUrl?.trim()) return NextResponse.json({ error: 'PDF URL required' }, { status: 400 });

    const tagsArr = Array.isArray(tags) ? tags : (tags || '').split(',').map((t: string) => t.trim()).filter(Boolean);

    const [row] = await sql`
      UPDATE pyq_pdfs
      SET title = ${title}, tags = ${tagsArr}, pdf_url = ${pdfUrl}, subject = ${subject || null}, year = ${year ? parseInt(year) : null}, exam_type = ${examType || 'Preliminary Examination'}
      WHERE id = ${id}
      RETURNING *
    `;

    await logAudit({
      action: 'pyq.updated',
      resourceType: 'pyq',
      resourceId: id,
      resourceTitle: title,
      metadata: { examType: row?.exam_type, year: row?.year, pdfUrl: row?.pdf_url }
    });

    return NextResponse.json(row);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { verifyAdminSession } = await import('@/lib/admin-auth');
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
    }

    const { id } = await params;
    const [existing] = await sql`SELECT title, pdf_url FROM pyq_pdfs WHERE id = ${id}`;
    await sql`DELETE FROM pyq_pdfs WHERE id = ${id}`;

    await logAudit({
      action: 'pyq.deleted',
      resourceType: 'pyq',
      resourceId: id,
      resourceTitle: existing?.title || 'PYQ PDF',
      metadata: { pdfUrl: existing?.pdf_url }
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

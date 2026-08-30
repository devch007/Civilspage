import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { logAudit } from '@/lib/audit';

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { title, tags, pdfUrl, year, examType } = await req.json();
    if (!title?.trim()) return NextResponse.json({ error: 'Title required' }, { status: 400 });
    if (!pdfUrl?.trim()) return NextResponse.json({ error: 'PDF URL required' }, { status: 400 });

    const tagsArr = Array.isArray(tags) ? tags : (tags || '').split(',').map((t: string) => t.trim()).filter(Boolean);

    const [row] = await sql`
      UPDATE mock_test_pdfs
      SET title = ${title}, tags = ${tagsArr}, pdf_url = ${pdfUrl}, year = ${year ? parseInt(year) : null}, exam_type = ${examType || 'Preliminary Examination'}
      WHERE id = ${id}
      RETURNING *
    `;

    await logAudit({
      action: 'mock_test.updated',
      resourceType: 'mock_test',
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
    const { id } = await params;
    const [existing] = await sql`SELECT title, pdf_url FROM mock_test_pdfs WHERE id = ${id}`;
    await sql`DELETE FROM mock_test_pdfs WHERE id = ${id}`;

    await logAudit({
      action: 'mock_test.deleted',
      resourceType: 'mock_test',
      resourceId: id,
      resourceTitle: existing?.title || 'Mock Test PDF',
      metadata: { pdfUrl: existing?.pdf_url }
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
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
    return NextResponse.json(row);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await sql`DELETE FROM pyq_pdfs WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

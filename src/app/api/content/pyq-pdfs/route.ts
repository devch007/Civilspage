import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { logAudit } from '@/lib/audit';

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

export async function GET() {
  try {
    const rows = await sql`SELECT * FROM pyq_pdfs ORDER BY created_at DESC`;
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, tags, pdfUrl, subject, year, examType } = await req.json();
    if (!title?.trim()) return NextResponse.json({ error: 'Title required' }, { status: 400 });
    if (!pdfUrl?.trim()) return NextResponse.json({ error: 'PDF URL required' }, { status: 400 });

    const tagsArr = Array.isArray(tags) ? tags : (tags || '').split(',').map((t: string) => t.trim()).filter(Boolean);

    const [row] = await sql`
      INSERT INTO pyq_pdfs (title, tags, pdf_url, subject, year, exam_type)
      VALUES (${title}, ${tagsArr}, ${pdfUrl}, ${subject || null}, ${year ? parseInt(year) : null}, ${examType || 'Preliminary Examination'})
      RETURNING *
    `;

    await logAudit({
      action: 'pyq.created',
      resourceType: 'pyq',
      resourceId: row.id,
      resourceTitle: title,
      metadata: { examType: row.exam_type, year: row.year, pdfUrl: row.pdf_url }
    });

    return NextResponse.json(row);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

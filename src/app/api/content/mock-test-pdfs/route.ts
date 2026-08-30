import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

export async function GET() {
  try {
    const rows = await sql`SELECT * FROM mock_test_pdfs ORDER BY created_at DESC`;
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, tags, pdfUrl, year, examType } = await req.json();
    if (!title?.trim()) return NextResponse.json({ error: 'Title required' }, { status: 400 });
    if (!pdfUrl?.trim()) return NextResponse.json({ error: 'PDF URL required' }, { status: 400 });

    const tagsArr = Array.isArray(tags) ? tags : (tags || '').split(',').map((t: string) => t.trim()).filter(Boolean);

    const [row] = await sql`
      INSERT INTO mock_test_pdfs (title, tags, pdf_url, year, exam_type)
      VALUES (${title}, ${tagsArr}, ${pdfUrl}, ${year ? parseInt(year) : null}, ${examType || 'Preliminary Examination'})
      RETURNING *
    `;
    return NextResponse.json(row);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

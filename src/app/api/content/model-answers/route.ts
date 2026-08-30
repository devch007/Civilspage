import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { logAudit } from '@/lib/audit';

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

export async function GET() {
  try {
    const rows = await sql`SELECT * FROM model_answer_pdfs ORDER BY created_at DESC`;
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const { verifyAdminSession } = await import('@/lib/admin-auth');
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
    }

    const { title, tags, pdfUrl, year, subject } = await req.json();
    if (!title?.trim()) return NextResponse.json({ error: 'Title required' }, { status: 400 });
    if (!pdfUrl?.trim()) return NextResponse.json({ error: 'PDF URL required' }, { status: 400 });

    const tagsArr = Array.isArray(tags) ? tags : (tags || '').split(',').map((t: string) => t.trim()).filter(Boolean);

    const [row] = await sql`
      INSERT INTO model_answer_pdfs (title, tags, pdf_url, year, subject)
      VALUES (${title}, ${tagsArr}, ${pdfUrl}, ${year ? parseInt(year) : null}, ${subject || 'Polity & Governance'})
      RETURNING *
    `;

    await logAudit({
      action: 'model_answer.created',
      resourceType: 'model_answer',
      resourceId: row.id,
      resourceTitle: title,
      metadata: { subject: row.subject, year: row.year, pdfUrl: row.pdf_url }
    });

    return NextResponse.json(row);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

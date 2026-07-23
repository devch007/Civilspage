import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const subject = searchParams.get('subject');
    let rows;
    if (subject) {
      rows = await sql`SELECT * FROM subject_content WHERE subject = ${subject} AND published = true ORDER BY created_at DESC`;
    } else {
      rows = await sql`SELECT * FROM subject_content ORDER BY created_at DESC`;
    }
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const { subject, title, content, imageUrl, pdfUrl, published } = await req.json();
    if (!subject || !title?.trim()) return NextResponse.json({ error: 'subject and title required' }, { status: 400 });
    const [row] = await sql`
      INSERT INTO subject_content (subject, title, content, image_url, pdf_url, published)
      VALUES (${subject}, ${title}, ${content || null}, ${imageUrl || null}, ${pdfUrl || null}, ${published ?? true})
      RETURNING *
    `;
    return NextResponse.json(row);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

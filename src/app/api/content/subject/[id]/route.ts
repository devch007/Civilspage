import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { subject, title, content, imageUrl, pdfUrl, published } = await req.json();
    if (!subject || !title?.trim()) return NextResponse.json({ error: 'subject and title required' }, { status: 400 });

    const [row] = await sql`
      UPDATE subject_content
      SET subject = ${subject}, title = ${title}, content = ${content || null}, image_url = ${imageUrl || null}, pdf_url = ${pdfUrl || null}, published = ${published ?? true}
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
    await sql`DELETE FROM subject_content WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

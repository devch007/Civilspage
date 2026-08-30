import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { logAudit } from '@/lib/audit';

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, category, subject, message } = body;

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All required fields must be provided' }, { status: 400 });
    }

    const [row] = await sql`
      INSERT INTO direct_queries (name, email, phone, category, subject, message)
      VALUES (
        ${name.trim()}, 
        ${email.trim()}, 
        ${phone?.trim() || null}, 
        ${category?.trim() || 'General Strategy'}, 
        ${subject.trim()}, 
        ${message.trim()}
      )
      RETURNING *
    `;

    return NextResponse.json({ success: true, id: row.id });
  } catch (err: any) {
    console.error('[POST /api/content/direct-queries]', err);
    return NextResponse.json({ error: err.message || 'Failed to submit query' }, { status: 500 });
  }
}

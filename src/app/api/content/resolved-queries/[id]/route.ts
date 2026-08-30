import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { verifyAdminSession } from '@/lib/admin-auth';
import { logAudit } from '@/lib/audit';

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
    }

    const { id } = await params;
    const { question, answer, category, published } = await req.json();

    if (!question?.trim()) return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    if (!answer?.trim()) return NextResponse.json({ error: 'Answer is required' }, { status: 400 });

    const [row] = await sql`
      UPDATE resolved_queries
      SET question = ${question.trim()}, 
          answer = ${answer.trim()}, 
          category = ${category || 'Miscellaneous'}, 
          published = ${published ?? true},
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    await logAudit({
      action: 'blog.updated',
      resourceType: 'resolved_query',
      resourceId: id,
      resourceTitle: question.substring(0, 80),
      metadata: { category: row?.category, published: row?.published }
    });

    return NextResponse.json(row);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
    }

    const { id } = await params;
    const [existing] = await sql`SELECT question FROM resolved_queries WHERE id = ${id}`;
    await sql`DELETE FROM resolved_queries WHERE id = ${id}`;

    await logAudit({
      action: 'blog.deleted',
      resourceType: 'resolved_query',
      resourceId: id,
      resourceTitle: existing?.question?.substring(0, 80) || 'Resolved Query',
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { verifyAdminSession } from '@/lib/admin-auth';
import { logAudit } from '@/lib/audit';

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const isAdmin = searchParams.get('admin') === 'true';

    let rows;
    if (isAdmin) {
      rows = await sql`SELECT * FROM resolved_queries ORDER BY created_at DESC`;
    } else if (category && category !== 'All') {
      rows = await sql`
        SELECT id, question, answer, category, created_at 
        FROM resolved_queries 
        WHERE published = true AND category = ${category}
        ORDER BY created_at DESC
      `;
    } else {
      rows = await sql`
        SELECT id, question, answer, category, created_at 
        FROM resolved_queries 
        WHERE published = true 
        ORDER BY created_at DESC
      `;
    }

    return NextResponse.json(rows);
  } catch (err: any) {
    console.error('[GET /api/content/resolved-queries]', err);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
    }

    const { question, answer, category, published } = await req.json();

    if (!question?.trim()) return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    if (!answer?.trim()) return NextResponse.json({ error: 'Answer is required' }, { status: 400 });

    const [row] = await sql`
      INSERT INTO resolved_queries (question, answer, category, published)
      VALUES (${question.trim()}, ${answer.trim()}, ${category || 'General'}, ${published ?? true})
      RETURNING *
    `;

    await logAudit({
      action: 'blog.created', // Using standard audit action
      resourceType: 'resolved_query',
      resourceId: row.id,
      resourceTitle: question.substring(0, 80),
      metadata: { category: row.category, published: row.published }
    });

    return NextResponse.json(row);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

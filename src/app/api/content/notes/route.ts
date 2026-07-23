import { NextResponse } from 'next/server';
import { db } from '@/db';
import { notes } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');

    let rows;
    if (subject) {
      rows = await db.select().from(notes).where(eq(notes.subject, subject)).orderBy(desc(notes.createdAt));
    } else {
      rows = await db.select().from(notes).orderBy(desc(notes.createdAt));
    }

    return NextResponse.json(rows);
  } catch (err: any) {
    console.error('[api/content/notes] error:', err);
    return NextResponse.json([], { status: 200 });
  }
}

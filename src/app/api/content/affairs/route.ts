import { NextResponse } from 'next/server';
import { db } from '@/db';
import { currentAffairs } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = db
      .select()
      .from(currentAffairs)
      .where(eq(currentAffairs.published, true))
      .orderBy(desc(currentAffairs.date))
      .$dynamic();

    const rows = await query;

    const filtered = category
      ? rows.filter((r) => r.category.toLowerCase().includes(category.toLowerCase()))
      : rows;

    return NextResponse.json(filtered);
  } catch (err: any) {
    console.error('[api/content/affairs] error:', err);
    return NextResponse.json([], { status: 200 }); // return empty on error
  }
}

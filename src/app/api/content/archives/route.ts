import { NextResponse } from 'next/server';
import { db } from '@/db';
import { currentAffairs } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const category = searchParams.get('category');

    // Fetch only deleted/archived records from current_affairs
    const rows = await db
      .select()
      .from(currentAffairs)
      .where(eq(currentAffairs.isArchived, true))
      .orderBy(desc(currentAffairs.archivedAt), desc(currentAffairs.date));

    let filtered = rows;

    if (year && year !== 'All') {
      filtered = filtered.filter((r) => {
        const itemYear = new Date(r.date).getFullYear().toString();
        return itemYear === year || (r.date && r.date.startsWith(year));
      });
    }

    if (category && category !== 'All') {
      filtered = filtered.filter((r) => 
        r.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    return NextResponse.json(filtered);
  } catch (err: any) {
    console.error('[GET /api/content/archives]', err);
    return NextResponse.json([], { status: 200 });
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/db';
import { currentAffairs } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [affair] = await db
      .select()
      .from(currentAffairs)
      .where(eq(currentAffairs.id, id))
      .limit(1);

    if (!affair) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(affair);
  } catch (err: any) {
    console.error('[api/content/affairs/[id]]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

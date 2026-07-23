import { NextResponse } from 'next/server';
import { db } from '@/db';
import { sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET() {
  console.log('[test-db] Starting database connectivity test...');
  try {
    // Run a simple query
    const startTime = Date.now();
    const result = await db.execute(sql`SELECT 1+1 AS result`);
    const duration = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      durationMs: duration,
      result: result,
      envUrlConfigured: !!process.env.DATABASE_URL,
    });
  } catch (error: any) {
    console.error('[test-db] Connection test failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error.message ?? String(error),
      stack: error.stack,
      envUrlConfigured: !!process.env.DATABASE_URL,
    }, { status: 500 });
  }
}

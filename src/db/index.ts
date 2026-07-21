import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Hardcoded to avoid Vercel env var corruption.
// Transaction-mode pooler (port 6543) — required for serverless/edge.
// prepare: false is mandatory for transaction-mode Supabase pooler.
const DATABASE_URL =
  'postgresql://postgres.aqczscppwjibyxaymdym:%5B7CB%2F3tpp%2AeYgcEF%5D' +
  '@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres';

// Prevent multiple connections in development due to HMR
const globalForDb = global as unknown as { db: ReturnType<typeof drizzle> | undefined };

function createDb() {
  const client = postgres(DATABASE_URL, {
    prepare: false, // Required for Supabase transaction-mode pooler
  });
  return drizzle(client, { schema });
}

export const db = globalForDb.db ?? createDb();

if (process.env.NODE_ENV !== 'production') {
  globalForDb.db = db;
}

export type Database = typeof db;

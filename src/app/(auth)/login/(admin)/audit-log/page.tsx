import { db } from '@/db';
import { auditLogs } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { actionLabel, actionColor } from '@/lib/audit';
import { format } from 'date-fns';
import { Shield, User, Clock, Globe, Monitor, FileText, Search, Activity, Sparkles, Filter } from 'lucide-react';
import AuditLogClient from './_components/AuditLogClient';

async function safeGetLogs() {
  try {
    return await Promise.race([
      db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(300),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000)),
    ]);
  } catch {
    return [];
  }
}

export default async function AuditLogPage() {
  const logs = await safeGetLogs();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Shield className="w-7 h-7 text-indigo-600" />
            <span>Audit &amp; Security Log</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Real-time immutable log of administrative events, file uploads, PDF updates, and security sessions.
          </p>
        </div>
        <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-2xs text-right">
          <p className="text-xl font-bold text-slate-900">{logs.length}</p>
          <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Total Recorded</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Creations & Uploads', count: logs.filter(l => l.action.includes('created') || l.action.includes('uploaded')).length, color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
          { label: 'Updates & Edits', count: logs.filter(l => l.action.includes('updated') || l.action.includes('published') || l.action.includes('changed')).length, color: 'text-amber-700 bg-amber-50 border-amber-100' },
          { label: 'Deletions', count: logs.filter(l => l.action.includes('deleted') || l.action.includes('rejected')).length, color: 'text-red-700 bg-red-50 border-red-100' },
          { label: 'Sessions & Auth', count: logs.filter(l => l.action.includes('auth.') || l.resourceType === 'auth').length, color: 'text-indigo-700 bg-indigo-50 border-indigo-100' },
        ].map(({ label, count, color }) => (
          <div key={label} className="bg-white border border-slate-100 rounded-xl p-4 shadow-xs">
            <p className="text-2xl font-black text-slate-900">{count}</p>
            <p className="text-xs text-slate-500 font-medium mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Interactive client filter and timeline */}
      <AuditLogClient logs={logs} />
    </div>
  );
}

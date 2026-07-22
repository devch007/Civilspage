import { db } from '@/db';
import { auditLogs } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { actionLabel, actionColor } from '@/lib/audit';
import { format } from 'date-fns';
import { Shield, User, Clock, Globe, Monitor } from 'lucide-react';

export default async function AuditLogPage() {
  const logs = await db
    .select()
    .from(auditLogs)
    .orderBy(desc(auditLogs.createdAt))
    .limit(200);

  const resourceTypes = [...new Set(logs.map((l) => l.resourceType))];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-6 h-6 text-indigo-600" />
            Audit Log
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Every admin action is recorded here — who did what, when, and from where.
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-900">{logs.length}</p>
          <p className="text-xs text-slate-400">entries (last 200)</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Creations', count: logs.filter(l => l.action.includes('created') || l.action.includes('uploaded')).length, color: 'emerald' },
          { label: 'Deletions', count: logs.filter(l => l.action.includes('deleted') || l.action.includes('rejected')).length, color: 'red' },
          { label: 'Updates', count: logs.filter(l => l.action.includes('updated') || l.action.includes('published') || l.action.includes('changed')).length, color: 'amber' },
          { label: 'Unique Users', count: new Set(logs.map(l => l.userEmail)).size, color: 'indigo' },
        ].map(({ label, count, color }) => (
          <div key={label} className="bg-white border border-slate-100 rounded-xl p-4">
            <p className="text-2xl font-bold text-slate-900">{count}</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Log table */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-50">
          <h2 className="font-semibold text-slate-800 text-sm">Activity Timeline</h2>
        </div>

        {logs.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Shield className="w-8 h-8 mx-auto mb-3 text-slate-200" />
            <p className="text-sm">No actions recorded yet.</p>
            <p className="text-xs mt-1">Actions will appear here after the first admin operation.</p>
          </div>
        )}

        <div className="divide-y divide-slate-50">
          {logs.map((log) => (
            <div key={log.id} className="px-5 py-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-start gap-4">
                {/* Action badge */}
                <div className="shrink-0 pt-0.5">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${actionColor(log.action)}`}>
                    {actionLabel(log.action)}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  {log.resourceTitle && (
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {log.resourceTitle}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                    {/* User */}
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span className="font-medium text-slate-600">{log.userName || log.userEmail}</span>
                      {log.userRole && (
                        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] uppercase font-bold">
                          {log.userRole.replace('_', ' ')}
                        </span>
                      )}
                    </span>
                    {/* Time */}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {format(new Date(log.createdAt), 'dd MMM yyyy · HH:mm:ss')}
                    </span>
                    {/* IP */}
                    {log.ipAddress && log.ipAddress !== 'unknown' ? (
                      <span className="flex items-center gap-1 font-mono">
                        <Globe className="w-3 h-3" />
                        {String(log.ipAddress)}
                      </span>
                    ) : null}
                    {/* Resource type */}
                    <span className="px-1.5 py-0.5 bg-slate-50 border border-slate-100 rounded text-[10px] uppercase font-bold text-slate-400">
                      {log.resourceType}
                    </span>
                  </div>

                  {/* User agent (collapsed) */}
                  {log.userAgent && log.userAgent !== 'unknown' ? (
                    <p className="text-[10px] text-slate-300 truncate flex items-center gap-1">
                      <Monitor className="w-2.5 h-2.5 shrink-0" />
                      {log.userAgent.substring(0, 100)}
                    </p>
                  ) : null}

                  {/* Metadata */}
                  {(log.metadata != null && Object.keys(log.metadata as object).length > 0) ? (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {Object.entries(log.metadata as Record<string, string | number | boolean>).map(([k, v]) => (
                        <span key={k} className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-50 border border-slate-100 rounded text-[10px] text-slate-500 font-mono">
                          {k}: <span className="font-semibold text-slate-700">{String(v)}</span>
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                {/* Resource ID */}
                {log.resourceId && (
                  <span className="shrink-0 text-[10px] text-slate-300 font-mono hidden sm:block">
                    {log.resourceId.substring(0, 8)}…
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

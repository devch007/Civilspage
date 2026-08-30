'use client';

import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { Search, Shield, User, Clock, Globe, Monitor, FileText, Filter, RotateCcw } from 'lucide-react';
import { actionLabel, actionColor } from '@/lib/audit-helpers';

export default function AuditLogClient({ logs }: { logs: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const resourceTypes = useMemo(() => {
    const types = new Set<string>();
    logs.forEach(l => { if (l.resourceType) types.add(l.resourceType); });
    return ['All', ...Array.from(types)];
  }, [logs]);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      // Type filter
      if (selectedType !== 'All' && log.resourceType !== selectedType) {
        return false;
      }
      // Search filter
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const titleMatch = (log.resourceTitle || '').toLowerCase().includes(q);
        const actionMatch = (log.action || '').toLowerCase().includes(q);
        const userMatch = (log.userName || log.userEmail || '').toLowerCase().includes(q);
        const ipMatch = (log.ipAddress || '').toLowerCase().includes(q);
        const metaMatch = log.metadata ? JSON.stringify(log.metadata).toLowerCase().includes(q) : false;
        return titleMatch || actionMatch || userMatch || ipMatch || metaMatch;
      }
      return true;
    });
  }, [logs, selectedType, searchTerm]);

  return (
    <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs">
      {/* Search & Filters Toolbar */}
      <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <input
            type="text"
            placeholder="Search by action, title, user, IP, or metadata..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 text-slate-700"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {resourceTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedType === type
                  ? 'bg-[#0b3b60] text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {type === 'All' ? 'All Activities' : type.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* List / Timeline */}
      <div className="divide-y divide-slate-100 max-h-[700px] overflow-y-auto">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Shield className="w-8 h-8 mx-auto mb-2.5 text-slate-300" />
            <p className="text-sm font-semibold text-slate-600">No activity matching your search</p>
            <p className="text-xs mt-1 text-slate-400">Try clearing your filters or search terms.</p>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div key={log.id} className="px-5 py-4 hover:bg-slate-50/70 transition-colors">
              <div className="flex items-start gap-3.5">
                {/* Action badge */}
                <div className="shrink-0 pt-0.5">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide ${actionColor(log.action)}`}>
                    {actionLabel(log.action)}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  {log.resourceTitle && (
                    <p className="text-sm font-bold text-slate-900 leading-snug">
                      {log.resourceTitle}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    {/* User */}
                    <span className="flex items-center gap-1.5 font-medium text-slate-700">
                      <User className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{log.userName || log.userEmail}</span>
                      {log.userRole && (
                        <span className="px-1.5 py-0.2 bg-indigo-50 text-indigo-700 rounded text-[9px] uppercase font-extrabold border border-indigo-100">
                          {log.userRole.replace('_', ' ')}
                        </span>
                      )}
                    </span>

                    {/* Time */}
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{log.createdAt ? format(new Date(log.createdAt), 'dd MMM yyyy · HH:mm:ss') : 'Just now'}</span>
                    </span>

                    {/* IP */}
                    {log.ipAddress && log.ipAddress !== 'unknown' && (
                      <span className="flex items-center gap-1 font-mono text-slate-400 text-[11px]">
                        <Globe className="w-3 h-3 text-slate-400" />
                        <span>{String(log.ipAddress)}</span>
                      </span>
                    )}

                    {/* Resource tag */}
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] uppercase font-bold tracking-wider">
                      {log.resourceType}
                    </span>
                  </div>

                  {/* Metadata preview */}
                  {log.metadata != null && Object.keys(log.metadata as object).length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {Object.entries(log.metadata as Record<string, string | number | boolean>).map(([k, v]) => (
                        <span key={k} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-50 border border-slate-200/80 rounded-md text-[11px] text-slate-600 font-mono">
                          <strong className="text-slate-500 font-semibold">{k}:</strong>
                          <span className="text-slate-800 font-medium truncate max-w-[320px]">{String(v)}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Resource ID snippet */}
                {log.resourceId && (
                  <span className="shrink-0 text-[10px] text-slate-300 font-mono hidden sm:block bg-slate-50 px-2 py-1 rounded border border-slate-100">
                    ID: {log.resourceId.substring(0, 8)}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

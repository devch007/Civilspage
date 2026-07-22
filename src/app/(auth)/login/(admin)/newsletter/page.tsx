import { getSubscribers } from '@/services/newsletter.service';
import { format } from 'date-fns';
import { Mail, UserCheck, UserX } from 'lucide-react';

export default async function NewsletterPage() {
  const subscribers = await getSubscribers();
  const active = subscribers.filter(s => s.active);
  const inactive = subscribers.filter(s => !s.active);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Newsletter Subscribers</h1>
        <p className="text-slate-500 text-sm mt-1">
          <span className="text-emerald-600 font-semibold">{active.length} active</span>
          {' '}· {inactive.length} unsubscribed · {subscribers.length} total
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total', count: subscribers.length, icon: Mail, color: 'indigo' },
          { label: 'Active', count: active.length, icon: UserCheck, color: 'emerald' },
          { label: 'Unsubscribed', count: inactive.length, icon: UserX, color: 'slate' },
        ].map(({ label, count, icon: Icon }) => (
          <div key={label} className="bg-white border border-slate-100 rounded-xl p-5 flex items-center gap-4">
            <div className="p-2 bg-slate-50 rounded-lg">
              <Icon className="w-5 h-5 text-slate-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{count}</p>
              <p className="text-xs text-slate-500 font-medium">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800 text-sm">Subscriber List</h2>
          {/* Export CSV hint */}
          <span className="text-xs text-slate-400">Sorted by latest first</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-slate-600 text-xs">Email</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600 text-xs">Name</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600 text-xs">Status</th>
                <th className="text-left px-5 py-3 font-semibold text-slate-600 text-xs">Subscribed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {subscribers.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-slate-400">No subscribers yet.</td>
                </tr>
              )}
              {subscribers.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-800">{s.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">{s.name || '—'}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {s.active ? 'Active' : 'Unsubscribed'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-400 text-xs">
                    {format(new Date(s.createdAt), 'dd MMM yyyy')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

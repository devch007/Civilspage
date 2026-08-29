import Link from 'next/link';
import { Newspaper, FileText, HelpCircle, MessageSquare, Plus, ArrowRight, Gavel, Scale, FileCheck, Layers, Award, Sparkles, LayoutDashboard } from 'lucide-react';

// Hard 9-second timeout per query — prevents 504 on Vercel Hobby (10s limit)
function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve, reject) => setTimeout(() => reject(new Error('Query timeout after ' + ms + 'ms')), ms)),
  ]);
}

async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await withTimeout(fn(), 9000, fallback);
  } catch (e) {
    console.error('[dashboard] query failed:', e);
    return fallback;
  }
}

export default async function DashboardPage() {
  const { getAllCurrentAffairs } = await import('@/services/current-affairs.service');
  const { getAllBlogs } = await import('@/services/blog.service');
  const { getPyqs } = await import('@/services/pyq.service');

  const [affairs, blogs, pyqs] = await Promise.all([
    safeQuery(getAllCurrentAffairs, []),
    safeQuery(getAllBlogs, []),
    safeQuery(getPyqs, []),
  ]);

  const stats = [
    { label: 'Current News & Views', count: affairs.length, href: '/login/current-affairs', icon: Newspaper, color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
    { label: 'Blogs & Articles', count: blogs.length, href: '/login/blogs', icon: FileText, color: 'bg-amber-50 text-amber-700 border-amber-100' },
    { label: 'PYQ Database', count: pyqs.length, href: '/login/pyqs', icon: HelpCircle, color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  ];

  const quickCategories = [
    { title: 'Legislation', param: 'Legislation', icon: Gavel, desc: 'Acts, Parliamentary Bills & Enactments' },
    { title: 'Constitutional Amendments', param: 'Constitutional Amendments', icon: Layers, desc: 'Articles & Constitutional Changes' },
    { title: 'Court Judgements', param: 'Court Judgements', icon: Scale, desc: 'Supreme Court & High Court Rulings' },
    { title: 'Policies & Programs', param: 'Policies %26 Programs', icon: FileCheck, desc: 'Government Schemes & Initiatives' },
    { title: 'Commissions & Committees', param: 'Commissions %26 Committees', icon: Award, desc: 'ARC, Sarkaria & National Reports' },
    { title: 'Ethical Issues', param: 'Ethical Issues', icon: Sparkles, desc: 'GS-IV Applied Governance & Moral Issues' },
    { title: 'Ethical Case Studies', param: 'Ethical Case Studies', icon: Sparkles, desc: 'GS-IV Applied Case Study Diagnostics' },
  ];

  const recentAffairs = affairs.slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0b3b60] via-[#0f4a78] to-[#164e78] text-white p-6 sm:p-8 rounded-2xl shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider rounded font-mono">
              Admin Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">Educator Control Panel</h1>
          <p className="text-slate-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Upload news updates, publish structured notes, and manage content across CivilsPage header sections.
          </p>
        </div>
        <div>
          <Link
            href="/login/current-affairs"
            className="inline-flex items-center gap-2 px-5 py-3 bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl hover:bg-amber-300 shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            + New News & Views Entry
          </Link>
        </div>
      </div>

      {/* Primary Content Counters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map(({ label, count, href, icon: Icon, color }) => (
          <Link
            key={href}
            href={href}
            className="bg-white border border-slate-200/80 rounded-2xl p-6 hover:shadow-md hover:border-indigo-200 transition-all group relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl border ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-4xl font-extrabold text-slate-900 font-serif">{count}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-slate-800">{label}</p>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>

      {/* Main Upload Channels: Quick Upload by Category */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="font-bold text-slate-900 text-base font-serif flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-[#0b3b60]" />
              Quick Upload to Website Header Sections
            </h2>
            <p className="text-xs text-slate-500">
              Select a category to jump directly into the upload form with that category pre-selected.
            </p>
          </div>
          <Link
            href="/login/current-affairs"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 shrink-0"
          >
            Open All Entries <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {quickCategories.map(({ title, param, icon: Icon, desc }) => (
            <Link
              key={param}
              href={`/login/current-affairs?category=${param}`}
              className="group p-4 bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/70 hover:border-indigo-200 rounded-xl transition-all flex items-start gap-3.5"
            >
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg group-hover:border-indigo-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                <Icon className="w-5 h-5 text-[#0b3b60] group-hover:text-white transition-colors" />
              </div>
              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-900 truncate">
                    {title}
                  </h3>
                  <Plus className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="font-bold text-slate-900 text-sm font-serif">Recent News & Views Submissions</h2>
            <p className="text-xs text-slate-500">Latest entries published on your site.</p>
          </div>
          <Link
            href="/login/current-affairs"
            className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold rounded-lg transition-colors"
          >
            Manage All
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {recentAffairs.length === 0 ? (
            <p className="text-center py-8 text-xs text-slate-400">No entries published yet.</p>
          ) : (
            recentAffairs.map((a) => (
              <div key={a.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded border border-indigo-100">
                      {a.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{a.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{a.title}</p>
                </div>
                <Link
                  href="/login/current-affairs"
                  className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg transition-colors shrink-0"
                >
                  Edit
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

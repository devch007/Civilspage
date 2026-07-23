import { getUserProfile } from '@/lib/auth';
import Link from 'next/link';

// Force all /login/(admin)/* pages to be server-rendered at request time.
export const dynamic = 'force-dynamic';

// Safety timeout — prevents 504 if DB is slow
function withTimeout<T>(p: Promise<T>, ms: number, fallback: T) {
  return Promise.race([p, new Promise<T>((r) => setTimeout(() => r(fallback), ms))]);
}

import {
  BarChart3, Newspaper, FileSpreadsheet,
  HelpCircle, Users, Settings, Layout, BookOpen,
  LogOut, MessageSquare, Shield
} from 'lucide-react';

const navItems = [
  { href: '/login/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/login/current-affairs', label: 'Current Affairs', icon: Newspaper },
  { href: '/login/notes', label: 'Notes', icon: FileSpreadsheet },
  { href: '/login/subject-pages', label: 'Subject Pages', icon: BookOpen },
  { href: '/login/pyqs', label: 'PYQs', icon: HelpCircle },
  { href: '/login/comments', label: 'Comments', icon: MessageSquare },
  { href: '/login/users', label: 'Users', icon: Users },
  { href: '/login/audit-log', label: 'Audit Log', icon: Shield },
  { href: '/login/settings', label: 'Settings', icon: Settings },
];


export default async function AdminLayout({ children }: { children: React.ReactNode }) {

  // 4s timeout — never block the page if DB is slow
  const user = await withTimeout(getUserProfile(), 4000, null);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col fixed inset-y-0 left-0 z-40">
        <div className="p-5 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">C</span>
            </div>
            <span className="font-bold text-slate-900 text-sm">CivilsPage</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              prefetch={true}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-all group"
            >
              <Icon className="w-4 h-4 group-hover:text-indigo-600" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-1">
          <div className="px-3 py-2 text-xs text-slate-400 font-medium truncate">
            {user?.email || 'Educator'}
            <span className="ml-2 inline-flex px-1.5 py-0.5 text-[10px] bg-indigo-100 text-indigo-700 rounded font-bold uppercase">
              {user?.role?.replace('_', ' ')}
            </span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-50 transition-all"
          >
            <Layout className="w-4 h-4" />
            View Site
          </Link>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-all text-left"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

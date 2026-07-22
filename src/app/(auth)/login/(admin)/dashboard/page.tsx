import Link from 'next/link';
import { FileText, Newspaper, BookOpen, FileSpreadsheet, HelpCircle, Users } from 'lucide-react';

async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    console.error('[dashboard] query failed:', e);
    return fallback;
  }
}

export default async function DashboardPage() {
  const { getAllBlogs } = await import('@/services/blog.service');
  const { getAllCurrentAffairs } = await import('@/services/current-affairs.service');
  const { getCourses } = await import('@/services/course.service');
  const { getNotes } = await import('@/services/note.service');
  const { getPyqs } = await import('@/services/pyq.service');
  const { getAllUsers } = await import('@/services/user.service');

  const [blogs, affairs, courses, notes, pyqs, users] = await Promise.all([
    safeQuery(getAllBlogs, []),
    safeQuery(getAllCurrentAffairs, []),
    safeQuery(getCourses, []),
    safeQuery(getNotes, []),
    safeQuery(getPyqs, []),
    safeQuery(getAllUsers, []),
  ]);

  const stats = [
    { label: 'Blogs', count: blogs.length, href: '/login/blogs', icon: FileText },
    { label: 'Current Affairs', count: affairs.length, href: '/login/current-affairs', icon: Newspaper },
    { label: 'Courses', count: courses.length, href: '/login/courses', icon: BookOpen },
    { label: 'Notes', count: notes.length, href: '/login/notes', icon: FileSpreadsheet },
    { label: 'PYQs', count: pyqs.length, href: '/login/pyqs', icon: HelpCircle },
    { label: 'Users', count: users.length, href: '/login/users', icon: Users },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back. Here&apos;s your content overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map(({ label, count, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="bg-white border border-slate-100 rounded-xl p-6 hover:shadow-md hover:border-indigo-100 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                <Icon className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-3xl font-bold text-slate-900">{count}</span>
            </div>
            <p className="text-sm font-semibold text-slate-600">{label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white border border-slate-100 rounded-xl p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/login/blogs/new" className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            + New Blog Post
          </Link>
          <Link href="/login/current-affairs" className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-900 transition-colors">
            + Add Current Affair
          </Link>
          <Link href="/login/pyqs" className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
            + Add PYQ
          </Link>
          <Link href="/login/notes" className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors">
            + Upload Note
          </Link>
        </div>
      </div>
    </div>
  );
}

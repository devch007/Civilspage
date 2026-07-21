import { getAllBlogs } from '@/services/blog.service';
import { getAllCurrentAffairs } from '@/services/current-affairs.service';
import { getCourses } from '@/services/course.service';
import { getNotes } from '@/services/note.service';
import { getPyqs } from '@/services/pyq.service';
import { getAllUsers } from '@/services/user.service';
import Link from 'next/link';
import { FileText, Newspaper, BookOpen, FileSpreadsheet, HelpCircle, Users } from 'lucide-react';

export default async function DashboardPage() {
  const [blogs, affairs, courses, notes, pyqs, users] = await Promise.all([
    getAllBlogs(),
    getAllCurrentAffairs(),
    getCourses(),
    getNotes(),
    getPyqs(),
    getAllUsers(),
  ]);

  const stats = [
    { label: 'Blogs', count: blogs.length, href: '/admin/blogs', icon: FileText, color: 'indigo' },
    { label: 'Current Affairs', count: affairs.length, href: '/admin/current-affairs', icon: Newspaper, color: 'blue' },
    { label: 'Courses', count: courses.length, href: '/admin/courses', icon: BookOpen, color: 'emerald' },
    { label: 'Notes', count: notes.length, href: '/admin/notes', icon: FileSpreadsheet, color: 'amber' },
    { label: 'PYQs', count: pyqs.length, href: '/admin/pyqs', icon: HelpCircle, color: 'purple' },
    { label: 'Users', count: users.length, href: '/admin/users', icon: Users, color: 'rose' },
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
          <Link href="/admin/blogs/new" className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            + New Blog Post
          </Link>
          <Link href="/admin/current-affairs" className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-900 transition-colors">
            + Add Current Affair
          </Link>
          <Link href="/admin/pyqs" className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
            + Add PYQ
          </Link>
          <Link href="/admin/notes" className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors">
            + Upload Note
          </Link>
        </div>
      </div>
    </div>
  );
}

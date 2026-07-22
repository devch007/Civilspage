import { getAllBlogs } from '@/services/blog.service';
import { deleteBlogAction } from '@/actions/blog.actions';
import Link from 'next/link';
import { Plus, Trash2, Edit, Eye } from 'lucide-react';
import { format } from 'date-fns';

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blogs</h1>
          <p className="text-slate-500 text-sm mt-1">{blogs.length} total posts</p>
        </div>
        <Link
          href="/login/blogs/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Blog
        </Link>
      </div>

      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Title</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Status</th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600">Created</th>
              <th className="text-right px-5 py-3.5 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {blogs.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-12 text-slate-400">No blogs yet. Create your first one.</td>
              </tr>
            )}
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-900 truncate max-w-xs">{blog.title}</p>
                  <p className="text-slate-400 text-xs mt-0.5">/{blog.slug}</p>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${blog.published ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-500 text-xs">
                  {format(new Date(blog.createdAt), 'dd MMM yyyy')}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/login/blogs/${blog.id}/edit`} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <form action={async () => { 'use server'; await deleteBlogAction(blog.id); }}>
                      <button type="submit" className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

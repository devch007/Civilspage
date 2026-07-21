import { getCourses } from '@/services/course.service';
import { createCourseAction, deleteCourseAction } from '@/actions/course.actions';
import Link from 'next/link';
import { Plus, Trash2, BookOpen, ChevronRight } from 'lucide-react';

const LEVELS = ['beginner', 'intermediate', 'advanced'] as const;
const LEVEL_COLORS = { beginner: 'bg-emerald-50 text-emerald-700', intermediate: 'bg-amber-50 text-amber-700', advanced: 'bg-red-50 text-red-700' };

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Courses</h1>
        <p className="text-slate-500 text-sm mt-1">{courses.length} total courses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course list */}
        <div className="space-y-3">
          {courses.length === 0 && (
            <div className="bg-white border border-slate-100 rounded-xl p-10 text-center text-slate-400 text-sm">
              No courses yet. Create your first one →
            </div>
          )}
          {courses.map((c) => (
            <div key={c.id} className="bg-white border border-slate-100 rounded-xl p-5 hover:border-indigo-100 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900 truncate">{c.title}</h3>
                    <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[c.level as keyof typeof LEVEL_COLORS]}`}>
                      {c.level}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 line-clamp-2">{c.description || 'No description'}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-sm font-bold text-slate-900">₹{Number(c.price).toLocaleString()}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.published ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-600'}`}>
                      {c.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 shrink-0">
                  <Link
                    href={`/admin/courses/${c.id}`}
                    className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    Lessons <ChevronRight className="w-3 h-3" />
                  </Link>
                  <form action={async () => { 'use server'; await deleteCourseAction(c.id); }}>
                    <button type="submit" className="w-full flex items-center justify-center p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create form */}
        <div className="bg-white border border-slate-100 rounded-xl p-5">
          <h2 className="font-semibold text-slate-800 text-sm mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-500" /> Create New Course
          </h2>
          <form className="space-y-4" action={async (fd: FormData) => {
            'use server';
            await createCourseAction({
              title: fd.get('title') as string,
              description: fd.get('description') as string || undefined,
              thumbnail: fd.get('thumbnail') as string || undefined,
              price: Number(fd.get('price') || 0),
              level: fd.get('level') as 'beginner' | 'intermediate' | 'advanced',
              published: fd.get('published') === 'true',
            });
          }}>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Course Title *</label>
              <input name="title" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none" placeholder="e.g. UPSC Prelims Crash Course 2025" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
              <textarea name="description" rows={3} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none resize-none" placeholder="What students will learn..." />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Thumbnail URL (R2)</label>
              <input name="thumbnail" type="url" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none" placeholder="https://..." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Price (₹)</label>
                <input name="price" type="number" min="0" defaultValue="0" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Level</label>
                <select name="level" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:border-indigo-400 focus:outline-none">
                  {LEVELS.map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
                <input type="checkbox" name="published" value="true" className="accent-indigo-600" />
                Publish immediately
              </label>
              <button type="submit" className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                <Plus className="w-4 h-4" /> Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

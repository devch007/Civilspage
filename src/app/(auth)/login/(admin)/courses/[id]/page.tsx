import { getCourseById } from '@/services/course.service';
import { getLessons } from '@/services/lesson.service';
import { createLessonAction, deleteLessonAction } from '@/actions/lesson.actions';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, PlayCircle, FileText, GripVertical } from 'lucide-react';

export default async function CourseLessonsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [course, lessons] = await Promise.all([getCourseById(id), getLessons(id)]);
  if (!course) notFound();

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/login/courses" className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{course.title}</h1>
          <p className="text-slate-500 text-sm mt-0.5">{lessons.length} lessons · {course.level} · ₹{Number(course.price).toLocaleString()}</p>
        </div>
        <span className={`ml-auto text-xs px-2.5 py-1 rounded-full font-semibold ${course.published ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-600'}`}>
          {course.published ? 'Published' : 'Draft'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lessons list */}
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50">
            <h2 className="font-semibold text-slate-800 text-sm">Lesson Order</h2>
          </div>
          {lessons.length === 0 && (
            <p className="text-center py-10 text-slate-400 text-sm">No lessons yet. Add your first →</p>
          )}
          <div className="divide-y divide-slate-50">
            {lessons.map((l, i) => (
              <div key={l.id} className="px-5 py-4 flex items-start gap-3">
                <div className="flex items-center gap-2 shrink-0">
                  <GripVertical className="w-4 h-4 text-slate-200" />
                  <span className="w-6 h-6 flex items-center justify-center bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full">{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{l.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {l.videoUrl && (
                      <span className="flex items-center gap-1 text-xs text-blue-600">
                        <PlayCircle className="w-3 h-3" /> Video
                      </span>
                    )}
                    {l.pdfUrl && (
                      <span className="flex items-center gap-1 text-xs text-amber-600">
                        <FileText className="w-3 h-3" /> PDF
                      </span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${l.published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                      {l.published ? 'Live' : 'Hidden'}
                    </span>
                  </div>
                </div>
                <form action={async () => { 'use server'; await deleteLessonAction(l.id, id); }}>
                  <button type="submit" className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>

        {/* Add lesson form */}
        <div className="bg-white border border-slate-100 rounded-xl p-5">
          <h2 className="font-semibold text-slate-800 text-sm mb-4">Add Lesson</h2>
          <form className="space-y-4" action={async (fd: FormData) => {
            'use server';
            await createLessonAction({
              courseId: id,
              title: fd.get('title') as string,
              content: fd.get('content') as string || undefined,
              videoUrl: fd.get('videoUrl') as string || undefined,
              pdfUrl: fd.get('pdfUrl') as string || undefined,
              order: Number(fd.get('order') || lessons.length),
              published: fd.get('published') === 'true',
            });
          }}>
            <input type="hidden" name="courseId" value={id} />
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Lesson Title *</label>
              <input name="title" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none" placeholder="e.g. Introduction to Indian Polity" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Content / Notes</label>
              <textarea name="content" rows={4} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none resize-none" placeholder="Lesson content or notes..." />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Video URL</label>
              <input name="videoUrl" type="url" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none" placeholder="https://youtube.com/... or R2 URL" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">PDF URL (R2)</label>
              <input name="pdfUrl" type="url" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none" placeholder="https://..." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Order</label>
                <input name="order" type="number" min="0" defaultValue={lessons.length + 1} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none" />
              </div>
              <div className="flex items-end pb-2.5">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
                  <input type="checkbox" name="published" value="true" className="accent-indigo-600" />
                  Publish now
                </label>
              </div>
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
              <Plus className="w-4 h-4" /> Add Lesson
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

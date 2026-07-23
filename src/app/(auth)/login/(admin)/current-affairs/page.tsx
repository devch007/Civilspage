import { Plus, Trash2 } from 'lucide-react';
import { deleteCurrentAffairAction, createCurrentAffairAction } from '@/actions/current-affairs.actions';

async function safeGetAffairs() {
  try {
    const { getAllCurrentAffairs } = await import('@/services/current-affairs.service');
    return await Promise.race([
      getAllCurrentAffairs(),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000)),
    ]);
  } catch {
    return [];
  }
}

export default async function CurrentAffairsPage() {
  const affairs = await safeGetAffairs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Current Affairs</h1>
        <p className="text-slate-500 text-sm mt-1">{affairs.length} entries</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50">
            <h2 className="font-semibold text-slate-800 text-sm">Published Updates</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {affairs.length === 0 && (
              <p className="text-center py-10 text-slate-400 text-sm">No current affairs yet. Add one using the form →</p>
            )}
            {affairs.map((a) => (
              <div key={a.id} className="px-5 py-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{a.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">{a.date}</span>
                    <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">{a.category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.published ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {a.published ? 'Live' : 'Draft'}
                    </span>
                  </div>
                </div>
                <form action={async () => { 'use server'; await deleteCurrentAffairAction(a.id); }}>
                  <button type="submit" className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>

        {/* Create Form */}
        <div className="bg-white border border-slate-100 rounded-xl p-5">
          <h2 className="font-semibold text-slate-800 text-sm mb-4">Add New Update</h2>
          <form className="space-y-4" action={async (formData: FormData) => {
            'use server';
            await createCurrentAffairAction({
              title: formData.get('title') as string,
              content: formData.get('content') as string,
              date: formData.get('date') as string,
              category: formData.get('category') as string,
              featuredImage: formData.get('featuredImage') as string || undefined,
              pdfUrl: formData.get('pdfUrl') as string || undefined,
              published: formData.get('published') === 'true',
            });
          }}>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Title *</label>
              <input name="title" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none" placeholder="Today's key update..." />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Date *</label>
              <input name="date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
              <select name="category" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none bg-white">
                <option>General</option>
                <option>Polity</option>
                <option>Economy</option>
                <option>International</option>
                <option>Science &amp; Tech</option>
                <option>Environment</option>
                <option>Ethics</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Content</label>
              <textarea name="content" rows={4} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none resize-none" placeholder="Summary of the update..." />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Featured Image URL (optional)</label>
              <input name="featuredImage" type="url" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">PDF URL (optional)</label>
              <input name="pdfUrl" type="url" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none" placeholder="https://..." />
            </div>
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
                <input type="checkbox" name="published" value="true" className="accent-indigo-600" />
                Publish immediately (visible on site)
              </label>
              <button type="submit" className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                <Plus className="w-4 h-4" /> Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

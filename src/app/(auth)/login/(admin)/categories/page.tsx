import { getCategories, getTags } from '@/services/category-tag.service';
import { createCategoryAction, deleteCategoryAction, createTagAction, deleteTagAction } from '@/actions/category-tag.actions';
import { Plus, Trash2, Tag, Folder } from 'lucide-react';

export default async function CategoriesPage() {
  async function sq<T>(fn: () => Promise<T>, fb: T) {
    try { return await Promise.race([fn(), new Promise<T>((r) => setTimeout(() => r(fb), 5000))]); }
    catch { return fb; }
  }
  const [cats, tags] = await Promise.all([sq(getCategories, []), sq(getTags, [])]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Categories & Tags</h1>
        <p className="text-slate-500 text-sm mt-1">Organise your blog content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ── CATEGORIES ── */}
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
            <Folder className="w-4 h-4 text-indigo-500" />
            <h2 className="font-semibold text-slate-800 text-sm">Categories</h2>
            <span className="ml-auto text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{cats.length}</span>
          </div>

          {/* Add form */}
          <form className="px-5 py-4 border-b border-slate-50 flex gap-2" action={async (fd: FormData) => {
            'use server';
            const name = fd.get('name') as string;
            if (name?.trim()) await createCategoryAction(name.trim());
          }}>
            <input name="name" required placeholder="e.g. Indian Polity" className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none" />
            <button type="submit" className="flex items-center gap-1 px-3 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </form>

          {/* List */}
          <div className="divide-y divide-slate-50">
            {cats.length === 0 && <p className="text-center py-8 text-slate-400 text-sm">No categories yet.</p>}
            {cats.map((c) => (
              <div key={c.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-800">{c.name}</p>
                  <p className="text-xs text-slate-400 font-mono">/{c.slug}</p>
                </div>
                <form action={async () => { 'use server'; await deleteCategoryAction(c.id); }}>
                  <button type="submit" className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>

        {/* ── TAGS ── */}
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
            <Tag className="w-4 h-4 text-purple-500" />
            <h2 className="font-semibold text-slate-800 text-sm">Tags</h2>
            <span className="ml-auto text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">{tags.length}</span>
          </div>

          {/* Add form */}
          <form className="px-5 py-4 border-b border-slate-50 flex gap-2" action={async (fd: FormData) => {
            'use server';
            const name = fd.get('name') as string;
            if (name?.trim()) await createTagAction(name.trim());
          }}>
            <input name="name" required placeholder="e.g. UPSC 2025" className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none" />
            <button type="submit" className="flex items-center gap-1 px-3 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </form>

          {/* List — tag chips */}
          <div className="px-5 py-4 flex flex-wrap gap-2">
            {tags.length === 0 && <p className="text-slate-400 text-sm">No tags yet.</p>}
            {tags.map((t) => (
              <div key={t.id} className="flex items-center gap-1.5 pl-3 pr-1.5 py-1 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                #{t.name}
                <form action={async () => { 'use server'; await deleteTagAction(t.id); }} className="inline">
                  <button type="submit" className="w-4 h-4 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

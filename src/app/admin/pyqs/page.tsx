import { getPyqs } from '@/services/pyq.service';
import { createPyqAction, deletePyqAction } from '@/actions/pyq.actions';
import { Plus, Trash2 } from 'lucide-react';

export default async function PyqsPage() {
  const pyqs = await getPyqs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">PYQs</h1>
        <p className="text-slate-500 text-sm mt-1">{pyqs.length} questions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50">
            <h2 className="font-semibold text-slate-800 text-sm">Question Directory</h2>
          </div>
          <div className="divide-y divide-slate-50 max-h-[600px] overflow-y-auto">
            {pyqs.length === 0 && <p className="text-center py-10 text-slate-400 text-sm">No PYQs yet.</p>}
            {pyqs.map((p) => (
              <div key={p.id} className="px-5 py-4 flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 line-clamp-2">{p.question}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full font-medium">{p.subject}</span>
                    <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">{p.year}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.difficulty === 'hard' ? 'bg-red-50 text-red-700' : p.difficulty === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                      {p.difficulty}
                    </span>
                  </div>
                </div>
                <form action={async () => { 'use server'; await deletePyqAction(p.id); }}>
                  <button type="submit" className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>

        {/* Create Form */}
        <div className="bg-white border border-slate-100 rounded-xl p-5">
          <h2 className="font-semibold text-slate-800 text-sm mb-4">Add PYQ</h2>
          <form className="space-y-3" action={async (fd: FormData) => {
            'use server';
            await createPyqAction({
              question: fd.get('question') as string,
              optionA: fd.get('optionA') as string,
              optionB: fd.get('optionB') as string,
              optionC: fd.get('optionC') as string,
              optionD: fd.get('optionD') as string,
              correctAnswer: fd.get('correctAnswer') as 'a' | 'b' | 'c' | 'd',
              explanation: fd.get('explanation') as string || undefined,
              year: Number(fd.get('year')),
              subject: fd.get('subject') as string,
              difficulty: fd.get('difficulty') as 'easy' | 'medium' | 'hard',
            });
          }}>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Question *</label>
              <textarea name="question" required rows={3} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none resize-none" />
            </div>
            {(['A', 'B', 'C', 'D'] as const).map((opt) => (
              <div key={opt}>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Option {opt} *</label>
                <input name={`option${opt}`} required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none" />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Correct Answer *</label>
                <select name="correctAnswer" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:border-indigo-400 focus:outline-none">
                  <option value="a">A</option>
                  <option value="b">B</option>
                  <option value="c">C</option>
                  <option value="d">D</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Difficulty</label>
                <select name="difficulty" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:border-indigo-400 focus:outline-none">
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Year *</label>
                <input name="year" type="number" required defaultValue={2024} min={1990} max={2025} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Subject *</label>
                <select name="subject" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:border-indigo-400 focus:outline-none">
                  <option>Indian Polity</option>
                  <option>Indian Economy</option>
                  <option>History & Culture</option>
                  <option>Geography</option>
                  <option>Environment & Ecology</option>
                  <option>Science & Technology</option>
                  <option>Ethics</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Explanation</label>
              <textarea name="explanation" rows={2} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none resize-none" />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
              <Plus className="w-4 h-4" /> Add PYQ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

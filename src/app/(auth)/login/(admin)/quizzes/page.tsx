import { getQuizzes } from '@/services/quiz.service';
import { createQuizAction, deleteQuizAction, toggleQuizAction } from '@/actions/quiz.actions';
import { Plus, Trash2, ToggleLeft, ToggleRight, GraduationCap } from 'lucide-react';

const SUBJECTS = [
  'General Studies',
  'Indian Polity',
  'Indian Economy',
  'History & Culture',
  'Geography',
  'Environment & Ecology',
  'Science & Technology',
  'Ethics',
  'CSAT',
  'Essay',
  'Optional Subject'
];

const EXAM_TYPES = ['Preliminary Examination', 'Main Examination'];

export default async function QuizzesPage() {
  async function safeQuery<T>(fn: () => Promise<T>, fb: T): Promise<T> {
    try {
      return await Promise.race([
        fn(),
        new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Query timeout after 9s')), 9000))
      ]);
    } catch (err) {
      console.error('[safeQuery error in /login/quizzes]:', err);
      return fb;
    }
  }
  const quizzes = await safeQuery(getQuizzes, []);
  const active = quizzes.filter(q => q.active).length;
  const prelimsCount = quizzes.filter(q => (q.examType || 'Preliminary Examination') === 'Preliminary Examination').length;
  const mainsCount = quizzes.filter(q => (q.examType || '').includes('Main')).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mock Quiz &amp; Practice Questions</h1>
        <p className="text-slate-500 text-sm mt-1">{quizzes.length} total ({prelimsCount} Prelims, {mainsCount} Mains) · {active} active on landing &amp; mock test page</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Questions list */}
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
            <h2 className="font-semibold text-slate-800 text-sm">All Questions ({quizzes.length})</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-bold">{active} active</span>
            </div>
          </div>
          <div className="divide-y divide-slate-50 max-h-[640px] overflow-y-auto flex-1">
            {quizzes.length === 0 && <p className="text-center py-10 text-slate-400 text-sm">No questions yet.</p>}
            {quizzes.map((q) => {
              const isMains = (q.examType || '').includes('Main');
              return (
                <div key={q.id} className="px-5 py-4 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 line-clamp-2">{q.question}</p>
                      
                      <div className="flex items-center gap-1.5 flex-wrap mt-2">
                        {/* Exam Category Badge */}
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          isMains ? 'bg-purple-100 text-purple-800 border border-purple-200' : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                          {q.examType || 'Preliminary Examination'}
                        </span>

                        <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full font-medium">{q.subject}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${q.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                          {q.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      {/* Options preview */}
                      <div className="mt-2.5 space-y-0.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        {[q.optionA, q.optionB, q.optionC, q.optionD].map((opt, i) => (
                          <p key={i} className={`text-xs ${i === q.correctAnswer ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                            {String.fromCharCode(65 + i)}. {opt} {i === q.correctAnswer && '✓'}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 shrink-0">
                      <form action={async () => { 'use server'; await toggleQuizAction(q.id, !q.active); }}>
                        <button type="submit" title={q.active ? 'Deactivate' : 'Activate'} className={`p-1.5 rounded-lg transition-all ${q.active ? 'text-emerald-600 hover:bg-emerald-50' : 'text-slate-300 hover:bg-slate-50'}`}>
                          {q.active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                        </button>
                      </form>
                      <form action={async () => { 'use server'; await deleteQuizAction(q.id); }}>
                        <button type="submit" className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Create Form */}
        <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-xs">
          <h2 className="font-semibold text-slate-800 text-sm mb-4">Add Quiz / Mock Question</h2>
          <form className="space-y-3.5" action={async (fd: FormData) => {
            'use server';
            await createQuizAction({
              subject: fd.get('subject') as string,
              examType: (fd.get('examType') as string) || 'Preliminary Examination',
              question: fd.get('question') as string,
              optionA: fd.get('optionA') as string,
              optionB: fd.get('optionB') as string,
              optionC: fd.get('optionC') as string,
              optionD: fd.get('optionD') as string,
              correctAnswer: Number(fd.get('correctAnswer')),
              explanation: fd.get('explanation') as string || undefined,
              active: fd.get('active') === 'true',
            });
          }}>
            {/* Exam Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Exam Category *</label>
              <select name="examType" required defaultValue="Preliminary Examination" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:border-indigo-400 focus:outline-none">
                {EXAM_TYPES.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Subject *</label>
              <select name="subject" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:border-indigo-400 focus:outline-none">
                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Question Statement / Prompt *</label>
              <textarea name="question" required rows={3} placeholder="Enter the full question statement..." className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none resize-none" />
            </div>

            {[0, 1, 2, 3].map(i => (
              <div key={i}>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Option {String.fromCharCode(65 + i)} *</label>
                <input name={`option${String.fromCharCode(65 + i)}`} required placeholder={`Text for option ${String.fromCharCode(65 + i)}`} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none" />
              </div>
            ))}

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Correct Answer *</label>
              <select name="correctAnswer" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:border-indigo-400 focus:outline-none">
                <option value="0">Option A</option>
                <option value="1">Option B</option>
                <option value="2">Option C</option>
                <option value="3">Option D</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Detailed Explanation</label>
              <textarea name="explanation" rows={2} placeholder="Explain why the answer is correct..." className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none resize-none" />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
                <input type="checkbox" name="active" value="true" defaultChecked className="accent-indigo-600" />
                Show on public mock test page
              </label>
              <button type="submit" className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                <Plus className="w-4 h-4" /> Add Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

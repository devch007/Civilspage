import { getNotes } from '@/services/note.service';
import { uploadMetadataAction, deleteNoteAction } from '@/actions/note.actions';
import { Plus, Trash2, FileText, Download } from 'lucide-react';

const SUBJECTS = ['Indian Polity', 'Indian Economy', 'History', 'Geography', 'Environment', 'Science & Technology', 'Ethics', 'General Studies', 'Essay'];
const CATEGORIES = ['UPSC Prelims', 'UPSC Mains', 'State PSC', 'CSAT', 'Optional Subject', 'Test Series'];

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Study Notes</h1>
        <p className="text-slate-500 text-sm mt-1">{notes.length} notes uploaded (all PDFs served from Cloudflare R2)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notes grid */}
        <div className="space-y-3">
          {notes.length === 0 && (
            <div className="bg-white border border-slate-100 rounded-xl p-10 text-center text-slate-400 text-sm">
              No notes yet. Upload your first PDF metadata →
            </div>
          )}
          {notes.map((n) => (
            <div key={n.id} className="bg-white border border-slate-100 rounded-xl p-4 hover:border-indigo-100 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-50 rounded-lg shrink-0">
                  <FileText className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm truncate">{n.title}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full">{n.subject}</span>
                    <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">{n.category}</span>
                  </div>
                  <a href={n.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1.5">
                    <Download className="w-3 h-3" /> View PDF
                  </a>
                </div>
                <form action={async () => { 'use server'; await deleteNoteAction(n.id); }}>
                  <button type="submit" className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

        {/* Upload form */}
        <div className="bg-white border border-slate-100 rounded-xl p-5">
          <h2 className="font-semibold text-slate-800 text-sm mb-1">Upload Note Metadata</h2>
          <p className="text-xs text-slate-400 mb-4">Upload the PDF to Cloudflare R2 first, then paste the URL here.</p>
          <form className="space-y-4" action={async (fd: FormData) => {
            'use server';
            await uploadMetadataAction({
              title: fd.get('title') as string,
              pdfUrl: fd.get('pdfUrl') as string,
              thumbnail: fd.get('thumbnail') as string || undefined,
              subject: fd.get('subject') as string,
              category: fd.get('category') as string,
            });
          }}>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Note Title *</label>
              <input name="title" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none" placeholder="e.g. Indian Polity Complete Notes" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">PDF URL (R2) *</label>
              <input name="pdfUrl" type="url" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none" placeholder="https://your-r2.cloudflare.com/notes.pdf" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Thumbnail URL (R2)</label>
              <input name="thumbnail" type="url" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none" placeholder="https://... (optional preview image)" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Subject *</label>
                <select name="subject" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:border-indigo-400 focus:outline-none">
                  {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Category *</label>
                <select name="category" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:border-indigo-400 focus:outline-none">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-600 transition-colors">
              <Plus className="w-4 h-4" /> Add Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

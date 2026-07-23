import { getNotes } from '@/services/note.service';
import { deleteNoteAction } from '@/actions/note.actions';
import NoteUploadForm from './_NoteUploadForm';
import { Trash2, FileText, Download } from 'lucide-react';

export default async function NotesPage() {
  async function safeQuery<T>(fn: () => Promise<T>, fb: T): Promise<T> {
    try { return await Promise.race([fn(), new Promise<T>((r) => setTimeout(() => r(fb), 5000))]); }
    catch { return fb; }
  }
  const notes = await safeQuery(getNotes, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Study Notes</h1>
        <p className="text-slate-500 text-sm mt-1">{notes.length} notes · all PDFs served via Cloudflare R2</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-3">
          {notes.length === 0 && (
            <div className="bg-white border border-slate-100 rounded-xl p-10 text-center text-slate-400 text-sm">
              No notes yet. Upload your first PDF →
            </div>
          )}
          {notes.map((n) => (
            <div key={n.id} className="bg-white border border-slate-100 rounded-xl p-4 hover:border-indigo-100 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-50 rounded-lg shrink-0">
                  <FileText className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm">{n.title}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full">{n.subject}</span>
                    <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">{n.category}</span>
                  </div>
                  <a href={n.pdfUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1.5">
                    <Download className="w-3 h-3" /> View PDF
                  </a>
                </div>
                <form action={async () => { 'use server'; await deleteNoteAction(n.id); }}>
                  <button type="submit" className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

        {/* Client form with R2Upload */}
        <NoteUploadForm />
      </div>
    </div>
  );
}

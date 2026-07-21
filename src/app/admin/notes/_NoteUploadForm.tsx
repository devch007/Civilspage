'use client';

import { useState } from 'react';
import { uploadMetadataAction } from '@/actions/note.actions';
import R2Upload from '@/components/admin/R2Upload';
import { Plus, Loader2 } from 'lucide-react';

const SUBJECTS = ['Indian Polity', 'Indian Economy', 'History', 'Geography', 'Environment', 'Science & Technology', 'Ethics', 'General Studies', 'Essay'];
const CATEGORIES = ['UPSC Prelims', 'UPSC Mains', 'State PSC', 'CSAT', 'Optional Subject', 'Test Series'];

export default function NoteUploadForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    pdfUrl: '',
    thumbnail: '',
    subject: SUBJECTS[0],
    category: CATEGORIES[0],
  });

  const set = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.pdfUrl) { setError('Please upload a PDF first'); return; }
    setLoading(true);
    setError('');
    const result = await uploadMetadataAction(form);
    if ('error' in result && result.error) {
      setError(JSON.stringify(result.error));
    } else {
      setSuccess(true);
      setForm({ title: '', pdfUrl: '', thumbnail: '', subject: SUBJECTS[0], category: CATEGORIES[0] });
      setTimeout(() => setSuccess(false), 2500);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-xl p-5">
      <h2 className="font-semibold text-slate-800 text-sm mb-1">Upload Note</h2>
      <p className="text-xs text-slate-400 mb-4">Upload PDF to R2 below — the URL is saved automatically.</p>

      {success && <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl font-medium">✓ Note added successfully!</div>}
      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">{error}</div>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Note Title *</label>
          <input required value={form.title} onChange={(e) => set('title', e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none"
            placeholder="e.g. Indian Polity Complete Notes" />
        </div>

        <R2Upload
          label="PDF File *"
          value={form.pdfUrl}
          onChange={(url) => set('pdfUrl', url)}
          folder="notes"
          accept="pdf"
          previewImage={false}
        />

        <R2Upload
          label="Thumbnail (optional)"
          value={form.thumbnail}
          onChange={(url) => set('thumbnail', url)}
          folder="notes"
          accept="image"
          previewImage
        />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Subject *</label>
            <select value={form.subject} onChange={(e) => set('subject', e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:border-indigo-400 focus:outline-none">
              {SUBJECTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Category *</label>
            <select value={form.category} onChange={(e) => set('category', e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:border-indigo-400 focus:outline-none">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <button type="submit" disabled={loading || !form.pdfUrl}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-600 disabled:opacity-50 transition-colors">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          {loading ? 'Saving...' : 'Add Note'}
        </button>
      </form>
    </div>
  );
}

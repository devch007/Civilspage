'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Loader2, CheckCircle, X, FileText, Tag } from 'lucide-react';

interface PyqPdf {
  id: string;
  title: string;
  tags: string[];
  pdf_url: string;
  subject?: string;
  year?: number;
  created_at: string;
}

const SUBJECTS = ['Indian Polity', 'Indian Economy', 'History', 'Geography', 'Environment', 'Science & Technology', 'Ethics', 'General Studies', 'CSAT'];

// ─── PDF Upload Widget ──────────────────────────────────────────────────────
function PdfUpload({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [state, setState] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
  const [fileName, setFileName] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setState('uploading'); setErrMsg(''); setProgress(10);
    const interval = setInterval(() => setProgress(p => Math.min(p + 12, 85)), 300);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'pyqs');
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      clearInterval(interval); setProgress(100);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setFileName(file.name);
      onUploaded(data.url);
      setState('done');
    } catch (e: any) {
      clearInterval(interval);
      setErrMsg(e.message); setState('error');
    }
  }

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">PDF File * (→ Cloudflare R2)</label>
      <div
        className={`border-2 border-dashed rounded-xl cursor-pointer transition-all
          ${state === 'done' ? 'border-emerald-400 bg-emerald-50/30' :
            state === 'error' ? 'border-red-400 bg-red-50/20' :
            state === 'uploading' ? 'border-indigo-300 bg-indigo-50/20 cursor-wait' :
            'border-slate-200 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/20'}`}
        onClick={() => state !== 'uploading' && ref.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) upload(f); }}
      >
        <input ref={ref} type="file" accept="application/pdf" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); }} />

        {state === 'uploading' ? (
          <div className="flex flex-col items-center gap-2 p-5">
            <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
            <div className="w-full max-w-[180px] bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs text-indigo-600 font-medium">Uploading to R2...</span>
          </div>
        ) : state === 'done' ? (
          <div className="flex items-center gap-3 p-4">
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-emerald-700">Uploaded to R2 ✓</p>
              <p className="text-[10px] text-slate-400 truncate">{fileName}</p>
            </div>
            <button type="button" onClick={e => { e.stopPropagation(); setState('idle'); setFileName(''); onUploaded(''); }}>
              <X className="w-4 h-4 text-slate-400 hover:text-red-500" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 p-6">
            <FileText className="w-8 h-8 text-slate-300" />
            <p className="text-sm text-slate-500">
              <span className="text-indigo-600 font-semibold">Click to upload</span> or drag & drop
            </p>
            <p className="text-xs text-slate-400">PDF only · max 50 MB</p>
          </div>
        )}
      </div>
      {state === 'error' && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><X className="w-3 h-3" />{errMsg}</p>}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function PYQsPage() {
  const [pdfs, setPdfs] = useState<PyqPdf[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [tick, setTick] = useState(0);

  // Form state
  const [title, setTitle] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [subject, setSubject] = useState('General Studies');
  const [year, setYear] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    setLoading(true);
    fetch('/api/content/pyq-pdfs')
      .then(r => r.json())
      .then(d => setPdfs(Array.isArray(d) ? d : []))
      .catch(() => setPdfs([]))
      .finally(() => setLoading(false));
  }, [tick]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!pdfUrl) return alert('Please upload a PDF first');
    setSubmitting(true);
    try {
      const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
      const res = await fetch('/api/content/pyq-pdfs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, tags, pdfUrl, subject, year }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setTitle(''); setTagsInput(''); setPdfUrl(''); setYear(new Date().getFullYear().toString());
      setTick(t => t + 1);
    } catch (e: any) { alert(e.message); }
    finally { setSubmitting(false); }
  }

  async function del(id: string) {
    if (!confirm('Delete this PYQ PDF?')) return;
    await fetch(`/api/content/pyq-pdfs/${id}`, { method: 'DELETE' });
    setTick(t => t + 1);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">PYQs</h1>
        <p className="text-slate-500 text-sm mt-1">{loading ? '...' : `${pdfs.length} PDF${pdfs.length !== 1 ? 's' : ''} uploaded`} · all served via Cloudflare R2</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── List ─────────────────────────────────── */}
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50">
            <h2 className="font-semibold text-slate-800 text-sm">Uploaded PYQ PDFs</h2>
          </div>
          <div className="divide-y divide-slate-50 max-h-[580px] overflow-y-auto">
            {loading && <p className="text-center py-10 text-slate-400 text-sm">Loading...</p>}
            {!loading && pdfs.length === 0 && (
              <div className="text-center py-14">
                <FileText className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                <p className="text-slate-400 text-sm font-medium">No PYQ PDFs yet.</p>
                <p className="text-slate-300 text-xs mt-1">Upload your first PDF →</p>
              </div>
            )}
            {pdfs.map(p => (
              <div key={p.id} className="px-5 py-4 flex items-start gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg flex-shrink-0">
                  <FileText className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{p.title}</p>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                    {p.subject && (
                      <span className="text-[10px] px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full font-medium">{p.subject}</span>
                    )}
                    {p.year && (
                      <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">{p.year}</span>
                    )}
                    {p.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full flex items-center gap-0.5">
                        <Tag className="w-2.5 h-2.5" />{tag}
                      </span>
                    ))}
                  </div>
                  <a href={p.pdf_url} target="_blank" rel="noreferrer"
                    className="text-[10px] text-indigo-500 hover:underline mt-1 block">
                    📄 View PDF
                  </a>
                </div>
                <button onClick={() => del(p.id)}
                  className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg flex-shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Upload Form ───────────────────────────── */}
        <div className="bg-white border border-slate-100 rounded-xl p-5">
          <h2 className="font-semibold text-slate-800 text-sm mb-4">Upload PYQ PDF</h2>
          <form className="space-y-4" onSubmit={submit}>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Title / Heading *</label>
              <input
                value={title} onChange={e => setTitle(e.target.value)} required
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none"
                placeholder="e.g. UPSC Prelims 2024 GS Paper 1"
              />
            </div>

            <PdfUpload onUploaded={setPdfUrl} />

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Tags <span className="text-slate-400 font-normal">(comma separated)</span>
              </label>
              <input
                value={tagsInput} onChange={e => setTagsInput(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none"
                placeholder="e.g. Prelims, GS Paper 1, 2024"
              />
              {tagsInput && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {tagsInput.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full flex items-center gap-0.5 font-medium">
                      <Tag className="w-2.5 h-2.5" />{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Subject</label>
                <select value={subject} onChange={e => setSubject(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:border-indigo-400 focus:outline-none">
                  {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Year</label>
                <input
                  type="number" value={year} onChange={e => setYear(e.target.value)}
                  min="2000" max="2030"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit" disabled={submitting || !pdfUrl}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {submitting ? 'Uploading...' : 'Add PYQ PDF'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

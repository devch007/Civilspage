'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Loader2, CheckCircle, X, FileText, Tag, Pencil, Scale, ShieldCheck } from 'lucide-react';

interface ModelAnswerPdf {
  id: string;
  title: string;
  tags: string[];
  pdf_url: string;
  subject: string;
  year?: number;
  created_at: string;
}

const SUBJECT_TABS = ['Polity & Governance', 'Ethics'];

// ─── PDF Upload Widget (Cloudflare R2) ───────────────────────────────────────
function PdfUpload({ onUploaded, currentUrl }: { onUploaded: (url: string) => void; currentUrl?: string }) {
  const [state, setState] = useState<'idle' | 'uploading' | 'done' | 'error'>(currentUrl ? 'done' : 'idle');
  const [fileName, setFileName] = useState(currentUrl ? currentUrl.split('/').pop() || '' : '');
  const [errMsg, setErrMsg] = useState('');
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentUrl) {
      setState('done');
      setFileName(currentUrl.split('/').pop() || '');
    } else {
      setState('idle');
      setFileName('');
    }
  }, [currentUrl]);

  async function upload(file: File) {
    setState('uploading'); setErrMsg(''); setProgress(10);
    const interval = setInterval(() => setProgress(p => Math.min(p + 12, 85)), 300);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'model-answers');
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

// ─── Main Admin Page ────────────────────────────────────────────────────────
export default function ModelAnswersAdminPage() {
  const [pdfs, setPdfs] = useState<ModelAnswerPdf[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [tick, setTick] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterSubject, setFilterSubject] = useState<'All' | 'Polity & Governance' | 'Ethics'>('All');

  // Form state
  const [title, setTitle] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [subject, setSubject] = useState('Polity & Governance');
  const [year, setYear] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    setLoading(true);
    fetch('/api/content/model-answers')
      .then(r => r.json())
      .then(d => setPdfs(Array.isArray(d) ? d : []))
      .catch(() => setPdfs([]))
      .finally(() => setLoading(false));
  }, [tick]);

  function resetForm() {
    setTitle('');
    setTagsInput('');
    setPdfUrl('');
    setSubject('Polity & Governance');
    setYear(new Date().getFullYear().toString());
    setEditingId(null);
  }

  function handleEdit(p: ModelAnswerPdf) {
    setEditingId(p.id);
    setTitle(p.title);
    setTagsInput(p.tags ? p.tags.join(', ') : '');
    setPdfUrl(p.pdf_url);
    setSubject(p.subject || 'Polity & Governance');
    setYear(p.year ? p.year.toString() : new Date().getFullYear().toString());
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!pdfUrl) return alert('Please upload a PDF first');
    setSubmitting(true);
    try {
      const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
      const url = editingId ? `/api/content/model-answers/${editingId}` : '/api/content/model-answers';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, tags, pdfUrl, year, subject }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      resetForm();
      setTick(t => t + 1);
    } catch (e: any) { alert(e.message); }
    finally { setSubmitting(false); }
  }

  async function del(id: string) {
    if (!confirm('Delete this Model Answer PDF?')) return;
    await fetch(`/api/content/model-answers/${id}`, { method: 'DELETE' });
    if (editingId === id) resetForm();
    setTick(t => t + 1);
  }

  const filteredPdfs = pdfs.filter(p => {
    if (filterSubject === 'All') return true;
    return (p.subject || 'Polity & Governance') === filterSubject;
  });

  const polityCount = pdfs.filter(p => (p.subject || '').includes('Polity')).length;
  const ethicsCount = pdfs.filter(p => (p.subject || '').includes('Ethics')).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Model Answers Database</h1>
        <p className="text-slate-500 text-sm mt-1">{loading ? '...' : `${pdfs.length} PDF${pdfs.length !== 1 ? 's' : ''} uploaded`} · Categorized by Polity &amp; Governance and Ethics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── List ─────────────────────────────────── */}
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs flex flex-col">
          <div className="px-5 py-3.5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-semibold text-slate-800 text-sm">Uploaded Model Answers</h2>
            {/* Filter Pills */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
              {(['All', 'Polity & Governance', 'Ethics'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilterSubject(tab)}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    filterSubject === tab
                      ? 'bg-white text-indigo-700 shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab === 'Polity & Governance' ? `Polity (${polityCount})` : tab === 'Ethics' ? `Ethics (${ethicsCount})` : `All (${pdfs.length})`}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-50 max-h-[620px] overflow-y-auto flex-1">
            {loading && <p className="text-center py-10 text-slate-400 text-sm">Loading...</p>}
            {!loading && filteredPdfs.length === 0 && (
              <div className="text-center py-14">
                <FileText className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                <p className="text-slate-400 text-sm font-medium">No Model Answer PDFs found for this subject.</p>
                <p className="text-slate-300 text-xs mt-1">Upload your PDF on the right →</p>
              </div>
            )}
            {filteredPdfs.map(p => {
              const isEthics = (p.subject || '').includes('Ethics');
              return (
                <div key={p.id} className="px-5 py-4 flex items-start gap-3 hover:bg-slate-50/50 transition-colors">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${isEthics ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-slate-900 truncate">{p.title}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                      {/* Subject Badge */}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        isEthics ? 'bg-purple-100 text-purple-800 border border-purple-200' : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {p.subject || 'Polity & Governance'}
                      </span>

                      {p.year && (
                        <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">{p.year}</span>
                      )}
                      {p.tags && p.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full flex items-center gap-0.5">
                          <Tag className="w-2.5 h-2.5" />{tag}
                        </span>
                      ))}
                    </div>
                    <a href={p.pdf_url} target="_blank" rel="noreferrer"
                      className="text-[11px] text-indigo-600 hover:underline mt-1.5 inline-block font-medium">
                      📄 View PDF File
                    </a>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => handleEdit(p)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => del(p.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Upload / Edit Form ───────────────────────────── */}
        <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800 text-sm">
              {editingId ? 'Edit Model Answer PDF' : 'Upload Model Answer PDF'}
            </h2>
            {editingId && (
              <button onClick={resetForm} className="text-xs text-slate-400 hover:text-slate-600">
                Cancel Edit
              </button>
            )}
          </div>
          <form className="space-y-4" onSubmit={submit}>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Title / Heading *</label>
              <input
                value={title} onChange={e => setTitle(e.target.value)} required
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none"
                placeholder="e.g. Model Answer: Separation of Powers in Constitution or Ethics Case Study Solution"
              />
            </div>

            {/* Subject Tabs Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Subject Category *</label>
              <div className="grid grid-cols-2 gap-2">
                {SUBJECT_TABS.map(tab => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setSubject(tab)}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      subject === tab
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-2xs'
                        : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {tab === 'Ethics' ? <ShieldCheck className="w-3.5 h-3.5" /> : <Scale className="w-3.5 h-3.5" />}
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <PdfUpload onUploaded={setPdfUrl} currentUrl={pdfUrl} />

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Tags <span className="text-slate-400 font-normal">(comma separated)</span>
              </label>
              <input
                value={tagsInput} onChange={e => setTagsInput(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none"
                placeholder="e.g. GS Paper 2, GS Paper 4, Case Studies, Judiciary"
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

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Year</label>
              <input
                type="number" value={year} onChange={e => setYear(e.target.value)}
                min="2000" max="2030"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none"
              />
            </div>

            <button
              type="submit" disabled={submitting || !pdfUrl}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />)}
              {submitting ? (editingId ? 'Updating...' : 'Uploading...') : (editingId ? 'Update Model Answer PDF' : 'Add Model Answer PDF')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

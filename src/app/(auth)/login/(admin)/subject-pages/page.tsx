'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Loader2, CheckCircle, X, Image, FileText } from 'lucide-react';

const SUBJECTS = [
  { value: 'polity', label: 'Polity & Governance' },
  { value: 'ethics', label: 'Ethics & Integrity' },
];

interface SubjectPost {
  id: string;
  subject: string;
  title: string;
  content?: string;
  image_url?: string;
  pdf_url?: string;
  published: boolean;
  created_at: string;
}

// ─── File Upload Widget ─────────────────────────────────────────────────────
function FileUpload({
  label, accept, folder, onUploaded,
}: {
  label: string; accept: string; folder: string;
  onUploaded: (url: string) => void;
}) {
  const [state, setState] = useState<'idle'|'uploading'|'done'|'error'>('idle');
  const [preview, setPreview] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setState('uploading'); setErrMsg('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', folder);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setPreview(data.url);
      onUploaded(data.url);
      setState('done');
    } catch (e: any) { setErrMsg(e.message); setState('error'); }
  }

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
      <div
        className={`border-2 border-dashed rounded-xl p-3 cursor-pointer transition-all hover:border-indigo-400 hover:bg-indigo-50/20 ${
          state === 'done' ? 'border-emerald-400 bg-emerald-50/20' :
          state === 'error' ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-slate-50'
        }`}
        onClick={() => ref.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) upload(f); }}
      >
        <input ref={ref} type="file" accept={accept} className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); }} />
        {state === 'uploading' ? (
          <div className="flex items-center gap-2 justify-center py-1">
            <Loader2 className="w-4 h-4 text-indigo-500 animate-spin"/>
            <span className="text-xs text-slate-500">Uploading to Cloudflare R2...</span>
          </div>
        ) : state === 'done' ? (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0"/>
            <span className="text-xs text-emerald-700 font-semibold truncate flex-1">Uploaded ✓</span>
            <button type="button" onClick={e => { e.stopPropagation(); setPreview(''); onUploaded(''); setState('idle'); }}>
              <X className="w-4 h-4 text-slate-400 hover:text-red-500"/>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 justify-center py-1">
            {accept.includes('image') ? <Image className="w-4 h-4 text-slate-400"/> : <FileText className="w-4 h-4 text-slate-400"/>}
            <span className="text-xs text-slate-400">Click or drop • {accept.includes('image') ? 'JPG/PNG/WebP' : 'PDF'} • max 50MB</span>
          </div>
        )}
      </div>
      {state === 'error' && <p className="text-xs text-red-500 mt-1">{errMsg}</p>}
      {preview && state === 'done' && (
        <div className="mt-2">
          {accept.includes('image')
            ? <img src={preview} alt="" className="h-20 w-full object-cover rounded-lg border border-slate-100"/>
            : <a href={preview} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 underline">📄 {preview.split('/').pop()}</a>}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function SubjectPagesAdmin() {
  const [activeSubject, setActiveSubject] = useState('polity');
  const [posts, setPosts] = useState<SubjectPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [tick, setTick] = useState(0);

  // Form
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [published, setPublished] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/content/subject?subject=${activeSubject}`)
      .then(r => r.json())
      .then(d => setPosts(Array.isArray(d) ? d : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [activeSubject, tick]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/content/subject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: activeSubject, title, content, imageUrl, pdfUrl, published }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setTitle(''); setContent(''); setImageUrl(''); setPdfUrl(''); setPublished(true);
      setTick(t => t + 1);
    } catch (e: any) { alert(e.message); }
    finally { setSubmitting(false); }
  }

  async function del(id: string) {
    if (!confirm('Delete?')) return;
    await fetch(`/api/content/subject/${id}`, { method: 'DELETE' });
    setTick(t => t + 1);
  }

  const subjectLabel = SUBJECTS.find(s => s.value === activeSubject)?.label || activeSubject;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Subject Pages</h1>
        <p className="text-slate-500 text-sm mt-1">Post content that appears on each subject's page for students</p>
      </div>

      {/* Subject Tabs */}
      <div className="flex flex-wrap gap-2">
        {SUBJECTS.map(s => (
          <button
            key={s.value}
            onClick={() => setActiveSubject(s.value)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
              activeSubject === s.value
                ? 'bg-indigo-600 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Posts List ──────────────────────────────── */}
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800 text-sm">{subjectLabel} — Content</h2>
            <span className="text-xs text-slate-400">{posts.length} posts</span>
          </div>
          <div className="divide-y divide-slate-50 max-h-[560px] overflow-y-auto">
            {loading && <p className="text-center py-10 text-slate-400 text-sm">Loading...</p>}
            {!loading && posts.length === 0 && (
              <p className="text-center py-10 text-slate-400 text-sm">
                No content yet for {subjectLabel}. Add some using the form →
              </p>
            )}
            {posts.map(p => (
              <div key={p.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{p.title}</p>
                    {p.content && (
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                        {p.content.slice(0, 120)}...
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${p.published ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        {p.published ? 'Live' : 'Draft'}
                      </span>
                      {p.image_url && <span className="text-[10px] text-slate-400">📷 Image</span>}
                      {p.pdf_url && <span className="text-[10px] text-slate-400">📄 PDF</span>}
                      <span className="text-[10px] text-slate-300">{new Date(p.created_at).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>
                  <button onClick={() => del(p.id)} className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg flex-shrink-0">
                    <Trash2 className="w-4 h-4"/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Add Form ─────────────────────────────────── */}
        <div className="bg-white border border-slate-100 rounded-xl p-5">
          <h2 className="font-semibold text-slate-800 text-sm mb-4">
            Add Content → <span className="text-indigo-600">{subjectLabel}</span>
          </h2>
          <form className="space-y-4" onSubmit={submit}>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Title / Headline *</label>
              <input
                value={title} onChange={e => setTitle(e.target.value)} required
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none"
                placeholder="e.g. Understanding Article 21 — Right to Life"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Content / Notes</label>
              <textarea
                value={content} onChange={e => setContent(e.target.value)}
                rows={6}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none resize-none"
                placeholder={`Write your ${subjectLabel} content here. Students will see this on the ${subjectLabel} page...`}
              />
            </div>

            <FileUpload
              label="Featured Image (→ Cloudflare R2)"
              accept="image/*"
              folder="misc"
              onUploaded={setImageUrl}
            />

            <FileUpload
              label="PDF / Study Material (→ Cloudflare R2)"
              accept="application/pdf"
              folder="notes"
              onUploaded={setPdfUrl}
            />

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
                <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} className="accent-indigo-600"/>
                Publish immediately (visible to students)
              </label>
              <button
                type="submit" disabled={submitting}
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-60 transition-colors"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin"/> : <Plus className="w-4 h-4"/>}
                {submitting ? 'Saving...' : 'Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

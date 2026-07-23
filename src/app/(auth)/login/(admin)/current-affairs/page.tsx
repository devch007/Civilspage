'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Upload, Image, FileText, X, Loader2, CheckCircle } from 'lucide-react';

interface Affair {
  id: string;
  date: string;
  title: string;
  category: string;
  published: boolean;
}

// ─── Upload widget ─────────────────────────────────────────────────────────────
function FileUpload({
  label,
  accept,
  folder,
  onUploaded,
  current,
}: {
  label: string;
  accept: string;
  folder: 'current-affairs';
  onUploaded: (url: string) => void;
  current?: string;
}) {
  const [state, setState] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
  const [preview, setPreview] = useState(current || '');
  const [errMsg, setErrMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setState('uploading');
    setErrMsg('');
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
    } catch (e: any) {
      setErrMsg(e.message);
      setState('error');
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>

      {/* Drop zone */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-4 transition-all cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 ${
          state === 'done' ? 'border-emerald-400 bg-emerald-50/30' :
          state === 'error' ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-slate-50'
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />

        {state === 'uploading' ? (
          <div className="flex items-center justify-center gap-2 py-2">
            <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
            <span className="text-sm text-slate-500 font-medium">Uploading to Cloudflare R2...</span>
          </div>
        ) : state === 'done' ? (
          <div className="flex items-center gap-2 py-1">
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <span className="text-xs text-emerald-700 font-semibold truncate flex-1">Uploaded ✓</span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setPreview(''); onUploaded(''); setState('idle'); }}
              className="text-slate-400 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 py-2 text-center">
            {accept.includes('image') ? (
              <Image className="w-6 h-6 text-slate-400" />
            ) : (
              <FileText className="w-6 h-6 text-slate-400" />
            )}
            <span className="text-xs text-slate-500 font-medium">
              Click or drag & drop • {accept.includes('image') ? 'JPG, PNG, WebP' : 'PDF'} • max 50MB
            </span>
          </div>
        )}
      </div>

      {/* Error */}
      {state === 'error' && <p className="text-xs text-red-500 font-medium">{errMsg}</p>}

      {/* Preview */}
      {preview && state === 'done' && (
        <div className="mt-2">
          {accept.includes('image') ? (
            <img src={preview} alt="preview" className="h-24 w-full object-cover rounded-lg border border-slate-100" />
          ) : (
            <a href={preview} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 underline font-medium truncate block">
              📄 {preview.split('/').pop()}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function CurrentAffairsPage() {
  const [affairs, setAffairs] = useState<Affair[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('General');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    fetch('/api/admin/affairs')
      .then((r) => r.json())
      .then((d) => setAffairs(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [success]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/affairs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, date, category, content, featuredImage: featuredImage || null, pdfUrl: pdfUrl || null, published }),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed');
      // Reset form
      setTitle(''); setContent(''); setFeaturedImage(''); setPdfUrl(''); setPublished(false);
      setDate(new Date().toISOString().split('T')[0]);
      setSuccess((s) => !s); // trigger reload
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this entry?')) return;
    await fetch(`/api/admin/affairs/${id}`, { method: 'DELETE' });
    setSuccess((s) => !s);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Current Affairs</h1>
        <p className="text-slate-500 text-sm mt-1">{loading ? '...' : `${affairs.length} entries`}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── List ──────────────────────────────────────── */}
        <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50">
            <h2 className="font-semibold text-slate-800 text-sm">All Updates</h2>
          </div>
          <div className="divide-y divide-slate-50 max-h-[600px] overflow-y-auto">
            {loading && <p className="text-center py-10 text-slate-400 text-sm">Loading...</p>}
            {!loading && affairs.length === 0 && (
              <p className="text-center py-10 text-slate-400 text-sm">No entries yet.</p>
            )}
            {affairs.map((a) => (
              <div key={a.id} className="px-5 py-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{a.title}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs text-slate-400">{a.date}</span>
                    <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">{a.category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.published ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {a.published ? 'Live' : 'Draft'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Create Form ──────────────────────────────── */}
        <div className="bg-white border border-slate-100 rounded-xl p-5">
          <h2 className="font-semibold text-slate-800 text-sm mb-4">Add New Update</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Title *</label>
              <input
                value={title} onChange={(e) => setTitle(e.target.value)} required
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none"
                placeholder="Today's key update..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Date *</label>
                <input
                  type="date" value={date} onChange={(e) => setDate(e.target.value)} required
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
                <select
                  value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none bg-white"
                >
                  {['General','Polity','Economy','International','Science & Tech','Environment','Ethics'].map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Content</label>
              <textarea
                value={content} onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-indigo-400 focus:outline-none resize-none"
                placeholder="Write the full update content here..."
              />
            </div>

            {/* Image upload */}
            <FileUpload
              label="Featured Image (uploads to Cloudflare R2)"
              accept="image/*"
              folder="current-affairs"
              current={featuredImage}
              onUploaded={setFeaturedImage}
            />

            {/* PDF upload */}
            <FileUpload
              label="PDF Attachment (uploads to Cloudflare R2)"
              accept="application/pdf"
              folder="current-affairs"
              current={pdfUrl}
              onUploaded={setPdfUrl}
            />

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
                <input
                  type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)}
                  className="accent-indigo-600"
                />
                Publish immediately (visible on site)
              </label>
              <button
                type="submit" disabled={submitting}
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                {submitting ? 'Saving...' : 'Publish'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

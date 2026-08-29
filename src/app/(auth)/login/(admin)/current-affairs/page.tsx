'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Upload, Image, FileText, X, Loader2, CheckCircle, Pencil, Filter, Check, Tag } from 'lucide-react';

interface Affair {
  id: string;
  date: string;
  title: string;
  category: string;
  content?: string;
  featuredImage?: string;
  pdfUrl?: string;
  published: boolean;
}

const CATEGORIES = [
  'Legislation',
  'Constitutional Amendments',
  'Ordinary Laws',
  'Court Judgements',
  'Policies & Programs',
  'Commissions & Committees',
  'Ethical Issues',
  'Ethical Case Studies',
  'Ethics',
  'Polity',
 
];

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
  const [state, setState] = useState<'idle' | 'uploading' | 'done' | 'error'>(current ? 'done' : 'idle');
  const [preview, setPreview] = useState(current || '');
  const [errMsg, setErrMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (current) {
      setPreview(current);
      setState('done');
    } else {
      setPreview('');
      setState('idle');
    }
  }, [current]);

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
      <label className="block text-xs font-semibold text-slate-700">{label}</label>

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
            <span className="text-sm text-slate-500 font-medium">Uploading file to Cloudflare R2...</span>
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

      {state === 'error' && <p className="text-xs text-red-500 font-medium">{errMsg}</p>}

      {preview && state === 'done' && (
        <div className="mt-2">
          {accept.includes('image') ? (
            <img src={preview} alt="preview" className="h-24 w-full object-cover rounded-lg border border-slate-200" />
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
export default function CurrentNewsViewsPage() {
  const [affairs, setAffairs] = useState<Affair[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [updatingCategoryId, setUpdatingCategoryId] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('Legislation');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [published, setPublished] = useState(true);

  // Read URL query parameter if navigated from Dashboard quick action
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      if (catParam) {
        const decoded = decodeURIComponent(catParam);
        const matched = CATEGORIES.find(c => c.toLowerCase() === decoded.toLowerCase() || c.toLowerCase().includes(decoded.toLowerCase()));
        if (matched) {
          setCategory(matched);
        }
      }
    }
  }, []);

  useEffect(() => {
    fetch('/api/admin/affairs')
      .then((r) => r.json())
      .then((d) => setAffairs(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [success]);

  function resetForm() {
    setTitle('');
    setContent('');
    setFeaturedImage('');
    setPdfUrl('');
    setPublished(true);
    setDate(new Date().toISOString().split('T')[0]);
    setCategory('Legislation');
    setEditingId(null);
  }

  function handleEdit(a: Affair) {
    setEditingId(a.id);
    setTitle(a.title);
    setDate(a.date ? new Date(a.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
    setCategory(a.category || 'Legislation');
    setContent(a.content || '');
    setFeaturedImage(a.featuredImage || '');
    setPdfUrl(a.pdfUrl || '');
    setPublished(a.published);

    // Scroll to form smoothly
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  // Instant inline category update for published entries
  async function handleQuickCategoryChange(affairId: string, newCategory: string) {
    setUpdatingCategoryId(affairId);
    const target = affairs.find((a) => a.id === affairId);
    if (!target) return;

    try {
      const res = await fetch(`/api/admin/affairs/${affairId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: target.title,
          date: target.date ? new Date(target.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          category: newCategory,
          content: target.content || null,
          featuredImage: target.featuredImage || null,
          pdfUrl: target.pdfUrl || null,
          published: target.published,
        }),
      });

      if (!res.ok) throw new Error('Failed to update category');

      // Optimistically update state
      setAffairs((prev) =>
        prev.map((a) => (a.id === affairId ? { ...a, category: newCategory } : a))
      );
    } catch (e: any) {
      alert(e.message || 'Category update failed');
    } finally {
      setUpdatingCategoryId(null);
    }
  }

  // Instant inline publish toggle
  async function handleQuickTogglePublish(affairId: string, currentPublished: boolean) {
    const target = affairs.find((a) => a.id === affairId);
    if (!target) return;

    try {
      const res = await fetch(`/api/admin/affairs/${affairId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: target.title,
          date: target.date ? new Date(target.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          category: target.category,
          content: target.content || null,
          featuredImage: target.featuredImage || null,
          pdfUrl: target.pdfUrl || null,
          published: !currentPublished,
        }),
      });

      if (!res.ok) throw new Error('Failed to update publish status');

      // Optimistically update state
      setAffairs((prev) =>
        prev.map((a) => (a.id === affairId ? { ...a, published: !currentPublished } : a))
      );
    } catch (e: any) {
      alert(e.message);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      const url = editingId ? `/api/admin/affairs/${editingId}` : '/api/admin/affairs';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, date, category, content, featuredImage: featuredImage || null, pdfUrl: pdfUrl || null, published }),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed');
      resetForm();
      setSuccess((s) => !s);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this entry?')) return;
    await fetch(`/api/admin/affairs/${id}`, { method: 'DELETE' });
    if (editingId === id) resetForm();
    setSuccess((s) => !s);
  }

  const filteredAffairs = filterCategory === 'All' 
    ? affairs 
    : affairs.filter(a => a.category.toLowerCase().includes(filterCategory.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0b3b60] to-[#164e78] text-white p-6 rounded-2xl shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider rounded font-mono">
              Primary Content Engine
            </span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-white">Current News & Views</h1>
          <p className="text-slate-200 text-xs sm:text-sm mt-1">
            Manage updates, legislation summaries, court rulings, policies, and ethics case studies.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-xl text-xs font-bold text-amber-300 border border-white/15">
            {affairs.length} Total Entries
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── List Side (7 cols) ──────────────────────────────────────── */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Filter className="w-4 h-4 text-indigo-600" />
                All News & Views Entries
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                Showing {filteredAffairs.length} of {affairs.length}
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setFilterCategory('All')}
                className={`px-3 py-1 rounded-lg font-bold transition-all whitespace-nowrap ${
                  filterCategory === 'All' ? 'bg-[#0b3b60] text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                All
              </button>
              {['Legislation', 'Constitutional Amendments', 'Ordinary Laws', 'Court Judgements', 'Policies & Programs', 'Commissions & Committees', 'Ethical Issues', 'Ethical Case Studies'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all whitespace-nowrap ${
                    filterCategory === cat ? 'bg-[#0b3b60] text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-100 max-h-[660px] overflow-y-auto">
            {loading && <p className="text-center py-12 text-slate-400 text-sm">Loading content...</p>}
            {!loading && filteredAffairs.length === 0 && (
              <div className="text-center py-12 px-4">
                <p className="text-slate-400 text-sm">No entries found for this category.</p>
                {filterCategory !== 'All' && (
                  <button 
                    onClick={() => setFilterCategory('All')} 
                    className="mt-2 text-xs font-bold text-indigo-600 hover:underline"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            )}
            {filteredAffairs.map((a) => (
              <div key={a.id} className="p-4 hover:bg-slate-50/80 transition-colors space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Inline Category Quick Dropdown */}
                      <div className="relative inline-flex items-center">
                        <Tag className="w-3 h-3 text-indigo-500 absolute left-2 pointer-events-none" />
                        <select
                          value={a.category}
                          disabled={updatingCategoryId === a.id}
                          onChange={(e) => handleQuickCategoryChange(a.id, e.target.value)}
                          className="pl-6 pr-2 py-0.5 text-[11px] font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-900 rounded-md border border-indigo-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors"
                          title="Click to instantly change category"
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        {updatingCategoryId === a.id && (
                          <Loader2 className="w-3 h-3 text-indigo-600 animate-spin ml-1" />
                        )}
                      </div>

                      {/* Quick Publish Toggle */}
                      <button
                        onClick={() => handleQuickTogglePublish(a.id, a.published)}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md transition-colors ${
                          a.published ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                        }`}
                        title="Click to toggle published status"
                      >
                        {a.published ? 'Published ✓' : 'Draft'}
                      </button>

                      <span className="text-xs text-slate-400 font-mono ml-auto">{a.date}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                      {a.title}
                    </h3>
                    {a.content && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {a.content}
                      </p>
                    )}
                    {a.pdfUrl && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                        📄 PDF Attached
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0 pt-1">
                    <button
                      onClick={() => handleEdit(a)}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                      title="Edit in full form"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Form Side (5 cols) ──────────────────────────────── */}
        <div ref={formRef} className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs h-fit space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-slate-900 text-base">
                {editingId ? 'Edit Entry' : 'Add New Entry'}
              </h2>
              <p className="text-xs text-slate-500">
                Will automatically route to your selected header category page.
              </p>
            </div>
            {editingId && (
              <button onClick={resetForm} className="text-xs font-bold text-slate-400 hover:text-slate-600 px-2.5 py-1 bg-slate-100 rounded-lg">
                Cancel Edit
              </button>
            )}
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Category *</label>
              <select
                value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none bg-slate-50"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
              <input
                value={title} onChange={(e) => setTitle(e.target.value)} required
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                placeholder="Headline for this update..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Publication Date *</label>
              <input
                type="date" value={date} onChange={(e) => setDate(e.target.value)} required
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Content / Summary</label>
              <textarea
                value={content} onChange={(e) => setContent(e.target.value)}
                rows={5}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none resize-none leading-relaxed"
                placeholder="Enter detailed analysis, key provisions, or judgements..."
              />
            </div>

            {/* Image upload */}
            <FileUpload
              label="Featured Image (Optional - Cloudflare R2)"
              accept="image/*"
              folder="current-affairs"
              current={featuredImage}
              onUploaded={setFeaturedImage}
            />

            {/* PDF upload */}
            <FileUpload
              label="PDF Document Attachment (Optional - Cloudflare R2)"
              accept="application/pdf"
              folder="current-affairs"
              current={pdfUrl}
              onUploaded={setPdfUrl}
            />

            <div className="pt-2 border-t border-slate-100 space-y-3">
              <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
                Publish immediately (Visible on live site)
              </label>

              <button
                type="submit" disabled={submitting}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#0b3b60] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#072842] shadow-sm transition-all disabled:opacity-60"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />)}
                {submitting ? (editingId ? 'Saving Changes...' : 'Publishing...') : (editingId ? 'Save Updates' : 'Publish Entry')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

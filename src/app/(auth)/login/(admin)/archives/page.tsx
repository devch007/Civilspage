'use client';

import React, { useState, useEffect } from 'react';
import { 
  Archive, RotateCcw, Trash2, Search, Filter, 
  FileText, Calendar, Tag, AlertCircle, Loader2, 
  CheckCircle, ArrowLeft, RefreshCw, Eye
} from 'lucide-react';
import Link from 'next/link';
import RichContentRenderer from '@/components/ui/RichContentRenderer';

interface ArchivedAffair {
  id: string;
  title: string;
  category: string;
  date: string;
  content?: string | null;
  featuredImage?: string | null;
  pdfUrl?: string | null;
  archivedAt?: string | null;
  createdAt: string;
}

export default function ArchivesPage() {
  const [archives, setArchives] = useState<ArchivedAffair[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [previewAffair, setPreviewAffair] = useState<ArchivedAffair | null>(null);
  const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchArchives = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/archives');
      if (res.ok) {
        const data = await res.json();
        setArchives(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to load archives:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchives();
  }, []);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleRestore = async (id: string, title: string) => {
    setRestoringId(id);
    try {
      const res = await fetch(`/api/admin/archives/${id}`, {
        method: 'PUT',
      });
      if (!res.ok) throw new Error('Failed to restore entry');
      
      setArchives((prev) => prev.filter((item) => item.id !== id));
      if (previewAffair?.id === id) setPreviewAffair(null);
      showToast(`Restored "${title}" back to active Current News & Views!`);
    } catch (err: any) {
      showToast(err.message || 'Error restoring entry', 'error');
    } finally {
      setRestoringId(null);
    }
  };

  const handlePermanentDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to PERMANENTLY delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/archives/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to permanently delete');
      
      setArchives((prev) => prev.filter((item) => item.id !== id));
      if (previewAffair?.id === id) setPreviewAffair(null);
      showToast(`Permanently deleted "${title}".`);
    } catch (err: any) {
      showToast(err.message || 'Error deleting entry', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  // Extract unique categories from archives
  const categories = ['All', ...Array.from(new Set(archives.map((a) => a.category).filter(Boolean)))];

  const filteredArchives = archives.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-lg border text-sm font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5 ${
          toastMsg.type === 'success' ? 'bg-emerald-900 text-white border-emerald-700' : 'bg-red-900 text-white border-red-700'
        }`}>
          {toastMsg.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-50 text-amber-700 rounded-xl">
              <Archive className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
              Content Archives &amp; Trash
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Deleted entries from Current News &amp; Views are safely preserved here. You can restore them anytime back to the live site or permanently purge them.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/login/current-affairs"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Active Current News &amp; Views</span>
          </Link>

          <button
            onClick={fetchArchives}
            disabled={loading}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors disabled:opacity-50"
            title="Refresh Archives"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search archived entries..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          <div className="text-xs font-semibold text-slate-500 self-end sm:self-center">
            {filteredArchives.length} archived {filteredArchives.length === 1 ? 'entry' : 'entries'}
          </div>
        </div>

        {/* Category Pills */}
        {categories.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs pt-1 border-t border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#0b3b60] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Area: List + Preview Modal */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100 shadow-xs gap-3">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <span className="text-sm font-semibold text-slate-400">Loading archived content...</span>
          </div>
        ) : filteredArchives.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Archive className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Archive is Empty</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              {searchQuery || selectedCategory !== 'All'
                ? 'No archived entries match your current search or category filter.'
                : 'Whenever you delete an entry from Current News & Views, it will safely appear here.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredArchives.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="space-y-2 flex-1 min-w-0">
                  {/* Meta badges */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md font-bold text-[11px] uppercase">
                      {item.category}
                    </span>

                    <span className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Pub: {item.date}
                    </span>

                    {item.archivedAt && (
                      <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono">
                        Archived: {new Date(item.archivedAt).toLocaleDateString()}
                      </span>
                    )}

                    {item.pdfUrl && (
                      <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                        📄 PDF Attached
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  {/* Content Preview */}
                  {item.content && (
                    <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {item.content.replace(/<[^>]*>/g, '').replace(/[*#_~`>]/g, '').trim()}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center pt-2 md:pt-0">
                  {/* Preview Content Button */}
                  <button
                    onClick={() => setPreviewAffair(item)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                    title="View Full Content Preview"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>Preview</span>
                  </button>

                  {/* Restore Button */}
                  <button
                    onClick={() => handleRestore(item.id, item.title)}
                    disabled={restoringId === item.id}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                    title="Restore back to active Current News & Views"
                  >
                    {restoringId === item.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <RotateCcw className="w-3.5 h-3.5" />
                    )}
                    <span>{restoringId === item.id ? 'Restoring...' : 'Restore'}</span>
                  </button>

                  {/* Permanent Delete Button */}
                  <button
                    onClick={() => handlePermanentDelete(item.id, item.title)}
                    disabled={deletingId === item.id}
                    className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-50"
                    title="Permanently Delete from Database"
                  >
                    {deletingId === item.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                    <span>{deletingId === item.id ? 'Deleting...' : 'Delete Forever'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Content Preview Modal */}
      {previewAffair && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 text-xs font-bold rounded uppercase font-mono">
                  {previewAffair.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{previewAffair.date}</span>
              </div>
              <button
                onClick={() => setPreviewAffair(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 rounded-lg hover:bg-slate-200 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <h2 className="text-lg sm:text-xl font-bold font-serif text-slate-900 leading-snug">
                {previewAffair.title}
              </h2>

              {previewAffair.content ? (
                <div className="prose max-w-none text-slate-800 text-xs sm:text-sm">
                  <RichContentRenderer content={previewAffair.content} />
                </div>
              ) : (
                <p className="text-slate-400 italic text-xs">No detailed content text.</p>
              )}

              {previewAffair.pdfUrl && (
                <div className="pt-3 border-t border-slate-100">
                  <a
                    href={previewAffair.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold"
                  >
                    📄 Open Attached PDF
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => setPreviewAffair(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl"
              >
                Close
              </button>

              <button
                onClick={() => handleRestore(previewAffair.id, previewAffair.title)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore This Entry</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

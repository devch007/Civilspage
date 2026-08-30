'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageSquareCheck, Plus, Trash2, Edit3, Search, 
  HelpCircle, CheckCircle2, AlertCircle, Loader2, Sparkles, Filter, X
} from 'lucide-react';

interface ResolvedQuery {
  id: string;
  question: string;
  answer: string;
  category: string;
  published: boolean;
  created_at: string;
}

const CATEGORIES = [
  'Polity & Governance',
  'Ethics & Integrity',
  'Mains Strategy',
  'Prelims Approach',
  'Optional Subject',
  'General'
];

export default function AdminResolvedQueriesPage() {
  const [queries, setQueries] = useState<ResolvedQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Form modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formQuestion, setFormQuestion] = useState('');
  const [formAnswer, setFormAnswer] = useState('');
  const [formCategory, setFormCategory] = useState('Polity & Governance');
  const [formPublished, setFormPublished] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/content/resolved-queries?admin=true');
      const data = await res.json();
      setQueries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load queries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormQuestion('');
    setFormAnswer('');
    setFormCategory('Polity & Governance');
    setFormPublished(true);
    setFeedback(null);
    setIsModalOpen(true);
  };

  const openEditModal = (q: ResolvedQuery) => {
    setEditingId(q.id);
    setFormQuestion(q.question);
    setFormAnswer(q.answer);
    setFormCategory(q.category || 'General');
    setFormPublished(q.published ?? true);
    setFeedback(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      const url = editingId 
        ? `/api/content/resolved-queries/${editingId}`
        : '/api/content/resolved-queries';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: formQuestion,
          answer: formAnswer,
          category: formCategory,
          published: formPublished,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save query');

      setIsModalOpen(false);
      await fetchQueries();
    } catch (err: any) {
      setFeedback({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resolved query?')) return;

    try {
      const res = await fetch(`/api/content/resolved-queries/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setQueries((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      alert('Error deleting query');
    }
  };

  const filteredQueries = queries.filter((q) => {
    const matchesCat = activeCategory === 'All' || q.category === activeCategory;
    const matchesSearch = 
      q.question.toLowerCase().includes(search.toLowerCase()) || 
      q.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <MessageSquareCheck className="w-7 h-7 text-indigo-600" />
            <span>Resolved Queries</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Post student questions and mentor answers to publish directly to the homepage Resolved Queries section.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0b3b60] hover:bg-[#082a45] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Resolved Query</span>
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <input
            type="text"
            placeholder="Search query or answer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 text-slate-700"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Category:
          </span>
          {['All', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#0b3b60] text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Query List */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs">
        {loading ? (
          <div className="text-center py-16 text-slate-400 flex flex-col items-center justify-center">
            <Loader2 className="w-7 h-7 animate-spin mb-2 text-indigo-500" />
            <p className="text-sm">Loading resolved queries...</p>
          </div>
        ) : filteredQueries.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <HelpCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-semibold text-slate-600">No resolved queries found</p>
            <p className="text-xs mt-1">Post your first question &amp; answer to display it on the homepage.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredQueries.map((q) => (
              <div key={q.id} className="p-5 hover:bg-slate-50/60 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {q.category}
                      </span>
                      {q.published ? (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-500">
                          Draft
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {q.question}
                    </h3>

                    <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700 leading-relaxed font-normal">
                      <strong className="block text-indigo-900 font-bold mb-1 text-[11px] uppercase tracking-wider">
                        Mentor's Resolution:
                      </strong>
                      {q.answer}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 pt-1">
                    <button
                      onClick={() => openEditModal(q)}
                      className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit Query"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Query"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <MessageSquareCheck className="w-5 h-5 text-indigo-600" />
                <span>{editingId ? 'Edit Resolved Query' : 'Post New Resolved Query'}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {feedback && (
                <div className="p-3 rounded-xl text-xs font-medium flex items-center gap-2 bg-red-50 text-red-800 border border-red-200">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{feedback.text}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-400 focus:outline-none text-slate-800"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Student's Question / Query
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. How should an aspirant approach Ethics case studies under pressure?"
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-400 focus:outline-none text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mentor's Answer / Resolution
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Write the comprehensive answer and guidance..."
                  value={formAnswer}
                  onChange={(e) => setFormAnswer(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-400 focus:outline-none text-slate-800"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="published_check"
                  checked={formPublished}
                  onChange={(e) => setFormPublished(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <label htmlFor="published_check" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Publish immediately on Homepage
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-[#0b3b60] hover:bg-[#082a45] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{editingId ? 'Update Query' : 'Publish Query'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

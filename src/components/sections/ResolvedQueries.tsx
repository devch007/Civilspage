'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, CheckCircle2, ChevronDown, ChevronUp, Sparkles, 
  MessageSquareCheck, Send, BookOpen, ArrowRight, Search, Filter 
} from 'lucide-react';

interface ResolvedQuery {
  id: string;
  question: string;
  answer: string;
  category: string;
  created_at: string;
}

export default function ResolvedQueries() {
  const [queries, setQueries] = useState<ResolvedQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadQueries() {
      try {
        setLoading(true);
        const res = await fetch('/api/content/resolved-queries');
        const data = await res.json();
        setQueries(Array.isArray(data) ? data : []);
        // Automatically expand the first query
        if (Array.isArray(data) && data.length > 0) {
          setExpandedId(data[0].id);
        }
      } catch (err) {
        console.error('Failed to load resolved queries:', err);
      } finally {
        setLoading(false);
      }
    }
    loadQueries();
  }, []);

  const categories = ['All', 'Polity & Governance', 'Ethics & Integrity', 'Mains Strategy', 'General'];

  const filteredQueries = queries.filter((q) => {
    const matchesCat = activeCategory === 'All' || q.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch = 
      q.question.toLowerCase().includes(search.toLowerCase()) || 
      q.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="resolved-queries" className="py-14 sm:py-20 bg-gradient-to-b from-white via-slate-50/70 to-white border-b border-slate-200 relative overflow-hidden">
      
      {/* Ambient background decoration */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-amber-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b3b60]/5 border border-[#0b3b60]/15 text-[#0b3b60] text-xs font-black uppercase tracking-wider mb-3">
            <MessageSquareCheck className="w-4 h-4 text-amber-600" />
            <span>Mentor Resolution Desk</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b3b60] font-serif leading-tight">
            Resolved Aspirant Queries
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed">
            In-depth analytical resolutions and strategic guidance by <strong>Rajiv Ranjan Singh</strong> on recurring conceptual doubts, answer writing frameworks, and syllabus intricacies.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#0b3b60] text-white shadow-xs'
                    : 'bg-slate-100/70 text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[200px] sm:min-w-[260px]">
            <input
              type="text"
              placeholder="Search doubts or topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 text-slate-800"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Queries Accordion / Cards List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-medium">Fetching resolved discussions...</p>
            </div>
          ) : filteredQueries.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 text-slate-400">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No queries found matching this filter</p>
              <p className="text-xs mt-1 text-slate-400">Try selecting another subject category or clearing your search.</p>
            </div>
          ) : (
            filteredQueries.map((q) => {
              const isExpanded = expandedId === q.id;
              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isExpanded 
                      ? 'border-[#0b3b60]/30 shadow-md ring-1 ring-[#0b3b60]/10' 
                      : 'border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  {/* Question Header (Always Visible) */}
                  <button
                    onClick={() => toggleExpand(q.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-black text-sm shrink-0 mt-0.5 border border-amber-200/80">
                        Q
                      </div>
                      <div className="space-y-1.5">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#0b3b60]/5 text-[#0b3b60] border border-[#0b3b60]/10 uppercase tracking-wider">
                          {q.category}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-snug">
                          {q.question}
                        </h3>
                      </div>
                    </div>

                    <div className="shrink-0 p-1.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors mt-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Expanded Mentor Resolution */}
                  {isExpanded && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 animate-in fade-in duration-200">
                      <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-slate-50 via-white to-amber-50/20 border-l-4 border-[#0b3b60] border-y border-r border-slate-200/80 space-y-2">
                        <div className="flex items-center gap-2 text-[#0b3b60] font-black text-xs uppercase tracking-wider">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          <span>Mentor's Analysis &amp; Resolution:</span>
                        </div>
                        <p className="text-sm sm:text-[15px] text-slate-800 leading-relaxed font-normal whitespace-pre-line pt-1">
                          {q.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Ask Question Callout Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#0b3b60] via-[#092e4c] to-[#0b3b60] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold font-serif flex items-center justify-center sm:justify-start gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <span>Have a Specific Preparation Doubt?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
              Submit your academic query directly to Mentor Rajiv Ranjan Singh for personalized strategy, syllabus clarity, and guidance.
            </p>
          </div>

          <Link
            href="/direct-query"
            className="shrink-0 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-[#0b3b60] font-black text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 uppercase tracking-wider flex items-center gap-2"
          >
            <span>Address Your Query</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

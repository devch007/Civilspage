'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Archive, Calendar, Tag, Search, BookOpen, 
  Download, ArrowRight, Loader2, Filter, Layers, 
  Sparkles, Clock, CheckCircle2, ChevronRight, FileText
} from 'lucide-react';

interface ArchiveEntry {
  id: string;
  title: string;
  category: string;
  date: string;
  content?: string | null;
  featuredImage?: string | null;
  pdfUrl?: string | null;
  published: boolean;
}

export default function ArchivesPublicPage() {
  const [entries, setEntries] = useState<ArchiveEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/content/archives')
      .then((r) => r.json())
      .then((data) => setEntries(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Failed to load archives:', err))
      .finally(() => setLoading(false));
  }, []);

  // Compute all available years starting from 2026
  const availableYears = useMemo(() => {
    const yearsSet = new Set<string>(['2026']);
    entries.forEach((e) => {
      if (e.date) {
        const y = new Date(e.date).getFullYear();
        if (!isNaN(y) && y >= 2026) yearsSet.add(y.toString());
      }
    });
    const sortedYears = Array.from(yearsSet).sort((a, b) => Number(a) - Number(b));
    return ['All', ...sortedYears];
  }, [entries]);

  // Compute all categories
  const availableCategories = useMemo(() => {
    const catsSet = new Set<string>();
    entries.forEach((e) => {
      if (e.category) catsSet.add(e.category);
    });
    return ['All', ...Array.from(catsSet).sort()];
  }, [entries]);

  // Filter entries
  const filteredEntries = useMemo(() => {
    return entries.filter((item) => {
      // Year matching
      let matchesYear = true;
      if (selectedYear !== 'All') {
        const itemYear = new Date(item.date).getFullYear().toString();
        matchesYear = itemYear === selectedYear || item.date?.startsWith(selectedYear);
      }

      // Category matching
      let matchesCategory = true;
      if (selectedCategory !== 'All') {
        matchesCategory = item.category.toLowerCase().includes(selectedCategory.toLowerCase());
      }

      // Search matching
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchesSearch = 
          item.title.toLowerCase().includes(q) ||
          (item.content ? item.content.toLowerCase().includes(q) : false) ||
          item.category.toLowerCase().includes(q);
      }

      return matchesYear && matchesCategory && matchesSearch;
    });
  }, [entries, selectedYear, selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[#FAF9F6] pt-12 sm:pt-14 pb-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* 1. Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0b3b60]/10 text-[#0b3b60] text-xs font-black uppercase tracking-wider">
            <Archive className="w-3.5 h-3.5 text-[#0b3b60]" />
            Historical Archive &amp; Past Editions
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b3b60] font-serif tracking-tight">
            Academic Archives
          </h1>

          <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Access previous years' dossiers, legislative breakdowns, judicial precedents, and ethical frameworks categorized chronologically by year.
          </p>
        </div>

        {/* 2. Main Year Selector Pills */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between px-2 pb-2 text-xs font-bold text-slate-500 border-b border-slate-100">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0b3b60]" />
                <span>Select Examination Year / Timeline</span>
              </span>
              <span className="text-[11px] text-indigo-700 font-mono">
                {selectedYear === 'All' ? 'Showing All Archives' : `Year: ${selectedYear}`}
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pt-2 scrollbar-none">
              {availableYears.map((yr) => {
                const count = yr === 'All' 
                  ? entries.length 
                  : entries.filter((e) => new Date(e.date).getFullYear().toString() === yr || e.date?.startsWith(yr)).length;
                
                const isSelected = selectedYear === yr;
                return (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0b3b60] text-white shadow-md'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60'
                    }`}
                  >
                    <span>{yr === 'All' ? 'All Years' : yr}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-extrabold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Search & Subcategory Filter Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Box */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search archived articles, acts, cases..."
                className="w-full pl-9 pr-8 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-[#0b3b60] focus:ring-2 focus:ring-indigo-100 focus:outline-none bg-slate-50/50"
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

            {/* Results Count & Reset Filter */}
            <div className="flex items-center gap-3 text-xs">
              <span className="font-semibold text-slate-600">
                Found <strong className="text-[#0b3b60] font-mono">{filteredEntries.length}</strong> archived records
              </span>
              {(selectedYear !== 'All' || selectedCategory !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedYear('All');
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          {availableCategories.length > 1 && (
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                <Tag className="w-3 h-3 text-slate-400" />
                Category:
              </span>
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#0b3b60] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'All' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 4. Content Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs max-w-6xl mx-auto">
            <Loader2 className="w-8 h-8 text-[#0b3b60] animate-spin" />
            <span className="text-sm font-bold text-slate-500">Loading historical archives repository...</span>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80 shadow-xs max-w-4xl mx-auto space-y-3 p-6">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Archive className="w-6 h-6 text-[#0b3b60]" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-serif">No Archived Records</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              {entries.length === 0
                ? 'All published updates are active on the primary portal feeds. When content is archived or deleted from Current News & Views, it will be catalogued chronologically here.'
                : `No archived records found matching year "${selectedYear}" and selected category.`}
            </p>
            {entries.length > 0 && (
              <button
                onClick={() => {
                  setSelectedYear('All');
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-3 px-4 py-2 bg-[#0b3b60] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#072842] transition-colors"
              >
                Reset Filters &amp; View All
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredEntries.map((item, index) => {
              const entryYear = new Date(item.date).getFullYear();
              const readTime = item.content ? Math.max(1, Math.ceil(item.content.split(' ').length / 200)) : 1;
              const plainSnippet = item.content
                ? item.content.replace(/<[^>]*>/g, '').replace(/[*#_~`>]/g, '').trim().slice(0, 150) + '…'
                : 'Click to read full archival analysis and briefing.';

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-[#0b3b60] transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Meta bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold">
                      <span className="px-2.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-md uppercase font-mono tracking-wider">
                        {item.category}
                      </span>
                      
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-mono">
                        Year {isNaN(entryYear) ? '—' : entryYear}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0b3b60] transition-colors font-serif leading-snug">
                      {item.title}
                    </h3>

                    {/* Snippet */}
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {plainSnippet}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {item.date}
                    </span>

                    <div className="flex items-center gap-2">
                      {item.pdfUrl && (
                        <a
                          href={item.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      )}

                      <Link
                        href={`/updates/${item.id}`}
                        className="inline-flex items-center gap-1 font-bold text-xs text-[#0b3b60] hover:text-indigo-700 transition-colors"
                      >
                        <span>Read Entry</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Tag, Sparkles, BookOpen, Loader2, Gavel, Layers, Scale } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface Affair {
  id: string;
  date: string;
  title: string;
  category: string;
  content?: string;
  featuredImage?: string | null;
}

function UpdatesContent() {
  const [updates, setUpdates] = useState<Affair[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  useEffect(() => {
    fetch('/api/content/affairs')
      .then((r) => r.json())
      .then((data) => setUpdates(data))
      .catch((err) => console.error('Failed to load updates:', err))
      .finally(() => setLoading(false));
  }, []);

  const isLegislationSection = Boolean(
    selectedCategory && (
      selectedCategory.toLowerCase().includes('legislat') ||
      selectedCategory.toLowerCase().includes('amendment') ||
      selectedCategory.toLowerCase().includes('ordinary')
    )
  );

  const isEthicsSection = Boolean(
    selectedCategory && selectedCategory.toLowerCase().includes('ethic')
  );

  const filteredUpdates = updates.filter(item => {
    if (!selectedCategory) return true;
    const catLower = item.category.toLowerCase();
    const selLower = selectedCategory.toLowerCase();

    if (selLower === 'legislation') {
      return catLower.includes('legislat') || catLower.includes('amendment') || catLower.includes('ordinary') || catLower.includes('law');
    }
    if (selLower.includes('amendment')) {
      return catLower.includes('amendment') || catLower.includes('constitutional');
    }
    if (selLower.includes('ordinary')) {
      return catLower.includes('ordinary') || (catLower.includes('legislat') && !catLower.includes('amendment'));
    }
    if (selLower.includes('ethic')) {
      if (selLower.includes('issue')) {
        return catLower.includes('issue') || catLower === 'ethics' || catLower.includes('ethic');
      }
      if (selLower.includes('case')) {
        return catLower.includes('case') || catLower.includes('ethic');
      }
      return catLower.includes('ethic');
    }
    return catLower.includes(selLower);
  });

  const getSubtext = (cat: string | null) => {
    if (!cat) {
      return "Comprehensive analysis of statutory enactments, judicial pronouncements, policy frameworks, and constitutional developments for UPSC Civil Services Examination.";
    }
    const lower = cat.toLowerCase();
    if (lower.includes('court') || lower.includes('judgement')) {
      return "Analytical digests and constitutional breakdowns of landmark judicial rulings, legal precedents, and judicial doctrines.";
    }
    if (lower.includes('amendment')) {
      return "Detailed thematic examinations of constitutional amendments, fundamental rights evolution, and institutional checks and balances.";
    }
    if (lower.includes('ordinary')) {
      return "In-depth analysis of ordinary statutes, Parliamentary bills, codifications, and administrative acts.";
    }
    if (lower.includes('legislat')) {
      return "Comprehensive directory of Parliamentary enactments, Constitutional Amendments, and Ordinary Laws.";
    }
    if (lower.includes('polic') || lower.includes('program')) {
      return "Structured briefings on Union and State government schemes, missions, and developmental policy initiatives.";
    }
    if (lower.includes('commission') || lower.includes('committee')) {
      return "Authoritative summaries of administrative reform commissions, committee recommendations, and statutory reports.";
    }
    if (lower.includes('ethic')) {
      return "Applied analysis of public service ethics, governance dilemmas, moral philosophy, and diagnostic case studies.";
    }
    return `Structured updates, academic briefings, and analytical perspectives on ${cat}.`;
  };

  const getPageTitle = (cat: string | null) => {
    if (!cat) return 'Current Updates';
    if (cat.toLowerCase().includes('amendment')) return 'Constitutional Amendments';
    if (cat.toLowerCase().includes('ordinary')) return 'Ordinary Laws';
    if (cat.toLowerCase() === 'legislation') return 'Legislation & Parliamentary Bills';
    if (cat.toLowerCase().includes('ethical issues')) return 'Ethical Issues';
    if (cat.toLowerCase().includes('ethical case studies')) return 'Ethical Case Studies';
    if (cat.toLowerCase().includes('ethic')) return 'Ethics';
    return cat;
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] pt-28 sm:pt-36 pb-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Banner Section */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="badge badge-primary gap-1 inline-flex items-center mx-auto mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
            Academic Resource Feed
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-[#0b3b60] mb-3 tracking-tight">
            {getPageTitle(selectedCategory)}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            {getSubtext(selectedCategory)}
          </p>
        </div>

        {/* Legislation Sub-Tabs */}
        {isLegislationSection && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <Link 
              href="/updates?category=Constitutional Amendments"
              className={`px-5 py-2.5 text-xs font-bold rounded-xl border transition-all flex items-center gap-2 ${
                selectedCategory?.toLowerCase().includes('amendment') || selectedCategory?.toLowerCase() === 'legislation'
                  ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Constitutional Amendments
            </Link>
            <Link 
              href="/updates?category=Ordinary Laws"
              className={`px-5 py-2.5 text-xs font-bold rounded-xl border transition-all flex items-center gap-2 ${
                selectedCategory?.toLowerCase().includes('ordinary')
                  ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Gavel className="w-3.5 h-3.5" />
              Ordinary Laws
            </Link>
          </div>
        )}

        {/* Ethics Sub-Tabs */}
        {isEthicsSection && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <Link 
              href="/updates?category=Ethical Issues"
              className={`px-5 py-2.5 text-xs font-bold rounded-xl border transition-all flex items-center gap-2 ${
                selectedCategory?.toLowerCase().includes('issue') || selectedCategory?.toLowerCase() === 'ethics'
                  ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ethical Issues
            </Link>
            <Link 
              href="/updates?category=Ethical Case Studies"
              className={`px-5 py-2.5 text-xs font-bold rounded-xl border transition-all flex items-center gap-2 ${
                selectedCategory?.toLowerCase().includes('case')
                  ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              Ethical Case Studies
            </Link>
          </div>
        )}

        {selectedCategory && !isLegislationSection && !isEthicsSection && (
          <div className="flex items-center justify-between bg-indigo-50/50 border border-indigo-100 rounded-xl px-5 py-3 mb-8 max-w-xl mx-auto">
            <span className="text-sm font-semibold text-slate-700">
              Showing category: <span className="text-indigo-700 font-bold uppercase">{selectedCategory}</span>
            </span>
            <Link 
              href="/updates"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline transition-all"
            >
              Clear Filter
            </Link>
          </div>
        )}

        {/* Responsive Grid of Cards */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <span className="text-sm font-bold text-slate-400">Loading resources database...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUpdates.length > 0 ? (
              filteredUpdates.map((item, index) => (
                <Link href={`/updates/${item.id}`} key={item.id} className="block cursor-pointer group">
                  <motion.div 
                    className="bg-white border border-slate-200/80 rounded-xl hover:border-indigo-500 hover:shadow-xs transition-all duration-300 p-5 text-left h-full flex flex-col justify-between"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.4) }}
                  >
                    <div>
                      {/* Meta Tags */}
                      <div className="flex items-center gap-2 mb-3 text-[10.5px] font-bold text-slate-400">
                        <span className="flex items-center gap-1 shrink-0">
                          <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                          {item.date}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1 text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase shrink-0">
                          <Tag className="w-3 h-3 text-indigo-500" />
                          {item.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="group-hover:text-indigo-600 transition-colors font-serif font-black text-slate-900 leading-snug mb-2" style={{ fontSize: '1.15rem' }}>
                        {item.title}
                      </h3>

                      {/* Content excerpt */}
                      <p className="text-slate-600 font-normal leading-relaxed text-xs sm:text-sm">
                        {item.content ? item.content.slice(0, 160).replace(/<[^>]*>/g, '') + '…' : 'Click to view resource details.'}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                <h4 className="text-lg font-bold font-serif text-[#0b3b60]">To be Updated soon.</h4>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}

export default function CurrentUpdates() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-20 gap-3 min-h-screen">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <span className="text-sm font-bold text-slate-400">Loading updates...</span>
      </div>
    }>
      <UpdatesContent />
    </Suspense>
  );
}

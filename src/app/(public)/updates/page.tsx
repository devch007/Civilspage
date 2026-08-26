'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Tag, Sparkles, BookOpen, Loader2 } from 'lucide-react';
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

  const filteredUpdates = selectedCategory
    ? updates.filter(item => item.category.toLowerCase().includes(selectedCategory.toLowerCase()))
    : updates;

  const getSubtext = (cat: string | null) => {
    if (!cat) {
      return "Comprehensive analysis of statutory enactments, judicial pronouncements, policy frameworks, and constitutional developments for UPSC Civil Services Examination.";
    }
    const lower = cat.toLowerCase();
    if (lower.includes('court') || lower.includes('judgement')) {
      return "Analytical digests and constitutional breakdowns of landmark judicial rulings, legal precedents, and judicial doctrines.";
    }
    if (lower.includes('legislat')) {
      return "In-depth analysis of Parliamentary acts, bills, statutory provisions, and legal reforms.";
    }
    if (lower.includes('amendment')) {
      return "Detailed examinations of constitutional amendments, federal structures, and institutional checks and balances.";
    }
    if (lower.includes('polic') || lower.includes('program')) {
      return "Structured briefings on Union and State government schemes, missions, and developmental policy initiatives.";
    }
    if (lower.includes('commission') || lower.includes('committee')) {
      return "Authoritative summaries of administrative reform commissions, committee recommendations, and statutory reports.";
    }
    if (lower.includes('model') || lower.includes('answer')) {
      return "Evaluated answer writing frameworks, multi-dimensional structures, and standard model answers for UPSC Mains.";
    }
    return `Structured updates, academic briefings, and analytical perspectives on ${cat}.`;
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] pt-28 sm:pt-36 pb-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Banner Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="badge badge-primary gap-1 inline-flex items-center mx-auto mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
            Live Academic Feeds
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-[#0b3b60] mb-3 tracking-tight">
            {selectedCategory ? selectedCategory : 'Current Updates'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            {getSubtext(selectedCategory)}
          </p>
        </div>

        {selectedCategory && (
          <div className="flex items-center justify-between bg-indigo-50/50 border border-indigo-100 rounded-xl px-5 py-3 mb-8 max-w-xl mx-auto">
            <span className="text-sm font-semibold text-slate-700">
              Showing updates in category: <span className="text-indigo-700 font-bold uppercase">{selectedCategory}</span>
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
            <span className="text-sm font-bold text-slate-400">Loading current updates database...</span>
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
                        {item.content ? item.content.slice(0, 160).replace(/<[^>]*>/g, '') + '…' : 'Click to view update details.'}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100">
                <h4 className="text-lg font-bold text-slate-900 mb-1">No Updates Found</h4>
                <p className="text-slate-400 text-sm">Updates published inside the Admin Panel will immediately display here.</p>
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

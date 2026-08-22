'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Newspaper, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Affair {
  id: string;
  title: string;
}

export default function CurrentAffairs() {
  const [allAffairs, setAllAffairs] = useState<Affair[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content/affairs')
      .then((r) => r.json())
      .then((data) => {
        setAllAffairs(Array.isArray(data) ? data.slice(0, 8) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="current-affairs" className="py-16 bg-[#FAF9F6] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-300 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b3b60] font-serif">
              Current News & Views
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Curated editorial perspectives on contemporary Polity, Acts, Judiciary Rulings, Governance & Public Administration.
            </p>
          </div>

          <Link 
            href="/updates" 
            className="inline-flex items-center gap-1 text-xs font-bold text-[#0b3b60] hover:text-[#994d00] bg-white px-3.5 py-2 rounded-md border border-slate-300 shadow-2xs hover:shadow-xs transition-all shrink-0"
          >
            <span>View All News & Views</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Headlines List / Grid */}
        <div className="relative">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white rounded-lg border border-slate-200 p-5 h-20 animate-pulse"></div>
              ))}
            </div>
          ) : allAffairs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allAffairs.map((af) => (
                <Link
                  key={af.id}
                  href={`/updates/${af.id}`}
                  className="bg-white rounded-lg border border-slate-200 hover:border-[#0b3b60] hover:shadow-md transition-all p-5 flex items-center justify-between text-left group"
                >
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0b3b60] transition-colors leading-snug font-serif flex-1 pr-4">
                    {af.title}
                  </h3>

                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0b3b60] group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-slate-200 text-slate-500 font-semibold text-xs">
              No news & views uploaded yet.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

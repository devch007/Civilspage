'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
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
        setAllAffairs(Array.isArray(data) ? data.slice(0, 6) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="current-affairs" className="py-8 sm:py-10 bg-[#FAF9F6] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header - Compact Centered */}
        <div className="text-center max-w-3xl mx-auto mb-5 space-y-1">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b3b60] font-serif leading-snug">
            Current News & Views
          </h2>
        </div>

        {/* Headlines Compact List / Grid */}
        <div className="relative max-w-4xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white rounded-lg border border-slate-200 p-3.5 h-14 animate-pulse"></div>
              ))}
            </div>
          ) : allAffairs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {allAffairs.map((af) => (
                <Link
                  key={af.id}
                  href={`/updates/${af.id}`}
                  className="bg-white rounded-lg border border-slate-200 hover:border-[#0b3b60] hover:shadow-xs transition-all p-3 sm:p-3.5 flex items-center justify-between text-left group"
                >
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 group-hover:text-[#0b3b60] transition-colors leading-snug font-serif flex-1 pr-3 line-clamp-2">
                    {af.title}
                  </h3>

                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0b3b60] group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-white rounded-lg border border-slate-200 text-slate-500 font-semibold text-xs">
              No news & views uploaded yet.
            </div>
          )}
        </div>


        {/* View All Resources Button - Centered */}
        <div className="text-center mt-5">
          <Link 
            href="/updates" 
            className="inline-flex items-center gap-1 text-xs font-bold text-[#0b3b60] hover:text-white hover:bg-[#0b3b60] bg-white px-4 py-2 rounded-md border border-slate-300 shadow-2xs hover:shadow-xs transition-all"
          >
            <span>View All Resources</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Download, Bookmark, CheckCircle2 } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  category: string;
  pdfUrl: string;
  subject: string;
}

export default function FeaturedResources() {
  const [resources, setResources] = useState<Note[]>([]);

  useEffect(() => {
    fetch('/api/content/notes')
      .then((r) => r.json())
      .then((data) => setResources(Array.isArray(data) ? data.slice(0, 2) : []))
      .catch(() => {});
  }, []);

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-100 text-amber-900 text-[11px] font-extrabold uppercase tracking-wider border border-amber-300">
            <Bookmark className="w-3.5 h-3.5 text-amber-800" />
            Core Academic Publications
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b3b60] font-serif mt-2">
            Featured UPSC High-Yield Focus Modules
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Hand-picked statutory briefs, syllabus-mapped notes, and standard answer framing templates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {resources.length > 0 ? (
            resources.map((item, index) => (
              <motion.div 
                key={item.id}
                className="bg-[#FAF9F6] rounded-xl border border-slate-300 hover:border-[#0b3b60] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-left relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${index === 0 ? 'bg-[#0b3b60]' : 'bg-[#FF9933]'}`}></div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-extrabold uppercase bg-white border border-slate-200 text-[#0b3b60] px-2.5 py-0.5 rounded shadow-2xs">
                      {item.category || 'High-Yield Module'}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 font-mono">
                      {item.subject || 'GS Paper II'}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2 font-serif">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    Structured analysis compiled with relevant statutory provisions, judicial rulings, and model Mains answers for rapid revision.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-[#138808] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Peer Verified
                  </span>
                  
                  <a 
                    href={item.pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0b3b60] hover:bg-[#082b47] text-white text-xs font-bold rounded shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Access Document</span>
                  </a>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-[#FAF9F6] rounded-xl border border-slate-200 text-slate-500 font-semibold text-xs">
              No featured resources uploaded yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

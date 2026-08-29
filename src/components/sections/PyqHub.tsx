'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Tag, Loader2 } from 'lucide-react';

interface PyqPdf {
  id: string;
  title: string;
  tags: string[];
  pdf_url: string;
  subject?: string;
  year?: number;
  created_at: string;
}

export default function PyqHub() {
  const [pdfs, setPdfs] = useState<PyqPdf[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content/pyq-pdfs')
      .then((r) => r.json())
      .then((data) => setPdfs(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="pyqs" className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge badge-amber uppercase mb-3 inline-block">PYQ Repository</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b3b60] font-serif leading-snug mb-3">
            Previous Years Questions
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Download standard PYQ PDFs and authentic compilations for UPSC Civil Services Examination.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              <span className="text-sm font-bold text-slate-400">Loading PYQ database...</span>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {pdfs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pdfs.map((item) => (
                    <motion.div
                      key={item.id}
                      className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-2xs hover:shadow-md transition-shadow hover:border-indigo-200 flex flex-col justify-between"
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div>
                        <div className="flex gap-2 mb-3">
                          {item.subject && (
                            <span className="text-[10px] px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-full font-bold">
                              {item.subject}
                            </span>
                          )}
                          {item.year && (
                            <span className="text-[10px] px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full font-bold">
                              {item.year}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 font-serif leading-snug mb-3">
                          {item.title}
                        </h3>
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {item.tags.map(tag => (
                              <span key={tag} className="text-[10px] px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full flex items-center gap-0.5">
                                <Tag className="w-2.5 h-2.5" />{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <a 
                        href={item.pdf_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="btn btn-secondary !py-2.5 !px-4 text-xs font-semibold flex items-center justify-center gap-2 mt-auto w-full group hover:bg-[#0b3b60] hover:text-white transition-colors"
                      >
                        <FileText className="w-4 h-4 text-indigo-500 group-hover:text-white" />
                        <span>View &amp; Download PDF</span>
                        <Download className="w-3.5 h-3.5 ml-auto text-slate-400 group-hover:text-white" />
                      </a>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <h4 className="text-lg font-bold font-serif text-[#0b3b60]">To be Updated soon.</h4>
                </div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}

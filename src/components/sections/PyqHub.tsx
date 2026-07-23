'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, FileText, Download, Tag } from 'lucide-react';

interface PyqPdf {
  id: string;
  title: string;
  tags: string[];
  pdf_url: string;
  subject?: string;
  year?: number;
  created_at: string;
}

const SUBJECTS = ['All', 'Indian Polity', 'Indian Economy', 'History', 'Geography', 'Environment', 'Science & Technology', 'Ethics', 'General Studies', 'CSAT'];

export default function PyqHub() {
  const [pdfs, setPdfs] = useState<PyqPdf[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('All');

  useEffect(() => {
    fetch('/api/content/pyq-pdfs')
      .then((r) => r.json())
      .then((data) => setPdfs(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredPdfs = pdfs.filter(p => selectedSubject === 'All' || p.subject === selectedSubject);

  return (
    <section id="pyqs" className="py-24 bg-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="badge badge-amber uppercase mb-4">PYQ PDFs</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight font-heading">
            Previous Year Questions
          </h2>
          <p className="text-slate-500 text-base">
            Download standard PYQ PDFs categorized by subject and year.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {SUBJECTS.map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm ${
                selectedSubject === subject
                  ? 'bg-indigo-600 text-white shadow-indigo-200'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          {loading ? (
             <div className="text-center py-10 text-slate-400 text-sm">Loading PYQs...</div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredPdfs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPdfs.map((item) => (
                    <motion.div
                      key={item.id}
                      className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow hover:border-indigo-100 flex flex-col justify-between"
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div>
                        <div className="flex gap-2 mb-3">
                          {item.subject && (
                            <span className="text-[10px] px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full font-medium">
                              {item.subject}
                            </span>
                          )}
                          {item.year && (
                            <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium">
                              {item.year}
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-slate-900 leading-snug mb-3">
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
                        className="btn btn-secondary !py-2 !px-4 text-xs font-semibold flex items-center justify-center gap-2 mt-auto w-full group"
                      >
                        <FileText className="w-4 h-4 text-indigo-500 group-hover:text-indigo-600" />
                        <span>View PDF</span>
                        <Download className="w-3.5 h-3.5 ml-auto text-slate-400 group-hover:text-indigo-500" />
                      </a>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  className="flex flex-col items-center justify-center py-16 px-4 bg-slate-50 rounded-2xl border border-slate-100 border-dashed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <AlertCircle className="w-12 h-12 text-slate-300 mb-4" />
                  <h4 className="text-lg font-bold text-slate-700 mb-1">No PYQs Found</h4>
                  <p className="text-slate-500 text-sm text-center">
                    We couldn't find any PDF documents for the selected filter.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}

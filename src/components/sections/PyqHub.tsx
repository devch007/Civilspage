'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Tag, Loader2, GraduationCap, BookOpen, Layers } from 'lucide-react';

interface PyqPdf {
  id: string;
  title: string;
  tags: string[];
  pdf_url: string;
  subject?: string;
  year?: number;
  exam_type?: string;
  created_at: string;
}

type TabType = 'Preliminary Examination' | 'Main Examination';

export default function PyqHub() {
  const [pdfs, setPdfs] = useState<PyqPdf[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('Preliminary Examination');

  useEffect(() => {
    fetch('/api/content/pyq-pdfs')
      .then((r) => r.json())
      .then((data) => setPdfs(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const prelimsCount = pdfs.filter(p => (p.exam_type || 'Preliminary Examination') === 'Preliminary Examination').length;
  const mainsCount = pdfs.filter(p => (p.exam_type || '').includes('Main')).length;

  const filteredPdfs = pdfs.filter(item => {
    const itemExam = item.exam_type || 'Preliminary Examination';
    if (activeTab === 'Preliminary Examination') {
      return itemExam === 'Preliminary Examination' || !item.exam_type;
    }
    if (activeTab === 'Main Examination') {
      return itemExam.includes('Main');
    }
    return true;
  });

  return (
    <section id="pyqs" className="py-12 sm:py-16 bg-slate-50/50 min-h-screen">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Selection Tabs Above Heading */}
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
            {/* Preliminary Examination Tab */}
            <button
              onClick={() => setActiveTab('Preliminary Examination')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all relative ${
                activeTab === 'Preliminary Examination'
                  ? 'bg-[#0b3b60] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <GraduationCap className={`w-4 h-4 ${activeTab === 'Preliminary Examination' ? 'text-amber-300' : 'text-slate-400'}`} />
              <span>Preliminary Exam</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                activeTab === 'Preliminary Examination' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {prelimsCount}
              </span>
            </button>

            {/* Main Examination Tab */}
            <button
              onClick={() => setActiveTab('Main Examination')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all relative ${
                activeTab === 'Main Examination'
                  ? 'bg-[#0b3b60] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${activeTab === 'Main Examination' ? 'text-amber-300' : 'text-slate-400'}`} />
              <span>Main Exam</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                activeTab === 'Main Examination' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {mainsCount}
              </span>
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span>UPSC CSE Archives</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b3b60] font-serif leading-snug">
            {activeTab === 'Preliminary Examination' && 'Preliminary Examination PYQs'}
            {activeTab === 'Main Examination' && 'Main Examination PYQs'}
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 bg-white rounded-2xl border border-slate-100 shadow-xs">
              <Loader2 className="w-8 h-8 text-[#0b3b60] animate-spin" />
              <span className="text-sm font-bold text-slate-500">Loading PYQ repository...</span>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {filteredPdfs.length > 0 ? (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {filteredPdfs.map((item) => {
                    const isMains = (item.exam_type || '').includes('Main');
                    return (
                      <div
                        key={item.id}
                        className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all hover:border-indigo-300 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5 mb-3">
                            {/* Exam Category Badge */}
                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide ${
                              isMains ? 'bg-purple-50 text-purple-700 border border-purple-200/60' : 'bg-blue-50 text-blue-700 border border-blue-200/60'
                            }`}>
                              {item.exam_type || 'Preliminary Examination'}
                            </span>

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

                          <h2 className="text-lg font-bold text-slate-900 font-serif leading-snug mb-3">
                            {item.title}
                          </h2>

                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {item.tags.map(tag => (
                                <span key={tag} className="text-[10px] px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full flex items-center gap-0.5 font-medium">
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
                      </div>
                    );
                  })}
                </motion.div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-bold font-serif text-[#0b3b60] mb-1">
                    No {activeTab} PDFs uploaded yet.
                  </h3>
                  <p className="text-sm text-slate-500">
                    PDF compilations for this category will be updated shortly.
                  </p>
                </div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}

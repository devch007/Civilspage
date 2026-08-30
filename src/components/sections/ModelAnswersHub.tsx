'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Tag, Loader2, Scale, ShieldCheck, Layers, BookOpen } from 'lucide-react';

interface ModelAnswerPdf {
  id: string;
  title: string;
  tags: string[];
  pdf_url: string;
  subject: string;
  year?: number;
  created_at: string;
}

type TabType = 'All' | 'Polity & Governance' | 'Ethics';

export default function ModelAnswersHub() {
  const [pdfs, setPdfs] = useState<ModelAnswerPdf[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('Polity & Governance');

  useEffect(() => {
    fetch('/api/content/model-answers')
      .then((r) => r.json())
      .then((data) => setPdfs(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const polityCount = pdfs.filter(p => (p.subject || '').includes('Polity')).length;
  const ethicsCount = pdfs.filter(p => (p.subject || '').includes('Ethics')).length;

  const filteredPdfs = pdfs.filter(item => {
    if (activeTab === 'All') return true;
    return (item.subject || 'Polity & Governance') === activeTab;
  });

  return (
    <section id="model-answers" className="py-12 sm:py-16 bg-slate-50/50 min-h-screen">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Selection Tabs Above Heading */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1.5">
            {/* Polity & Governance Tab */}
            <button
              onClick={() => setActiveTab('Polity & Governance')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all relative ${
                activeTab === 'Polity & Governance'
                  ? 'bg-[#0b3b60] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Scale className={`w-4 h-4 ${activeTab === 'Polity & Governance' ? 'text-amber-300' : 'text-slate-400'}`} />
              <span>Polity &amp; Governance</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                activeTab === 'Polity & Governance' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {polityCount}
              </span>
            </button>

            {/* Ethics Tab */}
            <button
              onClick={() => setActiveTab('Ethics')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all relative ${
                activeTab === 'Ethics'
                  ? 'bg-[#0b3b60] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className={`w-4 h-4 ${activeTab === 'Ethics' ? 'text-amber-300' : 'text-slate-400'}`} />
              <span>Ethics</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                activeTab === 'Ethics' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {ethicsCount}
              </span>
            </button>

            {/* All Model Answers Tab */}
            <button
              onClick={() => setActiveTab('All')}
              className={`py-3 px-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'All'
                  ? 'bg-[#0b3b60] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title="Show all Model Answers"
            >
              <Layers className={`w-3.5 h-3.5 ${activeTab === 'All' ? 'text-amber-300' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">All</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                activeTab === 'All' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {pdfs.length}
              </span>
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span>UPSC Mains Model Answers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b3b60] font-serif leading-snug">
            {activeTab === 'Polity & Governance' && 'Polity & Governance Model Answers'}
            {activeTab === 'Ethics' && 'Ethics, Integrity & Aptitude Model Answers'}
            {activeTab === 'All' && 'All Solved Model Answers & Frameworks'}
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 bg-white rounded-2xl border border-slate-100 shadow-xs">
              <Loader2 className="w-8 h-8 text-[#0b3b60] animate-spin" />
              <span className="text-sm font-bold text-slate-500">Loading model answers repository...</span>
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
                    const isEthics = (item.subject || '').includes('Ethics');
                    return (
                      <div
                        key={item.id}
                        className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all hover:border-indigo-300 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5 mb-3">
                            {/* Subject Category Badge */}
                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide ${
                              isEthics ? 'bg-purple-50 text-purple-700 border border-purple-200/60' : 'bg-blue-50 text-blue-700 border border-blue-200/60'
                            }`}>
                              {item.subject || 'Polity & Governance'}
                            </span>

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
                  <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-bold font-serif text-[#0b3b60] mb-1">
                    No {activeTab} Model Answers uploaded yet.
                  </h3>
                  <p className="text-sm text-slate-500">
                    Model answer PDF compilations for this subject will be uploaded shortly.
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

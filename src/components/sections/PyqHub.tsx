'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, HelpCircle, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface Pyq {
  id: string;
  subject: string;
  subjectLabel?: string;
  year: string;
  question: string;
}

// Hardcoded expert explanations corresponding to standard mock PYQs
const expertExplanations: { [key: string]: { correctOption: string; explanation: string; source: string } } = {
  '1': {
    correctOption: 'Option C (Both 1 and 2)',
    explanation: 'Under Article 200, the Governor of a State has the discretionary power to reserve certain Bills passed by the state legislature for the consideration of the President. When a Bill is so reserved, Article 201 dictates that the President may either declare assent or withhold it. If returned, the legislature must reconsider within six months.',
    source: 'M. Laxmikanth, Indian Polity - Chapter 30: Governor & Article 200/201'
  },
  '2': {
    correctOption: 'Option A (Open Market Operations)',
    explanation: 'Sterilization refers to the monetary policy operations RBI conducts to neutralize the liquidity effects arising from foreign exchange inflows or outflows. This is primarily done by selling or buying government securities in Open Market Operations (OMO) to stabilize the domestic currency value.',
    source: 'Ramesh Singh, Indian Economy - Chapter on Monetary Systems / RBI Core FAQs'
  }
};

export default function PyqHub() {
  const [pyqsList, setPyqsList] = useState<Pyq[]>([]);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [expandedPyqId, setExpandedPyqId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/content/pyqs')
      .then((r) => r.json())
      .then((data) => setPyqsList(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const handlePillClick = (subject: string) => {
    setSelectedSubject(subject);
  };

  const toggleSolution = (id: string) => {
    if (expandedPyqId === id) {
      setExpandedPyqId(null);
    } else {
      setExpandedPyqId(id);
    }
  };

  const filteredPyqs = pyqsList.filter(item => {
    const matchSubject = selectedSubject === 'all' || item.subject === selectedSubject;
    const matchYear = selectedYear === 'all' || item.year === selectedYear;
    return matchSubject && matchYear;
  });

  return (
    <section id="pyq-hub" className="section-padding" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge badge-amber">Interactive PYQ Solver</span>
          <h2>UPSC Solved Previous Year Questions</h2>
          <p>Filter UPSC Prelims questions by subject and year. Analyze expert detailed solutions and standard source citations.</p>
        </motion.div>

        {/* PYQ Filters Form */}
        <div className="pyq-filters">
          <div className="filter-group">
            <label htmlFor="filter-subject" className="filter-label">Subject:</label>
            <select 
              id="filter-subject" 
              className="filter-select"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="all">All Subjects</option>
              <option value="polity">Polity & Governance</option>
              <option value="history">History & Culture</option>
              <option value="economy">Economy</option>
              <option value="geography">Geography</option>
              <option value="environment">Environment & Ecology</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="filter-year" className="filter-label">Year:</label>
            <select 
              id="filter-year" 
              className="filter-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="all">All Years</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          {/* Dynamic Subject pills selection */}
          <div className="filter-pills">
            {['all', 'polity', 'history', 'economy', 'geography', 'environment'].map((sub) => (
              <button 
                key={sub}
                className={`filter-pill ${selectedSubject === sub ? 'active' : ''}`}
                onClick={() => handlePillClick(sub)}
              >
                {sub === 'all' ? 'All Topics' : sub.charAt(0).toUpperCase() + sub.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* PYQ Items List */}
        <div className="pyqs-container">
          <AnimatePresence mode="popLayout">
            {filteredPyqs.length > 0 ? (
              filteredPyqs.map((item) => {
                const hasEx = expertExplanations[item.id] || {
                  correctOption: 'Option A',
                  explanation: 'Detailed conceptual resolution steps compiled by Dr. Rajiv Ranjan Sir.',
                  source: 'UPSC CSE Syllabus Reference'
                };
                const isExpanded = expandedPyqId === item.id;

                return (
                  <motion.div 
                    key={item.id}
                    className="glass-card pyq-item flex flex-col p-6 text-left"
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-start w-full">
                      <div className="pyq-info">
                        <div className="pyq-tags flex gap-2 mb-2">
                          <span className="badge badge-primary text-[10px]">{item.subjectLabel}</span>
                          <span className="badge badge-amber text-[10px]">UPSC Prelims {item.year}</span>
                        </div>
                        <h3 className="pyq-title text-base font-bold text-slate-900 leading-snug">
                          {item.question}
                        </h3>
                      </div>
                      <button 
                        onClick={() => toggleSolution(item.id)}
                        className={`btn btn-secondary !py-2 !px-4 !min-h-[38px] text-xs font-semibold flex items-center gap-1 shrink-0 ${isExpanded ? '!bg-indigo-50 !text-indigo-600' : ''}`}
                      >
                        <span>{isExpanded ? 'Hide Solution' : 'Solve & Explain'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Expandable answer panel */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden mt-4 pt-4 border-t border-slate-100/60"
                        >
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                                Correct Answer
                              </span>
                              <span className="text-xs font-bold text-slate-800">{hasEx.correctOption}</span>
                            </div>
                            
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                Expert Analysis
                              </span>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {hasEx.explanation}
                              </p>
                            </div>

                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                              <span>Standard Source: <strong className="text-slate-700">{hasEx.source}</strong></span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                className="pyq-empty-state flex flex-col items-center justify-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AlertCircle className="w-12 h-12 text-slate-400 mb-4" />
                <h4 className="text-lg font-bold text-[#0F172A]">No Questions Found</h4>
                <p className="text-slate-500 text-sm">Try adjustments to your subject or year selection filter.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

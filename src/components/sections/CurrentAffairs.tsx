'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface Affair {
  id: string;
  date: string;
  title: string;
  category: string;
  content?: string | null;
}

export default function CurrentAffairs() {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly'>('weekly');
  const [weeklyAffairs, setWeeklyAffairs] = useState<Affair[]>([]);

  useEffect(() => {
    fetch('/api/content/affairs')
      .then((r) => r.json())
      .then((data) => setWeeklyAffairs(Array.isArray(data) ? data.slice(0, 6) : []))
      .catch(() => {});
  }, []);

  return (
    <section id="current-affairs" className="section-padding">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge badge-primary">Current Affairs Center</span>
          <h2>UPSC High-Yield News Summaries</h2>
          <p>Save time with curated, syllabus-mapped briefs. Toggle weekly or monthly digests to download or study.</p>
        </motion.div>

        <div className="current-affairs-tabs">
          <button 
            className={`tab-btn ${activeTab === 'weekly' ? 'active' : ''}`}
            onClick={() => setActiveTab('weekly')}
          >
            Weekly Updates
          </button>
          <button 
            className={`tab-btn ${activeTab === 'monthly' ? 'active' : ''}`}
            onClick={() => setActiveTab('monthly')}
          >
            Monthly Magazines
          </button>
        </div>

        {/* Tab content panels */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === 'weekly' ? (
              <motion.div 
                key="weekly-panel"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="affairs-grid"
              >
                {weeklyAffairs.length > 0 ? (
                  weeklyAffairs.map((af) => (
                    <div key={af.id} className="glass-card affairs-card flex flex-col justify-between p-6 text-left">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-bold text-slate-400">{af.date}</span>
                          <span className="text-[10px] text-slate-300 font-bold">•</span>
                          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">
                            {af.category}
                          </span>
                          <span className="text-[10px] text-slate-300 font-bold">•</span>
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-0.5">
                            <BookOpen className="w-3 h-3 text-slate-400" /> {af.content ? `${Math.max(1, Math.ceil(af.content.split(' ').length / 200))} min` : '1 min'}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">
                          {af.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {af.content ? af.content.slice(0, 120).replace(/<[^>]*>/g, '') + '…' : 'Read the full update →'}
                        </p>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-100/60 pt-4 mt-6">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px]">RR</div>
                          <div className="text-left">
                            <span className="block text-[10px] font-bold text-slate-800">Rajiv Ranjan Singh</span>
                            <span className="block text-[8px] text-slate-400 font-medium">UPSC Core Mentor</span>
                          </div>
                        </div>
                        <Link href={`/updates/${af.id}`} className="card-link text-xs font-bold text-indigo-600 flex items-center gap-0.5" aria-label={`Read analysis for ${af.title}`}>
                          <span>Read</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-slate-500 font-semibold">
                    No weekly updates available.
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="monthly-panel"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="affairs-grid"
              >
                {/* Monthly Card 1 */}
                <div className="glass-card affairs-card affairs-monthly-card flex flex-col justify-between p-6 text-left">
                  <div>
                    <span className="affairs-date block text-[10px] font-bold text-slate-400 mb-2">June 2026</span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">Monthly Focus Magazine: June Edition</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-6">
                      120 pages of high-yield compilations covering polity bills, economic surveys, biodiversity indicators, and international geopolitics. Contains Mains answer writing models.
                    </p>
                  </div>
                  <a href="#" className="btn btn-primary w-full text-xs flex items-center justify-center gap-2 mt-auto">
                    <Download className="w-4 h-4" />
                    Download PDF (12MB)
                  </a>
                </div>

                {/* Monthly Card 2 */}
                <div className="glass-card affairs-card affairs-monthly-card flex flex-col justify-between p-6 text-left">
                  <div>
                    <span className="affairs-date block text-[10px] font-bold text-slate-400 mb-2">May 2026</span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">Monthly Focus Magazine: May Edition</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-6">
                      Comprehensive current affairs tracking with specialized sections on Science & Tech advances, ancient history art findings, and internal security challenges.
                    </p>
                  </div>
                  <a href="#" className="btn btn-primary w-full text-xs flex items-center justify-center gap-2 mt-auto">
                    <Download className="w-4 h-4" />
                    Download PDF (10MB)
                  </a>
                </div>

                {/* Monthly Card 3 */}
                <div className="glass-card affairs-card affairs-monthly-card flex flex-col justify-between p-6 text-left">
                  <div>
                    <span className="affairs-date block text-[10px] font-bold text-slate-400 mb-2">April 2026</span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">Monthly Focus Magazine: April Edition</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-6">
                      Thorough coverage of international bodies, bilateral military exercises, government schemes launched, and indices compilation.
                    </p>
                  </div>
                  <a href="#" className="btn btn-primary w-full text-xs flex items-center justify-center gap-2 mt-auto">
                    <Download className="w-4 h-4" />
                    Download PDF (14MB)
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

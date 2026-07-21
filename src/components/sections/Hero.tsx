'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>
      <div className="hero-glow-3" style={{
        position: 'absolute',
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: 'rgba(217, 119, 6, 0.08)',
        filter: 'blur(100px)',
        bottom: '20%',
        right: '25%',
        zIndex: 1
      }}></div>
      
      <div className="container">
        <div className="hero-grid">
          {/* Text Content */}
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge badge-primary gap-1.5 flex items-center w-fit">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
              Premium UPSC Preparation Portal
            </span>
            <h1 className="hero-title">
              Master UPSC with<br /><span>Expert Guidance</span>
            </h1>
            <p className="hero-subtitle">
              Accelerate your IAS journey with top-tier syllabus guides, filterable previous year questions, daily high-yield current affairs, and comprehensive interactive mock tests.
            </p>
            <div className="hero-ctas">
              <Link href="#mock-test" className="btn btn-primary">
                Start Free Quiz
              </Link>
              <Link href="#study-material" className="btn btn-secondary flex items-center gap-1.5">
                Explore Notes
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
            </div>
          </motion.div>

          {/* Interactive Floating Visuals */}
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="floating-hero-card bg-white rounded-2xl border border-slate-100 shadow-2xl p-5 select-none relative text-left w-full max-w-[460px]">
              {/* Header Bar Mock */}
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                </div>
                <div className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  UPSC GS-II Workspace
                </div>
              </div>

              {/* Grid Content Mock */}
              <div className="grid grid-cols-2 gap-4">
                {/* Left Card: Progress Tracker */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                  <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-indigo-600"
                        strokeWidth="3.5"
                        strokeDasharray="78, 100"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-xs font-bold text-indigo-900">78%</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-900">Syllabus Covered</span>
                  <span className="text-[9px] font-medium text-slate-400">GS II Polity Core</span>
                </div>

                {/* Right Card: Solved Stats */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Live Active
                    </span>
                    <span className="text-[9px] font-bold text-slate-400">July 2026</span>
                  </div>
                  <div className="my-2">
                    <span className="block text-xl font-bold text-slate-900 leading-none">1,420</span>
                    <span className="text-[9px] font-medium text-slate-500">PYQs Solved</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>

              {/* Doubts Chat Simulator */}
              <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Interactive Doubt Resolver
                </span>
                
                {/* Doubt bubble */}
                <div className="flex gap-2.5 items-start">
                  <div className="w-6.5 h-6.5 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-[9px] text-indigo-700 shrink-0">
                    AS
                  </div>
                  <div className="flex-1 bg-white p-2 rounded-lg border border-slate-100 text-[10.5px] leading-relaxed">
                    <span className="block font-bold text-slate-800 mb-0.5">Aditya S.</span>
                    <span className="text-slate-500">Sir, should we focus on Sarkaria recommendations?</span>
                  </div>
                </div>

                {/* Reply bubble */}
                <div className="flex gap-2.5 items-start justify-end">
                  <div className="flex-1 bg-indigo-50 p-2 rounded-lg border border-indigo-100/50 text-[10.5px] text-right leading-relaxed">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> Resolved
                      </span>
                      <span className="font-bold text-indigo-900">Rajiv Ranjan Sir</span>
                    </div>
                    <span className="text-slate-700">Yes, specifically Chapter 4 legislative relations!</span>
                  </div>
                  <div className="w-6.5 h-6.5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px] shrink-0">
                    RR
                  </div>
                </div>
              </div>

              {/* Floating Stat Badges */}
              <motion.div 
                className="floating-stat-badge badge-1"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              >
                <div className="floating-stat-icon">★</div>
                <div className="floating-stat-info">
                  <h4>AIR 4, 18, 29</h4>
                  <p>In UPSC CSE 2025</p>
                </div>
              </motion.div>
              <motion.div 
                className="floating-stat-badge badge-2"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: 3 }}
              >
                <div className="floating-stat-icon success">✓</div>
                <div className="floating-stat-info">
                  <h4>5,000+ PYQs</h4>
                  <p>With Subject Filters</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

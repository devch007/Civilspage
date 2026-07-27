'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2, Star, Zap, BookOpen, ShieldCheck, Trophy, Flame } from 'lucide-react';

const WORKSPACE_DATA = {
  polity: {
    title: 'GS II Polity Core',
    progress: 84,
    solved: '1,420',
    question: 'Sir, should we focus on Sarkaria Committee recommendations for Governor powers?',
    answer: 'Yes! Focus on Chapter 4 (Legislative Relations) and emergency provisions (Art. 356).',
    color: 'from-indigo-500 to-indigo-600',
  },
  economy: {
    title: 'GS III Economy & Macro',
    progress: 72,
    solved: '1,890',
    question: 'How to approach RBI Monetary Policy stance questions in Prelims?',
    answer: 'Master Repo, Marginal Standing Facility, and inflation targeting frameworks (2-6%).',
    color: 'from-emerald-500 to-teal-600',
  },
  ethics: {
    title: 'GS IV Ethics Case Studies',
    progress: 91,
    solved: '980',
    question: 'What framework works best for administrative dilemma case studies?',
    answer: 'Use Objectivity vs. Compassion matrix + Constitutional values approach.',
    color: 'from-amber-500 to-orange-600',
  },
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'polity' | 'economy' | 'ethics'>('polity');
  const currentSubject = WORKSPACE_DATA[activeTab];

  return (
    <section className="hero relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-radial-gradient" id="hero">
      {/* Background Ambient Glowing Orbs */}
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>
      <div className="absolute w-[320px] h-[320px] rounded-full bg-amber-400/10 blur-[120px] bottom-10 right-1/4 z-0 pointer-events-none"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            className="lg:col-span-7 space-y-6 text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-100/80 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              <span className="text-xs font-semibold text-indigo-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                #1 Rated UPSC CSE Prep Platform · 2026 Edition
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Your Trusted Partner <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600 bg-clip-text text-transparent">
                for UPSC CSE Success
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Accelerate your IAS journey with top-tier syllabus notes by Rajiv Ranjan Singh, 10+ years filterable previous year questions, daily high-yield current affairs, and comprehensive interactive mock tests.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link 
                href="#mock-test" 
                className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/35 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-white/20" />
                Start Free Quiz
              </Link>
              
              <Link 
                href="#study-material" 
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all flex items-center gap-2 group"
              >
                <BookOpen className="w-4 h-4 text-slate-500 group-hover:text-indigo-600 transition-colors" />
                Explore Notes
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>

            {/* Social Proof & Rating Badge */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6">
              <div className="flex items-center -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-700 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white shadow-sm">
                  AK
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white shadow-sm">
                  RS
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white shadow-sm">
                  PS
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white shadow-sm">
                  DV
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-extrabold text-slate-800 ml-1">4.9 / 5.0</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Trusted by <strong className="text-slate-800 font-semibold">2,500+ IAS Aspirants</strong> across India
                </p>
              </div>
            </div>

            {/* Quick Feature Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100/80 hover:bg-indigo-50 hover:text-indigo-700 px-3 py-1 rounded-full transition-colors cursor-default border border-slate-200/60">
                ⚡ 5,000+ Topicwise PYQs
              </span>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100/80 hover:bg-emerald-50 hover:text-emerald-700 px-3 py-1 rounded-full transition-colors cursor-default border border-slate-200/60">
                📰 Daily Current Affairs
              </span>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100/80 hover:bg-amber-50 hover:text-amber-700 px-3 py-1 rounded-full transition-colors cursor-default border border-slate-200/60">
                🧠 Mains Answer Guidance
              </span>
            </div>
          </motion.div>

          {/* Right Interactive Mockup Visual */}
          <motion.div 
            className="lg:col-span-5 relative flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Interactive Workspace Card */}
            <div className="w-full max-w-[460px] bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-2xl p-5 select-none relative text-left ring-1 ring-slate-900/5">
              
              {/* Header Bar Mock */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                </div>

                {/* Subject Selector Tabs */}
                <div className="flex bg-slate-100 p-0.5 rounded-lg text-[10px] font-semibold">
                  <button 
                    onClick={() => setActiveTab('polity')}
                    className={`px-2 py-0.5 rounded-md transition-all ${activeTab === 'polity' ? 'bg-white text-indigo-700 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Polity
                  </button>
                  <button 
                    onClick={() => setActiveTab('economy')}
                    className={`px-2 py-0.5 rounded-md transition-all ${activeTab === 'economy' ? 'bg-white text-emerald-700 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Economy
                  </button>
                  <button 
                    onClick={() => setActiveTab('ethics')}
                    className={`px-2 py-0.5 rounded-md transition-all ${activeTab === 'ethics' ? 'bg-white text-amber-700 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Ethics
                  </button>
                </div>
              </div>

              {/* Subject Title & Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Left Progress Box */}
                <div className="p-3 bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                  <div className="relative w-14 h-14 mb-1.5 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200"
                        strokeWidth="3.8"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-indigo-600 transition-all duration-500"
                        strokeWidth="3.8"
                        strokeDasharray={`${currentSubject.progress}, 100`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-xs font-extrabold text-slate-900">{currentSubject.progress}%</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-900">{currentSubject.title}</span>
                  <span className="text-[9px] font-medium text-slate-400">Syllabus Mastered</span>
                </div>

                {/* Right Solved Stats Box */}
                <div className="p-3 bg-gradient-to-br from-slate-50 to-emerald-50/30 rounded-xl border border-slate-100 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live Active
                    </span>
                    <span className="text-[9px] font-bold text-slate-400">2026 Batch</span>
                  </div>
                  <div className="my-1.5">
                    <span className="block text-xl font-extrabold text-slate-900 leading-none">{currentSubject.solved}</span>
                    <span className="text-[9px] font-medium text-slate-500">PYQs & MCQs Solved</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${currentSubject.progress}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Doubts Chat Simulator */}
              <div className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-100 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                    Interactive Doubt Resolver
                  </span>
                  <span className="text-[9px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                    AI Fast Response
                  </span>
                </div>

                {/* Doubt Bubble */}
                <div className="flex gap-2 items-start">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[9px] shrink-0">
                    AS
                  </div>
                  <div className="flex-1 bg-white p-2 rounded-lg border border-slate-100 text-[10.5px] leading-relaxed shadow-2xs">
                    <span className="block font-bold text-slate-800 mb-0.5">Aditya S. (CSE Aspirant)</span>
                    <span className="text-slate-600">{currentSubject.question}</span>
                  </div>
                </div>

                {/* Faculty Reply Bubble */}
                <div className="flex gap-2 items-start justify-end">
                  <div className="flex-1 bg-indigo-50/80 p-2 rounded-lg border border-indigo-100 text-[10.5px] leading-relaxed shadow-2xs">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-[8px] font-bold text-emerald-700 bg-emerald-100/80 px-1 rounded flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> Resolved
                      </span>
                      <span className="font-extrabold text-indigo-950">Rajiv Ranjan Sir (AIR 12 Mentor)</span>
                    </div>
                    <span className="text-slate-700">{currentSubject.answer}</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[9px] shrink-0 shadow-sm">
                    RR
                  </div>
                </div>
              </div>

              {/* Floating Stat Badge 1 - Top Rankers */}
              <motion.div 
                className="absolute -top-4 -left-6 bg-white/95 backdrop-blur-md border border-slate-200/80 p-3 rounded-xl shadow-xl flex items-center gap-2.5 z-20"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
              >
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  <Trophy className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">AIR 4, 18, 29</h4>
                  <p className="text-[10px] text-slate-500 font-medium">In UPSC CSE 2025</p>
                </div>
              </motion.div>

              {/* Floating Stat Badge 2 - Verified Question Bank */}
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-md border border-slate-200/80 p-3 rounded-xl shadow-xl flex items-center gap-2.5 z-20"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 2.5 }}
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">5,000+ PYQs</h4>
                  <p className="text-[10px] text-slate-500 font-medium">With Subject Filters</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, UserCheck, ShieldQuestion } from 'lucide-react';

export default function CseOverview() {
  return (
    <section id="about-cse" className="section-padding" style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-deep)' }}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge badge-primary">Civil Services Examination</span>
          <h2>About the UPSC CSE Exam</h2>
          <p>The Civil Services Examination (CSE) is one of India's most prestigious competitive exams. Understanding its design and scope is your first step towards success.</p>
        </motion.div>

        {/* Premium Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Bento Card 1: Horizontal Stages Timeline (Span 2 Columns on desktop) */}
          <motion.div 
            className="glass-card p-6 flex flex-col justify-between col-span-1 lg:col-span-2 min-h-[280px]"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">Plan of Examination</h3>
                  <span className="text-xs text-slate-400 font-semibold">Three integrated stages of evaluation</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                The UPSC CSE is structured sequentially to evaluate standard academic depth, analytical answer writing competency, and core personal leadership attributes.
              </p>
            </div>

            {/* Horizontal Timeline Graphic */}
            <div className="grid grid-cols-3 gap-2 relative pt-4 border-t border-slate-100">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Stage 1</span>
                <span className="text-xs font-bold text-indigo-600">Prelims</span>
                <span className="text-[10px] text-slate-500 font-medium">Objective GS & CSAT</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Stage 2</span>
                <span className="text-xs font-bold text-indigo-600">Mains</span>
                <span className="text-[10px] text-slate-500 font-medium">9 Written Papers</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Stage 3</span>
                <span className="text-xs font-bold text-indigo-600">Interview</span>
                <span className="text-[10px] text-slate-500 font-medium">Personality Test</span>
              </div>
            </div>
            
            <Link href="/aboutcse" className="btn btn-secondary text-xs mt-6 w-full text-center">
              View Detailed Exam Stages
            </Link>
          </motion.div>

          {/* Bento Card 2: Syllabus tags */}
          <motion.div 
            className="glass-card p-6 flex flex-col justify-between min-h-[280px]"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">Detailed Syllabus</h3>
                  <span className="text-xs text-slate-400 font-semibold">Core GS curriculum coverage</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {['GS I: History & Geo', 'GS II: Polity & IR', 'GS III: Economy & S&T', 'GS IV: Ethics', 'CSAT'].map((tag) => (
                  <span key={tag} className="text-[10px] font-bold text-slate-600 bg-slate-100/80 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link href="/aboutcse#detailed-syllabus" className="btn btn-secondary text-xs w-full text-center mt-auto">
              Browse Complete Syllabus
            </Link>
          </motion.div>

          {/* Bento Card 3: Eligibility checklist */}
          <motion.div 
            className="glass-card p-6 flex flex-col justify-between min-h-[280px]"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">Eligibility Criteria</h3>
                  <span className="text-xs text-slate-400 font-semibold">UPSC requirements checks</span>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-500 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Age limit: 21 to 32 years
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Degree: Graduate (Any discipline)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Attempts: 6 (General), 9 (OBC)
                </li>
              </ul>
            </div>

            <Link href="/aboutcse" className="btn btn-secondary text-xs w-full text-center mt-6">
              Check Eligibility Terms
            </Link>
          </motion.div>

          {/* Bento Card 4: Access to Rajiv Sir (Span 2 Columns on desktop) */}
          <motion.div 
            className="glass-card p-6 flex flex-col justify-between col-span-1 lg:col-span-2 min-h-[280px]"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <ShieldQuestion className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">Direct Access Channel</h3>
                  <span className="text-xs text-slate-400 font-semibold">Instant resolution of prep queries</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Connect and consult with Dr. Rajiv Ranjan Sir directly. Ask questions regarding GS Answer framing templates, optional selection advice, or syllabus priorities, and get direct expert email responses.
              </p>
            </div>

            <Link href="/direct-query" className="btn btn-primary text-xs w-full text-center flex items-center justify-center gap-2">
              <span>Launch Direct Query form</span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

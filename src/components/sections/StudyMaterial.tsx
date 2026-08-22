'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Book, AlertCircle, FileText, FolderArchive, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function StudyMaterial() {
  return (
    <section id="study-material" className="py-16 bg-[#FAF9F6] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0b3b60]/10 text-[#0b3b60] text-[11px] font-extrabold uppercase tracking-wider">
            <FolderArchive className="w-3.5 h-3.5" />
            Knowledge Repository
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b3b60] font-serif mt-2">
            UPSC CSE Syllabus Study Modules
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Access organized, high-yield syllabi dossiers structured for Prelims & Mains examination papers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: GS Papers */}
          <motion.div 
            className="bg-white rounded-xl border border-slate-300 p-6 flex flex-col justify-between text-left hover:border-[#0b3b60] hover:shadow-md transition-all group shadow-xs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#0b3b60]/10 text-[#0b3b60] flex items-center justify-center mb-4 group-hover:bg-[#0b3b60] group-hover:text-white transition-colors">
                <Book className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 font-serif group-hover:text-[#0b3b60] transition-colors">
                Mains GS Core Modules
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Comprehensive subject dossiers covering GS I (Society & Culture), GS II (Polity & Governance), GS III (Economy & Security), and GS IV (Ethics & Case Matrix).
              </p>
            </div>
            <Link href="/updates" className="w-full py-2 bg-slate-100 hover:bg-[#0b3b60] hover:text-white text-[#0b3b60] text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-colors">
              <span>Browse GS Modules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* Card 2: Revision Sheets */}
          <motion.div 
            className="bg-white rounded-xl border border-slate-300 p-6 flex flex-col justify-between text-left hover:border-[#0b3b60] hover:shadow-md transition-all group shadow-xs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#138808]/10 text-[#138808] flex items-center justify-center mb-4 group-hover:bg-[#138808] group-hover:text-white transition-colors">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 font-serif group-hover:text-[#0b3b60] transition-colors">
                Prelims Factual Revision Dossiers
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Rapid revision sheets on Constitutional Bodies, Major Judicial Doctrines, National Policy Timelines, Statutory Authorities, and Economic Indicators.
              </p>
            </div>
            <Link href="/updates" className="w-full py-2 bg-slate-100 hover:bg-[#0b3b60] hover:text-white text-[#0b3b60] text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-colors">
              <span>Access Revision Sheets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* Card 3: Ethics & CSAT */}
          <motion.div 
            className="bg-white rounded-xl border border-slate-300 p-6 flex flex-col justify-between text-left hover:border-[#0b3b60] hover:shadow-md transition-all group shadow-xs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-800 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 font-serif group-hover:text-[#0b3b60] transition-colors">
                Administrative Ethics Case Studies
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Applied case framework modules with stakeholder matrices, Nolan Committee benchmarks, and constitutional value prioritization for GS IV scoring.
              </p>
            </div>
            <Link href="/subject/ethics" className="w-full py-2 bg-slate-100 hover:bg-[#0b3b60] hover:text-white text-[#0b3b60] text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-colors">
              <span>View Case Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Tag, 
  BookOpen, 
  ArrowLeft, 
  Loader2, 
  Award, 
  Bookmark, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { getAffairs, type Affair } from '@/lib/supabase';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function UpdateDetail({ params }: PageProps) {
  const [update, setUpdate] = useState<Affair | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      try {
        const resolvedParams = await params;
        const targetId = Number(resolvedParams.id);
        const list = await getAffairs();
        const found = list.find((item) => item.id === targetId);
        
        if (found) {
          setUpdate(found);
        } else {
          setErrorMsg('The requested announcement could not be found.');
        }
      } catch (err) {
        console.error("Failed to load update details:", err);
        setErrorMsg('Error connecting to the database server.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params]);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-deep)', padding: '140px 0 80px 0' }}>
      <div className="container max-w-4xl">
        
        {/* Navigation Breadcrumb */}
        <Link href="/updates" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Current Updates</span>
        </Link>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <span className="text-sm font-bold text-slate-400">Loading announcement details...</span>
          </div>
        ) : errorMsg ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900">{errorMsg}</h2>
            <p className="text-slate-500 text-sm">Please verify the URL link or select a different update brief.</p>
            <Link href="/updates" className="btn btn-primary inline-flex">
              Return to Feeds
            </Link>
          </div>
        ) : update ? (
          <motion.article 
            className="glass-card bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden text-left p-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* cover image banner */}
            {update.imageUrl ? (
              <div className="relative w-full h-[320px] overflow-hidden bg-slate-100 border-b border-slate-100">
                <img
                  src={update.imageUrl}
                  alt={update.title}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-full h-8 bg-gradient-to-r from-indigo-50 to-emerald-50 border-b border-slate-100/60"></div>
            )}

            {/* Content Padding container */}
            <div className="p-6 md:p-10 space-y-6">
              
              {/* Meta information tags */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  {update.date}
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1 text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">
                  <Tag className="w-3.5 h-3.5 text-indigo-500" />
                  {update.category}
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  4 min read
                </span>
                <span className="text-slate-300 ml-auto hidden sm:inline">•</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded uppercase hidden sm:inline-block">
                  Official Notification
                </span>
              </div>

              {/* Title Header */}
              <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.25, margin: 0 }}>
                {update.title}
              </h1>

              {/* Summary description paragraph (Main Body) */}
              <div className="prose max-w-none text-[#1f2937]" style={{ fontSize: '1.05rem', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                <p className="mb-4 leading-relaxed font-medium">
                  {update.summary}
                </p>
                
                {/* Simulated dynamic paragraphs to make it look like a fully fledged UPSC strategy article */}
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  For UPSC Civil Services Examination aspirants, maintaining close tracking of updates under General Studies Paper II (Polity and Governance) is extremely vital. Dr. Rajiv Ranjan Sir suggests mapping this brief to the standard core components of the syllabus (Constitutional revisions and legal frameworks).
                </p>
              </div>

              {/* Quote from Sir */}
              <div className="p-4 bg-slate-50 border-l-4 border-indigo-600 rounded-r-xl my-6">
                <blockquote className="text-slate-700 italic text-sm font-medium">
                  &ldquo;A successful civil services candidate bridges theoretical foundation models from textbooks with live, high-yield announcements and judicial updates.&rdquo;
                </blockquote>
                <cite className="block text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-wider">
                  — Dr. Rajiv Ranjan Singh, Lead Academic Advisor
                </cite>
              </div>

              {/* UPSC Strategy box */}
              <div className="p-5 border border-amber-200/60 bg-amber-50/40 rounded-xl space-y-3 text-sm">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4.5 h-4.5 text-amber-600 animate-pulse" />
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-xs">
                    Mentor Answer Writing Tip
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  When answering questions in the CSE Mains related to this development, cite standard constitutional committees (such as the Sarkaria or Punchhi Commissions) and explain checks-and-balances frameworks. Add this brief as a contemporary citation to secure 1.5 to 2 extra marks per answer sheet!
                </p>
              </div>

              {/* Author Biography Footer */}
              <div className="border-t border-slate-100 pt-8 mt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-slate-50/50 -mx-6 -mb-6 md:-mx-10 md:-mb-10 p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                    RR
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-bold text-slate-900 leading-tight">Dr. Rajiv Ranjan Singh</span>
                    <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider">UPSC IAS Core Mentor</span>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <Link href="/direct-query" className="btn btn-secondary !py-2 !px-4 text-xs font-semibold flex items-center gap-1.5 flex-grow sm:flex-grow-0 justify-center">
                    <MessageSquare className="w-4 h-4 text-indigo-500" />
                    <span>Consult Sir</span>
                  </Link>
                  <button 
                    onClick={() => alert('Syllabus brief successfully bookmarked to account.')}
                    className="btn btn-secondary !py-2 !px-4 text-xs font-semibold flex items-center gap-1.5 flex-grow sm:flex-grow-0 justify-center"
                  >
                    <Bookmark className="w-4 h-4 text-indigo-500" />
                    <span>Save Article</span>
                  </button>
                </div>
              </div>

            </div>
          </motion.article>
        ) : null}

      </div>
    </main>
  );
}

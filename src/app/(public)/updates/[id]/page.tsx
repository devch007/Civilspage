'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar, Tag, BookOpen, ArrowLeft, Loader2,
  Bookmark, MessageSquare, Sparkles
} from 'lucide-react';

interface Affair {
  id: string;
  date: string;
  title: string;
  category: string;
  content?: string | null;
  featuredImage?: string | null;
  pdfUrl?: string | null;
  published: boolean;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function UpdateDetail({ params }: PageProps) {
  const [update, setUpdate] = useState<Affair | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const { id } = await params;
        const res = await fetch(`/api/content/affairs/${id}`);
        if (res.status === 404) {
          setErrorMsg('The requested announcement could not be found.');
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const affair: Affair = await res.json();
        setUpdate(affair);
      } catch (err) {
        console.error('Failed to load update details:', err);
        setErrorMsg('Error loading this update. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params]);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-deep)', padding: '140px 0 80px 0' }}>
      <div className="container max-w-4xl">

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
            {/* Cover image */}
            {update.featuredImage ? (
              <div className="relative w-full h-[320px] overflow-hidden bg-slate-100 border-b border-slate-100">
                <img src={update.featuredImage} alt={update.title} className="object-cover w-full h-full" />
              </div>
            ) : (
              <div className="w-full h-8 bg-gradient-to-r from-indigo-50 to-emerald-50 border-b border-slate-100/60" />
            )}

            <div className="p-6 md:p-10 space-y-6">
              {/* Meta */}
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
                  {update.content ? `${Math.max(1, Math.ceil(update.content.split(' ').length / 200))} min read` : '1 min read'}
                </span>
              </div>

              {/* Title */}
              <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.25, margin: 0 }}>
                {update.title}
              </h1>

              {/* Content */}
              <div className="prose max-w-none text-[#1f2937]" style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>
                {update.content ? (
                  <p className="mb-4 leading-relaxed">{update.content}</p>
                ) : (
                  <p className="mb-4 leading-relaxed text-slate-500 italic">No detailed content available for this update.</p>
                )}
              </div>

              {/* PDF link if available */}
              {update.pdfUrl && (
                <a
                  href={update.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  📄 Download PDF
                </a>
              )}

              {/* Quote */}
              <div className="p-4 bg-slate-50 border-l-4 border-indigo-600 rounded-r-xl my-6">
                <blockquote className="text-slate-700 italic text-sm font-medium">
                  &ldquo;A successful civil services candidate bridges theoretical foundation models from textbooks with live, high-yield announcements and judicial updates.&rdquo;
                </blockquote>
                <cite className="block text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-wider">
                  — Dr. Rajiv Ranjan Singh, Lead Academic Advisor
                </cite>
              </div>

              {/* Tip box */}
              <div className="p-5 border border-amber-200/60 bg-amber-50/40 rounded-xl space-y-3 text-sm">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-xs">Mentor Answer Writing Tip</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  When answering questions in the CSE Mains related to this development, cite standard constitutional committees and explain checks-and-balances frameworks. Add this brief as a contemporary citation to secure 1.5 to 2 extra marks per answer sheet!
                </p>
              </div>

              {/* Author footer */}
              <div className="border-t border-slate-100 pt-8 mt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-slate-50/50 -mx-6 -mb-6 md:-mx-10 md:-mb-10 p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">RR</div>
                  <div>
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
                    onClick={() => alert('Article saved!')}
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

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar, Tag, BookOpen, ArrowLeft, Loader2,
  Bookmark, MessageSquare
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
          setErrorMsg('The requested update could not be found.');
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

  const backUrl = update?.category
    ? `/updates?category=${encodeURIComponent(update.category)}`
    : '/updates';

  const backText = update?.category
    ? `Back to ${update.category}`
    : 'Back to Current Updates';

  return (
    <main className="min-h-screen bg-[#FAF9F6] pt-6 sm:pt-8 pb-16">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">

        <Link href={backUrl} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>{backText}</span>
        </Link>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <span className="text-sm font-bold text-slate-400">Loading update details...</span>
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
            className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden text-left p-6 sm:p-10 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-serif text-slate-900 leading-snug">
              {update.title}
            </h1>

            {/* Content */}
            <div className="prose max-w-none text-[#1f2937] leading-relaxed text-sm sm:text-base">
              {update.content ? (
                <p className="mb-4 whitespace-pre-wrap">{update.content}</p>
              ) : (
                <p className="mb-4 text-slate-500 italic">No detailed content available for this update.</p>
              )}
            </div>

            {/* Actions Footer Bar */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap justify-between items-center gap-4">
              {update.pdfUrl ? (
                <a
                  href={update.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
                >
                  📄 Download PDF Document
                </a>
              ) : (
                <div />
              )}
              
              <div className="flex gap-2">
                <Link href="/direct-query" className="btn btn-secondary !py-2 !px-3 text-xs font-semibold flex items-center gap-1.5 justify-center">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Ask a Query</span>
                </Link>
              </div>
            </div>
          </motion.article>
        ) : null}
      </div>
    </main>
  );
}

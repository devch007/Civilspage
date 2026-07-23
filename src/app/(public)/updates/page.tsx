'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Tag, Sparkles, BookOpen, Loader2 } from 'lucide-react';

interface Affair {
  id: string;
  date: string;
  title: string;
  category: string;
  content?: string;
  featuredImage?: string | null;
}

export default function CurrentUpdates() {
  const [updates, setUpdates] = useState<Affair[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/content/affairs')
      .then((r) => r.json())
      .then((data) => setUpdates(data))
      .catch((err) => console.error('Failed to load updates:', err))
      .finally(() => setLoading(false));
  }, []);


  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-deep)', padding: '140px 0 80px 0' }}>
      <div className="container">
        
        {/* Banner Section */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="badge badge-primary gap-1 flex items-center w-fit mx-auto mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
            Live Academic Feeds
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px 0' }}>
            Current Updates & Announcements
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Stay informed with the latest notifications, syllabus updates, exam results briefings, and official updates posted regularly by Rajiv Ranjan Singh Sir.
          </p>
        </div>

        {/* Responsive Grid of Cards */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <span className="text-sm font-bold text-slate-400">Loading current updates database...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updates.length > 0 ? (
              updates.map((item, index) => (
                <Link href={`/updates/${item.id}`} key={item.id} className="block cursor-pointer group">
                  <motion.div 
                    className="glass-card flex flex-col justify-between overflow-hidden p-0 text-left h-full transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.4) }}
                    style={{ minHeight: '380px' }}
                  >
                    <div>
                      {/* Optional Card Image Banner */}
                      {item.featuredImage ? (
                        <div className="relative w-full h-44 overflow-hidden rounded-t-xl bg-slate-100 border-b border-slate-100">
                          <img
                            src={item.featuredImage}
                            alt={item.title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="h-4 w-full bg-slate-50/50"></div>
                      )}

                      <div className="p-5">
                        {/* Meta Tags */}
                        <div className="flex items-center gap-2 mb-3 text-[10.5px] font-bold text-slate-400">
                          <span className="flex items-center gap-1 shrink-0">
                            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                            {item.date}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1 text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase shrink-0">
                            <Tag className="w-3 h-3 text-indigo-500" />
                            {item.category}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1 text-slate-400 flex items-center gap-0.5 shrink-0">
                            <BookOpen className="w-3 h-3 text-slate-450" /> 4 min read
                          </span>
                        </div>

                        {/* Title: 24px */}
                        <h3 className="group-hover:text-indigo-600 transition-colors" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '12px' }}>
                          {item.title}
                        </h3>

                        {/* Content excerpt */}
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                          {item.content ? item.content.slice(0, 160).replace(/<[^>]*>/g, '') + '…' : 'Read more →'}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer Profile */}
                    <div className="p-5 border-t border-slate-100/60 bg-slate-50/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                          RR
                        </div>
                        <div className="text-left">
                          <span className="block text-[11px] font-bold text-slate-800 leading-tight">Rajiv Ranjan Singh</span>
                          <span className="block text-[9px] text-slate-400 font-semibold leading-none">UPSC Lead Mentor</span>
                        </div>
                      </div>
                      
                      <span className="text-[10px] font-bold text-slate-450 group-hover:text-indigo-600 transition-colors">
                        Read More →
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100">
                <h4 className="text-lg font-bold text-slate-900 mb-1">No Announcements Yet</h4>
                <p className="text-slate-400 text-sm">Announcements posted inside the Admin Panel will immediately display here.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}

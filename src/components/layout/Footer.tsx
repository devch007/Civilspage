'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Send, CheckCircle2, ChevronRight, ArrowUpRight, BookOpen, Award, ShieldCheck, Sparkles, ArrowUp, Phone, FileText } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' | null }>({ text: '', type: null });
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFeedback({
        text: 'Subscribed to Gazette & Contemporary Dispatches!',
        type: 'success'
      });
      setEmail('');
    }, 700);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto bg-[#0b3b60] text-slate-100 border-t-2 border-amber-500 text-xs relative overflow-hidden">
      
      {/* 1. National Tricolor Strip */}
      <div className="h-[3.5px] w-full flex">
        <div className="w-1/3 bg-[#FF9933]"></div>
        <div className="w-1/3 bg-[#FFFFFF] opacity-95"></div>
        <div className="w-1/3 bg-[#138808]"></div>
      </div>

      {/* Decorative subtle ambient accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* 2. Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-white/15">
          
          {/* Col 1: Brand & Mentorship Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block bg-white rounded-xl p-2.5 shadow-sm hover:shadow-md transition-all group">
              <img 
                src="/logo_civilspage.png" 
                alt="CivilsPAGE - Learn • Aspire • Achieve" 
                className="h-14 sm:h-16 w-auto object-contain transition-transform group-hover:scale-[1.02]" 
              />
            </Link>

            <p className="text-xs text-slate-200 leading-relaxed font-normal">
              A comprehensive academic repository for UPSC Civil Services Examination. Curated insights on Indian Constitution, statutory legislation, landmark judicial rulings, administrative governance, and Ethics.
            </p>

            {/* Contact Coordinates */}
            <div className="pt-1 text-[11.5px] text-slate-200 space-y-2">
              <div className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                <Mail className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <a href="mailto:rajivranjansingh@civilspage.com">rajivranjansingh@civilspage.com</a>
              </div>
              <div className="flex items-center gap-2 hover:text-amber-300 transition-colors">
                <Phone className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <a href="tel:+919811576540">+91 98115 76540</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Col 2: Contemporary Perspectives (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-widest pb-1.5 border-b border-white/15 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              Contemporary Feeds
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/updates?category=Constitutional Amendments" className="text-slate-200 hover:text-amber-300 flex items-center gap-1.5 transition-colors group">
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 transition-colors" />
                  <span>Constitutional Amendments</span>
                </Link>
              </li>
              <li>
                <Link href="/updates?category=Ordinary Laws" className="text-slate-200 hover:text-amber-300 flex items-center gap-1.5 transition-colors group">
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 transition-colors" />
                  <span>Ordinary Laws &amp; Acts</span>
                </Link>
              </li>
              <li>
                <Link href="/updates?category=Court Judgements" className="text-slate-200 hover:text-amber-300 flex items-center gap-1.5 transition-colors group">
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 transition-colors" />
                  <span>Supreme Court Judgements</span>
                </Link>
              </li>
              <li>
                <Link href="/updates?category=Policies %26 Programs" className="text-slate-200 hover:text-amber-300 flex items-center gap-1.5 transition-colors group">
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 transition-colors" />
                  <span>Policies &amp; Programmes</span>
                </Link>
              </li>
              <li>
                <Link href="/updates?category=Commissions %26 Committees" className="text-slate-200 hover:text-amber-300 flex items-center gap-1.5 transition-colors group">
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 transition-colors" />
                  <span>Commissions &amp; Reports</span>
                </Link>
              </li>
              <li>
                <Link href="/updates?category=Ethical Issues" className="text-slate-200 hover:text-amber-300 flex items-center gap-1.5 transition-colors group">
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 transition-colors" />
                  <span>Ethical Issues &amp; Governance</span>
                </Link>
              </li>
              <li>
                <Link href="/updates?category=Ethical Case Studies" className="text-slate-200 hover:text-amber-300 flex items-center gap-1.5 transition-colors group">
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 transition-colors" />
                  <span>Ethical Case Studies</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Foundation & Practice (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-widest pb-1.5 border-b border-white/15 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Practice &amp; Prep
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/pyqs" className="text-slate-200 hover:text-amber-300 flex items-center gap-1.5 transition-colors group">
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 transition-colors" />
                  <span>PYQs Database</span>
                </Link>
              </li>
              <li>
                <Link href="/mock-tests" className="text-slate-200 hover:text-amber-300 flex items-center gap-1.5 transition-colors group">
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 transition-colors" />
                  <span>Mock Tests</span>
                </Link>
              </li>
              <li>
                <Link href="/model-answers" className="text-slate-200 hover:text-amber-300 flex items-center gap-1.5 transition-colors group">
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 transition-colors" />
                  <span>Model Answers</span>
                </Link>
              </li>
              <li>
                <Link href="/aboutcse" className="text-slate-200 hover:text-amber-300 flex items-center gap-1.5 transition-colors group">
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 transition-colors" />
                  <span>Scheme of Exam</span>
                </Link>
              </li>
              <li>
                <Link href="/about-mentor" className="text-slate-200 hover:text-amber-300 flex items-center gap-1.5 transition-colors group">
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 transition-colors" />
                  <span>About Mentor</span>
                </Link>
              </li>
              <li>
                <Link href="/direct-query" className="text-slate-200 hover:text-amber-300 flex items-center gap-1.5 transition-colors group">
                  <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-300 transition-colors" />
                  <span>Address Queries</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Dispatch Bulletin (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-widest pb-1.5 border-b border-white/15 flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-amber-300" />
              Gazette Dispatch
            </h4>
            <p className="text-[11px] text-slate-200 leading-relaxed">
              Stay ahead with curated contemporary briefs, statutory analyses, and committee breakdowns delivered directly.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-[#0b3b60] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <span>Subscribing...</span>
                ) : (
                  <>
                    <span>Subscribe Gazette</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0b3b60]" />
                  </>
                )}
              </button>
            </form>

            {feedback.text && (
              <div className="p-2 bg-emerald-900/60 border border-emerald-500/50 rounded-lg flex items-center gap-2 text-[10.5px] font-semibold text-emerald-200 animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>{feedback.text}</span>
              </div>
            )}

            <div className="pt-1">
              <Link 
                href="/direct-query" 
                className="inline-flex items-center gap-2 text-[11px] text-amber-300 hover:text-amber-200 font-semibold transition-colors group"
              >
                <span>Have questions for the mentor?</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* 3. Bottom Legal & Portal Compliance Statement */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-300">
          <div>
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} Reserved by <strong className="text-white">CivilsPAGE</strong>. Designed &amp; Developed by{' '}
              <a 
                href="https://dctechnologies.in" 
                target="_blank" 
                rel="noopener" 
                className="text-amber-300 hover:underline font-bold transition-colors"
                title="DC Technologies - Web & Software Development"
              >
                DC Technologies
              </a>.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[10.5px] text-slate-300">
            <Link href="/" className="hover:text-amber-300 transition-colors">Privacy Policy</Link>
            <span className="text-slate-400">•</span>
            <Link href="/" className="hover:text-amber-300 transition-colors">Terms of Use</Link>
            <span className="text-slate-400">•</span>
            <Link href="/aboutcse" className="hover:text-amber-300 transition-colors">Academic Syllabus</Link>
            <span className="text-slate-400">•</span>
            <Link href="/direct-query" className="hover:text-amber-300 transition-colors">Help &amp; Queries</Link>

            <button
              onClick={scrollToTop}
              className="ml-2 p-1.5 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-[#0b3b60] text-white transition-all border border-white/20"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

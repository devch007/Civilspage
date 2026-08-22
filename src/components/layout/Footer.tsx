'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, CheckCircle, Shield, Star } from 'lucide-react';

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
        text: 'Successfully subscribed to Contemporary Gazettes & Circulars!',
        type: 'success'
      });
      setEmail('');
    }, 800);
  };

  return (
    <footer className="mt-auto bg-[#071d31] text-slate-300 border-t-2 border-amber-500 text-xs">
      
      {/* 1. National Tricolor Strip */}
      <div className="h-[3px] w-full flex">
        <div className="w-1/3 bg-[#FF9933]"></div>
        <div className="w-1/3 bg-[#FFFFFF]"></div>
        <div className="w-1/3 bg-[#138808]"></div>
      </div>

      {/* 2. Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-700/80">
          
          {/* Col 1: Portal Overview */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center group">
              <div>
                <h3 className="text-base font-black tracking-wider text-white font-serif">Civils PAGE</h3>
                <p className="text-[10px] text-amber-300/90 font-medium">UPSC CSE Contemporary Resource Portal</p>
              </div>
            </Link>

            <p className="text-xs text-slate-300 leading-relaxed">
              Dedicated Resource Centre for Contemporary Perspectives on Polity, Administration, Governance & Ethics under the mentorship of <strong className="text-white">Rajiv Ranjan Singh</strong>.
            </p>

            <div className="text-[11px] text-slate-400 space-y-1 pt-1">
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Standard Academic & Examination Frameworks</span>
              </p>
              <p className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Mapped to UPSC Civil Services Examination Syllabi</span>
              </p>
            </div>
          </div>

          {/* Col 2: Core Contemporary Sections */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider pb-1 border-b border-slate-700">
              Contemporary Perspectives
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/updates?category=Legislation" className="hover:text-amber-200 transition-colors">
                  • Legislation & Parliamentary Bills
                </Link>
              </li>
              <li>
                <Link href="/updates?category=Constitutional Amendments" className="hover:text-amber-200 transition-colors">
                  • Constitutional Amendments
                </Link>
              </li>
              <li>
                <Link href="/updates?category=Court Judgements" className="hover:text-amber-200 transition-colors">
                  • Supreme Court Judgements
                </Link>
              </li>
              <li>
                <Link href="/updates?category=Policies %26 Programs" className="hover:text-amber-200 transition-colors">
                  • Government Policies & Schemes
                </Link>
              </li>
              <li>
                <Link href="/updates?category=Commissions %26 Committees" className="hover:text-amber-200 transition-colors">
                  • Commissions & Committees
                </Link>
              </li>
              <li>
                <Link href="/subject/ethics" className="hover:text-amber-200 transition-colors">
                  • Applied Ethics & Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Resources & Important Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider pb-1 border-b border-slate-700">
              Aspirant Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/aboutcse" className="hover:text-amber-200 transition-colors">
                  • About CSE Examination
                </Link>
              </li>
              <li>
                <Link href="/pyqs" className="hover:text-amber-200 transition-colors">
                  • 10-Year Topicwise PYQs
                </Link>
              </li>
              <li>
                <Link href="/#mock-test" className="hover:text-amber-200 transition-colors">
                  • Daily Practice Mini-Quiz
                </Link>
              </li>
              <li>
                <Link href="/updates?category=Model Answers" className="hover:text-amber-200 transition-colors">
                  • Mains Model Answers
                </Link>
              </li>
              <li>
                <Link href="/direct-query" className="hover:text-amber-200 transition-colors">
                  • Direct Faculty Query
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider pb-1 border-b border-slate-700">
              Gazette Dispatch
            </h4>
            <p className="text-[11px] text-slate-300">
              Receive notifications for newly published statutory briefs and committee analyses.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-[#0b2948] border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-1.5 bg-[#FF9933] hover:bg-[#e68524] text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                {loading ? 'Subscribing...' : 'Subscribe Bulletin'}
              </button>
            </form>

            {feedback.text && (
              <p className="text-[10.5px] font-semibold text-emerald-400">
                {feedback.text}
              </p>
            )}

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>rajivranjansingh@civilspage.com</span>
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>New Delhi, India</span>
              </p>
            </div>
          </div>

        </div>

        {/* 3. Bottom Legal & Portal Compliance Statement */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            <p>
              © {new Date().getFullYear()} Reserved by CivilsPAGE. Powered by{' '}
              <a 
                href="https://dctechnologies.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-amber-300 hover:underline font-semibold"
              >
                DC Technologies
              </a>.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[10.5px]">
            <Link href="/" className="hover:text-amber-300">Privacy Policy</Link>
            <span>•</span>
            <Link href="/" className="hover:text-amber-300">Terms of Use</Link>
            <span>•</span>
            <Link href="/direct-query" className="hover:text-amber-300">Help & Feedback</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

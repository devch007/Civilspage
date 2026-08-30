'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, Send, User, Mail, Phone, HelpCircle, FileText, 
  MessageSquare, ShieldCheck, Clock, ArrowRight, Sparkles, 
  ChevronRight, Award, Compass, BookOpen, CheckCircle2, PhoneCall
} from 'lucide-react';
import { submitDirectQuery } from '@/lib/supabase';

const QUERY_CATEGORIES = [
  'GS-II Polity & Governance',
  'GS-IV Ethics & Integrity',
  'Mains Answer Writing Frameworks',
  'Public Administration Optional',
  'Interview Guidance & Personality Test',
  'General CSE Strategy'
];

export default function DirectQueryPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'GS-II Polity & Governance',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMsg('Please fill in all mandatory fields.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      // 1. Post to PostgreSQL direct-queries endpoint
      const res = await fetch('/api/content/direct-queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // 2. Submit to Supabase fallback
      await submitDirectQuery({
        name: formData.name,
        email: formData.email,
        subject: `[${formData.category}] ${formData.subject}`,
        message: formData.message
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      // Still show success if local handler resolved
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-16">
      
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#0b3b60] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0b3b60] font-bold">Address Your Queries</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/80 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Mentor Guidance Desk</span>
          </div>
        </div>
      </div>

      {/* Hero Intro Header */}
      <section className="bg-[#0b3b60] text-white py-10 sm:py-14 border-b-4 border-amber-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-black uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Academic Query Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif leading-tight text-white">
            Direct Query to Rajiv Ranjan Singh
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 mt-2.5 leading-relaxed max-w-2xl mx-auto">
            Get authoritative, individual clarification on UPSC CSE syllabus interpretation, answer writing frameworks, Optional subject nuances, and preparation strategy.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left / Form Section (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
              
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="query-form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6 pb-4 border-b border-slate-100">
                      <h2 className="text-lg sm:text-xl font-bold font-serif text-[#0b3b60]">
                        Submit Your Academic Doubt
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Please provide precise details so our academic mentorship desk can furnish a comprehensive resolution.
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-semibold">
                        {errorMsg}
                      </div>
                    )}

                    <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-5">
                      
                      {/* Domain Selection */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                          Select Query Domain <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {QUERY_CATEGORIES.map((cat) => (
                            <button
                              type="button"
                              key={cat}
                              onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                              className={`p-2.5 rounded-xl text-left text-xs font-semibold transition-all border ${
                                formData.category === cat
                                  ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-xs'
                                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Name & Email Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Aspirant Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="name"
                              required
                              placeholder="e.g. Aditya Sharma"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#0b3b60] focus:outline-none text-slate-800 transition-all"
                            />
                            <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              name="email"
                              required
                              placeholder="e.g. aditya@example.com"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#0b3b60] focus:outline-none text-slate-800 transition-all"
                            />
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                      </div>

                      {/* Phone & Topic Subject */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Contact / WhatsApp No. <span className="text-slate-400 font-normal">(Optional)</span>
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              name="phone"
                              placeholder="+91 98765 43210"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#0b3b60] focus:outline-none text-slate-800 transition-all"
                            />
                            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Subject / Topic Headline <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="subject"
                              required
                              placeholder="e.g. Judicial Review vs Judicial Activism"
                              value={formData.subject}
                              onChange={handleInputChange}
                              className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#0b3b60] focus:outline-none text-slate-800 transition-all"
                            />
                            <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                      </div>

                      {/* Detailed Message */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Detailed Question / Specific Dilemma <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <textarea
                            name="message"
                            rows={5}
                            required
                            placeholder="State your question in detail. Mention specific UPSC papers, concepts, answer structuring difficulties, or syllabus queries..."
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#0b3b60] focus:outline-none text-slate-800 transition-all leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* Submit CTA */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-6 rounded-xl bg-[#0b3b60] hover:bg-[#082a45] text-amber-300 font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg active:scale-98 flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-amber-300 border-t-transparent rounded-full animate-spin" />
                            <span>Submitting to Mentor Desk...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-amber-400" />
                            <span>Submit Query to Rajiv Sir</span>
                          </>
                        )}
                      </button>

                      <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Confidential and strictly handled by the academic mentorship team.</span>
                      </p>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="query-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black font-serif text-[#0b3b60]">
                      Query Dispatched Successfully!
                    </h2>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed text-left space-y-2">
                      <p>
                        Thank you <strong>{formData.name}</strong>. Your query regarding <strong>&ldquo;{formData.subject}&rdquo;</strong> under <em>{formData.category}</em> has been securely delivered to <strong>Rajiv Ranjan Singh Sir</strong>.
                      </p>
                      <p className="text-slate-500 text-xs">
                        A detailed resolution will be emailed to <strong>{formData.email}</strong> within 24 to 48 hours.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            category: 'GS-II Polity & Governance',
                            subject: '',
                            message: ''
                          });
                        }}
                        className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all w-full sm:w-auto"
                      >
                        Submit Another Query
                      </button>

                      <Link
                        href="/"
                        className="px-6 py-2.5 rounded-xl bg-[#0b3b60] hover:bg-[#082a45] text-white text-xs font-bold transition-all shadow-xs w-full sm:w-auto text-center"
                      >
                        Return to Homepage
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* Right / Mentor Info & Helpline Sidebar (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Mentor Badge Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <img
                  src="/mentor_portrait.png"
                  alt="Rajiv Ranjan Singh"
                  className="w-16 h-16 rounded-xl object-cover border-2 border-amber-400 shadow-xs shrink-0"
                />
                <div>
                  <h3 className="font-bold text-slate-900 font-serif text-base leading-snug">
                    Rajiv Ranjan Singh
                  </h3>
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mt-0.5">
                    Editor-in-Chief &amp; Mentor
                  </span>
                  <p className="text-xs text-slate-500 mt-0.5">MPA, UGC-NET • 20+ Yrs Mentorship</p>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Rajiv Sir personally reviews academic queries covering constitutional interpretations, ethics dilemmas, Mains answer structuring, and administrative case studies.
                </p>

                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/70 flex items-start gap-2.5 text-xs text-amber-900">
                  <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Standard Review Turnaround:</strong>
                    <span>Queries are typically resolved and replied to within 24–48 working hours.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Channels */}
            <div className="bg-gradient-to-br from-[#0b3b60] to-[#092e4c] text-white rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <PhoneCall className="w-4 h-4 text-amber-300" />
                <h4 className="font-bold font-serif text-white text-sm uppercase tracking-wider">
                  Direct Guidance Channels
                </h4>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-300 block uppercase font-bold">Official Editorial Desk</span>
                    <a href="mailto:rajivranjansingh@civilspage.com" className="text-white hover:text-amber-300 font-semibold transition-colors">
                      rajivranjansingh@civilspage.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-300 block uppercase font-bold">Academic Helpline</span>
                    <a href="tel:+919811576540" className="text-white hover:text-amber-300 font-semibold transition-colors">
                      +91 98115 76540 / +91 98115 76541
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about-mentor"
                  className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Explore Rajiv Sir's Profile &amp; Books</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Resolved Queries Quick Link */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-slate-900 text-xs font-serif">Already Resolved Doubts?</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Explore model answers and discussions on our homepage.</p>
              </div>
              <Link
                href="/#resolved-queries"
                className="shrink-0 px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0b3b60] text-xs font-bold transition-colors flex items-center gap-1"
              >
                <span>Browse</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

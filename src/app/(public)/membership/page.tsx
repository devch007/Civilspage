'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, ArrowLeft, ShieldCheck, Star } from 'lucide-react';

export default function MembershipComingSoon() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] pt-28 sm:pt-36 pb-20 flex items-center justify-center">
      <div className="container max-w-xl mx-auto px-4 sm:px-6">
        <motion.div 
          className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-xs text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Icon Badge */}
          <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Star className="w-8 h-8 fill-amber-500 text-amber-500" />
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <span className="badge badge-amber uppercase text-[10.5px] font-bold">Civils PAGE Premium</span>
            <h1 className="text-2xl sm:text-3xl font-black font-serif text-[#0b3b60] tracking-tight">
              Membership Program
            </h1>
            <h2 className="text-lg font-bold text-slate-750 font-serif">
              Coming Soon
            </h2>
          </div>

          {/* Description */}
          <p className="text-slate-600 font-normal leading-relaxed text-sm sm:text-base max-w-md mx-auto">
            We are designing an exclusive membership ecosystem to provide high-yield study templates, premium polity briefings, evaluated answers, and personalized strategic mentorship.
          </p>

          {/* Highlight features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-4 border-t border-slate-100">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-800">Evaluated Answers</h4>
                <p className="text-[11px] text-slate-500">Mains response critiques</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Award className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-800">Strategic Mentorship</h4>
                <p className="text-[11px] text-slate-500">Direct feedback loops</p>
              </div>
            </div>
          </div>

          {/* Go Back Link */}
          <div className="pt-6">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0b3b60] hover:bg-[#06243d] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] border-b border-slate-200" id="hero">
      
      {/* Main Institutional Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Main Title */}
          <motion.h1 
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 font-serif tracking-tight leading-[1.3]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Dedicated Resource Centre for Contemporary Perspectives <br className="hidden sm:inline" />
            on Polity, Administration, Governance & Ethics
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-base sm:text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Civils PAGE endeavors to provide a planned and systematic consultancy, guidance, teaching and an organized data input to prospective civil servants under Rajiv Ranjan Singh, Editor in Chief <i>cum</i> Academic Consultant.
          </motion.p>

        </div>
      </div>
    </section>
  );
}

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
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-serif tracking-tight leading-[1.2]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Dedicated Resource Centre for Contemporary Perspectives <br className="hidden sm:inline" />
            on <span className="text-[#138808]">Polity, Administration, Governance & Ethics</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-base sm:text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Civils PAGE endeavors to provide a planned and systematic consultancy, guidance, teaching and an organized data input to prospective civil servants under the mentorship of <strong className="text-slate-900 font-bold">Rajiv Ranjan Singh</strong> & expert panel.
          </motion.p>

        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative m-0 overflow-hidden bg-[#FAF9F6] border-b border-slate-200" id="hero">
      
      {/* Main Institutional Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8 pb-6 sm:pb-7">
        <div className="text-center max-w-4xl mx-auto space-y-3.5 sm:space-y-4">
          
          {/* Main Title Hero Section */}
          <motion.h1 
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 font-serif tracking-tight leading-snug sm:leading-relaxed"
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
            Civils PAGE endeavors to provide a planned and systematic consultancy, guidance, teaching and an organized data input to prospective civil servants under the mentorship of Rajiv Ranjan Singh.
          </motion.p>

        </div>
      </div>
    </section>
  );
}

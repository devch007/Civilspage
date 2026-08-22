'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="hero relative min-h-[50vh] flex items-center pt-28 pb-20 overflow-hidden bg-radial-gradient" id="hero">
      {/* Background Ambient Glowing Orbs */}
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>
      <div className="absolute w-[320px] h-[320px] rounded-full bg-amber-400/10 blur-[120px] bottom-10 right-1/4 z-0 pointer-events-none"></div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Main Content */}
          <motion.div 
            className="space-y-6 flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Dedicated Resource Centre for Contemporary Perspectives <br className="hidden sm:inline" />
              on <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600 bg-clip-text text-transparent">
                Polity, Administration, Governance & Ethics
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Civils PAGE endeavors to provide a planned and systematic consultancy, guidance, teaching and an organized data input to the prospective civil servants under the mentorship of Rajiv Ranjan Singh & panel of experts.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

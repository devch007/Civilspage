'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, BookOpen, Users, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Mentor() {
  return (
    <section id="mentor-profile" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 flex flex-col items-center">
          <img 
            src="/mentor_portrait.png" 
            alt="Rajiv Ranjan Singh Portrait" 
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-slate-100 shadow-md mb-4"
          />
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b3b60] font-serif leading-snug">
            Rajiv Ranjan Singh
            <span className="block text-xl sm:text-2xl font-bold text-slate-700 mt-1 font-sans">
              Editor in Chief <i>cum</i> Academic Consultant
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
            Guiding prospective civil servants in Constitution, Contemporary Governance & Applied Administrative Ethics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF9F6] border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
          
          {/* Left: Biography Details */}
          <motion.div 
            className="lg:col-span-7 space-y-5 text-left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-3">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Rajiv Ranjan Singh (MPA, NET) is a distinguished academician and consultant who has been mentoring Civils Services aspirants across India for over two decades. As the Founder Director of INTERFACE IAS Academy, Chairman of Sanchetna Panchayat Vikas Sabha, Editor of Contemporary Perspective, and Editor-in-Chief of Civils PAGE24, he has played a pivotal role in shaping the academic and administrative discourse in the field of competitive examinations.
              </p>
            </div>
          </motion.div>

          {/* Right: Visual Frame */}
          <motion.div 
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full max-w-[460px] bg-white p-2 rounded-xl border border-slate-300 shadow-md">
              <div className="relative rounded-lg overflow-hidden border border-slate-200">
                <Image 
                  src="/mentor_whiteboard.png" 
                  alt="Rajiv Ranjan Singh Academic Session" 
                  width={580}
                  height={326}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              <div className="mt-2 text-center">
                <span className="text-[11px] font-bold text-slate-800">Interactive Answer-Writing & Analytical Discussion</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

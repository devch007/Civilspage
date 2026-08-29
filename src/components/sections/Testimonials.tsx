'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, Award, CheckCircle } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  rank: string;
  service: string;
  avatarInitials: string;
}

const testimonialsList: Testimonial[] = [
  {
    id: 1,
    quote: 'The contemporary perspective analyses and structured GS II frameworks under Rajiv Ranjan Sir provided me with clear, high-scoring answer models. The constitutional amendment breakdowns were invaluable during my Mains preparation.',
    name: 'Ananya Sharma',
    service: 'Indian Administrative Service (IAS)',
    rank: 'AIR 4 • UPSC CSE 2025',
    avatarInitials: 'AS'
  },
  {
    id: 2,
    quote: 'Rajiv Sir\'s mentorship in GS IV Ethics case studies helped transform theoretical ethical concepts into real-world administrative dilemmas with constitutional integrity at their core. A must-have resource for serious aspirants.',
    name: 'Rahul Verma',
    service: 'Indian Police Service (IPS)',
    rank: 'AIR 18 • UPSC CSE 2025',
    avatarInitials: 'RV'
  },
  {
    id: 3,
    quote: 'The statutory brief updates and Law Commission compilations saved countless hours of research. The concise, authoritative approach to polity and public policy is unmatched.',
    name: 'Sanjana Iyer',
    service: 'Indian Foreign Service (IFS)',
    rank: 'AIR 45 • UPSC CSE 2024',
    avatarInitials: 'SI'
  }
];

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIdx((prev) => (prev === 0 ? testimonialsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIdx((prev) => (prev === testimonialsList.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIdx((prev) => (prev === testimonialsList.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (idx: number) => {
    setDirection(idx > currentIdx ? 1 : -1);
    setCurrentIdx(idx);
  };

  const currentT = testimonialsList[currentIdx];

  return (
    <section id="testimonials" className="py-16 bg-[#FAF9F6] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b3b60] font-serif leading-snug">
            Experiences of Successful Candidates
          </h2>
        </motion.div>

        {/* Testimonial Card Slider */}
        <div className="max-w-4xl mx-auto relative">
          <div className="min-h-[260px] flex items-center justify-center relative overflow-hidden bg-white rounded-xl border border-slate-300 shadow-sm p-6 sm:p-10">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div 
                key={`testimonial-${currentT.id}`}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.35 }}
                className="w-full text-center space-y-6"
              >
                <Quote className="w-8 h-8 text-amber-500/40 mx-auto" />
                
                <p className="text-sm sm:text-base text-slate-800 italic leading-relaxed max-w-2xl mx-auto font-serif">
                  &ldquo;{currentT.quote}&rdquo;
                </p>

                <div className="pt-2">
                  <div className="w-10 h-10 rounded-full bg-[#0b3b60] text-amber-300 font-extrabold text-xs flex items-center justify-center mx-auto mb-2 border-2 border-amber-400">
                    {currentT.avatarInitials}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 font-serif">{currentT.name}</h4>
                  <p className="text-xs font-semibold text-[#0b3b60]">{currentT.service}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                    {currentT.rank}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-4 px-2">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-md bg-white border border-slate-300 hover:bg-[#0b3b60] hover:text-white text-slate-700 shadow-xs transition-colors"
              aria-label="Previous Testimonial"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-1.5">
              {testimonialsList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIdx === idx ? 'w-6 bg-[#0b3b60]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="p-2 rounded-md bg-white border border-slate-300 hover:bg-[#0b3b60] hover:text-white text-slate-700 shadow-xs transition-colors"
              aria-label="Next Testimonial"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

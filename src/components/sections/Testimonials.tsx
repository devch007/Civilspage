'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  rank: string;
  avatarColor: string;
}

const testimonialsList: Testimonial[] = [
  {
    id: 1,
    quote: '"The filterable PYQ portal saved me hundreds of hours. Instead of flipping pages in heavy guidebooks, I could practice specific environment questions from the last 5 years in minutes. The mock test explanations are extremely accurate and direct."',
    name: 'Ananya Sharma, IAS',
    rank: 'UPSC CSE 2025 • AIR 4',
    avatarColor: '#818CF8', // Indigo
  },
  {
    id: 2,
    quote: '"The GS Mains syllabus keyword sheets and daily cooperative federalism summaries were my exact framework templates during mains. I highly recommend the daily current affairs tab for short, revision-friendly notes."',
    name: 'Rahul Verma, IPS',
    rank: 'UPSC CSE 2025 • AIR 18',
    avatarColor: '#10B981', // Emerald
  },
  {
    id: 3,
    quote: '"Clearing CSAT was a big hurdle for me. The Quantitative aptitude trick sheets on CivilsPage helped me raise my CSAT marks from 54 to 98. An absolute life-saver for non-math backgrounds!"',
    name: 'Sanjana Iyer, IFS',
    rank: 'UPSC CSE 2024 • AIR 45',
    avatarColor: '#F59E0B', // Amber
  }
];

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // Auto scroll effect
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIdx]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIdx((prev) => (prev === 0 ? testimonialsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIdx((prev) => (prev === testimonialsList.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (idx: number) => {
    setDirection(idx > currentIdx ? 1 : -1);
    setCurrentIdx(idx);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0
    })
  };

  const currentT = testimonialsList[currentIdx];

  return (
    <section id="testimonials" className="section-padding">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge badge-amber">UPSC Rankers Strategy</span>
          <h2>Top Toppers Feedback</h2>
          <p>Read review feedback and preparation journey strategies from students who successfully cracked the UPSC Civil Services under our guidance.</p>
        </motion.div>

        <div className="carousel-outer">
          <div className="min-h-[320px] flex items-center justify-center relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIdx}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                className="w-full max-w-3xl px-4"
              >
                <div className="glass-card testimonial-card">
                  <div className="testimonial-quote-icon">
                    <Quote className="w-10 h-10 text-indigo-500/10 rotate-180" />
                  </div>
                  <blockquote className="testimonial-quote">
                    {currentT.quote}
                  </blockquote>
                  <div className="testimonial-student">
                    <svg className="testimonial-avatar" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="30" cy="30" r="30" fill="#1E293B"/>
                      <circle cx="30" cy="22" r="10" fill={currentT.avatarColor}/>
                      <path d="M12 48C12 40 20 36 30 36C40 36 48 40 48 48" stroke={currentT.avatarColor} strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                    <h4>{currentT.name}</h4>
                    <span className="testimonial-rank">{currentT.rank}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Controls */}
          <div className="carousel-controls">
            <button className="carousel-arrow" onClick={handlePrev} aria-label="Previous Testimonial">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="carousel-dots">
              {testimonialsList.map((_, idx) => (
                <button
                  key={idx}
                  className={`carousel-dot ${currentIdx === idx ? 'active' : ''}`}
                  onClick={() => handleDotClick(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                ></button>
              ))}
            </div>
            <button className="carousel-arrow" onClick={handleNext} aria-label="Next Testimonial">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

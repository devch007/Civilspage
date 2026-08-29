'use client';

import React from 'react';

export default function GalleryMarquee() {
  return (
    <section id="gallery-marquee" className="py-10 bg-[#FAF9F6] border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-6 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b3b60] font-serif leading-snug">
          Seminars & Interactive Sessions
        </h2>
      </div>

      <div className="relative w-full overflow-hidden py-4 border-y border-slate-200/60 bg-white">
        {/* Soft edge blur effects */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#FAF9F6] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee flex gap-4 items-center">
          {/* First loop of images */}
          <div className="flex gap-4 shrink-0">
            <img src="/gallery_1.jpg" alt="Academic Seminar Ceremony" className="h-44 sm:h-52 w-auto object-cover rounded-lg shadow-sm border border-slate-200" />
            <img src="/mentor_whiteboard.png" alt="Whiteboard Interactive Session" className="h-44 sm:h-52 w-auto object-cover rounded-lg shadow-sm border border-slate-200" />
            <img src="/gallery_1.jpg" alt="Student Mentorship Event" className="h-44 sm:h-52 w-auto object-cover rounded-lg shadow-sm border border-slate-200" />
            <img src="/mentor_whiteboard.png" alt="Guidance Board Discussion" className="h-44 sm:h-52 w-auto object-cover rounded-lg shadow-sm border border-slate-200" />
          </div>
          {/* Second loop of images (for seamless transition) */}
          <div className="flex gap-4 shrink-0">
            <img src="/gallery_1.jpg" alt="Academic Seminar Ceremony" className="h-44 sm:h-52 w-auto object-cover rounded-lg shadow-sm border border-slate-200" />
            <img src="/mentor_whiteboard.png" alt="Whiteboard Interactive Session" className="h-44 sm:h-52 w-auto object-cover rounded-lg shadow-sm border border-slate-200" />
            <img src="/gallery_1.jpg" alt="Student Mentorship Event" className="h-44 sm:h-52 w-auto object-cover rounded-lg shadow-sm border border-slate-200" />
            <img src="/mentor_whiteboard.png" alt="Guidance Board Discussion" className="h-44 sm:h-52 w-auto object-cover rounded-lg shadow-sm border border-slate-200" />
          </div>
        </div>
      </div>
    </section>
  );
}

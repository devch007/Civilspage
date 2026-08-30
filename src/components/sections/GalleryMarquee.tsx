'use client';

import React from 'react';
import { Video } from 'lucide-react';

interface GalleryMarqueeProps {
  videoUrl?: string;
  title?: string;
  subtitle?: string;
}

// Helper to extract YouTube video ID from various formats
function getYouTubeEmbedUrl(url: string) {
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : '7ad__JvCcfY';
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
  } catch {
    return 'https://www.youtube-nocookie.com/embed/7ad__JvCcfY?rel=0&modestbranding=1';
  }
}

export default function GalleryMarquee({
  videoUrl = 'https://www.youtube.com/watch?v=7ad__JvCcfY',
  title = 'Seminars & Interactive Sessions',
  subtitle = 'Glimpses of seminars, alumni meets, classroom sessions & lectures.'
}: GalleryMarqueeProps) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  const renderMarqueeItems = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex gap-4 shrink-0 items-center">
      {/* 1. Civil Services Seminar Photo */}
      <img
        src="/gallery_civil_seminar.jpg"
        alt="Civil Services Seminar & Guest Speaker Session"
        className="h-52 sm:h-60 w-auto object-cover rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300"
      />

      {/* 2. Embedded Interactive YouTube Video in Marquee */}
      <div className="h-52 sm:h-60 w-[300px] sm:w-[380px] shrink-0 rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-950 relative group hover:shadow-lg transition-all duration-300">
        <iframe
          src={embedUrl}
          title="Civilspage Interactive Session Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>

      {/* 3. Alumni Meet Photo */}
      <img
        src="/gallery_alumni_meet.jpg"
        alt="All India Sainik Schools Alumni Meet"
        className="h-52 sm:h-60 w-auto object-cover rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300"
      />

      {/* 4. Academic Seminar Ceremony Photo */}
      <img
        src="/gallery_1.jpg"
        alt="Academic Seminar Ceremony"
        className="h-52 sm:h-60 w-auto object-cover rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300"
      />

      {/* 5. Whiteboard Guidance Session Photo */}
      <img
        src="/mentor_whiteboard.png"
        alt="Whiteboard Interactive Guidance Session"
        className="h-52 sm:h-60 w-auto object-cover rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300"
      />
    </div>
  );

  return (
    <section id="gallery-marquee" className="py-8 sm:py-12 bg-[#FAF9F6] border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-6 sm:mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
          <Video className="w-3.5 h-3.5" />
          Seminars & Classroom Media
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b3b60] font-serif leading-snug">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1.5 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Moving Marquee Ribbon with live Video and Photos */}
      <div className="relative w-full overflow-hidden py-4 border-y border-slate-200/60 bg-white">
        {/* Soft edge blur effects */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee flex gap-4 items-center">
          {/* Loop 1 */}
          {renderMarqueeItems('loop-1')}
          {/* Loop 2 for seamless infinite scroll */}
          {renderMarqueeItems('loop-2')}
        </div>
      </div>
    </section>
  );
}

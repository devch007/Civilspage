import React from 'react';
import Hero from '@/components/sections/Hero';
import Mentor from '@/components/sections/Mentor';
import CurrentAffairs from '@/components/sections/CurrentAffairs';
import GalleryMarquee from '@/components/sections/GalleryMarquee';
import ResolvedQueries from '@/components/sections/ResolvedQueries';
import Testimonials from '@/components/sections/Testimonials';

export default function Home() {
  return (
    <main>
      {/* Hero Banner Section */}
      <Hero />

      {/* Mentor Profile Biography Section */}
      <Mentor />

      {/* Curated Current News & Views Section */}
      <CurrentAffairs />

      {/* Moving Marquee Seminar & Event Gallery Section */}
      <GalleryMarquee />

      {/* Resolved Aspirant Queries & Mentor Discussions Section */}
      <ResolvedQueries />

      {/* Rankers Feedback Testimonials Slider */}
      <Testimonials />
    </main>
  );
}

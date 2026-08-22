import React from 'react';
import Hero from '@/components/sections/Hero';
import Mentor from '@/components/sections/Mentor';
import CurrentAffairs from '@/components/sections/CurrentAffairs';
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

      {/* Rankers Feedback Testimonials Slider */}
      <Testimonials />
    </main>
  );
}

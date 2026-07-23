import React from 'react';
import Hero from '@/components/sections/Hero';
import Mentor from '@/components/sections/Mentor';
import CseOverview from '@/components/sections/CseOverview';
import FeaturedResources from '@/components/sections/FeaturedResources';
import StudyMaterial from '@/components/sections/StudyMaterial';
import CurrentAffairs from '@/components/sections/CurrentAffairs';
import MockQuiz from '@/components/sections/MockQuiz';
import Testimonials from '@/components/sections/Testimonials';

export default function Home() {
  return (
    <main>
      {/* Hero Banner Section */}
      <Hero />

      {/* Mentor Profile Biography Section */}
      <Mentor />

      {/* About CSE Exam Card Section */}
      <CseOverview />

      {/* Must-Read High Yield Focus Resources */}
      <FeaturedResources />

      {/* Study Material Hub Section */}
      <StudyMaterial />


      {/* Curated Daily/Weekly Current Affairs tabs */}
      <CurrentAffairs />

      {/* Daily Practice Mock Quiz Section */}
      <MockQuiz />

      {/* Rankers Feedback Testimonials Slider */}
      <Testimonials />
    </main>
  );
}

import React from 'react';
import MockQuiz from '@/components/sections/MockQuiz';

export const metadata = {
  title: 'Mock Tests & Practice Questions | CivilsPage',
  description: 'Practice Preliminary Examination MCQs and Main Examination answer writing mock questions for UPSC Civil Services.',
};

export default function MockTestsPage() {
  return (
    <main className="min-h-screen bg-white pt-8">
      <MockQuiz />
    </main>
  );
}

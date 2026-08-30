import React from 'react';
import ModelAnswersHub from '@/components/sections/ModelAnswersHub';

export const metadata = {
  title: 'UPSC Mains Model Answers & Solved Papers | CivilsPage',
  description: 'Download authentic UPSC Mains GS Paper 2 Polity & Governance and GS Paper 4 Ethics solved model answers.',
};

export default function ModelAnswersPage() {
  return (
    <main className="min-h-screen bg-white pt-8">
      <ModelAnswersHub />
    </main>
  );
}

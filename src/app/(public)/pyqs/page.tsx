import React from 'react';
import PyqHub from '@/components/sections/PyqHub';

export const metadata = {
  title: 'Previous Year Questions (PYQ) | CivilsPage',
  description: 'Download standard PYQ PDFs categorized by subject and year for UPSC Civil Services Examination.',
};

export default function PyqsPage() {
  return (
    <main className="min-h-screen bg-white pt-8">
      <PyqHub />
    </main>
  );
}

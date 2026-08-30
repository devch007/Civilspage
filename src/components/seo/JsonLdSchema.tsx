import React from 'react';

export default function JsonLdSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'CivilsPage',
    url: 'https://www.civilspage.com',
    logo: 'https://www.civilspage.com/logo.png',
    image: 'https://www.civilspage.com/og-image.png',
    description:
      'CivilsPage is an authoritative academic portal for UPSC Civil Services Examination (CSE) preparation, GS Paper 2 Polity, GS Paper 4 Ethics, and Public Administration mentored by Rajiv Ranjan Singh.',
    founder: {
      '@type': 'Person',
      name: 'Rajiv Ranjan Singh',
      jobTitle: 'Distinguished UPSC Mentor & Educator',
      description: 'Senior mentor with 25+ years experience in UPSC Civil Services Examination training specializing in Polity, Governance, Ethics, and Public Administration.',
      image: 'https://www.civilspage.com/mentor_portrait.png',
      sameAs: [
        'https://www.civilspage.com/about-mentor',
      ],
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8318010306',
      contactType: 'Admissions & Academic Support',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://www.civilspage.com',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CivilsPage',
    url: 'https://www.civilspage.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.civilspage.com/updates?query={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'UPSC Civil Services Examination Mastery & Mentorship',
    description: 'Comprehensive curriculum and strategic guidance for UPSC CSE Preliminary, Main Written Examination, and Personality Test covering GS-II Polity, GS-IV Ethics, and Public Administration.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'CivilsPage',
      url: 'https://www.civilspage.com',
    },
    instructor: {
      '@type': 'Person',
      name: 'Rajiv Ranjan Singh',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
    </>
  );
}

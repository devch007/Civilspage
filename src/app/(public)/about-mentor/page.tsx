'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Award, 
  BookOpen, 
  Users, 
  GraduationCap, 
  Landmark, 
  Building2, 
  Globe2, 
  FileText, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  Share2, 
  Mail, 
  Quote, 
  Bookmark, 
  Compass, 
  ShieldCheck, 
  Star,
  ChevronRight
} from 'lucide-react';

export default function AboutMentorPage() {
  const credentials = [
    { label: 'Qualifications', value: 'MPA, UGC-NET' },
    { label: 'Mentorship Experience', value: '20+ Years' },
    { label: 'Core Expertise', value: 'Polity, Governance, Pub Ad & Ethics' },
    { label: 'Role', value: 'Editor-in-Chief & Academic Consultant' },
  ];

  const leadershipRoles = [
    {
      title: 'Editor-in-Chief',
      organization: 'Civils PAGE',
      description: 'Guiding conceptual framework, editorial standards, and high-yield pedagogical resources for Civil Services aspirants across India.'
    },
    {
      title: 'Founder Director',
      organization: 'INTERFACE IAS Academy',
      description: 'Pioneered structured classroom & analytical answer-writing frameworks for General Studies and Public Administration.'
    },
    {
      title: 'Academic Contributor & Mentor',
      organization: 'SAMKALAP IAS (Madhav Shrishti Nyas)',
      description: 'Associated since inception, proactively advancing socially committed Civil Services Examination (CSE) guidance and interview guidance programs.'
    },
    {
      title: 'Chairman',
      organization: 'Sanchetna Panchayat Vikas Sabha',
      description: 'Fostering grassroot administrative awareness, democratic decentralization research, and rural governance initiatives.'
    },
    {
      title: 'Editor',
      organization: 'Contemporary Perspective',
      description: 'Publishing scholarly analyses, research papers, and policy critiques on contemporary governance and administrative reforms.'
    }
  ];

  const affiliations = [
    {
      name: 'Ethnographic and Folk Culture Society',
      type: 'Academic & Research Society',
      desc: 'Active member contributing to socio-cultural research and anthropological discourse.'
    },
    {
      name: 'Author’s Guild of India',
      type: 'National Authors Guild',
      desc: 'Distinguished author and academic writer addressing governance, polity and civil services literature.'
    },
    {
      name: 'Red Cross Society',
      type: 'Humanitarian Body',
      desc: 'Committed to humanitarian values, emergency relief coordination, and community civic service.'
    }
  ];


  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 pb-20">
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b3b60] hover:text-amber-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Civils PAGE</span>
            <span>/</span>
            <span className="text-amber-700 font-bold">Editor-in-Chief</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0b3b60] via-[#092e4c] to-[#0b3b60] text-white py-16 sm:py-20 border-b-4 border-amber-500">
        {/* Ambient Decorative Background Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            
            {/* Portrait & Badges */}
            <motion.div 
              className="relative shrink-0 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative inline-block">
                <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-4 border-amber-400/80 shadow-2xl bg-white relative">
                  <img 
                    src="/mentor_portrait.png" 
                    alt="Rajiv Ranjan Singh" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 text-[#0b3b60] font-black text-xs px-4 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                  <ShieldCheck className="w-3.5 h-3.5" /> 20+ Years Mentorship
                </span>
              </div>
            </motion.div>

            {/* Profile Intro */}
            <motion.div 
              className="text-center lg:text-left flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/30">
                <GraduationCap className="w-3.5 h-3.5" /> Senior Academician & Governance Consultant
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-white tracking-tight leading-tight">
                Rajiv Ranjan Singh
              </h1>
              
              <p className="text-lg sm:text-xl font-medium text-amber-200/90 font-serif mt-2">
                Editor in Chief <i className="text-amber-300">cum</i> Academic Consultant
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4 max-w-3xl">
                Distinguished educator, public administration scholar, and mentor to thousands of successful civil servants across the country. Over two decades of pioneering dedication to quality, analytical, and socially committed UPSC CSE preparation.
              </p>

              {/* Fast Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10">
                {credentials.map((c, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 text-left">
                    <p className="text-[11px] font-medium text-amber-300 uppercase tracking-wider">{c.label}</p>
                    <p className="text-sm font-bold text-white mt-0.5">{c.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left / Main Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Detailed Biographical Narrative */}
            <motion.section 
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-[#0b3b60]/10 text-[#0b3b60] flex items-center justify-center font-bold">
                  <Bookmark className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black font-serif text-[#0b3b60]">Academic Profile & Biography</h2>
                  <p className="text-xs text-slate-500">Comprehensive overview of academic journey and pedagogical contributions</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-700 leading-relaxed text-base font-normal">
                <p>
                  <strong className="text-slate-900 font-semibold">Rajiv Ranjan Singh (MPA, NET)</strong> is a distinguished academician, author, and governance consultant who has been mentoring Civil Services aspirants across India for over two decades. Known for his incisive analysis of the Indian Constitution, contemporary public policy, and administrative ethics, his guidance has shaped the preparation strategies of rankers across the Indian Administrative Service (IAS), Indian Police Service (IPS), and State Civil Services.
                </p>
                
                <p>
                  As the <strong className="text-[#0b3b60]">Founder Director of INTERFACE IAS Academy</strong>, <strong className="text-[#0b3b60]">Chairman of Sanchetna Panchayat Vikas Sabha</strong>, <strong className="text-[#0b3b60]">Editor of Contemporary Perspective</strong>, and <strong className="text-[#0b3b60]">Editor-in-Chief of Civils PAGE</strong>, he has played a pivotal role in shaping the academic and administrative discourse in the field of competitive examinations.
                </p>

                <p>
                  He has played a proactive role in the growth of <strong className="text-[#0b3b60]">SAMKALAP IAS</strong>, a unit of Madhav Shrishti Nyas, and has been associated with the organization since its inception, contributing to its mission of socially committed Civil Services Examination (CSE) preparation.
                </p>

                <p>
                  A respected member of several professional and academic bodies including the <strong className="text-slate-900">Ethnographic and Folk Culture Society</strong>, <strong className="text-slate-900">Author’s Guild of India</strong>, and the <strong className="text-slate-900">Red Cross Society</strong>, he has also participated in numerous national and international seminars and conferences. His scholarly contributions include several well-received articles and research papers focused on contemporary political and administrative issues.
                </p>
              </div>

              {/* Highlight Quote Box */}
              <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-r-xl relative">
                <Quote className="w-8 h-8 text-amber-400 absolute top-4 right-4 opacity-50" />
                <p className="text-slate-800 font-serif italic text-base sm:text-lg leading-relaxed">
                  &ldquo;Civil Services preparation is not merely an acquisition of factual knowledge; it is the organic development of an administrative mindset grounded in constitutional morality, empathy, and institutional integrity.&rdquo;
                </p>
                <p className="text-xs font-bold text-amber-900 mt-3 uppercase tracking-wider">— Rajiv Ranjan Singh</p>
              </div>
            </motion.section>



            {/* Institutional Leadership & Editorial Roles */}
            <motion.section 
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black font-serif text-[#0b3b60]">Institutional Leadership & Editorial Roles</h2>
                  <p className="text-xs text-slate-500">Key organizations and publications steered under his direction</p>
                </div>
              </div>

              <div className="space-y-4">
                {leadershipRoles.map((role, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors bg-white">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h3 className="font-bold text-slate-900 font-serif text-base">{role.title}</h3>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#0b3b60]/10 text-[#0b3b60] self-start sm:self-auto">
                        {role.organization}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">{role.description}</p>
                  </div>
                ))}
              </div>
            </motion.section>

          </div>

          {/* Right Column / Sidebar (1 Col) */}
          <div className="space-y-8">
            
            {/* Professional & Academic Affiliations */}
            <motion.div 
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
                <Landmark className="w-5 h-5 text-amber-700" />
                <h3 className="font-bold font-serif text-[#0b3b60] text-lg">Academic & Professional Bodies</h3>
              </div>

              <div className="space-y-3">
                {affiliations.map((aff, i) => (
                  <div key={i} className="p-3.5 rounded-lg bg-[#FAF9F6] border border-slate-200">
                    <p className="font-bold text-slate-900 text-sm font-serif">{aff.name}</p>
                    <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wide block mt-0.5">{aff.type}</span>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{aff.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Seminar & Session Photo Gallery Widget */}
            <motion.div 
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
                <Users className="w-5 h-5 text-[#0b3b60]" />
                <h3 className="font-bold font-serif text-[#0b3b60] text-lg">Mentorship Glimpses</h3>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl overflow-hidden border border-slate-200 relative group">
                  <img 
                    src="/gallery_civil_seminar.jpg" 
                    alt="Civil Services Guidance Seminar" 
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                    <p className="text-white text-xs font-semibold">Civil Services Guidance Seminars</p>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden border border-slate-200 relative group">
                  <img 
                    src="/gallery_alumni_meet.jpg" 
                    alt="All India Alumni Meet & Felicitation" 
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                    <p className="text-white text-xs font-semibold">All India Alumni Meet &amp; Felicitation</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Connect / Query Card */}
            <motion.div 
              className="bg-gradient-to-br from-[#0b3b60] to-[#092e4c] text-white rounded-2xl p-6 shadow-md"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-7 h-7 text-amber-300 mb-3" />
              <h3 className="text-xl font-black font-serif text-white">Direct Academic Query</h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                Have a specific question regarding UPSC CSE preparation strategy, Optional selection, or Mains answer writing? Reach out directly through the academic portal.
              </p>
              
              <Link 
                href="/direct-query" 
                className="mt-5 w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-[#0b3b60] font-black text-xs rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm uppercase tracking-wider"
              >
                <span>Submit Query to Rajiv Sir</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
}

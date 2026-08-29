'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Award, 
  BookOpen, 
  GraduationCap, 
  Globe, 
  Info, 
  ChevronDown, 
  CheckCircle2,
  Building2,
  DollarSign,
  HelpCircle,
  BookMarked,
  Library,
  Compass,
  Lightbulb,
  PenTool,
  Target,
  Flame,
  Layers,
  ArrowRight,
  TrendingUp,
  Brain,
  FileCheck,
  Clock,
  Scale,
  Landmark,
  ShieldCheck,
  FileText,
  Users
} from 'lucide-react';

type TabType = 'about-exam' | 'syllabus' | 'reading' | 'approach' | 'polity' | 'ethics' | 'pubad';
type SyllabusStage = 'prelims' | 'mains' | 'optionals';
type OptionalChoice = 'pubad' | 'psir' | 'law';
type PolityStage = 'gs2' | 'pubad' | 'ethics';

export default function AboutCse() {
  const [activeTab, setActiveTab] = useState<TabType>('about-exam');
  const [syllabusStage, setSyllabusStage] = useState<SyllabusStage>('prelims');
  const [selectedOptional, setSelectedOptional] = useState<OptionalChoice>('pubad');
  const [polityStage, setPolityStage] = useState<PolityStage>('gs2');

  // Sync hash routing on page load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#about-exam' || hash === '#about') {
        setActiveTab('about-exam');
      } else if (hash === '#exam-plan' || hash === '#detailed-syllabus') {
        setActiveTab('syllabus');
      } else if (hash === '#suggested-reading' || hash === '#reading') {
        setActiveTab('reading');
      } else if (hash === '#approach' || hash === '#approach-to-gs') {
        setActiveTab('approach');
      } else if (hash === '#polity' || hash === '#polity-approach' || hash === '#approach-to-polity') {
        setActiveTab('polity');
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800">
      
      {/* 1. HERO BANNER */}
      <section className="bg-white border-b border-slate-200 py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b3b60] font-serif tracking-tight"
          >
            Civil Services Examination
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Authoritative handbook detailing the stages of selection, official syllabi, textbook readings, subject approaches, and administrative rank matrices of the UPSC CSE.
          </motion.p>

          {/* Quick Nav Pill Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button 
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                activeTab === 'about-exam'
                  ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('about-exam')}
            >
              Scheme of Examination
            </button>
            <button 
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                activeTab === 'syllabus'
                  ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('syllabus')}
            >
              Syllabus
            </button>
            <button 
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                activeTab === 'reading'
                  ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('reading')}
            >
              Suggested Readings
            </button>
            <button 
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                activeTab === 'approach'
                  ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('approach')}
            >
              Approach to GS
            </button>
            <button 
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                activeTab === 'polity'
                  ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('polity')}
            >
              Approach to Polity & Governance
            </button>
            <button 
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                activeTab === 'ethics'
                  ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('ethics')}
            >
              Approach to Ethics
            </button>
            <button 
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                activeTab === 'pubad'
                  ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('pubad')}
            >
              Approach to Public Administration
            </button>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTAINER WITH TAB PANELS */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        
        {/* ABOUT EXAM TAB */}
        {activeTab === 'about-exam' && (
          <motion.section 
            key="tab-about-exam" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }} 
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#0b3b60] to-[#124e7e] text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider rounded font-mono">
                  Official Notification & Directory
                </span>
                <span className="text-xs text-amber-200 font-medium">Source: www.upsc.gov.in</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
                About the Civil Services Examination (CSE)
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
                Conducted annually by the Union Public Service Commission (UPSC), the Civil Services Examination selects candidates for prestigious administrative, foreign policy, and security leadership roles in the Government of India.
              </p>
            </div>

            {/* Services & Recruitment Directory */}
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#0b3b60]" />
                <h3 className="text-lg font-bold font-serif text-[#0b3b60]">1. Recruiting Services & Posts Directory</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Group A Services */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                  <h4 className="font-bold text-xs sm:text-sm text-[#0b3b60] border-b border-slate-100 pb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0b3b60]"></span>
                    All India Services & Group 'A' Services
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li><strong className="text-slate-900">(i)</strong> Indian Administrative Service (IAS)</li>
                    <li><strong className="text-slate-900">(ii)</strong> Indian Foreign Service (IFS)</li>
                    <li><strong className="text-slate-900">(iii)</strong> Indian Police Service (IPS)</li>
                    <li><strong className="text-slate-900">(iv)</strong> Indian Audit and Accounts Service, Group 'A'</li>
                    <li><strong className="text-slate-900">(v)</strong> Indian Civil Accounts Service, Group 'A'</li>
                    <li><strong className="text-slate-900">(vi)</strong> Indian Corporate Law Service, Group 'A'</li>
                    <li><strong className="text-slate-900">(vii)</strong> Indian Defence Accounts Service, Group 'A'</li>
                    <li><strong className="text-slate-900">(viii)</strong> Indian Defence Estates Service, Group 'A'</li>
                    <li><strong className="text-slate-900">(ix)</strong> Indian Information Service, Group 'A'</li>
                    <li><strong className="text-slate-900">(x)</strong> Indian Postal Service, Group 'A'</li>
                    <li><strong className="text-slate-900">(xi)</strong> Indian P&T Accounts and Finance Service, Group 'A'</li>
                    <li><strong className="text-slate-900">(xii)</strong> Indian Railway Management Service (Traffic), Group 'A'</li>
                    <li><strong className="text-slate-900">(xiii)</strong> Indian Railway Management Service (Personnel), Group 'A'</li>
                    <li><strong className="text-slate-900">(xiv)</strong> Indian Railway Management Service (Accounts), Group 'A'</li>
                    <li><strong className="text-slate-900">(xv)</strong> Indian Railway Protection Force Service, Group 'A'</li>
                    <li><strong className="text-slate-900">(xvi)</strong> Indian Revenue Service (Customs & Indirect Taxes), Group 'A'</li>
                    <li><strong className="text-slate-900">(xvii)</strong> Indian Revenue Service (Income Tax), Group 'A'</li>
                    <li><strong className="text-slate-900">(xviii)</strong> Indian Trade Service, Group 'A' (Grade III)</li>
                  </ul>
                </div>

                {/* Group B Services */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3 h-fit">
                  <h4 className="font-bold text-xs sm:text-sm text-[#0b3b60] border-b border-slate-100 pb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                    Group 'B' Services
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li><strong className="text-slate-900">(xix)</strong> Armed Forces Headquarters Civil Service, Group 'B' (Section Officer’s Grade)</li>
                    <li><strong className="text-slate-900">(xx)</strong> Delhi, Andaman and Nicobar Islands, Lakshadweep, Daman & Diu and Dadra & Nagar Haveli Civil Service (DANICS), Group 'B'</li>
                    <li><strong className="text-slate-900">(xxi)</strong> Delhi, Andaman and Nicobar Islands, Lakshadweep, Daman & Diu and Dadra & Nagar Haveli Police Service (DANIPS), Group 'B'</li>
                    <li><strong className="text-slate-900">(xxii)</strong> Pondicherry Civil Service (PONDICS), Group 'B'</li>
                    <li><strong className="text-slate-900">(xxiii)</strong> Pondicherry Police Service (PONDIPS), Group 'B'</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Eligibility & Key Structural Stats */}
            <div className="space-y-4 pt-4">
              <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#0b3b60]" />
                <h3 className="text-lg font-bold font-serif text-[#0b3b60]">2. Eligibility, Vacancies & Reservation Policy</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Educational Qualification */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Academic Base</span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">Educational Qualification</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A candidate must hold a <strong>Graduate degree</strong> in any stream or discipline from a university recognized by the Government of India.
                  </p>
                </div>

                {/* Age Limits */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Age Limits</span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">21 to 32 Years</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Must have attained <strong>21 years</strong> and not attained <strong>32 years</strong> on the 1st of August of the examination year.
                  </p>
                </div>

                {/* Number of Vacancies */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Scale</span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">~ 1,000 Vacancies</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The total number of administrative vacancies filled annually through the Civil Services Examination is approximately 1,000.
                  </p>
                </div>

              </div>

              {/* Relaxations, Attempts & Reservation Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Age & Attempts Relaxations */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                  <h4 className="font-bold text-sm text-[#0b3b60]">Relaxations & Attempt Limits</h4>
                  
                  <div className="space-y-3 text-xs text-slate-700">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-150">
                      <strong className="block text-slate-900 mb-1">Scheduled Castes / Scheduled Tribes (SC/ST)</strong>
                      <span>Age relaxable up to a maximum of <strong>5 years</strong>. Candidates have <strong>unlimited attempts</strong>.</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-150">
                      <strong className="block text-slate-900 mb-1">Other Backward Classes (OBC)</strong>
                      <span>Age relaxable up to a maximum of <strong>3 years</strong>. Candidates have a limit of <strong>9 attempts</strong>.</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-150">
                      <strong className="block text-slate-900 mb-1">General / EWS Category</strong>
                      <span>Allowed a maximum of <strong>6 attempts</strong>.</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 italic">
                    * Note: If a candidate actually appears in any one paper in the Preliminary Examination, it is deemed that they have made a full attempt at the Civil Services Examination.
                  </p>
                </div>

                {/* Reservation Breakdown */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                  <h4 className="font-bold text-sm text-[#0b3b60]">Reservation Policy</h4>
                  
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                      <span>Other Backward Classes (OBC)</span>
                      <span className="font-bold text-slate-900 font-mono">25%</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                      <span>Scheduled Castes (SC)</span>
                      <span className="font-bold text-slate-900 font-mono">15%</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                      <span>Economically Weaker Sections (EWS)</span>
                      <span className="font-bold text-slate-900 font-mono">10%</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                      <span>Scheduled Tribes (ST)</span>
                      <span className="font-bold text-slate-900 font-mono">7.5%</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span>Persons with Benchmark Disability (PwBD)</span>
                      <span className="font-bold text-[#0b3b60] font-mono">4%</span>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-lg text-xs text-amber-900 leading-relaxed border border-amber-200">
                    <strong>Mains Admission Scale:</strong> The number of candidates admitted to the Main Examination is about <strong>12 to 13 times</strong> the total approximate number of vacancies to be filled in that year.
                  </div>
                </div>

              </div>
            </div>

            {/* Stages & Plan of Examination */}
            <div className="space-y-4 pt-4">
              <div className="border-b border-slate-200 pb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#0b3b60]" />
                <h3 className="text-lg font-bold font-serif text-[#0b3b60]">3. Plan of Examination (Compulsory Stages)</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Prelims */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                  <div className="pb-2 border-b border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Stage I</span>
                    <h4 className="font-bold text-sm text-[#0b3b60] font-serif">Preliminary Examination (Screening Only)</h4>
                  </div>
                  
                  <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                    <li>• Comprises <strong>two compulsory objective papers</strong> of 200 marks each (Total 400 Marks, 2 hours duration each, set in Hindi & English).</li>
                    <li>• <strong>General Studies Paper-II (CSAT)</strong> is qualifying in nature with minimum qualifying marks fixed at <strong>33%</strong>.</li>
                    <li>• Marks obtained in Prelims act as screening and are <strong>not counted</strong> for final order of merit ranking.</li>
                    <li className="p-2 bg-red-50 text-red-900 border border-red-150 rounded">
                      <strong>Negative Marking:</strong> One-third <strong>(0.33)</strong> of the marks assigned to that question is deducted as penalty for wrong answers. Leaving a question blank has no penalty.
                    </li>
                  </ul>
                </div>

                {/* Mains */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                  <div className="pb-2 border-b border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Stage II</span>
                    <h4 className="font-bold text-sm text-[#0b3b60] font-serif">Main Written Examination (Descriptive)</h4>
                  </div>
                  
                  <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                    <li>• Intended to assess the overall intellectual traits and depth of understanding rather than mere memory. Marks will not be allotted for superficial knowledge.</li>
                    <li>• Comprises <strong>7 compulsory papers for merit (1750 Marks)</strong> and <strong>2 qualifying conventional language papers (300 Marks each)</strong>.</li>
                    <li>• **Qualifying standard** for Paper-A (Indian Language) and Paper-B (English) is fixed at <strong>25% marks</strong>.</li>
                    <li>• Candidates who clear the written cutoff (summoned at twice the number of vacancies) move to the Personality Test.</li>
                  </ul>
                </div>

                {/* Interview */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                  <div className="pb-2 border-b border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Stage III</span>
                    <h4 className="font-bold text-sm text-[#0b3b60] font-serif">Interview & Personality Test (275 Marks)</h4>
                  </div>
                  
                  <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                    <li>• Purpose is to assess the personal suitability of the candidate for a career in public service by a Board of competent, unbiased observers.</li>
                    <li>• Evaluates mental alertness, critical powers of assimilation, logical exposition, balance of judgment, social cohesion, and moral integrity.</li>
                    <li>• It is a natural, directed, and purposive conversation rather than a strict cross-examination. No minimum qualifying marks are fixed.</li>
                  </ul>
                </div>

              </div>
            </div>

          </motion.section>
        )}

        {/* SYLLABUS TAB - COMPLETE CONTENT FROM OFFICIAL PDF */}
        {activeTab === 'syllabus' && (
          <motion.section 
            key="tab-syllabus" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }} 
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="text-left mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b3b60] font-serif">
                Official Syllabi for Civil Services Examination
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Complete, authentic syllabus breakdown for Preliminary Examination, Main Examination (GS I - IV & Essay), and Specialized Optional Subjects.
              </p>
            </div>

            {/* Sub-navigation Pills for Syllabus */}
            <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-200">
              <button
                onClick={() => setSyllabusStage('prelims')}
                className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                  syllabusStage === 'prelims'
                    ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                1. Preliminary Examination
              </button>
              <button
                onClick={() => setSyllabusStage('mains')}
                className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                  syllabusStage === 'mains'
                    ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                2. Main Examination (GS I - IV & Essay)
              </button>
              <button
                onClick={() => setSyllabusStage('optionals')}
                className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                  syllabusStage === 'optionals'
                    ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                3. Optional Subjects (Pub Ad, PSIR, Law)
              </button>
            </div>

            {/* ========================================================= */}
            {/* SECTION 1: PRELIMINARY EXAMINATION SYLLABUS */}
            {/* ========================================================= */}
            {syllabusStage === 'prelims' && (
              <div className="space-y-6">
                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 leading-relaxed">
                  <strong>Examination Scheme:</strong> The Preliminary Examination consists of two objective type (multiple choice questions) papers and carries a maximum of 400 marks. Paper II (CSAT) is qualifying with a minimum 33% required score.
                </div>

                {/* Paper I */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs hover:border-[#0b3b60] transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-100 gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Paper I · Merit Scoring</span>
                      <h3 className="text-lg font-black text-[#0b3b60] font-serif">General Studies Paper - I</h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold font-mono">
                      <span className="bg-slate-100 px-2.5 py-1 rounded text-slate-700 border border-slate-200">200 Marks</span>
                      <span className="bg-slate-100 px-2.5 py-1 rounded text-slate-700 border border-slate-200">Duration: 2 Hours</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Current events of national and international importance.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>History of India and Indian National Movement.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Indian and World Geography - Physical, Social, Economic Geography of India and the World.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Indian Polity and Governance - Constitution, Political System, Panchayati Raj, Public Policy, Rights Issues, etc.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Economic and Social Development - Sustainable Development, Poverty, Inclusion, Demographics, Social Sector Initiatives, etc.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>General issues on Environmental ecology, Bio-diversity and Climate Change - that do not require subject specialization.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>General Science.</span>
                    </li>
                  </ul>
                </div>

                {/* Paper II */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs hover:border-[#0b3b60] transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-100 gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Paper II · Aptitude (Qualifying 33%)</span>
                      <h3 className="text-lg font-black text-[#0b3b60] font-serif">General Studies Paper - II (CSAT)</h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold font-mono">
                      <span className="bg-slate-100 px-2.5 py-1 rounded text-slate-700 border border-slate-200">200 Marks</span>
                      <span className="bg-slate-100 px-2.5 py-1 rounded text-slate-700 border border-slate-200">Duration: 2 Hours</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Comprehension</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Interpersonal skills including communication skills;</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Logical reasoning and analytical ability;</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Decision making and problem solving;</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>General mental ability;</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Basic numeracy (numbers and their relations, orders of magnitude, etc.) (Class X level), Data interpretation (charts, graphs, tables, data sufficiency etc. — Class X level);</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* SECTION 2: MAIN EXAMINATION (GS I - IV & ESSAY) */}
            {/* ========================================================= */}
            {syllabusStage === 'mains' && (
              <div className="space-y-8">
                
                {/* Paper I: Essay */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Paper - I · 250 Marks</span>
                      <h3 className="text-lg font-black text-[#0b3b60] font-serif">Essay</h3>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <p>
                      Candidates may be required to write essays on multiple topics. They will be expected to keep closely to the subject of the essay to arrange their ideas in orderly fashion, and to write concisely.
                    </p>
                    <p className="font-semibold text-[#0b3b60]">
                      Credit will be given for effective and exact expression.
                    </p>
                  </div>
                </div>

                {/* Paper II: GS I */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                  <div className="pb-3 mb-4 border-b border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Paper - II · 250 Marks</span>
                    <h3 className="text-lg font-black text-[#0b3b60] font-serif">General Studies - I</h3>
                    <p className="text-xs font-semibold text-slate-600 italic mt-0.5">
                      Indian Heritage and Culture, History and Geography of the World and Society
                    </p>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Indian culture will cover the salient aspects of Art Forms, literature and Architecture from ancient to modern times.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Modern Indian history from about the middle of the eighteenth century until the present - significant events, personalities, issues.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>The Freedom Struggle — its various stages and important contributors/contributions from different parts of the country.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Post-independence consolidation and reorganization within the country.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>History of the world will include events from 18th century such as industrial revolution, world wars, redrawal of national boundaries, colonization, decolonization, political philosophies like communism, capitalism, socialism etc.— their forms and effect on the society.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Salient features of Indian Society, Diversity of India.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Role of women and women’s organization, population and associated issues, poverty and developmental issues, urbanization, their problems and their remedies.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Effects of globalization on Indian society.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Social empowerment, communalism, regionalism & secularism.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Salient features of world’s physical geography.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Distribution of key natural resources across the world (including South Asia and the Indian subcontinent); factors responsible for the location of primary, secondary, and tertiary sector industries in various parts of the world (including India).</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Important Geophysical phenomena such as earthquakes, Tsunami, Volcanic activity, cyclone etc., geographical features and their location-changes in critical geographical features (including water-bodies and ice-caps) and in flora and fauna and the effects of such changes.</span>
                    </li>
                  </ul>
                </div>

                {/* Paper III: GS II */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                  <div className="pb-3 mb-4 border-b border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Paper - III · 250 Marks</span>
                    <h3 className="text-lg font-black text-[#0b3b60] font-serif">General Studies - II</h3>
                    <p className="text-xs font-semibold text-slate-600 italic mt-0.5">
                      Governance, Constitution, Polity, Social Justice and International relations
                    </p>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Indian Constitution—historical underpinnings, evolution, features, amendments, significant provisions and basic structure.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Functions and responsibilities of the Union and the States, issues and challenges pertaining to the federal structure, devolution of powers and finances up to local levels and challenges therein.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Separation of powers between various organs dispute redressal mechanisms and institutions.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Comparison of the Indian constitutional scheme with that of other countries.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Parliament and State legislatures—structure, functioning, conduct of business, powers & privileges and issues arising out of these.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Structure, organization and functioning of the Executive and the Judiciary—Ministries and Departments of the Government; pressure groups and formal/informal associations and their role in the Polity.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Salient features of the Representation of People’s Act.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Appointment to various Constitutional posts, powers, functions and responsibilities of various Constitutional Bodies.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Statutory, regulatory and various quasi-judicial bodies.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Government policies and interventions for development in various sectors and issues arising out of their design and implementation.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Development processes and the development industry — the role of NGOs, SHGs, various groups and associations, donors, charities, institutional and other stakeholders.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Welfare schemes for vulnerable sections of the population by the Centre and States and the performance of these schemes; mechanisms, laws, institutions and Bodies constituted for the protection and betterment of these vulnerable sections.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Issues relating to development and management of Social Sector/Services relating to Health, Education, Human Resources.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Issues relating to poverty and hunger.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Important aspects of governance, transparency and accountability, e-governance—applications, models, successes, limitations, and potential; citizens charters, transparency & accountability and institutional and other measures.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Role of civil services in a democracy.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>India and its neighborhood- relations.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Bilateral, regional and global groupings and agreements involving India and/or affecting India’s interests.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Effect of policies and politics of developed and developing countries on India’s interests, Indian diaspora.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Important International institutions, agencies and fora- their structure, mandate.</span>
                    </li>
                  </ul>
                </div>

                {/* Paper IV: GS III */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                  <div className="pb-3 mb-4 border-b border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Paper - IV · 250 Marks</span>
                    <h3 className="text-lg font-black text-[#0b3b60] font-serif">General Studies - III</h3>
                    <p className="text-xs font-semibold text-slate-600 italic mt-0.5">
                      Technology, Economic Development, Bio diversity, Environment, Security and Disaster Management
                    </p>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Indian Economy and issues relating to planning, mobilization, of resources, growth, development and employment.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Inclusive growth and issues arising from it.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Government Budgeting.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Major crops-cropping patterns in various parts of the country, - different types of irrigation and irrigation systems storage, transport and marketing of agricultural produce and issues and related constraints; e-technology in the aid of farmers.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Issues related to direct and indirect farm subsidies and minimum support prices; Public Distribution System- objectives, functioning, limitations, revamping; issues of buffer stocks and food security; Technology missions; economics of animal-rearing.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Food processing and related industries in India- scope and significance, location, upstream and downstream requirements, supply chain management.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Land reforms in India.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Effects of liberalization on the economy, changes in industrial policy and their effects on industrial growth.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Infrastructure: Energy, Ports, Roads, Airports, Railways etc.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Investment models.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Science and Technology- developments and their applications and effects in everyday life.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Achievements of Indians in science & technology; indigenization of technology and developing new technology.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Awareness in the fields of IT, Space, Computers, robotics, nano-technology, bio-technology and issues relating to intellectual property rights.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Conservation, environmental pollution and degradation, environmental impact assessment.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Disaster and disaster management.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Linkages between development and spread of extremism.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Role of external state and non-state actors in creating challenges to internal security.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Challenges to internal security through communication networks, role of media and social networking sites in internal security challenges, basics of cyber security; money-laundering and its prevention.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Security challenges and their management in border areas - linkages of organized crime with terrorism.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span>Various Security forces and agencies and their mandate.</span>
                    </li>
                  </ul>
                </div>

                {/* Paper V: GS IV */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                  <div className="pb-3 mb-4 border-b border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Paper - V · 250 Marks</span>
                    <h3 className="text-lg font-black text-[#0b3b60] font-serif">General Studies - IV</h3>
                    <p className="text-xs font-semibold text-slate-600 italic mt-0.5">
                      Ethics, Integrity and Aptitude
                    </p>
                  </div>

                  <div className="text-xs text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4 leading-relaxed">
                    This paper will include questions to test the candidates’ attitude and approach to issues relating to integrity, probity in public life and his problem solving approach to various issues and conflicts faced by him in dealing with society. Questions may utilise the case study approach to determine these aspects. The following broad areas will be covered:
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <div>
                        <strong>Ethics and Human Interface:</strong> Essence, determinants and consequences of Ethics in-human actions; dimensions of ethics; ethics - in private and public relationships. Human Values - lessons from the lives and teachings of great leaders, reformers and administrators; role of family society and educational institutions in inculcating values.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <div>
                        <strong>Attitude:</strong> content, structure, function; its influence and relation with thought and behaviour; moral and political attitudes; social influence and persuasion.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <div>
                        <strong>Aptitude and foundational values for Civil Service:</strong> integrity, impartiality and non-partisanship, objectivity, dedication to public service, empathy, tolerance and compassion towards the weaker-sections.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <div>
                        <strong>Emotional intelligence:</strong> concepts, and their utilities and application in administration and governance.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <div>
                        <strong>Contributions of moral thinkers and philosophers</strong> from India and world.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <div>
                        <strong>Public/Civil service values and Ethics in Public administration:</strong> Status and problems; ethical concerns and dilemmas in government and private institutions; laws, rules, regulations and conscience as sources of ethical guidance; accountability and ethical governance; strengthening of ethical and moral values in governance; ethical issues in international relations and funding; corporate governance.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <div>
                        <strong>Probity in Governance:</strong> Concept of public service; Philosophical basis of governance and probity; Information sharing and transparency in government, Right to Information, Codes of Ethics, Codes of Conduct, Citizen’s Charters, Work culture, Quality of service delivery, Utilization of public funds, challenges of corruption.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <div>
                        <strong>Case Studies:</strong> Practical application questions and comprehensive case studies on the above issues.
                      </div>
                    </li>
                  </ul>
                </div>

              </div>
            )}

            {/* ========================================================= */}
            {/* SECTION 3: OPTIONAL SUBJECTS */}
            {/* ========================================================= */}
            {syllabusStage === 'optionals' && (
              <div className="space-y-6">
                
                {/* Optional Subject Switcher */}
                <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setSelectedOptional('pubad')}
                    className={`flex-1 min-w-[140px] py-2 text-xs font-bold rounded-lg transition-all ${
                      selectedOptional === 'pubad'
                        ? 'bg-white text-[#0b3b60] shadow-xs border border-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Public Administration
                  </button>
                  <button
                    onClick={() => setSelectedOptional('psir')}
                    className={`flex-1 min-w-[140px] py-2 text-xs font-bold rounded-lg transition-all ${
                      selectedOptional === 'psir'
                        ? 'bg-white text-[#0b3b60] shadow-xs border border-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Political Science & IR (PSIR)
                  </button>
                  <button
                    onClick={() => setSelectedOptional('law')}
                    className={`flex-1 min-w-[140px] py-2 text-xs font-bold rounded-lg transition-all ${
                      selectedOptional === 'law'
                        ? 'bg-white text-[#0b3b60] shadow-xs border border-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Law
                  </button>
                </div>

                {/* OPTIONAL 1: PUBLIC ADMINISTRATION */}
                {selectedOptional === 'pubad' && (
                  <div className="space-y-6 animate-in fade-in duration-150">
                    {/* Pub Ad Paper I */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                      <div className="pb-3 mb-4 border-b border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Paper - I · 250 Marks</span>
                        <h3 className="text-lg font-black text-[#0b3b60] font-serif">Administrative Theory</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>1. Introduction:</strong> Meaning, scope and significance of Public Administration, Wilson’s vision of Public Administration, Evolution of the discipline and its present status. New Public Administration, Public Choice approach; Challenges of liberalization, Privatisation, Globalisation; Good Governance: concept and application; New Public Management.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>2. Administrative Thought:</strong> Scientific Management and Scientific Management movement; Classical Theory; Weber’s bureaucratic model its critique and post-Weberian Developments; Dynamic Administration (Mary Parker Follett); Human Relations School (Elton Mayo and others); Functions of the Executive (C.I. Barnard); Simon’s decision-making theory; Participative Management (R. Likert, C. Argyris, D. McGregor.)
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>3. Administrative Behaviour:</strong> Process and techniques of decision-making; Communication; Morale; Motivation Theories content, process and contemporary; Theories of Leadership: Traditional and Modern.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>4. Organisations:</strong> Theories systems, contingency; Structure and forms: Ministries and Departments, Corporations, Companies; Boards and Commissions; Ad hoc, and advisory bodies; Headquarters and Field relationships; Regulatory Authorities; Public-Private Partnerships.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>5. Accountability and Control:</strong> Concepts of accountability and control; Legislative, Executive and judicial control over administration; Citizen and Administration; Role of media, interest groups, voluntary organizations; Civil society; Citizen’s Charters; Right to Information; Social audit.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>6. Administrative Law:</strong> Meaning, scope and significance; Dicey on Administrative law; Delegated legislation; Administrative Tribunals.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>7. Comparative Public Administration:</strong> Historical and sociological factors affecting administrative systems; Administration and politics in different countries; Current status of Comparative Public Administration; Ecology and administration; Riggsian models and their critique.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>8. Development Dynamics:</strong> Concept of development; Changing profile of development administration; ‘Anti-development thesis’; Bureaucracy and development; Strong state versus the market debate; Impact of liberalisation on administration in developing countries; Women and development the self-help group movement.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>9. Personnel Administration:</strong> Importance of human resource development; Recruitment, training, career advancement, position classification, discipline, performance appraisal, promotion, pay and service conditions; employer-employee relations, grievance redressal mechanism; Code of conduct; Administrative ethics.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>10. Public Policy:</strong> Models of policy-making and their critique; Processes of conceptualisation, planning, implementation, monitoring, evaluation and review and their limitations; State theories and public policy formulation.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>11. Techniques of Administrative Improvement:</strong> Organisation and methods, Work study and work management; e-governance and information technology; Management aid tools like network analysis, MIS, PERT, CPM.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>12. Financial Administration:</strong> Monetary and fiscal policies: Public borrowings and public debt Budgets types and forms; Budgetary process; Financial accountability; Accounts and audit.
                        </div>
                      </div>
                    </div>

                    {/* Pub Ad Paper II */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                      <div className="pb-3 mb-4 border-b border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Paper - II · 250 Marks</span>
                        <h3 className="text-lg font-black text-[#0b3b60] font-serif">Indian Administration</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>1. Evolution of Indian Administration:</strong> Kautilya Arthashastra; Mughal administration; Legacy of British rule in politics and administration Indianization of Public services, revenue administration, district Administration, local self-Government.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>2. Philosophical and Constitutional framework of Government:</strong> Salient features and value premises; Constitutionalism; Political culture; Bureaucracy and democracy; Bureaucracy and development.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>3. Public Sector Undertakings:</strong> Public sector in modern India; Forms of Public Sector Undertakings; Problems of autonomy, accountability and control; Impact of liberalization and privatization.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>4. Union Government and Administration:</strong> Executive, Parliament, Judiciary-structure, functions, work processes; Recent trends; Intragovernmental relations; Cabinet Secretariat; Prime Minister’s Office; Central Secretariat; Ministries and Departments; Boards; Commissions; Attached offices; Field organizations.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>5. Plans and Priorities:</strong> Machinery of planning; Role, composition and functions of the Planning Commission and the National Development Council; ‘Indicative’ planning; Process of plan formulation at Union and State levels; Constitutional Amendments (1992) and decentralized planning for economic development and social justice.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>6. State Government and Administration:</strong> Union-State administrative, legislative and financial relations; Role of the Finance Commission; Governor; Chief Minister; Council of Ministers; Chief Secretary; State Secretariat; Directorates.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>7. District Administration since Independence:</strong> Changing role of the Collector; Union-State-local relations; Imperatives of development management, law and order administration; District administration and democratic decentralization.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>8. Civil Services:</strong> Constitutional position; Structure, recruitment, training and capacity building; Good governance initiatives; Code of conduct and discipline; Staff associations; Political rights; Grievance redressal mechanism; Civil service neutrality; Civil service activism.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>9. Financial Management:</strong> Budget as a political instrument; Parliamentary control of public expenditure; Role of finance ministry in monetary and fiscal area; Accounting techniques; Audit; Role of Controller General of Accounts and Comptroller and Auditor General of India.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>10. Administrative Reforms since Independence:</strong> Major concerns; Important Committees and Commissions; Reforms in financial management and human resource development; Problems of implementation.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>11. Rural Development:</strong> Institutions and agencies since Independence; Rural development programmes: foci and strategies; Decentralization and Panchayati Raj; 73rd Constitutional amendment.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>12. Urban Local Government:</strong> Municipal governance: main features, structures, finance and problem areas; 74th Constitutional Amendment; Global-local debate; New localism; Development dynamics, politics and administration with special reference to city management.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>13. Law and Order Administration:</strong> British legacy; National Police Commission; Investigative agencies; Role of Central and State Agencies including para military forces in maintenance of law and order and countering insurgency and terrorism; Criminalisation of politics and administration; Police-public relations; Reforms in Police.
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <strong>14. Significant issues in Indian Administration:</strong> Values in public service; Regulatory Commissions; National Human Rights Commission; Problems of administration in coalition regimes; Citizen administration interface; Corruption and administration; Disaster management.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* OPTIONAL 2: POLITICAL SCIENCE & INTERNATIONAL RELATIONS (PSIR) */}
                {selectedOptional === 'psir' && (
                  <div className="space-y-6 animate-in fade-in duration-150">
                    {/* PSIR Paper I */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                      <div className="pb-3 mb-4 border-b border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Paper - I · 250 Marks</span>
                        <h3 className="text-lg font-black text-[#0b3b60] font-serif">Political Theory and Indian Politics</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="border-l-2 border-[#0b3b60] pl-3 py-1">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900">Section A: Political Theory</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>1. Political Theory:</strong> meaning and approaches.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>2. Theories of state:</strong> Liberal, Neo-liberal, Marxist, Pluralist, post-colonial and Feminist.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>3. Justice:</strong> Conceptions of justice with special reference to Rawl’s theory of justice and its communitarian critiques.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>4. Equality:</strong> Social, political and economic; relationship between equality and freedom; Affirmative action.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>5. Rights:</strong> Meaning and theories; different kinds of rights; Concept of Human Rights.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>6. Democracy:</strong> Classical and contemporary theories; different models of democracy—representative, participatory and deliberative.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>7. Concept of power:</strong> hegemony, ideology and legitimacy.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>8. Political Ideologies:</strong> Liberalism, Socialism, Marxism, Fascism, Gandhism and Feminism.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>9. Indian Political Thought:</strong> Dharamshastra, Arthashastra and Buddhist Traditions; Sir Syed Ahmed Khan, Sri Aurobindo, M. K. Gandhi, B. R. Ambedkar, M. N. Roy.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>10. Western Political Thought:</strong> Plato, Aristotle, Machiavelli, Hobbes, Locke, John S. Mill, Marx, Gramsci, Hannah Arendt.</div>
                        </div>

                        <div className="border-l-2 border-[#0b3b60] pl-3 py-1 mt-6">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900">Section B: Indian Government and Politics</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>1. Indian Nationalism:</strong> (a) Political Strategies of India’s Freedom Struggle: Constitutionalism to mass Satyagraha, Non-cooperation, Civil Disobedience; Militant and Revolutionary Movements, Peasant and Workers Movements. (b) Perspectives on Indian National Movement; Liberal, Socialist and Marxist; Radical Humanist and Dalit.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>2. Making of the Indian Constitution:</strong> Legacies of the British rule; different social and political perspectives.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>3. Salient Features of the Indian Constitution:</strong> The Preamble, Fundamental Rights and Duties, Directive Principles; Parliamentary System and Amendment Procedures; Judicial Review and Basic Structure doctrine.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>4. Principal Organs:</strong> (a) Union Government: Envisaged role and actual working of Executive, Legislature and Supreme Court. (b) State Government: Executive, Legislature and High Courts.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>5. Grassroots Democracy:</strong> Panchayati Raj and Municipal Government; Significance of 73rd and 74th Amendments; Grassroot movements.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>6. Statutory Institutions/Commissions:</strong> Election Commission, CAG, Finance Commission, UPSC, NCSC, NCST, NCW, NHRC, NCM, NCBC.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>7. Federalism:</strong> Constitutional provisions; changing nature of centre-state relations; integrationist tendencies and regional aspirations; inter-state disputes.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>8. Planning and Economic development:</strong> Nehruvian and Gandhian perspectives; Role of planning and public sector; Green Revolution, land reforms and agrarian relations; liberalization and economic reforms.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>9. Caste, Religion and Ethnicity</strong> in Indian Politics.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>10. Party System:</strong> National and regional political parties, ideological and social bases of parties; Patterns of coalition politics; Pressure groups, trends in electoral behaviour; changing socio-economic profile of Legislators.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>11. Social Movements:</strong> Civil liberties and human rights movements; women’s movements; environmentalist movements.</div>
                        </div>
                      </div>
                    </div>

                    {/* PSIR Paper II */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                      <div className="pb-3 mb-4 border-b border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Paper - II · 250 Marks</span>
                        <h3 className="text-lg font-black text-[#0b3b60] font-serif">Comparative Politics and International Relations</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="border-l-2 border-[#0b3b60] pl-3 py-1">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900">Section A: Comparative Political Analysis & International Politics</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>1. Comparative Politics:</strong> Nature and major approaches; Political economy and political sociology perspectives; Limitations of the comparative method.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>2. State in Comparative Perspective:</strong> Characteristics and changing nature of the State in capitalist and socialist economies, and advanced industrial and developing societies.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>3. Politics of Representation and Participation:</strong> Political parties, pressure groups and social movements in advanced industrial and developing societies.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>4. Globalisation:</strong> Responses from developed and developing societies.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>5. Approaches to Study of IR:</strong> Idealist, Realist, Marxist, Functionalist and Systems theory.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>6. Key Concepts in IR:</strong> National interest, security and power; Balance of power and deterrence; Transnational actors and collective security; World capitalist economy and globalisation.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>7. Changing International Political Order:</strong> (a) Rise of super powers; Bipolarity, arms race and cold war; Nuclear threat; (b) Non-aligned Movement; (c) Collapse of Soviet Union; Unipolarity and American hegemony; Relevance of non-alignment.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>8. International Economic System:</strong> Brettonwoods to WTO; Socialist economies and CMEA; NIEO demand; Globalisation.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>9. United Nations:</strong> Envisaged role and actual record; Specialized UN agencies; need for UN reforms.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>10. Regionalisation of World Politics:</strong> EU, ASEAN, APEC, SAARC, NAFTA.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>11. Contemporary Global Concerns:</strong> Democracy, human rights, environment, gender justice, terrorism, nuclear proliferation.</div>
                        </div>

                        <div className="border-l-2 border-[#0b3b60] pl-3 py-1 mt-6">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900">Section B: India and the World</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>1. Indian Foreign Policy:</strong> Determinants of foreign policy; the institutions of policy-making; Continuity and change.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>2. India’s Contribution to NAM:</strong> Different phases; Current role.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>3. India and South Asia:</strong> (a) Regional Co-operation: SAARC; (b) South Asia as a Free Trade Area; (c) India’s “Look East” policy; (d) Impediments: River water disputes; migration; Ethnic conflicts; Border disputes.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>4. India and Global South:</strong> Relations with Africa and Latin America; Leadership role in NIEO and WTO negotiations.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>5. Global Centres of Power:</strong> Relations with USA, EU, Japan, China and Russia.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>6. India and UN System:</strong> UN Peace-keeping; Demand for Permanent Seat in UNSC.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>7. Nuclear Question:</strong> Changing perceptions and policy.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>8. Recent developments in Foreign Policy:</strong> Crises in Afghanistan, Iraq and West Asia, relations with US and Israel; Vision of new world order.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* OPTIONAL 3: LAW */}
                {selectedOptional === 'law' && (
                  <div className="space-y-6 animate-in fade-in duration-150">
                    {/* Law Paper I */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                      <div className="pb-3 mb-4 border-b border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Paper - I · 250 Marks</span>
                        <h3 className="text-lg font-black text-[#0b3b60] font-serif">Constitutional and Administrative Law & International Law</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="border-l-2 border-[#0b3b60] pl-3 py-1">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900">Section A: Constitutional and Administrative Law</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>1. Constitution and Constitutionalism:</strong> The distinctive features of the Constitution.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>2. Fundamental Rights:</strong> Public interest litigation; Legal Aid; Legal services authority.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>3. Relationships:</strong> Relationship between Fundamental rights, Directive principles and Fundamental duties.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>4. President:</strong> Constitutional Position of President and relation with Council of Ministers.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>5. Governor:</strong> Governor and his powers.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>6. Supreme Court & High Courts:</strong> (a) Appointments and transfer; (b) Powers, functions and jurisdiction.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>7. Centre, States & Local Bodies:</strong> (a) Legislative powers distribution; (b) Local Bodies; (c) Administrative relations; (d) Eminent domain.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>8. Legislative powers</strong>, privileges and immunities.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>9. Services:</strong> (a) Recruitment and conditions; Constitutional safeguards; Administrative tribunals; (b) UPSC and State PSCs; (c) Election Commission.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>10. Emergency provisions.</strong></div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>11. Amendment</strong> of the Constitution.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>12. Principle of Natural Justice:</strong> Emerging trends and judicial approach.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>13. Delegated legislation</strong> and its constitutionality.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>14. Separation of powers</strong> and constitutional governance.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>15. Judicial review</strong> of administrative action.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>16. Ombudsman:</strong> Lokayukta, Lokpal etc.</div>
                        </div>

                        <div className="border-l-2 border-[#0b3b60] pl-3 py-1 mt-6">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900">Section B: International Law</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>1. Nature & Definition</strong> of International Law.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>2. Relationship</strong> between International Law and Municipal Law.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>3. State Recognition</strong> and State Succession.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>4. Law of the sea:</strong> Inland Waters, Territorial Sea, Contiguous Zone, Continental Shelf, EEZ and High Seas.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>5. Individuals:</strong> Nationality, statelessness; Human Rights and enforcement procedures.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>6. Jurisdiction:</strong> Territorial jurisdiction of States, Extradition and Asylum.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>7. Treaties:</strong> Formation, application, termination and reservation.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>8. United Nations:</strong> Principal organs, powers, functions and reform.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>9. Peaceful settlement</strong> of disputes - different modes.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>10. Lawful recourse to force:</strong> aggressions, self-defence, intervention.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>11. International Humanitarian Law:</strong> Conventions and contemporary developments.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>12. Nuclear Weapons:</strong> Legality of use; testing ban; NPT, CTBT.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>13. Terrorism:</strong> State sponsored terrorism, Hijacking, International Criminal Court.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>14. Economic & Monetary Law:</strong> WTO, TRIPS, GATT, IMF, World Bank.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>15. Human Environment:</strong> Protection and improvement - International efforts.</div>
                        </div>
                      </div>
                    </div>

                    {/* Law Paper II */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                      <div className="pb-3 mb-4 border-b border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Paper - II · 250 Marks</span>
                        <h3 className="text-lg font-black text-[#0b3b60] font-serif">Law of Crimes, Torts, Contracts & Contemporary Developments</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="border-l-2 border-[#0b3b60] pl-3 py-1">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900">Section A: Law of Crimes & Law of Torts</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>Law of Crimes:</strong> Mens rea and actus reus; Capital punishment abolition trends; Preparations and criminal attempt; General exceptions; Joint liability; Abetment; Criminal conspiracy; Offences against State, public tranquility, human body, property, women; Defamation; Prevention of Corruption Act, 1988; Protection of Civil Rights Act, 1955; Plea bargaining.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>Law of Torts:</strong> Nature and definition; Fault and strict liability; Absolute liability; Vicarious liability & State Liability; General defences; Joint tort feasors; Remedies; Negligence; Defamation; Nuisance; Conspiracy; False imprisonment; Malicious prosecution; Consumer Protection Act, 1986.</div>
                        </div>

                        <div className="border-l-2 border-[#0b3b60] pl-3 py-1 mt-6">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900">Section B: Law of Contracts, Mercantile Law & Contemporary Legal Developments</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>Contracts & Mercantile Law:</strong> Formation of contract/E-contract; Free consent vitiating factors; Void and unenforceable agreements; Performance and discharge; Quasi-contracts; Breach consequences; Indemnity, guarantee, insurance; Agency; Sale of goods; Partnership dissolution; Negotiable Instruments Act, 1881; Arbitration and Conciliation Act, 1996; Standard form contracts.</div>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><strong>Contemporary Legal Developments:</strong> Public Interest Litigation (PIL); Intellectual property rights (IPR); Information Technology Law & Cyber Laws; Competition Law; Alternate Dispute Resolution (ADR); Major environmental law statutes; Right to Information Act; Trial by media.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

          </motion.section>
        )}

        {/* SUGGESTED READING TAB */}
        {activeTab === 'reading' && (
          <motion.section 
            key="tab-reading" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }} 
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="text-left mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b3b60] font-serif">
                Suggested Reading: General Studies
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Standard reference literature, NCERT foundational textbooks, and Administrative Commission Reports for Civil Services Examination.
              </p>
            </div>

            {/* Subject Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* 1. Constitution, Polity and Governance */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Polity & Governance</span>
                  <h3 className="text-base font-bold text-[#0b3b60] font-serif mt-0.5">Constitution, Polity and Governance</h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 font-bold text-[10.5px] rounded border border-blue-200 mb-1.5 font-mono">NCERT Textbooks</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-blue-200 text-xs">
                      <li>• Democratic Politics - Vol. I (Class IX)</li>
                      <li>• Democratic Politics - Vol. II (Class X)</li>
                      <li>• Indian Constitution at Work (Class XI)</li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-800 font-bold text-[10.5px] rounded border border-amber-200 mb-1.5 font-mono">Standard References</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-amber-300 text-xs">
                      <li>• <em>Our Political System</em> – Subhash C. Kashyap</li>
                      <li>• <em>Indian Political System: Institutions and Processes</em> – Bidyut Chakrabarty & Rajendra K. Pandey</li>
                      <li>• <em>From Government to Governance</em> – Kuldeep Mathur (National Book Trust India)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 2. Art and Culture */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Culture & Heritage</span>
                  <h3 className="text-base font-bold text-[#0b3b60] font-serif mt-0.5">Art and Culture</h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 font-bold text-[10.5px] rounded border border-blue-200 mb-1.5 font-mono">NCERT Textbooks</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-blue-200 text-xs">
                      <li>• Introduction to Indian Arts (Class XI)</li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-800 font-bold text-[10.5px] rounded border border-amber-200 mb-1.5 font-mono">Standard References</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-amber-300 text-xs">
                      <li>• <em>Indian Art and Culture</em> – Nitin Singhania</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3. History */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Historical Studies</span>
                  <h3 className="text-base font-bold text-[#0b3b60] font-serif mt-0.5">History</h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 font-bold text-[10.5px] rounded border border-blue-200 mb-1.5 font-mono">NCERT Textbooks</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-blue-200 text-xs">
                      <li>• India and Contemporary World - I (Class IX)</li>
                      <li>• India and Contemporary World - II (Class X)</li>
                      <li>• Themes of World History (Class XI)</li>
                      <li>• Themes in Indian History - Part I (Class XII)</li>
                      <li>• Themes in Indian History - Part II (Class XII)</li>
                      <li>• Themes in Indian History - Part III (Class XII)</li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-800 font-bold text-[10.5px] rounded border border-amber-200 mb-1.5 font-mono">Standard References</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-amber-300 text-xs">
                      <li>• <em>India’s Ancient Past</em> – R.S. Sharma</li>
                      <li>• <em>History of Modern India</em> – Bipan Chandra</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 4. Geography */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Physical & Human</span>
                  <h3 className="text-base font-bold text-[#0b3b60] font-serif mt-0.5">Geography</h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 font-bold text-[10.5px] rounded border border-blue-200 mb-1.5 font-mono">NCERT Textbooks</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-blue-200 text-xs">
                      <li>• Contemporary India - I (Class IX)</li>
                      <li>• Contemporary India - II (Class X)</li>
                      <li>• Fundamentals of Physical Geography (Class XI)</li>
                      <li>• Fundamentals of Human Geography (Class XII)</li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-800 font-bold text-[10.5px] rounded border border-amber-200 mb-1.5 font-mono">Standard References</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-amber-300 text-xs">
                      <li>• <em>Indian and World Geography</em> – Majid Husain</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 5. Society */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Indian Society</span>
                  <h3 className="text-base font-bold text-[#0b3b60] font-serif mt-0.5">Society</h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 font-bold text-[10.5px] rounded border border-blue-200 mb-1.5 font-mono">NCERT Textbooks</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-blue-200 text-xs">
                      <li>• Indian Society (Class XII)</li>
                      <li>• Social Change and Development in India (Class XII)</li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-800 font-bold text-[10.5px] rounded border border-amber-200 mb-1.5 font-mono">Standard References</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-amber-300 text-xs">
                      <li>• <em>Indian Social System</em> – Ram Ahuja</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 6. International Relations */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Global Affairs</span>
                  <h3 className="text-base font-bold text-[#0b3b60] font-serif mt-0.5">International Relations</h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 font-bold text-[10.5px] rounded border border-blue-200 mb-1.5 font-mono">NCERT Textbooks</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-blue-200 text-xs">
                      <li>• Contemporary World Politics (Class XII)</li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-800 font-bold text-[10.5px] rounded border border-amber-200 mb-1.5 font-mono">Standard References</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-amber-300 text-xs">
                      <li>• <em>International Relations</em> – V.N. Khanna</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 7. Ethics, Integrity and Aptitude */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">GS Paper IV</span>
                  <h3 className="text-base font-bold text-[#0b3b60] font-serif mt-0.5">Ethics, Integrity and Aptitude</h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 font-bold text-[10.5px] rounded border border-blue-200 mb-1.5 font-mono">NCERT Textbooks</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-blue-200 text-xs">
                      <li>• Psychology - Class XI (Chapter 8: Motivation and Emotion)</li>
                      <li>• Psychology - Class XII (Chapter 6: Attitude and Social Cognition)</li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-800 font-bold text-[10.5px] rounded border border-amber-200 mb-1.5 font-mono">Standard References</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-amber-300 text-xs">
                      <li>• <em>Ethics, Integrity and Aptitude (Foundational Values for Civil Services in India)</em> – P.D. Sharma</li>
                      <li>• <em>The LEXICON For Ethics, Integrity & Aptitude</em> (Chronicle Publications)</li>
                      <li>• <em>Makers of Modern India</em> – Ramachandra Guha</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 8. Economy */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Economic Development</span>
                  <h3 className="text-base font-bold text-[#0b3b60] font-serif mt-0.5">Economy</h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 font-bold text-[10.5px] rounded border border-blue-200 mb-1.5 font-mono">NCERT Textbooks</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-blue-200 text-xs">
                      <li>• Resources and Development (Class VIII)</li>
                      <li>• Economics (Class IX)</li>
                      <li>• Understanding Economic Development (Class X)</li>
                      <li>• Indian Economic Development (Class XI)</li>
                      <li>• India - People and Economy (Class XII)</li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-800 font-bold text-[10.5px] rounded border border-amber-200 mb-1.5 font-mono">Standard References</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-amber-300 text-xs">
                      <li>• <em>India’s Economic Development since 1947</em> – Uma Kapila</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 9. Science and Technology */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Applied Sciences</span>
                  <h3 className="text-base font-bold text-[#0b3b60] font-serif mt-0.5">Science and Technology</h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 font-bold text-[10.5px] rounded border border-blue-200 mb-1.5 font-mono">NCERT Textbooks</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-blue-200 text-xs">
                      <li>• Science (Classes 6 to 10)</li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-800 font-bold text-[10.5px] rounded border border-amber-200 mb-1.5 font-mono">Standard References</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-amber-300 text-xs">
                      <li>• <em>Developments in Science and Technology</em> – Published by Spectrum Books Pvt. Ltd.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 10. Environment */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Ecology & Biodiversity</span>
                  <h3 className="text-base font-bold text-[#0b3b60] font-serif mt-0.5">Environment</h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 font-bold text-[10.5px] rounded border border-blue-200 mb-1.5 font-mono">NCERT Textbooks</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-blue-200 text-xs">
                      <li>• Our Environment (Class VII)</li>
                      <li>• Chemistry - Part II - Class XI (Units 14 and 16)</li>
                      <li>• Biology - Class XII (Units VIII, IX and X: Chapters 8 to 16)</li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-800 font-bold text-[10.5px] rounded border border-amber-200 mb-1.5 font-mono">Standard References</span>
                    <ul className="space-y-1 pl-3 border-l-2 border-amber-300 text-xs">
                      <li>• <em>Environmental Studies: from crisis to cure</em> – R. Rajagopalan</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 11. Security */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 md:col-span-2">
                <div className="pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Internal & Border Security</span>
                  <h3 className="text-base font-bold text-[#0b3b60] font-serif mt-0.5">Security</h3>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-800 font-bold text-[10.5px] rounded border border-amber-200 mb-1 font-mono">Standard References</span>
                  <ul className="space-y-1 pl-3 border-l-2 border-amber-300 text-xs">
                    <li>• <em>India’s National Security: A Reader (Critical Issues in Indian Politics)</em> – edited by Kanti P. Bajpai and Harsh V. Pant</li>
                  </ul>
                </div>
              </div>

            </div>

            {/* 12. Commissions & Committees Reports */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
              <div className="pb-3 border-b border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Government Commissions</span>
                <h3 className="text-lg font-black text-[#0b3b60] font-serif mt-0.5">Commissions and Committees Reports</h3>
                <p className="text-xs text-slate-600 mt-1">High-impact administrative reform blueprints and federal relations reports required for GS II, GS IV and Essay papers.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 2nd ARC Reports */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <span className="w-2 h-2 rounded-full bg-[#0b3b60]"></span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">Second Administrative Reforms Commission (ARC) Reports</h4>
                  </div>
                  
                  <ol className="space-y-1.5 text-xs text-slate-700 pl-4 list-decimal marker:text-slate-400">
                    <li><strong>1st Report:</strong> Right to Information - Master Key to good governance</li>
                    <li><strong>2nd Report:</strong> Unlocking human Capital, Entitlements and Governance - A Case Study</li>
                    <li><strong>3rd Report:</strong> Crisis Management - from Despair to Hope</li>
                    <li><strong>4th Report:</strong> Ethics in Governance</li>
                    <li><strong>5th Report:</strong> Public Order - Justice for All……Peace for All</li>
                    <li><strong>6th Report:</strong> Local Governance - An Inspiring Journey into the Future</li>
                    <li><strong>7th Report:</strong> Capacity Building for Conflict Resolution - Friction to Fusion</li>
                    <li><strong>8th Report:</strong> Combating Terrorism - Protecting by Righteousness</li>
                    <li><strong>9th Report:</strong> Social Capital - A shared Destiny</li>
                    <li><strong>10th Report:</strong> Refurbishing of Personnel Administration - Scaling New Heights</li>
                    <li><strong>11th Report:</strong> Promoting e-Governance: The SMART way Forward</li>
                    <li><strong>12th Report:</strong> Citizen-centric Administration - The Heart of Governance</li>
                    <li><strong>13th Report:</strong> Organisational Structure of Government of India</li>
                    <li><strong>14th Report:</strong> Strengthening financial management systems</li>
                    <li><strong>15th Report:</strong> State and District Administration</li>
                  </ol>
                </div>

                {/* Punchhi Commission Report */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">Punchhi Commission Report on Centre – State Relations</h4>
                  </div>
                  
                  <ul className="space-y-2 text-xs text-slate-700 pl-3 border-l-2 border-amber-300">
                    <li><strong>Volume 1:</strong> Evolution of Centre – State Relations in India</li>
                    <li><strong>Volume 2:</strong> Constitutional Governance and management of Centre – State relations</li>
                    <li><strong>Volume 3:</strong> Centre - State Financial relations and planning</li>
                    <li><strong>Volume 4:</strong> Local self-governments and decentralized governance</li>
                    <li><strong>Volume 5:</strong> Internal security, criminal justice and Centre - State cooperation</li>
                    <li><strong>Volume 6:</strong> Environment, natural resources and infrastructure</li>
                    <li><strong>Volume 7:</strong> Socio-economic development, public policy and good governance</li>
                  </ul>
                </div>

              </div>
            </div>

          </motion.section>
        )}

        {/* APPROACH TO GS TAB */}
        {activeTab === 'approach' && (
          <motion.section 
            key="tab-approach" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }} 
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#0b3b60] to-[#124e7e] text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider rounded font-mono">
                  Orientation & Strategy Framework
                </span>
                <span className="text-xs text-amber-200 font-medium">By Rajiv Ranjan Singh</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
                An Approach to GS: Orientation & Methodology
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
                A definitive strategic blueprint for mastering General Studies — demystifying scoring realities, cognitive pipelines, temporal current affairs integration, and answer-crafting discipline.
              </p>
              
              <div className="pt-2 border-t border-slate-700/60 flex flex-wrap gap-4 text-xs text-amber-300 font-medium">
                <span>• "In GS, sky is the limit is a misconception."</span>
                <span>• "Prediction is difficult, but not impossible."</span>
                <span>• "It is the process of continuous, definitive direction."</span>
              </div>
            </div>

            {/* Part 1: Core Strategy & Exam Reality */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <Target className="w-5 h-5 text-[#0b3b60]" />
                <h3 className="text-lg font-bold font-serif text-[#0b3b60]">1. Strategic Mindset & Demystifying the Exam</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0b3b60] text-white font-bold text-xs flex items-center justify-center font-mono">1</span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">Strategy: What & How</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Strategy defines <em>what is to be done</em> and <em>how it is to be done</em>. For example: focus on <strong>Polity and Governance</strong>, and not merely Constitution in isolation.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0b3b60] text-white font-bold text-xs flex items-center justify-center font-mono">2</span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">GS is NOT GK</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    General Studies is distinct from General Knowledge. GK is rote factual recall; GS demands multi-dimensional causality, systemic evaluation, and institutional perspectives.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0b3b60] text-white font-bold text-xs flex items-center justify-center font-mono">3</span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">Low Scoring Examination</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    UPSC is a low-scoring exam: IAS Topper 2018 secured <strong>55.36%</strong>; IAS Topper 2021 scored <strong>52.04%</strong> (878/1750 in written + 176/275 in interview = 1054/2025). Aim for quality over impossible volume.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0b3b60] text-white font-bold text-xs flex items-center justify-center font-mono">4</span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">Academic Background Demystified</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An excellent academic background is <strong>not a necessary condition</strong> to qualify. Your prior school or college percentage does not decide success; every exam is the toughest at that point in time.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0b3b60] text-white font-bold text-xs flex items-center justify-center font-mono">5</span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">Rural – Urban Background</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Whether from a rural or urban background, the playing field is leveled by clarity of concepts, analytical writing skills, and adherence to definitive strategy.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0b3b60] text-white font-bold text-xs flex items-center justify-center font-mono">6</span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">Skill and Will</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Preparation requires equal harmony between <strong>Skill</strong> (analytical competence, notes synthesis, expression) and <strong>Will</strong> (perseverance, consistency, and mental endurance).
                  </p>
                </div>

              </div>

              {/* Systemic Gap Callout */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-xs sm:text-sm text-amber-900 leading-relaxed">
                <strong>The Core Knowledge Gap:</strong> The gap between <em>what you are expected to know</em> and <em>what you know</em> arises primarily due to a <strong>lack of integration between the standard academic educational system and the competitive examination system</strong>. Bridging this requires deliberate syllabus alignment.
              </div>
            </div>

            {/* Part 2: Cognitive Pipeline & Learning Continuum */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <Brain className="w-5 h-5 text-[#0b3b60]" />
                <h3 className="text-lg font-bold font-serif text-[#0b3b60]">2. Cognitive Pipeline & The Learning Continuum</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* 4-Stage Continuum */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">The Learning Continuum</span>
                  <h4 className="font-bold text-sm text-[#0b3b60]">Reading → Understanding → Retention → Expression</h4>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <strong className="text-slate-900 block mb-1">1. Reading:</strong>
                      <span className="text-slate-600">Initial exposure to authentic primary sources.</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <strong className="text-slate-900 block mb-1">2. Understanding:</strong>
                      <span className="text-slate-600">Deconstructing conceptual logic and interlinkages.</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <strong className="text-slate-900 block mb-1">3. Retention:</strong>
                      <span className="text-slate-600">Synoptical revision to consolidate core frameworks.</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <strong className="text-slate-900 block mb-1">4. Expression:</strong>
                      <span className="text-slate-600">Crisp, structured delivery in exam answer sheets.</span>
                    </div>
                  </div>
                </div>

                {/* Data Pipeline & Concepts */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Information Processing</span>
                  <h4 className="font-bold text-sm text-[#0b3b60]">Data → Process → Information → Insight</h4>
                  
                  <div className="space-y-2.5 text-xs text-slate-600">
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2">
                      <span className="font-bold text-[#0b3b60]">Concept, Application & Practice:</span>
                      <span>Concepts provide the foundation, application tests relevance, and consistent practice generates speed and accuracy.</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2">
                      <span className="font-bold text-[#0b3b60]">Non-Linear Learning:</span>
                      <span>Subject matter does not necessarily need to follow rigid chronological sequence (ancient, medieval, modern); focus on thematic coherence.</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Coverage Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">Horizontal & Vertical Coverage</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Horizontal coverage</strong> ensures broad multi-disciplinary awareness across all GS papers, while <strong>Vertical coverage</strong> develops deep subject mastery in high-yield core themes.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">Explicit & Implicit Coverage</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Go beyond the <strong>explicit</strong> keywords printed in the syllabus to explore the <strong>implicit</strong> underlying institutional questions and policy debates connected to them.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">Micro-Dimensions & Complexity</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Break broad themes into <strong>micro-dimensions and sub-dimensions</strong>. As complexity arises, sub-dimensioning allows multi-stakeholder and multi-sectoral coverage.
                  </p>
                </div>
              </div>

              {/* Event to Issue Callout */}
              <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">Critical Analytical Shift</span>
                  <h4 className="text-sm sm:text-base font-bold">Event → Issue (What, How and Why)</h4>
                  <p className="text-xs text-slate-300">
                    Never stop at the "Event" (the daily news headline). Elevate your study to the "Issue" — analyzing <em>What</em> occurred, <em>How</em> it operates constitutionally/administratively, and <em>Why</em> it matters for governance.
                  </p>
                </div>
              </div>
            </div>

            {/* Part 3: Contemporary Events & The Temporal Triad */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <Clock className="w-5 h-5 text-[#0b3b60]" />
                <h3 className="text-lg font-bold font-serif text-[#0b3b60]">3. Contemporary Affairs & The Three-Tense Model</h3>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div>
                  <h4 className="font-bold text-sm text-[#0b3b60]">Current Affairs Spans All Three Tenses: Past, Present & Future</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Contemporary events (<em>Naveentam</em>) should never be studied in a chronological vacuum. They must be actively correlated with corresponding historical and future institutional trajectories.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                    <span className="px-2 py-0.5 bg-slate-200 text-slate-800 font-bold text-[10px] rounded uppercase font-mono">1. Past Tense</span>
                    <strong className="block text-slate-900">Historical & Institutional Precedents</strong>
                    <p className="text-slate-600 leading-relaxed">
                      <em>Example (UPSC 2021):</em> "How have the recommendations of the 14th Finance Commission enabled (Saksham) the States to improve their fiscal (rajkoshiya) position?"
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-900 font-bold text-[10px] rounded uppercase font-mono">2. Present Tense</span>
                    <strong className="block text-slate-900">Live Developments & Structural Mechanics</strong>
                    <p className="text-slate-600 leading-relaxed">
                      <em>Example:</em> Presidential Elections, 15th Finance Commission devolution criteria, or new regulatory bodies formed under statutory mandates.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 font-bold text-[10px] rounded uppercase font-mono">3. Future Tense</span>
                    <strong className="block text-slate-900">Implications & Policy Impact</strong>
                    <p className="text-slate-600 leading-relaxed">
                      <em>Example:</em> "When a bill becomes an Act... assessing its prospective institutional, socio-economic, and administrative implications."
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed">
                  <strong>The Newspaper Principle:</strong> Keep in mind that a daily newspaper is printed for <em>all segments of society</em>, not exclusively for UPSC aspirants. Read selectively through the filter of syllabus topics and institutional issues.
                </div>
              </div>
            </div>

            {/* Part 4: Notes, Answer Writing & Self-Study Discipline */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <PenTool className="w-5 h-5 text-[#0b3b60]" />
                <h3 className="text-lg font-bold font-serif text-[#0b3b60]">4. Notes, Answer Writing & Self-Study Discipline</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Answer Writing as Editorial Analysis */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h4 className="font-bold text-sm text-[#0b3b60]">Answer Writing: Editorial vs Reporting</h4>
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded font-mono">Mains Technique</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Answers must <strong>not read like news reporting</strong> (<em>Samachar lekhan / Samachar preshan</em>), but like an authoritative, balanced <strong>editorial</strong>.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-1.5 shrink-0"></span>
                      <span><strong>Address Question Dimensions:</strong> Decipher nuance (e.g. <em>"Ashoka was not only great, greater-greatest"</em>) within strict word limits.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-1.5 shrink-0"></span>
                      <span><strong>Conceptual Clarity:</strong> <em>"Hide your ignorance and exhibit your knowledge"</em> through disciplined, structured presentation.</span>
                    </li>
                  </ul>
                </div>

                {/* Input-Output & Error Matrix */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h4 className="font-bold text-sm text-[#0b3b60]">Input-Output Dynamics & Error Matrix</h4>
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-800 text-[10px] font-bold rounded font-mono">Risk Management</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                      <div className="font-bold text-slate-900">I &gt; O</div>
                      <div className="text-[10px] text-slate-500">Uncertain</div>
                    </div>
                    <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="font-bold text-amber-900">I = O</div>
                      <div className="text-[10px] text-amber-700">Calculated Risk</div>
                    </div>
                    <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <div className="font-bold text-emerald-900">I &lt; O</div>
                      <div className="text-[10px] text-emerald-700">Predictable Certainty</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 pt-1 leading-relaxed border-t border-slate-100">
                    <strong>Error Classification:</strong> Distinguish between <em>"Nahi aata tha, galti ho gayi"</em> (knowledge deficit requiring study) versus <em>"Aata hai usme galti hoti hai"</em> (silly errors and temperament issues requiring timed practice).
                  </div>
                </div>

                {/* Notes & Primary Reading */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
                  <h4 className="font-bold text-sm text-[#0b3b60]">Study Materials & Synoptical Notes</h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-1.5 shrink-0"></span>
                      <span><strong>Original Reading & Primary Sources:</strong> Real value addition happens when studying foundational acts, reports, and primary policy texts rather than superficial digests.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-1.5 shrink-0"></span>
                      <span><strong>Synoptical Notes:</strong> Condense large topics into keyword-based synopses for quick multi-iteration revisions.</span>
                    </li>
                  </ul>
                </div>

                {/* The Golden Rule of Self Study */}
                <div className="bg-[#0b3b60] text-white rounded-xl p-6 shadow-xs space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 font-mono">The Cardinal Rule</span>
                    <h4 className="text-base font-bold text-white font-serif mt-1">No Substitute for Self-Study</h4>
                    <p className="text-xs text-slate-200 leading-relaxed mt-2">
                      "Self-study is the single most decisive aspect of preparation. You are with me in the classroom for roughly 3 hours, but the remaining 21 hours of your day are equally, if not more, crucial for your success."
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-600/80 text-[11px] text-amber-300 font-medium">
                    — Rajiv Ranjan Singh
                  </div>
                </div>

              </div>
            </div>

          </motion.section>
        )}

        {/* APPROACH TO POLITY & GOVERNANCE TAB */}
        {activeTab === 'polity' && (
          <motion.section 
            key="tab-polity" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }} 
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#0b3b60] to-[#124e7e] text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider rounded font-mono">
                  Subject-Specific Methodologies
                </span>
                <span className="text-xs text-amber-200 font-medium">By Rajiv Ranjan Singh</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
                Approach to Polity & Governance
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
                Comprehensive pedagogical blueprints for GS-II (Polity & Governance).
              </p>
            </div>

            {/* ========================================================= */}
            {/* SUB-SECTION 1: POLITY & GOVERNANCE (GS-II) */}
            {/* ========================================================= */}
              <div className="space-y-8 animate-in fade-in duration-150">
                
                {/* Integration Callout */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-xs sm:text-sm text-amber-900 leading-relaxed">
                  <strong>Integrated Preparatory Framework:</strong> Polity and Governance is a common subject area for both Preliminary and Main examinations. An <strong>integrated preparatory approach</strong> is desirable, keeping in mind the specific requirement of each stage (objectivity for facts in Prelims, and subjectivity for analytical evaluation in Mains).
                </div>

                {/* Prelims Guidelines */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                  <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Stage I</span>
                      <h3 className="text-base font-bold text-[#0b3b60] font-serif">Preliminary Examination: Key Focus Areas</h3>
                    </div>
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded border border-slate-200">Objective Accuracy</span>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span><strong>Refer to Mains Syllabus for Clarity:</strong> The Prelims syllabus broadly mentions Constitution, Political system, Panchayati Raj, Public Policy, and Rights issues. To overcome lack of clarity, refer to the <strong>GS Paper II Mains syllabus</strong> where topics are elaborately specified.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span><strong>Constitutional & Extra-Constitutional Balance:</strong> Pay serious attention to constitutional articles, but equally emphasize <strong>extra-constitutional aspects</strong> (the syllabus focuses on <em>Indian Polity and Governance</em>, not merely the <em>Constitution of India</em>).</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span><strong>Political & Administrative Bodies:</strong> Focus on administrative bodies alongside political bodies, as together they constitute the twin operational pillars of governance.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span><strong>Multi-Dimensional Interlinkages:</strong> The majority of questions are multi-dimensional; study statutory enactments, schemes, and institutional mandates across Ministries/Departments.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b60] mt-2 shrink-0"></span>
                      <span><strong>Data Processing vs Mindless Compilation:</strong> Facts are important, but their correct application through conceptual understanding is paramount. Do not simply compile raw data; process it into meaningful information.</span>
                    </li>
                  </ul>
                </div>

                {/* Mains Detailed Strategy */}
                <div className="space-y-4">
                  <div className="border-b border-slate-200 pb-2">
                    <h3 className="text-lg font-bold font-serif text-[#0b3b60]">Main Examination: Core Analytical Pillars</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Governance, constitution, polity, and social justice are mutually interrelated under the overarching connotation of <strong>'Governance'</strong>.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">1. Constitutional Foundation of Governance</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        The Constitution is the fundamental law of the land providing the legal basis to polity. <strong>Directive Principles of State Policy (Part IV)</strong> is regarded as the fundamental law of Governance.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">2. Civil Society & Non-State Actors</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Governance implies both government and its dynamic networking with bodies outside the formal state machinery — including <strong>Civil Society Organisations (CSOs)</strong>, NGOs, SHGs, and pressure groups.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">3. Federalism & Commission Reports</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Examine division of powers from constitutional and extra-constitutional angles. Supplement study with <strong>Punchhi Commission</strong> and <strong>Sarkaria Commission</strong> reports, and the <strong>2nd ARC report on Local Governance</strong> for local devolution challenges.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">4. Separation of Powers & Comparative Schemes</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Compare separation of powers between the Indian Parliamentary model and the US Presidential democracy. Benchmark Indian constitutional features with borrowing sources: <strong>UK, USA, and Canada</strong>.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">5. Executive, PMO & NITI Aayog</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Study the Executive from both political and administrative perspectives. Examine the working of Ministries alongside the <strong>Prime Minister’s Office (PMO), Cabinet Secretariat, and NITI Aayog</strong>.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">6. Judiciary, ADR & Tribunals</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Focus on judicial innovations, reformative trends, <strong>Alternative Dispute Resolution (ADR)</strong>, and specialized quasi-judicial tribunals on the basis of dispute nature and stakeholders involved.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">7. Electoral Process & Representation of People</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Master the statutory foundations under <strong>RPA 1950 and RPA 1951</strong>, with special emphasis on contemporary electoral reforms and emerging trends in electoral behavior.
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">8. Social Sector Policies & SDGs</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Give precedence to health, education, human resources, poverty, and hunger policies framed in the context of <strong>Sustainable Development Goals (SDGs)</strong> and multi-dimensional welfare interventions.
                      </p>
                    </div>

                  </div>
                </div>

                {/* Synthesis Banner */}
                <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 font-mono">Core Pedagogical Maxims for GS-II</span>
                  <ul className="space-y-1.5 text-xs text-slate-200 leading-relaxed">
                    <li>• <strong>Writing Practice in Totality:</strong> Avoid writing practice topic-wise in isolation; questions in UPSC are designed around polity and governance in totality.</li>
                    <li>• <strong>Constitutional Evolution:</strong> Study constitutional evolution in direct relation to India’s freedom struggle, and shortlist amendments thematically by subject matter.</li>
                    <li>• <strong>Parliament & State Legislatures:</strong> The issues in Parliament and State Legislatures are common; thorough mastery of Parliament automatically covers state legislatures.</li>
                    <li>• <strong>Civil Services in Democracy:</strong> Civil Services translate public aspirations into reality; focus on transparency, accountability, and citizen-centric governance.</li>
                  </ul>
                </div>

              </div>
            {/* ========================================================= */}
          </motion.section>
        )}

        {/* APPROACH TO PUBLIC ADMIN TAB */}
        {activeTab === 'pubad' && (
          <motion.section 
            key="tab-pubad" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }} 
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#0b3b60] to-[#124e7e] text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider rounded font-mono">
                  Subject-Specific Methodologies
                </span>
                <span className="text-xs text-amber-200 font-medium">By Rajiv Ranjan Singh</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
                Approach to Public Administration
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
                Comprehensive pedagogical blueprints for Public Administration Optional.
              </p>
            </div>

            {/* ========================================================= */}
            {/* SUB-SECTION 2: PUBLIC ADMINISTRATION (OPTIONAL) */}
            {/* ========================================================= */}
              <div className="space-y-6 animate-in fade-in duration-150">
                
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Disciplinary Orientation</span>
                  <h3 className="text-lg font-black text-[#0b3b60] font-serif">Why Public Administration? Distinct Advantages</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Public Administration is regarded as the most <strong>inter- as well as intra-disciplinary subject</strong> among all social sciences. Its non-technical nature makes it accessible for candidates from all academic backgrounds to master within a definitive time period.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Two Paper Dynamic */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
                    <h4 className="font-bold text-sm text-[#0b3b60]">The Two-Paper Dynamic & Linkages</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The demarcation between <strong>Paper I (Administrative Theory)</strong> and <strong>Paper II (Indian Administration)</strong> is according to the examination scheme rather than the subject matter itself:
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700">
                      <li className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                        <strong>Financial Administration (P-I)</strong> ↔ <strong>Financial Management (P-II)</strong>
                      </li>
                      <li className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                        <strong>Personnel Administration (P-I)</strong> ↔ <strong>Civil Services in India (P-II)</strong>
                      </li>
                      <li className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                        <strong>Techniques of Admin Improvement (P-I)</strong> ↔ <strong>Administrative Reforms (P-II)</strong>
                      </li>
                    </ul>
                  </div>

                  {/* Disciplinary Roots */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
                    <h4 className="font-bold text-sm text-[#0b3b60]">Roots in Management & Political Science</h4>
                    <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                      <li className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <strong>Separation from Management (1987):</strong> Although segregated in 1987, principles and practices of Management still have strong bearing. Examine management fundamentals specifically in the context of the <em>governmental system</em>.
                      </li>
                      <li className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <strong>Political Science as Mother Science:</strong> Political concepts provide the essential operational context for public administration, especially for Indian Administration in Paper II.
                      </li>
                    </ul>
                  </div>

                </div>

                {/* Substantive Understanding Callout */}
                <div className="bg-[#0b3b60] text-white rounded-xl p-5 shadow-xs text-xs sm:text-sm leading-relaxed">
                  <strong>The Golden Principle:</strong> "Group syllabus topics to maximize output per hour of study. It is the <em>substantive</em> and not the <em>superficial</em> understanding of concepts and their application in the Indian context that provides the true foundation for scoring in Public Administration."
                </div>

              </div>
          </motion.section>
        )}

        {/* APPROACH TO ETHICS TAB */}
        {activeTab === 'ethics' && (
          <motion.section 
            key="tab-ethics" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }} 
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#0b3b60] to-[#124e7e] text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider rounded font-mono">
                  Subject-Specific Methodologies
                </span>
                <span className="text-xs text-amber-200 font-medium">By Rajiv Ranjan Singh</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
                Approach to Ethics (GS-IV)
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
                Comprehensive pedagogical blueprints for GS-IV (Ethics, Integrity & Case Study Diagnostics).
              </p>
            </div>

            {/* ========================================================= */}
            {/* SUB-SECTION 3: ETHICS, INTEGRITY & APTITUDE (GS-IV) */}
            {/* ========================================================= */}
              <div className="space-y-8 animate-in fade-in duration-150">
                
                {/* Purpose Card */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="text-base font-bold text-[#0b3b60] font-serif">Core Purpose of General Studies Paper IV</h3>
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded font-mono">Attitude & Probity</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The main purpose of GS-IV is <em>"to test the candidates' attitude and approach to issues relating to integrity, probity in public life and problem-solving approach to conflicts faced in dealing with society."</em> Study must focus on:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <strong>(a) Value Inculcation:</strong> Understanding and appreciating the foundational values needed in public service.
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <strong>(b) Applied Problem-Solving:</strong> Ability to resolve real-life ethical dilemmas with legal and moral consistency.
                    </div>
                  </div>
                </div>

                {/* Foundational Documents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Indian Documents */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Indian Sources</span>
                    <h4 className="font-bold text-sm text-[#0b3b60]">Primary Documents Guiding Civil Service Values</h4>
                    <ul className="space-y-2 text-xs text-slate-700">
                      <li className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                        <strong>The Indian Constitution:</strong> Preamble, Fundamental Duties, Directive Principles, and Fundamental Rights.
                      </li>
                      <li className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                        <strong>Service Rules & Conduct:</strong> Central Civil Services (Conduct) Rules and Code of Conduct frameworks.
                      </li>
                      <li className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                        <strong>2nd ARC & Ethics Initiative:</strong> 2nd ARC Report on Ethics in Governance, Code of Ethics (1997), and proposed Public Service Bill (2006).
                      </li>
                    </ul>
                  </div>

                  {/* International Documents */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">International Standards</span>
                    <h4 className="font-bold text-sm text-[#0b3b60]">Global Landmarks in Public Ethics</h4>
                    <ul className="space-y-2 text-xs text-slate-700">
                      <li className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                        <strong>Nolan Committee (UK 1996):</strong> 7 Principles of Public Life: <em>Selflessness, Integrity, Objectivity, Accountability, Openness, Honesty, and Leadership</em>.
                      </li>
                      <li className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                        <strong>UN Documents:</strong> Declaration of Human Rights and International Code of Conduct for Public Officials (1996).
                      </li>
                      <li className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                        <strong>USA & OECD:</strong> Ethics in Government Act (1978, USA), Office of Government Ethics, and OECD Recommendation on Ethical Conduct (1998).
                      </li>
                    </ul>
                  </div>

                </div>

                {/* Thinkers & Philosophers */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                  <div className="pb-2 border-b border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Thinkers & Traditions</span>
                    <h4 className="font-bold text-sm text-[#0b3b60]">Moral Thinkers & Theoretical Readings</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                    <div className="space-y-1.5 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <strong className="text-slate-900 block">Western & Global Thinkers:</strong>
                      <p className="text-slate-600">Confucius, Enlightenment thinkers (Voltaire, Rousseau), American Declaration of Independence, and the Humanist tradition.</p>
                    </div>
                    <div className="space-y-1.5 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <strong className="text-slate-900 block">Indian Moral Philosophy:</strong>
                      <p className="text-slate-600">Prof. S.K. Chakraborty (IIM Calcutta - <em>Human Values and Ethics</em>), Swami Ranganathananda, Ambedkar, Gandhi, Nehru, Tagore, and Vivekananda.</p>
                    </div>
                  </div>
                </div>

                {/* Case Study Mastery Section */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
                  <div className="pb-3 border-b border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">GS-IV Methodology</span>
                    <h3 className="text-lg font-black text-[#0b3b60] font-serif">Comprehensive Case Study Blueprint</h3>
                    <p className="text-xs text-slate-600 mt-0.5">Systematic technique for diagnosing ethical dilemmas and structuring high-scoring solutions.</p>
                  </div>

                  {/* Role Agent Analysis */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">1. Role-Agent Identification (Active vs Advisory)</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Give critical importance to the <strong>role-agent</strong> in which you are placed:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <strong>(i) Active / Direct Role with Authority:</strong> e.g., District Collector, SP in Naxalite-affected district, Municipal Executive Engineer, or CEO.
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <strong>(ii) Advisory Role:</strong> e.g., Senior consultant, PIO seeking advice, or recommending options to higher competent authority.
                      </div>
                    </div>
                  </div>

                  {/* Real-world roles CSE 2021-2024 */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <h5 className="font-bold text-xs text-slate-900">Recent Role-Agent Archetypes from UPSC CSE:</h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600">
                      <div className="p-2 bg-white rounded border border-slate-200"><strong>CSE 2024:</strong> Tech CEO, IPS / DG, District SP, Hospital Manager, Collector, Scientist.</div>
                      <div className="p-2 bg-white rounded border border-slate-200"><strong>CSE 2023:</strong> Bank Exec, DM (AIIMS Doctor), Joint Secretary (MNC spouse), ADG CPWD.</div>
                      <div className="p-2 bg-white rounded border border-slate-200"><strong>CSE 2022:</strong> Vice-President MNC, State Civil Servant, Journalist, Pollution Board Officer.</div>
                      <div className="p-2 bg-white rounded border border-slate-200"><strong>CSE 2021:</strong> Young Civil Servant, Vice-Principal, Project Manager, Hospital Admin.</div>
                    </div>
                  </div>

                  {/* Diagnostic & Solution Framework */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5">
                      <strong className="block text-slate-900">2. Real Problem vs Symptoms (Diagnosis)</strong>
                      <p className="text-slate-600 leading-relaxed">
                        Identify the fundamental root problem rather than confusing it with surface symptoms (<strong>RP-RD, WP-RD, RP-WD, WP-WD</strong>). Define all stakeholders, variables, and ethical tensions.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5">
                      <strong className="block text-slate-900">3. Legality vs Morality Principle</strong>
                      <p className="text-slate-600 leading-relaxed">
                        Your preferred course of action must satisfy <strong>both legality and morality</strong>. <em>"Legality should not be sacrificed for the sake of morality"</em> (e.g. empathy must operate within laid-down legal provisions).
                      </p>
                    </div>
                  </div>

                  {/* 6 Parameter Authenticator */}
                  <div className="bg-[#0b3b60] text-white p-5 rounded-xl space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 font-mono">Rajiv Ranjan Singh's 6-Parameter Test</span>
                    <h4 className="font-bold text-sm text-white">How to Authenticate an Ethical Course of Action</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-slate-200 pt-1">
                      <div className="p-2.5 bg-[#082945] rounded-lg border border-slate-700/80">
                        1. Is the action legal and consistent with government policies?
                      </div>
                      <div className="p-2.5 bg-[#082945] rounded-lg border border-slate-700/80">
                        2. Is it in line with organizational goals and code of conduct?
                      </div>
                      <div className="p-2.5 bg-[#082945] rounded-lg border border-slate-700/80">
                        3. Do I genuinely think it is the right thing to do?
                      </div>
                      <div className="p-2.5 bg-[#082945] rounded-lg border border-slate-700/80">
                        4. What will be its outcome for the organization, associates, and stakeholders?
                      </div>
                      <div className="p-2.5 bg-[#082945] rounded-lg border border-slate-700/80">
                        5. Can I ethically justify doing it before my conscience?
                      </div>
                      <div className="p-2.5 bg-[#082945] rounded-lg border border-slate-700/80">
                        6. What would happen if my action is publicly scrutinized?
                      </div>
                    </div>
                  </div>

                </div>

              </div>

          </motion.section>
        )}

      </div>
    </div>
  );
}

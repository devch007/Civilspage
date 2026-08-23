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
  FileCheck
} from 'lucide-react';

type TabType = 'overview' | 'eligibility' | 'syllabus' | 'reading' | 'approach' | 'salary';
type SyllabusStage = 'prelims' | 'mains' | 'optionals';
type OptionalChoice = 'pubad' | 'psir' | 'law';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqsList: FaqItem[] = [
  {
    id: 1,
    question: 'Can candidates use calculators in the UPSC Civil Services Exam?',
    answer: 'No, candidates are not allowed to use calculators in the UPSC CSE Prelims or standard Mains GS papers. However, calculators are permitted in specific optional papers containing intensive numerical formulations (e.g., Mathematics, Statistics, Engineering, or Management options).'
  },
  {
    id: 2,
    question: 'What is the qualifying criteria for CSAT Paper II in Prelims?',
    answer: 'CSAT Paper II is strictly qualifying in nature. Candidates are required to score a minimum of 33% (equivalent to 66 Marks out of the 200 maximum score). If a candidate fails to score 66 marks in CSAT, their Paper I (General Studies) will not be evaluated, regardless of their performance.'
  },
  {
    id: 3,
    question: 'When and by whom was the Royal Commission on Superior Civil Services established?',
    answer: 'The Royal Commission on Superior Civil Services in India (also known as the Lee Commission) was established in 1923 under the chairmanship of Lord Lee of Fareham. The commission recommended establishing a Public Service Commission, which led to the creation of India\'s first PSC in 1926.'
  }
];

export default function AboutCse() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [syllabusStage, setSyllabusStage] = useState<SyllabusStage>('prelims');
  const [selectedOptional, setSelectedOptional] = useState<OptionalChoice>('pubad');
  
  const [category, setCategory] = useState('general');
  const [disability, setDisability] = useState('no');
  const [calcResult, setCalcResult] = useState({
    minAge: 21,
    maxAge: 32,
    attempts: '6 Attempts',
    relaxation: 'None'
  });
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Sync hash routing on page load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#exam-plan' || hash === '#detailed-syllabus') {
        setActiveTab('syllabus');
      } else if (hash === '#suggested-reading' || hash === '#reading') {
        setActiveTab('reading');
      } else if (hash === '#approach' || hash === '#approach-to-gs') {
        setActiveTab('approach');
      }
    }
  }, []);

  // Run eligibility check logic on input change
  useEffect(() => {
    let maxAge = 32;
    let attempts: number | string = 6;
    let relaxation = 'None';

    if (category === 'general') {
      if (disability === 'yes') {
        maxAge = 42;
        attempts = 9;
        relaxation = '+10 Years (PwBD)';
      } else {
        maxAge = 32;
        attempts = 6;
        relaxation = 'None';
      }
    } else if (category === 'obc') {
      if (disability === 'yes') {
        maxAge = 45;
        attempts = 9;
        relaxation = '+13 Years (OBC + PwBD)';
      } else {
        maxAge = 35;
        attempts = 9;
        relaxation = '+3 Years (OBC)';
      }
    } else if (category === 'scst') {
      if (disability === 'yes') {
        maxAge = 47;
        attempts = 'Unlimited';
        relaxation = '+15 Years (SC/ST + PwBD)';
      } else {
        maxAge = 37;
        attempts = 'Unlimited';
        relaxation = '+5 Years (SC/ST)';
      }
    }

    setCalcResult({
      minAge: 21,
      maxAge,
      attempts: typeof attempts === 'number' ? `${attempts} Attempts` : attempts,
      relaxation
    });
  }, [category, disability]);

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
            Authoritative handbook detailing the constitutional mandate, stages of selection, complete official syllabi, and administrative rank matrices of the UPSC CSE.
          </motion.p>

          {/* Quick Nav Pill Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button 
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Historical Background
            </button>
            <button 
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                activeTab === 'eligibility'
                  ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('eligibility')}
            >
              Eligibility & Limits
            </button>
            <button 
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                activeTab === 'syllabus'
                  ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('syllabus')}
            >
              Official Syllabi
            </button>
            <button 
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                activeTab === 'reading'
                  ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('reading')}
            >
              Suggested Reading
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
                activeTab === 'salary'
                  ? 'bg-[#0b3b60] text-white border-[#0b3b60] shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => setActiveTab('salary')}
            >
              Salary & Post Matrix
            </button>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTAINER WITH TAB PANELS */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <motion.section 
            key="tab-overview" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }} 
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="text-left mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b3b60] font-serif">
                Institutional Origins of the Civil Services
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                A historical overview of public administration in India from early East India Company patronage to modern constitutional safeguards under Part XIV.
              </p>
            </div>

            {/* Constitutional Mandate Callout */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-[#0b3b60]/10 text-[#0b3b60] flex items-center justify-center shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <h3 className="font-bold text-slate-900">Constitutional Mandate: Article 315 to 323</h3>
                <p className="text-slate-600 leading-relaxed">
                  The Union Public Service Commission (UPSC) is a permanent Constitutional Body mandated under Article 315 to conduct merit-based competitive examinations for appointments to the civil services of the Union.
                </p>
              </div>
            </div>

            {/* Prose */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h3 className="text-lg font-bold text-[#0b3b60] font-serif">Evolution of Merit Selection</h3>
              <p>
                During the East India Company rule, civil servants were nominated by the Court of Directors and trained at Haileybury College. Lord Macaulay's Committee Report in 1854 established that patronage must give way to open, merit-based competitive examinations.
              </p>
              <p>
                The 1919 Montagu-Chelmsford reforms recommended holding simultaneous examinations in India. The <strong>Lee Commission (1923)</strong> later formalized the blueprint, leading to the setting up of the first Public Service Commission of India on <strong>October 1, 1926</strong> under the Chairmanship of Sir Ross Barker.
              </p>
            </div>

            {/* Timeline Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-[#0b3b60] transition-colors">
                <span className="inline-block px-2.5 py-0.5 bg-[#0b3b60] text-white text-xs font-bold rounded font-mono mb-2">1854</span>
                <h4 className="text-sm font-bold text-slate-900">Macaulay Report</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Abolished the nomination system and instituted open competition to select individuals with strong intellectual capabilities.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-[#0b3b60] transition-colors">
                <span className="inline-block px-2.5 py-0.5 bg-[#0b3b60] text-white text-xs font-bold rounded font-mono mb-2">1926</span>
                <h4 className="text-sm font-bold text-slate-900">First PSC Formed</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Under Sir Ross Barker, the initial four-member commission conducted selections for the elite ICS and Indian Police.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-[#0b3b60] transition-colors">
                <span className="inline-block px-2.5 py-0.5 bg-[#0b3b60] text-white text-xs font-bold rounded font-mono mb-2">1935</span>
                <h4 className="text-sm font-bold text-slate-900">Federal PSC</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  The Government of India Act 1935 transformed the board into the Federal PSC, establishing provincial-level services.
                </p>
              </div>
            </div>
          </motion.section>
        )}

        {/* ELIGIBILITY TAB */}
        {activeTab === 'eligibility' && (
          <motion.section 
            key="tab-eligibility" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }} 
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="text-left mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b3b60] font-serif">
                UPSC CSE Eligibility Criteria
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                To apply for the Civil Services Examination, aspirants must satisfy core nationality, educational qualifications, age limits, and maximum attempt counts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Education</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Candidates must hold a Bachelor's Degree in any discipline from a recognized University incorporated by an Act of Parliament.
                </p>
                <p className="text-[11px] font-semibold text-[#0b3b60] mt-2">* Final year students can apply for Prelims.</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Nationality</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  For IAS and IPS, a candidate must be a <strong>Citizen of India</strong>. For other services, candidates can be subjects of Nepal, Bhutan, or Tibetan refugees.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                  <Calendar className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Age Base</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  A candidate must have attained <strong>21 years</strong> and not have attained <strong>32 years</strong> on the 1st of August of the exam year.
                </p>
              </div>
            </div>

            {/* Interactive Eligibility Checker */}
            <div className="bg-[#0b3b60] text-white rounded-2xl p-6 sm:p-8 shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-amber-300">Interactive Eligibility Checker</h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Select your category and disability criteria to instantly verify your maximum age limit, relaxations, and allowed attempts.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">Category</label>
                      <select 
                        className="w-full bg-[#082945] border border-slate-600 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="general">General / EWS</option>
                        <option value="obc">OBC (Non-Creamy Layer)</option>
                        <option value="scst">SC / ST</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">Benchmark Disability (PwBD)</label>
                      <select 
                        className="w-full bg-[#082945] border border-slate-600 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
                        value={disability} 
                        onChange={(e) => setDisability(e.target.value)}
                      >
                        <option value="no">No Disability</option>
                        <option value="yes">Yes (PwBD)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#082945] p-5 rounded-xl border border-slate-700/80 space-y-3">
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-700">
                    <span className="text-slate-400">Minimum Age Limit</span>
                    <span className="font-bold text-amber-300 font-mono">21 Years</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-700">
                    <span className="text-slate-400">Maximum Age Limit</span>
                    <span className="font-bold text-white font-mono">{calcResult.maxAge} Years</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-700">
                    <span className="text-slate-400">Age Relaxation</span>
                    <span className="font-bold text-emerald-400">{calcResult.relaxation}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Max Attempts</span>
                    <span className="font-bold text-amber-300 font-mono">{calcResult.attempts}</span>
                  </div>
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

        {/* SALARY & POSTS TAB */}
        {activeTab === 'salary' && (
          <motion.section 
            key="tab-salary" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }} 
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="text-left mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b3b60] font-serif">
                Salary Structure & Recruiting Posts
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Understand the monetary benefits, promotions structure, pay matrix levels, and the complete directory of services filled by the UPSC CSE.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
              <div>
                <h3 className="text-lg font-bold text-[#0b3b60] font-serif">IAS/IPS Salary Breakdown (7th Pay Commission)</h3>
                <p className="text-xs text-slate-600 mt-1">
                  The entry-level basic pay for an IAS officer is <strong>₹56,100 per month</strong> (Pay Level 10). Officers are entitled to substantial allowances and rise through the promotion matrix up to Cabinet Secretary level.
                </p>
              </div>
              
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-[#0b3b60] text-white uppercase text-[10.5px] font-mono tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Designation / Post</th>
                      <th className="py-3 px-4">Pay Level</th>
                      <th className="py-3 px-4">Basic Pay Scale (Monthly)</th>
                      <th className="py-3 px-4">Typical Experience Required</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-semibold">Sub-Divisional Magistrate (SDM) / Entry</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-[#0b3b60]">Level 10</td>
                      <td className="py-2.5 px-4 font-mono">₹56,100</td>
                      <td className="py-2.5 px-4 text-slate-500">1 - 4 Years</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-semibold">Additional District Magistrate (ADM)</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-[#0b3b60]">Level 11</td>
                      <td className="py-2.5 px-4 font-mono">₹67,700</td>
                      <td className="py-2.5 px-4 text-slate-500">5 - 8 Years</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-semibold">District Magistrate (DM) / Collector</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-[#0b3b60]">Level 12</td>
                      <td className="py-2.5 px-4 font-mono">₹78,800</td>
                      <td className="py-2.5 px-4 text-slate-500">9 - 12 Years</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-semibold">District Collector (Selection Grade)</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-[#0b3b60]">Level 13</td>
                      <td className="py-2.5 px-4 font-mono">₹1,18,500</td>
                      <td className="py-2.5 px-4 text-slate-500">13 - 16 Years</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-semibold">Divisional Commissioner / Secretary</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-[#0b3b60]">Level 14</td>
                      <td className="py-2.5 px-4 font-mono">₹1,44,200</td>
                      <td className="py-2.5 px-4 text-slate-500">17 - 24 Years</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-semibold">Principal Secretary</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-[#0b3b60]">Level 15</td>
                      <td className="py-2.5 px-4 font-mono">₹1,82,200</td>
                      <td className="py-2.5 px-4 text-slate-500">25 - 28 Years</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-semibold">Chief Secretary of State / Union Secretary</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-[#0b3b60]">Level 17</td>
                      <td className="py-2.5 px-4 font-mono">₹2,25,000</td>
                      <td className="py-2.5 px-4 text-slate-500">30+ Years</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-semibold">Cabinet Secretary of India (Highest Post)</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-[#0b3b60]">Level 18</td>
                      <td className="py-2.5 px-4 font-mono">₹2,50,000</td>
                      <td className="py-2.5 px-4 text-slate-500">Senior-most Service</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-left pt-4">
              <h3 className="text-xl font-bold font-serif text-[#0b3b60]">All-India & Central Services Groupings</h3>
              <p className="text-xs text-slate-600 mt-1">Recruitment through the CSE allocates candidates across 3 premier All-India Services and various Group 'A' and 'B' Central Services.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">All India Services</h4>
                <ul className="text-xs text-slate-600 mt-2 space-y-1.5 list-disc list-inside">
                  <li>Indian Administrative Service (IAS)</li>
                  <li>Indian Police Service (IPS)</li>
                  <li>Indian Forest Service (IFoS - Prelims common)</li>
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Group 'A' Central Services</h4>
                <ul className="text-xs text-slate-600 mt-2 space-y-1.5 list-disc list-inside">
                  <li>Indian Foreign Service (IFS)</li>
                  <li>Indian Revenue Service (IRS - IT & Customs)</li>
                  <li>Indian Audit & Accounts Service (IA&AS)</li>
                  <li>Indian Postal Service (IPoS)</li>
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Group 'B' Central Services</h4>
                <ul className="text-xs text-slate-600 mt-2 space-y-1.5 list-disc list-inside">
                  <li>Armed Forces Headquarters Civil Service</li>
                  <li>Delhi, Andaman & Nicobar Islands Civil Service (DANICS)</li>
                  <li>DANIPS (Police Service)</li>
                  <li>Pondicherry Civil Service</li>
                </ul>
              </div>
            </div>
          </motion.section>
        )}

        {/* 3. FREQUENTLY ASKED QUESTIONS COMPONENT */}
        <div className="mt-16 pt-10 border-t border-slate-200">
          <div className="text-left mb-6">
            <h3 className="text-xl font-bold font-serif text-[#0b3b60]">Frequently Asked Questions</h3>
            <p className="text-xs text-slate-600 mt-1">Clarifications on scoring formulas, calculator regulations, and commission origins.</p>
          </div>

          <div className="space-y-3">
            {faqsList.map((faq) => (
              <div key={faq.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <button
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 transition-colors"
                  onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${activeFaq === faq.id ? 'rotate-180 text-[#0b3b60]' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

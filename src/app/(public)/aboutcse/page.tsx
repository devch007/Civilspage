'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Award, BookOpen, DollarSign, HelpCircle, Check, X, ShieldAlert, GraduationCap, Globe, Info, Clock, Trophy, ChevronDown } from 'lucide-react';
import Link from 'next/link';

type TabType = 'overview' | 'eligibility' | 'syllabus' | 'salary';

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

  const toggleFaq = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // Smooth scroll slightly below hero
    const tabsContainer = document.querySelector('.info-nav-tabs');
    if (tabsContainer) {
      tabsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main style={{ background: 'var(--bg-deep)' }}>
      {/* Hero Banner Section */}
      <section className="about-cse-hero">
        <div className="container">
          <span className="badge badge-amber" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', border: 'none', marginBottom: '12px' }}>
            UPSC Master Information
          </span>
          <h1>Complete Guide to UPSC CSE</h1>
          <p>Everything you need to know about the Civil Services Examination—history, eligibility parameters, stages, GS syllabus breakdowns, and administrative post structures.</p>
        </div>
      </section>

      {/* Tab Switcher Headers */}
      <div className="info-nav-tabs container">
        <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => handleTabChange('overview')}>
          Overview & History
        </button>
        <button className={`tab-btn ${activeTab === 'eligibility' ? 'active' : ''}`} onClick={() => handleTabChange('eligibility')}>
          Eligibility & Attempts
        </button>
        <button className={`tab-btn ${activeTab === 'syllabus' ? 'active' : ''}`} onClick={() => handleTabChange('syllabus')}>
          Exam Pattern & Syllabus
        </button>
        <button className={`tab-btn ${activeTab === 'salary' ? 'active' : ''}`} onClick={() => handleTabChange('salary')}>
          Salary, Posts & Functions
        </button>
      </div>

      {/* Main Body */}
      <div className="section-padding" style={{ background: 'var(--bg-deep)' }}>
        <div className="container">
          <AnimatePresence mode="wait">
            
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
                <div className="section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
                  <span className="badge badge-primary">Genesis & Development</span>
                  <h2>The Journey of the Commission</h2>
                  <p>The Union Public Service Commission (UPSC) is India's premier central recruiting agency, established under Article 315 of the Constitution. Discover its roots.</p>
                </div>

                <div className="info-card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
                  <h3>Constitutional Status</h3>
                  <p style={{ marginTop: '12px' }}>
                    The Union Public Service Commission was granted constitutional status on <strong>26th January 1950</strong>. It serves as an independent body to ensure that recruitment to All India Services and Group A & B Central Services is fair, merit-based, and completely free from political interference.
                  </p>
                </div>

                <div style={{ textAlign: 'left', margin: '40px 0 24px 0' }}>
                  <h3 className="text-xl font-bold">Key Historic Milestones</h3>
                </div>

                <div className="feature-grid-3">
                  <div className="info-card">
                    <div className="info-card-header">
                      <div className="info-card-icon" style={{ background: 'rgba(79,70,229,0.06)', color: 'var(--color-primary)' }}>1923</div>
                      <h3>Lee Commission</h3>
                    </div>
                    <p>
                      Under the chairmanship of Lord Lee of Fareham, the Royal Commission on Superior Civil Services was set up in British India to address the representation of Indians in higher administration.
                    </p>
                  </div>

                  <div className="info-card">
                    <div className="info-card-header">
                      <div className="info-card-icon" style={{ background: 'rgba(5,150,105,0.06)', color: 'var(--color-success)' }}>1926</div>
                      <h3>Ross Barker Board</h3>
                    </div>
                    <p>
                      The first Public Service Commission was set up in October 1926 under Sir Ross Barker. It possessed purely advisory roles and faced substantial pressure during the freedom struggle.
                    </p>
                  </div>

                  <div className="info-card">
                    <div className="info-card-header">
                      <div className="info-card-icon" style={{ background: 'rgba(217,119,6,0.06)', color: 'var(--color-accent)' }}>1935</div>
                      <h3>Federal PSC</h3>
                    </div>
                    <p>
                      The Government of India Act 1935 transformed the board into the Federal Public Service Commission, expanding recruitment capabilities and establishing provincial-level services.
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
                <div className="section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
                  <span className="badge badge-success">Candidate Requirements</span>
                  <h2>UPSC CSE Eligibility Criteria</h2>
                  <p>To apply for the Civil Services Examination, aspirants must satisfy core nationality, educational qualifications, age limits, and maximum attempt counts.</p>
                </div>

                <div className="feature-grid-3">
                  <div className="info-card">
                    <div className="info-card-header">
                      <div className="info-card-icon" style={{ background: 'rgba(79,70,229,0.06)', color: 'var(--color-primary)' }}>
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <h3>Education</h3>
                    </div>
                    <p style={{ marginTop: '8px' }}>
                      Candidates must hold a Bachelor's Degree in any discipline from a university incorporated by an Act of Central or State Legislature, or other educational institutions established by an Act of Parliament.
                    </p>
                    <p style={{ marginTop: '12px', fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-primary)' }}>* Final year students can apply for Prelims.</p>
                  </div>

                  <div className="info-card">
                    <div className="info-card-header">
                      <div className="info-card-icon" style={{ background: 'rgba(5,150,105,0.06)', color: 'var(--color-success)' }}>
                        <Globe className="w-5 h-5" />
                      </div>
                      <h3>Nationality</h3>
                    </div>
                    <p style={{ marginTop: '8px' }}>
                      For the Indian Administrative Service (IAS) and the Indian Police Service (IPS), a candidate must be a <strong>Citizen of India</strong>. For other services, candidates can be subjects of Nepal, Bhutan, or Tibetan refugees.
                    </p>
                  </div>

                  <div className="info-card">
                    <div className="info-card-header">
                      <div className="info-card-icon" style={{ background: 'rgba(217,119,6,0.06)', color: 'var(--color-accent)' }}>
                        <Calendar className="w-5 h-5" />
                      </div>
                      <h3>Age Base</h3>
                    </div>
                    <p style={{ marginTop: '8px' }}>
                      A candidate must have attained the age of <strong>21 years</strong> and must not have attained the age of <strong>32 years</strong> on the 1st of August of the examination year. Age relaxations apply per category.
                    </p>
                  </div>
                </div>

                {/* Interactive Eligibility Checker */}
                <div className="calculator-widget">
                  <div className="calc-layout">
                    <div>
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Interactive Eligibility Checker</h3>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                        Select your category and handicap criteria to instantly check your maximum age limit, relaxations, and number of allowed attempts.
                      </p>
                      
                      <div className="calc-controls">
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--text-secondary)' }}>Select Category</label>
                          <select 
                            className="calc-select" 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value="general">General / EWS</option>
                            <option value="obc">OBC (Non-Creamy Layer)</option>
                            <option value="scst">SC / ST</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--text-secondary)' }}>Benchmark Disability (PwBD)</label>
                          <select 
                            className="calc-select" 
                            value={disability} 
                            onChange={(e) => setDisability(e.target.value)}
                          >
                            <option value="no">No Disability</option>
                            <option value="yes">Yes (PwBD)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="calc-results">
                      <div className="result-row">
                        <span className="result-label">Minimum Age Limit</span>
                        <span className="result-val" style={{ color: 'var(--color-primary)' }}>21 Years</span>
                      </div>
                      <div className="result-row">
                        <span className="result-label">Maximum Age Limit</span>
                        <span className="result-val">{calcResult.maxAge} Years</span>
                      </div>
                      <div className="result-row">
                        <span className="result-label">Age Relaxation</span>
                        <span className="result-val" style={{ color: 'var(--color-success)' }}>{calcResult.relaxation}</span>
                      </div>
                      <div className="result-row">
                        <span className="result-label">Max Attempts Allowed</span>
                        <span className="result-val">{calcResult.attempts}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* SYLLABUS TAB */}
            {activeTab === 'syllabus' && (
              <motion.section 
                key="tab-syllabus" 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -15 }} 
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
                  <span className="badge badge-amber">Stages & Parameters</span>
                  <h2>Selection Scheme & Exam Pattern</h2>
                  <p>The UPSC Civil Services Selection spans over 3 core phases. Read the specific details, parameters, scoring criteria, and syllabus breakdown.</p>
                </div>

                <div className="feature-grid-3">
                  {/* Phase 1 */}
                  <div className="glass-card info-card primary-card" style={{ borderTop: '4px solid var(--color-primary)' }}>
                    <div className="info-card-icon" style={{ background: 'rgba(79, 70, 229, 0.06)', color: 'var(--color-primary)' }}>
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h3 style={{ marginTop: '12px', marginBottom: '12px' }}>Phase 1: Prelims</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Objective screening exam comprising two papers held on a single day. Offline pen-and-paper mode:</p>
                    <ul className="topic-list" style={{ marginBottom: 0 }}>
                      <li><strong>GS Paper 1 (200 Marks)</strong>: 100 questions. Focuses on Current Affairs, History, Geography, Polity, Science. Counts for Merit cutoff.</li>
                      <li><strong>GS Paper 2 CSAT (200 Marks)</strong>: 80 questions. Qualifying aptitude test. Requires minimum <strong>33% (66 Marks)</strong> to qualify.</li>
                      <li><strong>Negative Marking</strong>: Penalty of <strong>-1/3rd marks</strong> for each incorrect answer.</li>
                    </ul>
                  </div>

                  {/* Phase 2 */}
                  <div className="glass-card info-card success-card" style={{ borderTop: '4px solid var(--color-success)' }}>
                    <div className="info-card-icon" style={{ background: 'rgba(5, 150, 105, 0.06)', color: 'var(--color-success)' }}>
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 style={{ marginTop: '12px', marginBottom: '12px' }}>Phase 2: Mains</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Written descriptive examination evaluating comprehensive skills. Consists of 9 papers:</p>
                    <ul className="topic-list" style={{ marginBottom: 0 }}>
                      <li><strong>Qualifying Papers</strong>: Paper A (Indian Language - 300 Marks) & Paper B (English - 300 Marks). Require 25% to qualify.</li>
                      <li><strong>Merit Papers (250 Marks each)</strong>: Paper I (Essay), Papers II-V (General Studies GS I to IV), and Papers VI-VII (Optional Subject Paper 1 & 2).</li>
                      <li><strong>Total Merit Score</strong>: Written merit total is compiled out of <strong>1,750 Marks</strong>.</li>
                    </ul>
                  </div>

                  {/* Phase 3 */}
                  <div className="glass-card info-card accent-card" style={{ borderTop: '4px solid var(--color-accent)' }}>
                    <div className="info-card-icon" style={{ background: 'rgba(217, 119, 6, 0.06)', color: 'var(--color-accent)' }}>
                      <Award className="w-5 h-5" />
                    </div>
                    <h3 style={{ marginTop: '12px', marginBottom: '12px' }}>Phase 3: Personality Test</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>The final stage held at UPSC headquarters in New Delhi to assess candidate administrative suitability:</p>
                    <ul className="topic-list" style={{ marginBottom: 0 }}>
                      <li>Conducted by a board of unbiased observers evaluating personality traits.</li>
                      <li>Evaluates mental capacity, integrity, clarity of thought, decision-making, and leadership potential.</li>
                      <li><strong>Interview Score</strong>: Scored out of <strong>275 Marks</strong>.</li>
                      <li><strong>Grand Total Score</strong>: Final merit list is formulated out of <strong>2,025 Marks</strong> (Mains + Interview).</li>
                    </ul>
                  </div>
                </div>

                {/* UPSC Mains Exam Pattern Dashboard component */}
                <div className="mains-pattern-dashboard">
                  <div className="dashboard-header">
                    <div className="dashboard-title">UPSC : Exam Pattern</div>
                    <div className="dashboard-badge">MAINS</div>
                  </div>

                  {/* Qualifying Papers */}
                  <div className="dashboard-segment">
                    <div className="segment-bar">Qualifying Papers : Language (Paper A + Paper B)</div>
                    <div className="dashboard-grid">
                      <div className="dashboard-card">
                        <div className="card-icon-box">
                          <span style={{ fontSize: '2.2rem', color: '#EF4444', fontWeight: 'bold', fontFamily: 'monospace' }}>?</span>
                        </div>
                        <div className="card-label">Questions</div>
                        <div className="card-line"></div>
                        <div className="card-content-desc accent-text">Descriptive Type</div>
                      </div>
                      <div className="dashboard-card">
                        <div className="card-icon-box">
                          <span style={{ fontSize: '1.8rem', color: '#10B981' }}>✅</span>
                          <span style={{ fontSize: '1.8rem', color: '#EF4444', marginLeft: '6px' }}>❌</span>
                        </div>
                        <div className="card-label">Marking</div>
                        <div className="card-line"></div>
                        <div className="card-content-desc">300 <span style={{ fontWeight: 500, fontSize: '0.8rem', color: 'var(--text-muted)' }}>for each paper</span><br /><span style={{ color: '#EF4444', fontSize: '0.8rem' }}>No Negative Marking</span></div>
                      </div>
                      <div className="dashboard-card">
                        <div className="card-icon-box">
                          <Trophy className="w-8 h-8 text-amber-500" />
                        </div>
                        <div className="card-label">Qualifying Marks</div>
                        <div className="card-line"></div>
                        <div className="card-content-desc accent-text">25% of 300<br /><span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>for each paper</span></div>
                      </div>
                      <div className="dashboard-card">
                        <div className="card-icon-box">
                          <Clock className="w-8 h-8 text-indigo-500" />
                        </div>
                        <div className="card-label">Duration of Exam</div>
                        <div className="card-line"></div>
                        <div className="card-content-desc accent-text">180 mins.<br /><span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>for each paper</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Merit Papers */}
                  <div className="dashboard-segment">
                    <div className="segment-bar">Merit Papers : Essay, 4 Gen.Study & 2 Optional</div>
                    <div className="dashboard-grid">
                      <div className="dashboard-card">
                        <div className="card-icon-box">
                          <span style={{ fontSize: '2.2rem', color: '#EF4444', fontWeight: 'bold', fontFamily: 'monospace' }}>?</span>
                        </div>
                        <div className="card-label">Questions</div>
                        <div className="card-line"></div>
                        <div className="card-content-desc accent-text">Descriptive Type</div>
                      </div>
                      <div className="dashboard-card">
                        <div className="card-icon-box">
                          <span style={{ fontSize: '1.8rem', color: '#10B981' }}>✅</span>
                          <span style={{ fontSize: '1.8rem', color: '#EF4444', marginLeft: '6px' }}>❌</span>
                        </div>
                        <div className="card-label">Marking</div>
                        <div className="card-line"></div>
                        <div className="card-content-desc">250 <span style={{ fontWeight: 500, fontSize: '0.8rem', color: 'var(--text-muted)' }}>for each paper</span><br /><span style={{ color: '#EF4444', fontSize: '0.8rem' }}>No Negative Marking</span></div>
                      </div>
                      <div className="dashboard-card">
                        <div className="card-icon-box">
                          <Trophy className="w-8 h-8 text-amber-500" />
                        </div>
                        <div className="card-label">Qualifying Marks</div>
                        <div className="card-line"></div>
                        <div className="card-content-desc accent-text">Cut-off List</div>
                      </div>
                      <div className="dashboard-card">
                        <div className="card-icon-box">
                          <Clock className="w-8 h-8 text-indigo-500" />
                        </div>
                        <div className="card-label">Duration of Exam</div>
                        <div className="card-line"></div>
                        <div className="card-content-desc accent-text">180 mins.<br /><span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>for each paper</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'left', marginTop: '48px', marginBottom: '24px' }}>
                  <h3 className="text-xl font-bold">General Studies Papers Syllabus Highlights</h3>
                </div>

                <div className="info-card" style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '8px' }}>GS Paper I: Heritage, Culture, History & Geography</h4>
                  <p>Indian Culture, Ancient to Modern History, Indian National Movement, World History (industrial revolutions, world wars), Indian Society and its diversity, and Physical & Economic Geography of the World.</p>
                </div>

                <div className="info-card" style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '8px' }}>GS Paper II: Constitution, Polity, Governance & International Relations</h4>
                  <p>Constitutional provisions, Parliament structure and functions, separation of powers, executive and judicial branches, representation of People\'s Act, welfare schemes, e-governance, and India\'s bilateral/global groupings.</p>
                </div>

                <div className="info-card" style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '8px' }}>GS Paper III: Technology, Economic Development, Environment & Security</h4>
                  <p>Indian Economy structure, resource mobilization, agricultural cropping patterns, direct & indirect farm subsidies, food processing industries, S&T developments, environmental degradation, disasters, internal security, and cybersecurity.</p>
                </div>

                <div className="info-card" style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '8px' }}>GS Paper IV: Ethics, Integrity & Aptitude</h4>
                  <p>Human values, attitude (content, structure, relation to behavior), emotional intelligence, moral thinkers, ethical dilemmas in administration, public service values, and comprehensive real-world administrative Case Studies.</p>
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
                <div className="section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
                  <span className="badge badge-primary">Administrative Career</span>
                  <h2>Salary Structure & Recruiting Posts</h2>
                  <p>Understand the monetary benefits, promotions structure, pay matrix levels, and the complete directory of services filled by the UPSC CSE.</p>
                </div>

                <div className="info-card" style={{ marginBottom: '40px' }}>
                  <h3 style={{ marginBottom: '16px' }}>IAS/IPS Salary Breakdown (7th Pay Commission)</h3>
                  <p style={{ marginBottom: '20px' }}>
                    The entry-level basic pay for an IAS officer is <strong>₹56,100 per month</strong> (Pay Level 10). Officers are entitled to substantial allowances and rise through the promotion matrix up to Cabinet Secretary level.
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="paper-table">
                      <thead>
                        <tr>
                          <th>Designation / Post</th>
                          <th>Pay Level</th>
                          <th>Basic Pay Scale (Monthly)</th>
                          <th>Typical Experience Required</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Sub-Divisional Magistrate (SDM) / Entry</td>
                          <td>Level 10</td>
                          <td>₹56,100</td>
                          <td>1 - 4 Years</td>
                        </tr>
                        <tr>
                          <td>Additional District Magistrate (ADM)</td>
                          <td>Level 11</td>
                          <td>₹67,700</td>
                          <td>5 - 8 Years</td>
                        </tr>
                        <tr>
                          <td>District Magistrate (DM) / Collector</td>
                          <td>Level 12</td>
                          <td>₹78,800</td>
                          <td>9 - 12 Years</td>
                        </tr>
                        <tr>
                          <td>District Collector (Selection Grade)</td>
                          <td>Level 13</td>
                          <td>₹1,18,500</td>
                          <td>13 - 16 Years</td>
                        </tr>
                        <tr>
                          <td>Divisional Commissioner / Secretary</td>
                          <td>Level 14</td>
                          <td>₹1,44,200</td>
                          <td>17 - 24 Years</td>
                        </tr>
                        <tr>
                          <td>Principal Secretary</td>
                          <td>Level 15</td>
                          <td>₹1,82,200</td>
                          <td>25 - 28 Years</td>
                        </tr>
                        <tr>
                          <td>Chief Secretary of State / Union Secretary</td>
                          <td>Level 17</td>
                          <td>₹2,25,000</td>
                          <td>30+ Years</td>
                        </tr>
                        <tr>
                          <td>Cabinet Secretary of India (Highest Post)</td>
                          <td>Level 18</td>
                          <td>₹2,50,000</td>
                          <td>Senior-most Service</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div style={{ textAlign: 'left', marginBottom: '24px' }}>
                  <h3 className="text-xl font-bold">Directory of Recruiting Services (UPSC Posts)</h3>
                  <p className="text-slate-500 text-sm mt-1">The Civil Services Examination recruits for three main categories of administrative services.</p>
                </div>

                <div className="feature-grid-3" style={{ marginBottom: '40px' }}>
                  <div className="info-card">
                    <h4 style={{ color: 'var(--color-primary)', marginBottom: '12px', fontWeight: 'bold' }}>1. All India Services (AIS)</h4>
                    <ul className="space-y-2">
                      <li><strong>IAS</strong>: Indian Administrative Service</li>
                      <li><strong>IPS</strong>: Indian Police Service</li>
                      <li><strong>IFoS</strong>: Indian Forest Service (recruited via separate Mains)</li>
                    </ul>
                  </div>

                  <div className="info-card">
                    <h4 style={{ color: 'var(--color-success)', marginBottom: '12px', fontWeight: 'bold' }}>2. Group &apos;A&apos; Central Services</h4>
                    <ul className="space-y-2">
                      <li><strong>IFS</strong>: Indian Foreign Service</li>
                      <li><strong>IRS (IT & C)</strong>: Indian Revenue Service</li>
                      <li><strong>IAAS</strong>: Indian Audit & Accounts Service</li>
                      <li><strong>IDAS</strong>: Indian Defence Accounts Service</li>
                      <li><strong>IPoS</strong>: Indian Postal Service</li>
                    </ul>
                  </div>

                  <div className="info-card">
                    <h4 style={{ color: 'var(--color-accent)', marginBottom: '12px', fontWeight: 'bold' }}>3. Group &apos;B&apos; Central Services</h4>
                    <ul className="space-y-2">
                      <li><strong>DANICS</strong>: Delhi, Andaman & Nicobar Civil Service</li>
                      <li><strong>DANIPS</strong>: Delhi, Andaman & Nicobar Police Service</li>
                      <li><strong>AFHQCS</strong>: Armed Forces Headquarters Civil Service</li>
                    </ul>
                  </div>
                </div>
              </motion.section>
            )}

          </AnimatePresence>

          {/* FAQ Accordion Box (Common to all tabs) */}
          <section style={{ marginTop: '60px', paddingTop: '48px', borderTop: '1px solid var(--border-color)' }}>
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '12px' }}>
              <span className="badge badge-amber">UPSC FAQ Box</span>
              <h2>Frequently Asked Questions</h2>
              <p>Quick answers to common queries regarding calculators, question papers, and historical commissions.</p>
            </div>

            <div className="faq-accordion">
              {faqsList.map((item) => (
                <div key={item.id} className={`faq-item ${activeFaq === item.id ? 'active' : ''}`}>
                  <button className="faq-trigger" onClick={() => toggleFaq(item.id)}>
                    {item.question}
                    <ChevronDown className="faq-icon w-5 h-5 text-slate-400" />
                  </button>
                  <div 
                    className="faq-content"
                    style={{ maxHeight: activeFaq === item.id ? '200px' : '0' }}
                  >
                    <div className="faq-content-inner">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Return Home footer button */}
          <div style={{ marginTop: '48px', textAlign: 'center' }}>
            <Link href="/" className="btn btn-secondary">
              ← Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

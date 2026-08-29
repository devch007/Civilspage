'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Shield, Compass, ArrowUpRight, Sparkles, Calendar, Loader2 } from 'lucide-react';

interface Affair {
  id: string;
  date: string;
  title: string;
  category: string;
  content?: string;
}

interface SubjectPost {
  id: string;
  title: string;
  content?: string;
  image_url?: string;
  pdf_url?: string;
  created_at: string;
}

export default function PolitySubjectPage() {
  const [activeSection, setActiveSection] = useState('intro');
  const [updates, setUpdates] = useState<Affair[]>([]);
  const [subjectPosts, setSubjectPosts] = useState<SubjectPost[]>([]);
  const [loadingUpdates, setLoadingUpdates] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/content/affairs?category=polity')
      .then((r) => r.json())
      .then((data) => setUpdates(data))
      .catch((err) => console.error('Error fetching polity updates:', err))
      .finally(() => setLoadingUpdates(false));
    // Load educator-written subject content
    fetch('/api/content/subject?subject=polity')
      .then(r => r.json())
      .then(d => setSubjectPosts(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'topics', 'material', 'updates'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-height-screen">
      {/* Hero Header Banner */}
      <section className="subject-hero">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="badge badge-amber uppercase mb-3">Civil Services Core Syllabus</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-heading text-white">
            Polity and Governance
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Master Indian Polity &amp; Governance for UPSC CSE — constitutional frameworks, parliamentary procedures, federal structure, fundamental rights, and live current affairs updates.
          </p>
        </div>
      </section>

      {/* Grid Layout: Navigation Sidebar + Reading Panel */}
      <div className="container">
        <div className="subject-grid">
          
          {/* Sticky Scroll Spy Sidebar */}
          <aside className="hidden lg:block">
            <div className="subject-sidebar-sticky">
              <button 
                className={`subject-nav-link ${activeSection === 'intro' ? 'active' : ''}`}
                onClick={() => scrollToSection('intro')}
              >
                <Compass className="w-4 h-4" />
                <span>Introduction</span>
              </button>
              <button 
                className={`subject-nav-link ${activeSection === 'topics' ? 'active' : ''}`}
                onClick={() => scrollToSection('topics')}
              >
                <Shield className="w-4 h-4" />
                <span>Topic Articles</span>
              </button>
              <button 
                className={`subject-nav-link ${activeSection === 'material' ? 'active' : ''}`}
                onClick={() => scrollToSection('material')}
              >
                <BookOpen className="w-4 h-4" />
                <span>Study Material</span>
              </button>
              <button 
                className={`subject-nav-link ${activeSection === 'updates' ? 'active' : ''}`}
                onClick={() => scrollToSection('updates')}
              >
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>Live Updates</span>
              </button>
            </div>
          </aside>

          {/* Reading Content Panel */}
          <div className="min-w-0">
            
            {/* 1. INTRODUCTION */}
            <section id="intro" className="subject-section">
              <h2 className="subject-section-title">
                <Compass className="w-6 h-6 text-indigo-600" />
                Subject Introduction & Purpose
              </h2>
              <div className="prose text-slate-600 space-y-4">
                <p>
                  Welcome to the <strong className="font-bold text-slate-800">Polity and Governance Study Portal</strong>. This resource is curated specifically for <strong className="font-bold text-slate-800">UPSC Civil Services examination (CSE) aspirants</strong>, law students, public administration researchers, and citizens interested in understanding the structural foundation of the Indian state.
                </p>
                <p>
                  Indian Polity, as defined in General Studies Paper II, comprises the working mechanisms of parliamentary institutions, federal units, constitutional bodies, and grassroots governance. By structuring this page into analytical cards, we aim to deliver a clean reading workspace that bridges textbook theory with contemporary legal, policy, and judicial updates.
                </p>
                <div className="p-4 bg-slate-50 border-l-4 border-amber-500 rounded-r-md mt-6">
                  <span className="block font-bold text-slate-800 text-sm mb-1">Target Audience Guide:</span>
                  <ul className="list-disc pl-4 text-xs space-y-1 text-slate-600 font-medium">
                    <li><strong>UPSC Aspirants:</strong> Targeted focus on core syllabus chapters, commissions recommendations, and acts.</li>
                    <li><strong>Law Students:</strong> Comprehensive landmark Supreme Court ratios and legal provisions summary.</li>
                    <li><strong>General Readers:</strong> Simplified explanations of constitutional rights, state operations, and citizen benefits.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 2. TOPIC-BASED ARTICLES */}
            <section id="topics" className="subject-section">
              <h2 className="subject-section-title">
                <Shield className="w-6 h-6 text-indigo-600" />
                Topic-Based Analytical Frameworks
              </h2>
              <p className="text-slate-500 mb-6">
                Explore foundational domains of Indian polity. Each card covers critical conceptual structures, article groups, and syllabus significance.
              </p>
              
              <div className="subject-cards-2">
                <div className="subject-card">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 block">Part I - Constitution</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Constitutionalism & Fundamental Rights</h3>
                  <p className="text-sm text-slate-500 mb-4 flex-grow">
                    Covers the historical evolution, philosophical ideals (Preamble), Fundamental Rights (Articles 12-35), DPSP (Articles 36-51), and the balancing acts that enforce citizen rights while allowing reasonable state restrictions.
                  </p>
                  <Link href="https://www.india.gov.in/my-government/constitution-india" target="_blank" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center mt-auto gap-1">
                    Official Constitution Text <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="subject-card">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 block">Part II - Parliament</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Parliament & State Legislatures</h3>
                  <p className="text-sm text-slate-500 mb-4 flex-grow">
                    Analyzing parliamentary control, executive oversight, the passage of ordinary & money bills, budgetary procedures, parliamentary committees, and legislative privileges.
                  </p>
                  <Link href="https://sansad.in/ls" target="_blank" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center mt-auto gap-1">
                    Lok Sabha Portal <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="subject-card">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 block">Part III - Judiciary</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">The Integrated Judicial System</h3>
                  <p className="text-sm text-slate-500 mb-4 flex-grow">
                    Examines the hierarchical structures from District Courts to High Courts and the Supreme Court. Details the Collegium vs. NJAC appointment debate, Judicial Activism, Judicial Review, and PIL mechanisms.
                  </p>
                  <Link href="https://sci.gov.in" target="_blank" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center mt-auto gap-1">
                    Supreme Court of India <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="subject-card">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 block">Part IV - Federalism</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Federalism & Center-State Relations</h3>
                  <p className="text-sm text-slate-500 mb-4 flex-grow">
                    Studies the legislative, administrative, and financial divisions of power (7th Schedule). Analyzes tension points like the role of the Governor, tax allocations, and deployment of central forces.
                  </p>
                  <Link href="https://interstatecouncil.gov.in" target="_blank" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center mt-auto gap-1">
                    Inter-State Council Council <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="subject-card" style={{ gridColumn: 'span 2' }}>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 block">Part V - Local Governance</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Local Self-Government (73rd & 74th CAA)</h3>
                  <p className="text-sm text-slate-500 mb-4 flex-grow">
                    Evaluates the devolution of Funds, Functions, and Functionaries to Panchayati Raj Institutions (PRIs) and Urban Local Bodies (ULBs). Explores issues of capacity building, state finance commissions, and the role of District Planning Committees.
                  </p>
                  <Link href="https://panchayat.gov.in" target="_blank" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center mt-auto gap-1">
                    Ministry of Panchayati Raj <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </section>

            {/* 3. STUDY MATERIAL */}
            <section id="material" className="subject-section">
              <h2 className="subject-section-title">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                Curated Reference Resources
              </h2>
              <p className="text-slate-500 mb-6">
                High-yield textbook and syllabus study materials categorized by complexity level for structured guidance.
              </p>

              <div className="space-y-4">
                {/* Beginner */}
                <div className="p-5 border border-slate-100 rounded-lg bg-[#F8FAFC]">
                  <span className="difficulty-badge diff-beginner">Beginner Level</span>
                  <h4 className="font-bold text-slate-900 mb-2 text-base">Concept Foundations & NCERTs</h4>
                  <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
                    <li><strong>NCERT Class XI - Indian Constitution at Work:</strong> Crucial for understanding key concepts like constitutional structure, fundamental rights, elections, and administrative divisions.</li>
                    <li><strong>NCERT Class XII - Politics in India Since Independence:</strong> Helps construct structural context regarding planning commission debates, the emergency era, and coalitional eras.</li>
                  </ul>
                </div>

                {/* Intermediate */}
                <div className="p-5 border border-slate-100 rounded-lg bg-[#FFFBEB]">
                  <span className="difficulty-badge diff-intermediate">Intermediate Level</span>
                  <h4 className="font-bold text-slate-900 mb-2 text-base">Standard Core Reference Texts</h4>
                  <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
                    <li><strong>Indian Polity by M. Laxmikanth:</strong> The essential guide for objective prelims parameters. Explores chapter-by-chapter details of acts, commissions, and tables.</li>
                    <li><strong>Introduction to the Constitution of India by D.D. Basu:</strong> A highly analytical reference book detailing Constitutional philosophy, comparative legal constructs, and Supreme Court interpretations.</li>
                  </ul>
                </div>

                {/* Advanced */}
                <div className="p-5 border border-slate-100 rounded-lg bg-[#FFF1F2]">
                  <span className="difficulty-badge diff-advanced">Advanced Level</span>
                  <h4 className="font-bold text-slate-900 mb-2 text-base">Procedural Documents & Research</h4>
                  <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
                    <li><strong>PRS Legislative Research (prsindia.org):</strong> Essential for tracking active Bills, Acts, committee reports, and policy briefs.</li>
                    <li><strong>Second Administrative Reforms Commission (2nd ARC) Reports:</strong> Critical for GS II Mains answer writing. Focus on reports like <em>Ethics in Governance</em>, <em>Local Governance</em>, and <em>Citizen-Centric Administration</em>.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 7. EDUCATOR CONTENT + LIVE UPDATES */}
            <section id="updates" className="subject-section space-y-8">
              
              {/* Educator-written content */}
              {subjectPosts.length > 0 && (
                <div>
                  <h2 className="subject-section-title">
                    <Sparkles className="w-6 h-6 text-amber-500" />
                    Notes & Content by Rajiv Ranjan Singh
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subjectPosts.map(post => (
                      <div key={post.id} className="bg-white border border-amber-100 rounded-xl overflow-hidden shadow-sm">
                        {post.image_url && (
                          <img src={post.image_url} alt={post.title} className="w-full h-36 object-cover"/>
                        )}
                        <div className="p-5">
                          <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{post.title}</h3>
                          {post.content && (
                            <p className="text-xs text-slate-500 leading-relaxed mb-3">
                              {post.content.slice(0, 200)}{post.content.length > 200 ? '…' : ''}
                            </p>
                          )}
                          {post.pdf_url && (
                            <a href={post.pdf_url} target="_blank" rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                              📄 Download PDF
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Live current affairs updates */}
              <div>
                <h2 className="subject-section-title">
                  <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" />
                  Live Polity Updates &amp; Analysis
                </h2>
                <p className="text-slate-500 mb-6">
                  Stay updated with the latest constitutional amendments, supreme court decisions, and policy changes.
                </p>
                {loadingUpdates ? (
                  <div className="flex flex-col items-center justify-center py-10 gap-2 bg-white rounded-xl border border-slate-100">
                    <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
                    <span className="text-xs font-bold text-slate-400">Loading subject updates...</span>
                  </div>
                ) : updates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {updates.map(item => (
                      <div key={item.id} className="subject-card flex flex-col justify-between hover:border-indigo-200 transition-all bg-white p-5 rounded-xl border border-slate-100">
                        <div>
                          <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-slate-450">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                              {item.date}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{item.title}</h3>
                          <p className="text-xs text-slate-500 leading-relaxed mb-4">
                            {item.content ? item.content.slice(0, 160).replace(/<[^>]*>/g, '') + '…' : 'Read more →'}
                          </p>
                        </div>
                        <Link href={`/updates/${item.id}`} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 mt-auto">
                          <span>Read Analysis</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                    <p className="text-base text-[#0b3b60] font-bold font-serif">To be Updated soon.</p>
                  </div>
                )}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

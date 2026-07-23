'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, HelpCircle, Scale, Shield, Award, FileText, ChevronRight, Bookmark, Users, Compass, ArrowUpRight, Sparkles, Calendar, Loader2, BrainCircuit, MessageSquare } from 'lucide-react';

interface Affair {
  id: string;
  date: string;
  title: string;
  category: string;
  content?: string | null;
}

interface SubjectPost {
  id: string;
  title: string;
  content?: string;
  image_url?: string;
  pdf_url?: string;
  created_at: string;
}

export default function EthicsSubjectPage() {
  const [activeSection, setActiveSection] = useState('intro');
  const [updates, setUpdates] = useState<Affair[]>([]);
  const [subjectPosts, setSubjectPosts] = useState<SubjectPost[]>([]);
  const [loadingUpdates, setLoadingUpdates] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/content/affairs?category=ethics')
      .then((r) => r.json())
      .then((data) => setUpdates(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Error fetching ethics updates:', err))
      .finally(() => setLoadingUpdates(false));
    fetch('/api/content/subject?subject=ethics')
      .then(r => r.json())
      .then(d => setSubjectPosts(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'topics', 'thinkers', 'casestudies', 'material', 'updates'];
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
      <section className="subject-hero" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="badge badge-amber uppercase mb-3" style={{ backgroundColor: '#f59e0b', color: '#1e1b4b', fontWeight: 'bold' }}>
            General Studies Paper IV
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-heading text-white">
            Ethics, Integrity & Aptitude
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            A comprehensive reference database covering moral philosophy, emotional intelligence, public service values, structural framework case studies, and live contemporary updates.
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
                <span>Core Syllabus</span>
              </button>
              <button 
                className={`subject-nav-link ${activeSection === 'thinkers' ? 'active' : ''}`}
                onClick={() => scrollToSection('thinkers')}
              >
                <Users className="w-4 h-4" />
                <span>Moral Thinkers</span>
              </button>
              <button 
                className={`subject-nav-link ${activeSection === 'casestudies' ? 'active' : ''}`}
                onClick={() => scrollToSection('casestudies')}
              >
                <Scale className="w-4 h-4" />
                <span>Case Studies</span>
              </button>
              <button 
                className={`subject-nav-link ${activeSection === 'material' ? 'active' : ''}`}
                onClick={() => scrollToSection('material')}
              >
                <BookOpen className="w-4 h-4" />
                <span>Study Notes</span>
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
                  Welcome to the <strong className="font-bold text-slate-800">Ethics and Integrity Study Portal</strong>. Curated specifically for <strong className="font-bold text-slate-800">UPSC GS Paper IV aspirants</strong>, public administration advisors, and professionals concerned with accountability, integrity, and ethical public administration.
                </p>
                <p>
                  Syllabus requirements for GS Paper IV check an applicant’s attitude and approach to issues relating to integrity, probity in public life, and problem-solving strategies when dealing with conflicts in society. We structure this portal into concept cards and dynamic mentor feeds to ensure you can easily link philosophical frameworks with contemporary case developments.
                </p>
                <div className="p-4 bg-slate-50 border-l-4 border-amber-500 rounded-r-md mt-6">
                  <span className="block font-bold text-slate-800 text-sm mb-1">GS IV Score Maximizer Guide:</span>
                  <ul className="list-disc pl-4 text-xs space-y-1 text-slate-600 font-medium">
                    <li><strong>Theoretical Clarity:</strong> Memorize definitions of foundational values: Integrity, Impartiality, Objectivity, and Compassion.</li>
                    <li><strong>Thinker Quotes:</strong> Strategically cite moral philosophers (e.g. Kant, Mill, or Gandhi) in theory answers.</li>
                    <li><strong>Dynamic References:</strong> Cite contemporary administrative reports and real-world ethical debates to gain a competitive edge.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 2. CORE SYLLABUS TOPICS */}
            <section id="topics" className="subject-section">
              <h2 className="subject-section-title">
                <Shield className="w-6 h-6 text-indigo-600" />
                Core Syllabus Core Frameworks
              </h2>
              <p className="text-slate-500 mb-6">
                Explore core theoretical areas of GS Paper IV. Each section covers critical definitions, dimensions, and administrative significance.
              </p>
              
              <div className="subject-cards-2">
                <div className="subject-card">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 block">Part I - Foundations</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Ethics & Human Interface</h3>
                  <p className="text-sm text-slate-500 mb-4 flex-grow">
                    Understanding the essence, determinants, and consequences of Ethics in human actions. Exploring ethics in private and public relationships, human values, and lessons from the lives of great leaders and reformers.
                  </p>
                  <Link href="https://darpg.gov.in/documents-reports" target="_blank" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center mt-auto gap-1">
                    2nd ARC reports on Ethics <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="subject-card">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 block">Part II - Attitude & Values</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Attitude, Aptitude & Civil Service Values</h3>
                  <p className="text-sm text-slate-500 mb-4 flex-grow">
                    Demystifying content, structure, and functions of attitude; moral and political attitudes; social influence and persuasion. Foundational values for Civil Service including integrity, impartiality, non-partisanship, and empathy.
                  </p>
                  <span className="text-xs font-bold text-slate-400 mt-auto">Syllabus Focus: Core Values</span>
                </div>

                <div className="subject-card">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 block">Part III - Psychology</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Emotional Intelligence (EI)</h3>
                  <p className="text-sm text-slate-500 mb-4 flex-grow">
                    Understanding concepts and utilities of emotional intelligence in administration and governance. Reviewing models of EI (Daniel Goleman framework) and how self-awareness, empathy, and social skills aid conflict resolution.
                  </p>
                  <span className="text-xs font-bold text-slate-400 mt-auto">Syllabus Focus: EI in Administration</span>
                </div>

                <div className="subject-card">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 block">Part IV - Public Service</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Probity & Accountability in Governance</h3>
                  <p className="text-sm text-slate-500 mb-4 flex-grow">
                    Concept of public service; philosophical basis of governance and probity; information sharing and transparency; Right to Information (RTI); Code of Ethics and Code of Conduct; Citizen’s Charters; work culture and quality of service delivery.
                  </p>
                  <Link href="https://rtionline.gov.in" target="_blank" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center mt-auto gap-1">
                    RTI Online Portal <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </section>

            {/* 3. MORAL THINKERS & PHILOSOPHERS */}
            <section id="thinkers" className="subject-section">
              <h2 className="subject-section-title">
                <Users className="w-6 h-6 text-indigo-600" />
                Contributions of Moral Thinkers & Philosophers
              </h2>
              <p className="text-slate-500 mb-6">
                Key concepts of eminent philosophers from India and the world to weave into theoretical responses.
              </p>

              <div className="space-y-4">
                <div className="p-5 bg-white border border-slate-100 rounded-xl hover:border-slate-200 transition-all shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-extrabold text-amber-600 uppercase bg-amber-50 px-2 py-0.5 rounded text-slate-800">Deontology</span>
                    <span className="text-xs text-slate-405 font-bold">Western Philosophy</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Immanuel Kant: Categorical Imperative</h3>
                  <p className="text-xs text-slate-500 mb-3">Core Idea: Duty-based ethics (Deontology) over consequentialism.</p>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded italic border-l-4 border-amber-500">
                    &ldquo;Act only according to that maxim whereby you can at the same time will that it should become a universal law.&rdquo;
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    <strong>UPSC Application:</strong> Use this when answering questions regarding absolute truths, honesty, and anti-corruption frameworks.
                  </p>
                </div>

                <div className="p-5 bg-white border border-slate-100 rounded-xl hover:border-slate-200 transition-all shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-extrabold text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded">Utilitarianism</span>
                    <span className="text-xs text-slate-405 font-bold">Western Philosophy</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Jeremy Bentham & John Stuart Mill</h3>
                  <p className="text-xs text-slate-500 mb-3">Core Idea: Actions are right in proportion as they tend to promote happiness (Consequentialism).</p>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded italic border-l-4 border-indigo-600">
                    &ldquo;The greatest happiness of the greatest number is the foundation of morals and legislation.&rdquo;
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    <strong>UPSC Application:</strong> Relevant in policy design, infrastructure rehabilitation versus environmental displacement dilemmas, and welfare distribution analysis.
                  </p>
                </div>

                <div className="p-5 bg-white border border-slate-100 rounded-xl hover:border-slate-200 transition-all shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-extrabold text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded text-slate-800">Sarvodaya & Trusteeship</span>
                    <span className="text-xs text-slate-405 font-bold">Indian Philosophy</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Mahatma Gandhi: The Seven Social Sins</h3>
                  <p className="text-xs text-slate-500 mb-3">Core Idea: Means and Ends are inseparable. Politics without principles and commerce without morality lead to societal decay.</p>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded italic border-l-4 border-emerald-500">
                    &ldquo;Recall the face of the poorest and the weakest man whom you may have seen, and ask yourself if the step you contemplate is going to be of any use to him.&rdquo;
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    <strong>UPSC Application:</strong> Gandhi's Talisman is the ultimate moral compass tool for solving conflict administrative case studies.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. CASE STUDIES ANALYSIS FRAMEWORK */}
            <section id="casestudies" className="subject-section">
              <h2 className="subject-section-title">
                <Scale className="w-6 h-6 text-indigo-600" />
                Case Studies Strategy & Framework
              </h2>
              <p className="text-slate-500 mb-6">
                Case studies constitute 50% of the GS IV Marks. Learn the standard structured answer writing framework designed to handle any administrative dilemma.
              </p>

              <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl space-y-4 text-slate-650">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900 m-0">Standard 5-Step Resolution Matrix</h3>
                </div>
                
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-white rounded border border-slate-200/50">
                    <strong className="block text-slate-800 text-sm mb-1">Step 1: Stakeholder Mapping</strong>
                    Identify all affected parties. Distinguish between primary (e.g. citizens, contractors) and secondary (e.g. government, media) stakeholders.
                  </div>
                  
                  <div className="p-3 bg-white rounded border border-slate-200/50">
                    <strong className="block text-slate-800 text-sm mb-1">Step 2: Identifying Ethical Dilemmas</strong>
                    Highlight the core value conflicts involved (e.g. Professional Duty vs. Personal Compassion, Efficiency vs. Procedural Correctness, Public Welfare vs. Environmental Conservation).
                  </div>

                  <div className="p-3 bg-white rounded border border-slate-200/50">
                    <strong className="block text-slate-800 text-sm mb-1">Step 3: Options Evaluation</strong>
                    Enumerate 3-4 possible paths of action. Detail both the short-term and long-term pros and cons for each option, including ethical and legal consequences.
                  </div>

                  <div className="p-3 bg-white rounded border border-slate-200/50">
                    <strong className="block text-slate-800 text-sm mb-1">Step 4: Formulate the Course of Action</strong>
                    Present your recommended path. Ensure it is legally sound, economically feasible, administratively practical, and ethically justified.
                  </div>
                </div>
              </div>
            </section>

            {/* 5. STUDY NOTES */}
            <section id="material" className="subject-section">
              <h2 className="subject-section-title">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                Ethics Syllabus Material & Resources
              </h2>
              <p className="text-slate-500 mb-6">
                Download micro-notes, framework sheets, and model ethics answers compiled by our academy.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="subject-card flex justify-between items-center p-4 border border-slate-105 bg-white rounded-xl">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">GS Paper IV Core Keyword Dictionary</h4>
                    <p className="text-xs text-slate-400">Definitions of 50 core terms with examples (PDF, 2.4 MB)</p>
                  </div>
                  <button className="btn btn-secondary !py-1.5 !px-3 text-xs shrink-0" onClick={() => alert('Ethics keyword handbook queued for download.')}>
                    Download
                  </button>
                </div>

                <div className="subject-card flex justify-between items-center p-4 border border-slate-105 bg-white rounded-xl">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">10 Solved UPSC Ethics Case Studies (2020-2025)</h4>
                    <p className="text-xs text-slate-400">Step-by-step stakeholder mapping walkthroughs (PDF, 4.8 MB)</p>
                  </div>
                  <button className="btn btn-secondary !py-1.5 !px-3 text-xs shrink-0" onClick={() => alert('Solved case studies handbook queued for download.')}>
                    Download
                  </button>
                </div>
              </div>
            </section>

            {/* 6. LIVE ETHICS UPDATES */}
            <section id="updates" className="subject-section">
              <h2 className="subject-section-title">
                <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" />
                Live Ethics Updates & Case Analysis
              </h2>
              <p className="text-slate-500 mb-6">
                Stay updated with the latest moral-ethical debates, code of conduct revisions, global anti-corruption developments, and analysis posted by Dr. Rajiv Ranjan Singh.
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
                <div className="text-center py-10 bg-white rounded-xl border border-slate-100">
                  <p className="text-sm text-slate-405 font-semibold">No recent Ethics updates. Updates posted by the mentor will appear here.</p>
                </div>
              )}
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

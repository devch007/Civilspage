'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  HelpCircle, 
  Scale, 
  Shield, 
  Award, 
  FileText, 
  ChevronRight, 
  BookOpenCheck,
  Bookmark,
  Users,
  Compass,
  ArrowUpRight,
  Sparkles,
  Calendar,
  Loader2
} from 'lucide-react';
import { getAffairs, type Affair } from '@/lib/supabase';

export default function PolitySubjectPage() {
  const [activeSection, setActiveSection] = useState('intro');
  const [updates, setUpdates] = useState<Affair[]>([]);
  const [loadingUpdates, setLoadingUpdates] = useState<boolean>(true);

  useEffect(() => {
    async function loadUpdates() {
      try {
        const list = await getAffairs();
        const filtered = list.filter(item => 
          item.category.toLowerCase().includes('polity')
        );
        setUpdates(filtered);
      } catch (err) {
        console.error("Error fetching polity updates:", err);
      } finally {
        setLoadingUpdates(false);
      }
    }
    loadUpdates();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'topics', 'material', 'committees', 'bills', 'judgments', 'policies', 'updates'];
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
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-heading">
            Polity and Governance
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            A comprehensive reference database covering constitutional frameworks, legislative bills, administrative reform commissions, landmark Supreme Court rulings, and national development policies.
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
                className={`subject-nav-link ${activeSection === 'committees' ? 'active' : ''}`}
                onClick={() => scrollToSection('committees')}
              >
                <Users className="w-4 h-4" />
                <span>Commissions</span>
              </button>
              <button 
                className={`subject-nav-link ${activeSection === 'bills' ? 'active' : ''}`}
                onClick={() => scrollToSection('bills')}
              >
                <FileText className="w-4 h-4" />
                <span>Bills & Acts</span>
              </button>
              <button 
                className={`subject-nav-link ${activeSection === 'judgments' ? 'active' : ''}`}
                onClick={() => scrollToSection('judgments')}
              >
                <Scale className="w-4 h-4" />
                <span>Court Judgments</span>
              </button>
              <button 
                className={`subject-nav-link ${activeSection === 'policies' ? 'active' : ''}`}
                onClick={() => scrollToSection('policies')}
              >
                <Award className="w-4 h-4" />
                <span>Policies</span>
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

            {/* 4. COMMITTEES */}
            <section id="committees" className="subject-section">
              <h2 className="subject-section-title">
                <Users className="w-6 h-6 text-indigo-600" />
                Landmark Commissions & Committees
              </h2>
              <p className="text-slate-500 mb-6">
                Analysis of high-level government commissions set up to reform Center-State divisions, governance systems, and public offices.
              </p>

              <div className="space-y-6">
                {/* Committee 1 */}
                <div className="p-6 border border-slate-200 rounded-lg hover:border-slate-300 transition-all bg-white">
                  <div className="commission-meta">
                    <span className="text-xs font-extrabold text-indigo-600 uppercase">Federal Relations</span>
                    <span className="commission-status status-accepted">Substantially Implemented</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Sarkaria Commission (1983 - 1988)</h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    Set up under the chairmanship of Justice R.S. Sarkaria to review the working of existing arrangements between the Union and States.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-500">
                    <div className="p-3 bg-slate-50 rounded">
                      <strong className="block text-slate-800 mb-1">Key Recommendations:</strong>
                      <ul className="list-disc pl-3 space-y-1">
                        <li>The Governor must be an eminent person from outside the state, not active in local politics.</li>
                        <li>Article 356 must be used sparingly, in extreme emergencies only.</li>
                        <li>Permanent Inter-State Council must be constituted under Article 263.</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-slate-50 rounded">
                      <strong className="block text-slate-800 mb-1">Implementation Impact:</strong>
                      <p className="leading-relaxed">
                        Led to the creation of the Inter-State Council in 1990. The guidelines for Article 356 were heavily adopted by the Supreme Court in the S.R. Bommai case.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Committee 2 */}
                <div className="p-6 border border-slate-200 rounded-lg hover:border-slate-300 transition-all bg-white">
                  <div className="commission-meta">
                    <span className="text-xs font-extrabold text-indigo-600 uppercase">Federal Relations</span>
                    <span className="commission-status status-partial">Partial Acceptance / Review</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Punchhi Commission (2007 - 2010)</h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    Chaired by former Chief Justice M.M. Punchhi, this commission re-examined Center-State relations in light of rapid economic and political changes.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-500">
                    <div className="p-3 bg-slate-50 rounded">
                      <strong className="block text-slate-800 mb-1">Key Recommendations:</strong>
                      <ul className="list-disc pl-3 space-y-1">
                        <li>Fixed five-year tenure for Governors, with removal only through legislative impeachment.</li>
                        <li>Limit Governor discretionary powers on choosing Chief Ministers.</li>
                        <li>Localized Emergency framework under Article 355 to avoid state-wide lockdowns.</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-slate-50 rounded">
                      <strong className="block text-slate-800 mb-1">Implementation Impact:</strong>
                      <p className="leading-relaxed">
                        Still regularly referenced in federal dispute pleadings before the Supreme Court. High levels of discussion in the Inter-State Council meetings.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Committee 3 */}
                <div className="p-6 border border-slate-200 rounded-lg hover:border-slate-300 transition-all bg-white">
                  <div className="commission-meta">
                    <span className="text-xs font-extrabold text-indigo-600 uppercase">Administrative Reforms</span>
                    <span className="commission-status status-partial">Gradual Policy Adoption</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Second Administrative Reforms Commission (2nd ARC - 2005)</h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    Set up under Veerappa Moily to suggest measures to achieve a proactive, responsive, transparent, and accountable public administration system.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-500">
                    <div className="p-3 bg-slate-50 rounded">
                      <strong className="block text-slate-800 mb-1">Key Recommendations:</strong>
                      <ul className="list-disc pl-3 space-y-1">
                        <li>Incorporate dynamic Ethics Codes for ministers, legislators, and civil servants.</li>
                        <li>Overhaul the Civil Services performance evaluation methods.</li>
                        <li>Decentralize financial control systems to Urban Local Bodies and Panchayats.</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-slate-50 rounded">
                      <strong className="block text-slate-800 mb-1">Implementation Impact:</strong>
                      <p className="leading-relaxed">
                        Forms the academic baseline for GS IV Ethics syllabus. Guided standard administrative citizen charters and e-Governance schemes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. BILLS & ACTS */}
            <section id="bills" className="subject-section">
              <h2 className="subject-section-title">
                <FileText className="w-6 h-6 text-indigo-600" />
                Major Bills & Statutory Acts
              </h2>
              <p className="text-slate-500 mb-6">
                Review key parliamentary legislation, highlighting structural provisions, goals, and democratic impacts.
              </p>

              <div className="space-y-6">
                {/* Act 1 */}
                <div className="subject-card">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-extrabold text-indigo-600 uppercase">Transparency Laws</span>
                    <span className="text-xs text-slate-400 font-bold">Act 22 of 2005</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Right to Information (RTI) Act, 2005</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Enacted to practicalize the constitutional Right to Information under Article 19(1)(a). It outlines procedures for requesting state documents and details appellate bodies.
                  </p>
                  <div className="bg-white p-3 rounded border border-slate-100 text-xs text-slate-500 space-y-2">
                    <p><strong>Core Provisions:</strong> Mandatory disclosure parameters for Public Authorities. Section 8 details exemptions protecting national sovereignty. Establishes the Central Information Commission (CIC).</p>
                    <p><strong>Outcomes/Impact:</strong> Empowered citizens to query state spending, exam selection criteria, and land allocations. Combatted administrative secrecy.</p>
                  </div>
                  <Link href="https://rti.gov.in" target="_blank" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mt-4">
                    RTI Online Gateway <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Act 2 */}
                <div className="subject-card">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-extrabold text-indigo-600 uppercase">Fiscal Federalism</span>
                    <span className="text-xs text-slate-400 font-bold">101st Amendment</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Goods and Services Tax (GST) Act, 2017</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    A comprehensive indirect tax reform subsuming state levies, creating a unified national market.
                  </p>
                  <div className="bg-white p-3 rounded border border-slate-100 text-xs text-slate-500 space-y-2">
                    <p><strong>Core Provisions:</strong> Inserted Article 279A establishing the constitutional GST Council, giving weightage to both Central and State financial ministers.</p>
                    <p><strong>Outcomes/Impact:</strong> Unified indirect taxation but led to state compensation disputes, representing a key test of cooperative federalism in India.</p>
                  </div>
                  <Link href="https://www.gst.gov.in" target="_blank" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mt-4">
                    GST Council Portal <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Act 3 */}
                <div className="subject-card">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-extrabold text-indigo-600 uppercase">Citizenship Laws</span>
                    <span className="text-xs text-slate-400 font-bold">Act 47 of 2019</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Citizenship (Amendment) Act, 2019</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Amended the Citizenship Act of 1955 to fast-track naturalization parameters for persecuted minority groups.
                  </p>
                  <div className="bg-white p-3 rounded border border-slate-100 text-xs text-slate-500 space-y-2">
                    <p><strong>Core Provisions:</strong> Relaxes residency thresholds from 11 years to 5 years for Hindus, Sikhs, Buddhists, Jains, Parsis, and Christians entering from Pakistan, Bangladesh, and Afghanistan prior to Dec 31, 2014.</p>
                    <p><strong>Outcomes/Impact:</strong> Streamlined regularizations for refugees, but sparked constitutional challenges before the Supreme Court concerning Article 14 equal protection boundaries.</p>
                  </div>
                  <Link href="https://indiankanoon.org/doc/48360117" target="_blank" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mt-4">
                    Statute Text reference <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </section>

            {/* 5. COURT JUDGMENTS */}
            <section id="judgments" className="subject-section">
              <h2 className="subject-section-title">
                <Scale className="w-6 h-6 text-indigo-600" />
                Landmark Supreme Court Judgments
              </h2>
              <p className="text-slate-500 mb-6">
                Timeline profiles of constitutional jurisprudence defining basic structure, emergency safeguards, and civil liberty expansions.
              </p>

              <div className="space-y-6">
                {/* Case 1 */}
                <div className="subject-card judgment-card">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-extrabold text-indigo-600 uppercase">Basic Structure Doctrine</span>
                    <span className="text-xs text-slate-400 font-bold">1973 SCR</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Kesavananda Bharati v. State of Kerala</h3>
                  <p className="text-xs text-slate-500 mb-3 font-medium">Bench: 13 Judges (7-6 Majority decision)</p>
                  <div className="space-y-3 text-sm text-slate-600">
                    <p>
                      <strong>Constitutional Context:</strong> Challenged the constitutionality of the 24th, 25th, and 29th Amendments, which sought to curb the Supreme Court's power to review amendments limiting property rights.
                    </p>
                    <p>
                      <strong>Court Ruling:</strong> Ruled that while Parliament has the power to amend any part of the Constitution (including Fundamental Rights) under Article 368, it cannot alter or destroy its <strong className="font-bold text-slate-800">&ldquo;Basic Structure&rdquo;</strong>.
                    </p>
                    <p className="p-3 bg-slate-50 rounded border-l-2 border-indigo-600 text-xs italic">
                      &ldquo;The basic structure of the Constitution is built on the foundation of individual dignity and freedom. This cannot be legislatively removed.&rdquo;
                    </p>
                    <p>
                      <strong>Significance:</strong> Saved the democratic structure from absolute executive dominance, establishing that supremacy lies with the Constitution, not Parliament.
                    </p>
                  </div>
                </div>

                {/* Case 2 */}
                <div className="subject-card judgment-card">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-extrabold text-indigo-600 uppercase">Personal Liberty & Due Process</span>
                    <span className="text-xs text-slate-400 font-bold">1978 SCR</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Maneka Gandhi v. Union of India</h3>
                  <p className="text-xs text-slate-500 mb-3 font-medium">Bench: 7 Judges</p>
                  <div className="space-y-3 text-sm text-slate-600">
                    <p>
                      <strong>Constitutional Context:</strong> Maneka Gandhi's passport was confiscated under Section 10(3)(c) of the Passports Act in "public interest," without providing any administrative reasoning.
                    </p>
                    <p>
                      <strong>Court Ruling:</strong> Read Article 21's "procedure established by law" as requiring that the procedure be fair, just, and reasonable (due process), rather than merely formal.
                    </p>
                    <p className="p-3 bg-slate-50 rounded border-l-2 border-indigo-600 text-xs italic">
                      &ldquo;Procedure established by law under Article 21 must be right, just, and fair. If it is arbitrary or oppressive, it is no procedure at all.&rdquo;
                    </p>
                    <p>
                      <strong>Significance:</strong> Interlinked Articles 14, 19, and 21 (the golden triangle), establishing that any law depriving personal liberty must pass the checks of equality and freedom.
                    </p>
                  </div>
                </div>

                {/* Case 3 */}
                <div className="subject-card judgment-card">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-extrabold text-indigo-600 uppercase">Emergency Safeguards & Federalism</span>
                    <span className="text-xs text-slate-400 font-bold">1994 SCC</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">S.R. Bommai v. Union of India</h3>
                  <p className="text-xs text-slate-500 mb-3 font-medium">Bench: 9 Judges</p>
                  <div className="space-y-3 text-sm text-slate-600">
                    <p>
                      <strong>Constitutional Context:</strong> Arbitrary dismissal of state governments by the center under Article 356 (President's Rule) on questionable reports.
                    </p>
                    <p>
                      <strong>Court Ruling:</strong> Ruled that the President's proclamation is subject to judicial review. The majority of a state ministry must be tested on the legislative floor, not in the Governor's chambers.
                    </p>
                    <p>
                      <strong>Significance:</strong> Strengthened federalism, restricted center overreach, and declared secularism as a core element of the Basic Structure.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. POLICIES */}
            <section id="policies" className="subject-section">
              <h2 className="subject-section-title">
                <Award className="w-6 h-6 text-indigo-600" />
                Key Government Development Policies
              </h2>
              <p className="text-slate-500 mb-6">
                Critical review of administrative policy blueprints directing health, education, and digital access.
              </p>

              <div className="space-y-6">
                {/* Policy 1 */}
                <div className="subject-card">
                  <span className="text-xs font-extrabold text-indigo-600 uppercase mb-2 block">Social Sector - Health</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">National Health Policy (NHP), 2017</h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    Designed to clarify the state's role in shaping health systems, increasing investment, and integrating digital tools.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-500">
                    <div className="p-3 bg-slate-50 rounded">
                      <strong className="block text-slate-800 mb-1">Objectives:</strong>
                      <p>Raise government health spending to 2.5% of GDP. Achieve universal access to primary healthcare.</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded">
                      <strong className="block text-slate-800 mb-1">Implementation:</strong>
                      <p>Ayushman Bharat PM-JAY and the deployment of primary Health & Wellness Centers (HWCs).</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded">
                      <strong className="block text-slate-800 mb-1">Outcomes & Challenges:</strong>
                      <p>Reduced out-of-pocket spending, though disparities remain in rural tertiary care access.</p>
                    </div>
                  </div>
                </div>

                {/* Policy 2 */}
                <div className="subject-card">
                  <span className="text-xs font-extrabold text-indigo-600 uppercase mb-2 block">Social Sector - Education</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">National Education Policy (NEP), 2020</h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    Replaces the 1986 Policy on Education, aiming to create an equitable, vibrant, and multidisciplinary education system.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-500">
                    <div className="p-3 bg-slate-50 rounded">
                      <strong className="block text-slate-800 mb-1">Objectives:</strong>
                      <p>5+3+3+4 school layout structure, regional language instruction, and multidisciplinary choices.</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded">
                      <strong className="block text-slate-800 mb-1">Implementation:</strong>
                      <p>Phased state board curriculum revisions, NIPUN Bharat foundation literacy mission, and FYUP integration.</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded">
                      <strong className="block text-slate-800 mb-1">Outcomes & Challenges:</strong>
                      <p>Higher preschool integration, though infrastructure costs pose implementation challenges.</p>
                    </div>
                  </div>
                </div>

                {/* Policy 3 */}
                <div className="subject-card">
                  <span className="text-xs font-extrabold text-indigo-600 uppercase mb-2 block">Governance - Digital Economy</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Digital India Policy Blueprint (2015)</h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    A flagship program to transition the country into a digitally empowered society and knowledge economy.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-500">
                    <div className="p-3 bg-slate-50 rounded">
                      <strong className="block text-slate-800 mb-1">Objectives:</strong>
                      <p>Broadband highways, universal mobile access, public internet programs, and e-Kranti electronic delivery.</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded">
                      <strong className="block text-slate-800 mb-1">Implementation:</strong>
                      <p>Aadhaar database linking, Unified Payments Interface (UPI), DigiLocker, and Direct Benefit Transfers (DBT).</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded">
                      <strong className="block text-slate-800 mb-1">Outcomes & Challenges:</strong>
                      <p>Accelerated digital transactions and reduced welfare leakage, though rural connectivity gaps remain.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 7. LIVE UPDATES */}
            <section id="updates" className="subject-section">
              <h2 className="subject-section-title">
                <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" />
                Live Polity Updates & Analysis
              </h2>
              <p className="text-slate-500 mb-6">
                Stay updated with the latest constitutional amendments, supreme court decisions, policy changes, and analysis posted by Dr. Rajiv Ranjan Singh.
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
                        <p className="text-xs text-slate-500 leading-relaxed mb-4">{item.summary}</p>
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
                  <p className="text-sm text-slate-405 font-semibold">No recent Polity updates. Updates posted by the mentor will appear here.</p>
                </div>
              )}
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

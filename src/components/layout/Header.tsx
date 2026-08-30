'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Search,
  BookOpen,
  FileText,
  Award,
  HelpCircle,
  Sparkles,
  Scale,
  Landmark,
  ShieldAlert,
  Gavel,
  Scroll,
  Newspaper,
  Shield,
  Star,
  Layers
} from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const [currentLang, setCurrentLang] = useState<'en' | 'hi'>('en');

  // Close mobile menu & dropdown on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setSearchOpen(false);
  }, [pathname]);

  // Synchronize dynamic language selection state on mount
  useEffect(() => {
    const detectLanguage = (): 'en' | 'hi' => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('user_selected_lang');
        if (stored === 'hi' || stored === 'en') return stored;
      }
      if (typeof document !== 'undefined') {
        const raw = document.cookie || '';
        const decoded = decodeURIComponent(raw);
        if (decoded.includes('/hi') || decoded.includes('en/hi') || decoded.includes('auto/hi')) {
          return 'hi';
        }
      }
      return 'en';
    };

    const initialLang = detectLanguage();
    setCurrentLang(initialLang);
  }, []);

  // Dynamically load Google Translate for high-efficiency Hindi translation
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (document.getElementById('google-translate-script')) return;
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi',
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    addGoogleTranslateScript();
  }, []);

  const handleLanguageChange = (lang: 'en' | 'hi') => {
    setCurrentLang(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_selected_lang', lang);
    }

    const host = window.location.hostname;
    const baseHost = host.replace(/^www\./, '');
    const domains = ['', host, '.' + host, baseHost, '.' + baseHost];

    if (lang === 'hi') {
      document.cookie = 'googtrans=/en/hi; path=/';
      domains.forEach(d => {
        if (d) document.cookie = `googtrans=/en/hi; path=/; domain=${d}`;
      });
    } else {
      localStorage.setItem('user_selected_lang', 'en');
      const paths = ['/', '/app', ''];
      domains.forEach(d => {
        paths.forEach(p => {
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${p}` + (d ? `; domain=${d}` : '');
          document.cookie = `googtrans=; max-age=0; path=${p}` + (d ? `; domain=${d}` : '');
        });
      });
      document.cookie = 'googtrans=/en/en; path=/';
      document.cookie = 'googtrans=/auto/en; path=/';
    }

    // Trigger native google translate combo if initialized
    const selectElem = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (selectElem) {
      selectElem.value = lang === 'hi' ? 'hi' : 'en';
      selectElem.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Reload page after small delay to allow cookie mutation to flush
    setTimeout(() => {
      window.location.reload();
    }, 150);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const getHomeLink = (hash: string) => {
    return pathname === '/' ? hash : `/${hash}`;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/updates?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  // Adjust font size (accessibility feature)
  const changeFontSize = (delta: number) => {
    const newLevel = Math.max(-1, Math.min(1, fontSizeLevel + delta));
    setFontSizeLevel(newLevel);
    if (newLevel === -1) {
      document.documentElement.style.fontSize = '14px';
    } else if (newLevel === 1) {
      document.documentElement.style.fontSize = '18px';
    } else {
      document.documentElement.style.fontSize = '16px';
    }
  };

  const resetFontSize = () => {
    setFontSizeLevel(0);
    document.documentElement.style.fontSize = '16px';
  };

  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <>
      <header className="relative w-full z-40 bg-white shadow-xs transition-all">
        {/* 1. National Tricolor Accent Bar */}
        <div className="h-[3px] w-full flex">
          <div className="w-1/3 bg-[#FF9933]"></div>
          <div className="w-1/3 bg-[#FFFFFF] border-y border-slate-200"></div>
          <div className="w-1/3 bg-[#138808]"></div>
        </div>

        {/* 2. Top Utility & Accessibility Bar */}
        <div className="bg-[#0b2948] text-slate-200 text-[11px] font-medium border-b border-slate-800/40 py-1 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left: Date Display & Membership */}
            <div className="flex items-center gap-3 sm:gap-4 truncate">
              <span className="text-slate-300 font-mono text-[10.5px] hidden sm:inline-block">{currentDate}</span>
              <span className="text-slate-600 hidden sm:inline-block">|</span>
              <Link href="/membership" className="flex items-center gap-1.5 text-amber-300 hover:text-amber-400 font-bold transition-colors">
                <Award className="w-3.5 h-3.5" />
                <span className="text-[10.5px] tracking-wide uppercase">Membership</span>
              </Link>
            </div>

            {/* Right: Accessibility Controls */}
            <div className="flex items-center gap-3 shrink-0">
              <a href="#hero" className="hover:text-amber-300 transition-colors hidden md:inline text-[10.5px]">
                Skip to main content
              </a>
              <span className="text-slate-600 hidden md:inline">|</span>

              {/* Text Size Controls */}
              <div className="flex items-center gap-1 bg-[#133860] px-1.5 py-0.5 rounded border border-slate-700">
                <button
                  onClick={() => changeFontSize(-1)}
                  className={`px-1 hover:text-amber-300 font-bold transition-colors ${fontSizeLevel === -1 ? 'text-amber-400' : 'text-slate-300'}`}
                  title="Decrease Font Size"
                >
                  A-
                </button>
                <button
                  onClick={resetFontSize}
                  className={`px-1 hover:text-amber-300 font-bold transition-colors ${fontSizeLevel === 0 ? 'text-amber-400' : 'text-slate-300'}`}
                  title="Default Font Size"
                >
                  A
                </button>
                <button
                  onClick={() => changeFontSize(1)}
                  className={`px-1 hover:text-amber-300 font-bold transition-colors ${fontSizeLevel === 1 ? 'text-amber-400' : 'text-slate-300'}`}
                  title="Increase Font Size"
                >
                  A+
                </button>
              </div>

              <span className="text-slate-600">|</span>
              <div className="relative inline-block align-middle notranslate" translate="no" data-no-translate="true">
                <select
                  key={`lang-select-${currentLang}`}
                  value={currentLang}
                  onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'hi')}
                  translate="no"
                  className="notranslate bg-[#133860] text-slate-200 border border-slate-700/60 rounded px-2 py-0.5 text-[10.5px] font-bold outline-none cursor-pointer hover:text-amber-300 hover:border-slate-500 transition-colors focus:ring-0 focus:outline-none h-[22px] leading-tight"
                >
                  <option value="en" translate="no" className="notranslate bg-[#0b2948] text-white">English</option>
                  <option value="hi" translate="no" className="notranslate bg-[#0b2948] text-white">हिन्दी</option>
                </select>
              </div>
              <div id="google_translate_element" className="hidden"></div>
            </div>
          </div>
        </div>

        {/* 3. Institutional Identity Branding Banner */}
        <div className="bg-white border-b border-slate-200/90 pt-0.5 pb-1 sm:pt-1 sm:pb-1.5 px-3 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">

            <Link href="/" className="flex items-center group py-0 -my-1" aria-label="CivilsPAGE Home">
              <img
                src="/logo_civilspage.png"
                alt="CivilsPAGE - Learn • Aspire • Achieve"
                className="h-24 sm:h-28 lg:h-32 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>

            {/* Right Search Action */}
            <div className="hidden lg:flex items-center gap-3">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search Acts, Judgements, Issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0b3b60] focus:bg-white text-slate-800 placeholder-slate-400 transition-all"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </form>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-slate-600 hover:text-[#0b3b60]"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md bg-slate-100 text-[#0b3b60] hover:bg-slate-200"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar (Collapsible) */}
          {searchOpen && (
            <div className="lg:hidden mt-2 pt-2 border-t border-slate-100 px-2">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search Acts, Judgements, Issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0b3b60]"
                  autoFocus
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </form>
            </div>
          )}
        </div>

        {/* 4. Primary Deep Navy Navigation Bar - Centered Main Items */}
        <nav className="bg-[#0b3b60] text-white border-b-2 border-amber-500 shadow-inner hidden lg:block relative z-40">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
            <ul className="flex items-center justify-center text-[11.5px] font-semibold tracking-normal flex-nowrap whitespace-nowrap mx-auto">
              {/* Home */}
              <li>
                <Link
                  href="/"
                  className={`flex items-center gap-1 px-2.5 py-2.5 transition-colors border-b-2 ${pathname === '/'
                    ? 'bg-[#06243d] text-amber-300 border-amber-400 font-bold'
                    : 'border-transparent hover:bg-[#082e4e] hover:text-amber-200'
                    }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </Link>
              </li>

              {/* Civil Services Examination */}
              <li>
                <Link
                  href="/aboutcse"
                  className={`block px-2.5 py-2.5 transition-colors border-b-2 ${pathname === '/aboutcse'
                    ? 'bg-[#06243d] text-amber-300 border-amber-400 font-bold'
                    : 'border-transparent hover:bg-[#082e4e] hover:text-amber-200'
                    }`}
                >
                  Civil Services Examination
                </Link>
              </li>

              {/* Legislation Dropdown */}
              <li
                className="relative group"
                onMouseEnter={() => setActiveDropdown('legislation')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center">
                  <Link
                    href="/updates?category=Constitutional Amendments"
                    className={`block pl-2.5 pr-1 py-2.5 transition-colors border-b-2 ${pathname.includes('category=Legislation') || pathname.includes('category=Constitutional') || pathname.includes('category=Ordinary')
                      ? 'bg-[#06243d] text-amber-300 border-amber-400 font-bold'
                      : 'border-transparent hover:bg-[#082e4e] hover:text-amber-200'
                      }`}
                  >
                    Legislation
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleDropdown('legislation')}
                    className={`pr-2 py-2.5 transition-colors border-b-2 cursor-pointer ${pathname.includes('category=Legislation') || pathname.includes('category=Constitutional') || pathname.includes('category=Ordinary')
                      ? 'bg-[#06243d] text-amber-300 border-amber-400 font-bold'
                      : 'border-transparent hover:bg-[#082e4e] hover:text-amber-200'
                      }`}
                    aria-label="Toggle Legislation Menu"
                  >
                    <ChevronDown className={`w-3.5 h-3.5 opacity-80 transition-transform ${activeDropdown === 'legislation' ? 'rotate-180 text-amber-300' : 'group-hover:rotate-180'}`} />
                  </button>
                </div>

                {activeDropdown === 'legislation' && (
                  <div className="absolute left-0 top-full w-56 bg-white text-slate-800 rounded-b-lg shadow-2xl border-t-2 border-amber-500 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <Link
                      href="/updates?category=Constitutional Amendments"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2 text-xs hover:bg-slate-100 text-slate-700 hover:text-[#0b3b60] font-medium transition-colors"
                    >
                      Constitutional Amendments
                    </Link>
                    <Link
                      href="/updates?category=Ordinary Laws"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2 text-xs hover:bg-slate-100 text-slate-700 hover:text-[#0b3b60] font-medium transition-colors"
                    >
                      Ordinary Laws
                    </Link>
                  </div>
                )}
              </li>

              {/* Court Judgements */}
              <li>
                <Link
                  href="/updates?category=Court Judgements"
                  className={`block px-2.5 py-2.5 transition-colors border-b-2 ${pathname.includes('category=Court Judgements')
                    ? 'bg-[#06243d] text-amber-300 border-amber-400 font-bold'
                    : 'border-transparent hover:bg-[#082e4e] hover:text-amber-200'
                    }`}
                >
                  Court Judgements
                </Link>
              </li>

              {/* Policies/ Programme */}
              <li>
                <Link
                  href="/updates?category=Policies %26 Programs"
                  className={`block px-2.5 py-2.5 transition-colors border-b-2 ${pathname.includes('category=Policies')
                    ? 'bg-[#06243d] text-amber-300 border-amber-400 font-bold'
                    : 'border-transparent hover:bg-[#082e4e] hover:text-amber-200'
                    }`}
                >
                  Policies/ Programme
                </Link>
              </li>

              {/* Commissions/ Committees */}
              <li>
                <Link
                  href="/updates?category=Commissions %26 Committees"
                  className={`block px-2.5 py-2.5 transition-colors border-b-2 ${pathname.includes('category=Commissions')
                    ? 'bg-[#06243d] text-amber-300 border-amber-400 font-bold'
                    : 'border-transparent hover:bg-[#082e4e] hover:text-amber-200'
                    }`}
                >
                  Commissions/ Committees
                </Link>
              </li>

              {/* Ethics Dropdown */}
              <li
                className="relative group"
                onMouseEnter={() => setActiveDropdown('ethics')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center">
                  <Link
                    href="/updates?category=Ethical Issues"
                    className={`block pl-2.5 pr-1 py-2.5 transition-colors border-b-2 ${pathname.includes('category=Ethical') || pathname.includes('ethics')
                      ? 'bg-[#06243d] text-amber-300 border-amber-400 font-bold'
                      : 'border-transparent hover:bg-[#082e4e] hover:text-amber-200'
                      }`}
                  >
                    Ethics
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleDropdown('ethics')}
                    className={`pr-2 py-2.5 transition-colors border-b-2 cursor-pointer ${pathname.includes('category=Ethical') || pathname.includes('ethics')
                      ? 'bg-[#06243d] text-amber-300 border-amber-400 font-bold'
                      : 'border-transparent hover:bg-[#082e4e] hover:text-amber-200'
                      }`}
                    aria-label="Toggle Ethics Menu"
                  >
                    <ChevronDown className={`w-3.5 h-3.5 opacity-80 transition-transform ${activeDropdown === 'ethics' ? 'rotate-180 text-amber-300' : 'group-hover:rotate-180'}`} />
                  </button>
                </div>

                {activeDropdown === 'ethics' && (
                  <div className="absolute left-0 top-full w-56 bg-white text-slate-800 rounded-b-lg shadow-2xl border-t-2 border-amber-500 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <Link
                      href="/updates?category=Ethical Issues"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2 text-xs hover:bg-slate-100 text-slate-700 hover:text-[#0b3b60] font-medium transition-colors"
                    >
                      Ethical Issues
                    </Link>
                    <Link
                      href="/updates?category=Ethical Case Studies"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2 text-xs hover:bg-slate-100 text-slate-700 hover:text-[#0b3b60] font-medium transition-colors"
                    >
                      Ethical Case Studies
                    </Link>
                  </div>
                )}
              </li>

              {/* Practice Tests Dropdown */}
              <li
                className="relative group"
                onMouseEnter={() => setActiveDropdown('practice')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center">
                  <Link
                    href="/pyqs"
                    className={`block pl-2.5 pr-1 py-2.5 transition-colors border-b-2 ${pathname.startsWith('/pyqs') || pathname.includes('mock')
                      ? 'bg-[#06243d] text-amber-300 border-amber-400 font-bold'
                      : 'border-transparent hover:bg-[#082e4e] hover:text-amber-200'
                      }`}
                  >
                    Practice Tests
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleDropdown('practice')}
                    className={`pr-2 py-2.5 transition-colors border-b-2 cursor-pointer ${pathname.startsWith('/pyqs') || pathname.includes('mock')
                      ? 'bg-[#06243d] text-amber-300 border-amber-400 font-bold'
                      : 'border-transparent hover:bg-[#082e4e] hover:text-amber-200'
                      }`}
                    aria-label="Toggle Practice Tests Menu"
                  >
                    <ChevronDown className={`w-3.5 h-3.5 opacity-80 transition-transform ${activeDropdown === 'practice' ? 'rotate-180 text-amber-300' : 'group-hover:rotate-180'}`} />
                  </button>
                </div>

                {activeDropdown === 'practice' && (
                  <div className="absolute left-0 top-full w-56 bg-white text-slate-800 rounded-b-lg shadow-2xl border-t-2 border-amber-500 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <Link
                      href="/pyqs"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2 text-xs hover:bg-slate-100 text-slate-700 hover:text-[#0b3b60] font-medium transition-colors"
                    >
                      Previous Years Questions (PYQs)
                    </Link>
                    <Link
                      href="/mock-tests"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2 text-xs hover:bg-slate-100 text-slate-700 hover:text-[#0b3b60] font-medium transition-colors"
                    >
                      Mock Tests
                    </Link>
                    <Link
                      href="/model-answers"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2 text-xs hover:bg-slate-100 text-slate-700 hover:text-[#0b3b60] font-medium transition-colors"
                    >
                      Model Answers
                    </Link>
                  </div>
                )}
              </li>

              {/* Address your Queries */}
              <li>
                <Link
                  href="/direct-query"
                  className={`block px-2.5 py-2.5 transition-colors border-b-2 ${pathname === '/direct-query'
                    ? 'bg-[#06243d] text-amber-300 border-amber-400 font-bold'
                    : 'border-transparent hover:bg-[#082e4e] hover:text-amber-200'
                    }`}
                >
                  Address your Queries
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Spacer to push content down cleanly beneath fixed multi-tier header */}
      <div className="h-[78px] lg:h-[124px]"></div>

      {/* 5. Enhanced Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 w-[88%] max-w-[340px] bg-slate-50 shadow-2xl flex flex-col z-50 overflow-hidden"
            >
              {/* National Flag Header Accent */}
              <div className="h-[3.5px] w-full flex shrink-0">
                <div className="w-1/3 bg-[#FF9933]"></div>
                <div className="w-1/3 bg-[#FFFFFF] border-y border-slate-200"></div>
                <div className="w-1/3 bg-[#138808]"></div>
              </div>

              {/* Drawer Top Header */}
              <div className="bg-[#0b3b60] text-white p-3 sm:p-3.5 flex items-center justify-between shrink-0 shadow-xs">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                  <img
                    src="/logo_civilspage.png"
                    alt="CivilsPAGE"
                    className="h-14 w-auto object-contain bg-white rounded-xl p-1.5 shadow-xs"
                  />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Inside Drawer */}
              <div className="p-3 bg-white border-b border-slate-200 shrink-0">
                <form onSubmit={(e) => { handleSearchSubmit(e); setMobileMenuOpen(false); }} className="relative">
                  <input
                    type="text"
                    placeholder="Search Acts, Judgements, Issues..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b3b60] focus:bg-white transition-all text-slate-800"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </form>
              </div>

              {/* Scrollable Navigation Body */}
              <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">

                {/* Group 1: Core Navigation */}
                <div className="space-y-1">
                  <span className="px-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                    Main Directory
                  </span>

                  <Link
                    href="/"
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold transition-all ${pathname === '/'
                      ? 'bg-[#0b3b60] text-white shadow-xs'
                      : 'text-slate-700 bg-white border border-slate-100 hover:bg-slate-100'
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Home className={`w-4 h-4 ${pathname === '/' ? 'text-amber-300' : 'text-[#0b3b60]'}`} />
                    <span>Home</span>
                  </Link>

                  <Link
                    href="/aboutcse"
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold transition-all ${pathname === '/aboutcse'
                      ? 'bg-[#0b3b60] text-white shadow-xs'
                      : 'text-slate-700 bg-white border border-slate-100 hover:bg-slate-100'
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BookOpen className={`w-4 h-4 ${pathname === '/aboutcse' ? 'text-amber-300' : 'text-[#0b3b60]'}`} />
                    <span>Civil Services Examination</span>
                  </Link>
                </div>

                {/* Group 2: Contemporary Perspectives */}
                <div className="space-y-1">
                  <span className="px-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                    Contemporary Perspectives
                  </span>

                  {/* Legislation Accordion */}
                  <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-2xs">
                    <button
                      onClick={() => toggleDropdown('mobile-legislation')}
                      className="w-full flex items-center justify-between px-3 py-2.5 font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Gavel className="w-4 h-4 text-[#0b3b60]" />
                        Legislation
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${activeDropdown === 'mobile-legislation' ? 'rotate-180 text-[#0b3b60]' : ''}`} />
                    </button>

                    {activeDropdown === 'mobile-legislation' && (
                      <div className="p-2 pt-0 space-y-1 bg-slate-50/70 border-t border-slate-100 animate-in fade-in duration-150">
                        <Link
                          href="/updates?category=Constitutional Amendments"
                          className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-[#0b3b60] hover:bg-white rounded-lg font-medium transition-all"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Layers className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Constitutional Amendments</span>
                        </Link>
                        <Link
                          href="/updates?category=Ordinary Laws"
                          className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-[#0b3b60] hover:bg-white rounded-lg font-medium transition-all"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Gavel className="w-3.5 h-3.5 text-amber-600" />
                          <span>Ordinary Laws</span>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Court Judgements */}
                  <Link
                    href="/updates?category=Court Judgements"
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold transition-all ${pathname.includes('category=Court')
                      ? 'bg-[#0b3b60] text-white shadow-xs'
                      : 'text-slate-700 bg-white border border-slate-100 hover:bg-slate-100'
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Scale className={`w-4 h-4 ${pathname.includes('category=Court') ? 'text-amber-300' : 'text-[#0b3b60]'}`} />
                    <span>Court Judgements</span>
                  </Link>

                  {/* Policies / Programmes */}
                  <Link
                    href="/updates?category=Policies %26 Programs"
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold transition-all ${pathname.includes('category=Policies')
                      ? 'bg-[#0b3b60] text-white shadow-xs'
                      : 'text-slate-700 bg-white border border-slate-100 hover:bg-slate-100'
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FileText className={`w-4 h-4 ${pathname.includes('category=Policies') ? 'text-amber-300' : 'text-[#0b3b60]'}`} />
                    <span>Policies/ Programme</span>
                  </Link>

                  {/* Commissions / Committees */}
                  <Link
                    href="/updates?category=Commissions %26 Committees"
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold transition-all ${pathname.includes('category=Commissions')
                      ? 'bg-[#0b3b60] text-white shadow-xs'
                      : 'text-slate-700 bg-white border border-slate-100 hover:bg-slate-100'
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShieldAlert className={`w-4 h-4 ${pathname.includes('category=Commissions') ? 'text-amber-300' : 'text-[#0b3b60]'}`} />
                    <span>Commissions/ Committees</span>
                  </Link>

                  {/* Ethics Accordion */}
                  <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-2xs">
                    <button
                      onClick={() => toggleDropdown('mobile-ethics')}
                      className="w-full flex items-center justify-between px-3 py-2.5 font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-[#0b3b60]" />
                        Ethics
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${activeDropdown === 'mobile-ethics' ? 'rotate-180 text-[#0b3b60]' : ''}`} />
                    </button>

                    {activeDropdown === 'mobile-ethics' && (
                      <div className="p-2 pt-0 space-y-1 bg-slate-50/70 border-t border-slate-100 animate-in fade-in duration-150">
                        <Link
                          href="/updates?category=Ethical Issues"
                          className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-[#0b3b60] hover:bg-white rounded-lg font-medium transition-all"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Ethical Issues</span>
                        </Link>
                        <Link
                          href="/updates?category=Ethical Case Studies"
                          className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-[#0b3b60] hover:bg-white rounded-lg font-medium transition-all"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Scale className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Ethical Case Studies</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Group 3: Practice & Student Support */}
                <div className="space-y-1">
                  <span className="px-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                    Evaluation & Direct Query
                  </span>

                  {/* Practice & Tests Accordion */}
                  <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-2xs">
                    <button
                      onClick={() => toggleDropdown('mobile-practice')}
                      className="w-full flex items-center justify-between px-3 py-2.5 font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Award className="w-4 h-4 text-[#0b3b60]" />
                        Practice Tests
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${activeDropdown === 'mobile-practice' ? 'rotate-180 text-[#0b3b60]' : ''}`} />
                    </button>

                    {activeDropdown === 'mobile-practice' && (
                      <div className="p-2 pt-0 space-y-1 bg-slate-50/70 border-t border-slate-100 animate-in fade-in duration-150">
                        <Link
                          href="/pyqs"
                          className="block px-3 py-2 text-slate-600 hover:text-[#0b3b60] hover:bg-white rounded-lg font-medium transition-all"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Previous Years Questions
                        </Link>
                        <Link
                          href="/mock-tests"
                          className="block px-3 py-2 text-slate-600 hover:text-[#0b3b60] hover:bg-white rounded-lg font-medium transition-all"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Mock Tests
                        </Link>
                        <Link
                          href="/model-answers"
                          className="block px-3 py-2 text-slate-600 hover:text-[#0b3b60] hover:bg-white rounded-lg font-medium transition-all"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Model Answers
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link
                    href="/direct-query"
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold transition-all ${pathname === '/direct-query'
                      ? 'bg-[#0b3b60] text-white shadow-xs'
                      : 'text-slate-700 bg-white border border-slate-100 hover:bg-slate-100'
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <HelpCircle className={`w-4 h-4 ${pathname === '/direct-query' ? 'text-amber-300' : 'text-[#0b3b60]'}`} />
                    <span>Address your Queries</span>
                  </Link>

                  <Link
                    href="/about-mentor"
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold transition-all ${pathname === '/about-mentor'
                      ? 'bg-[#0b3b60] text-white shadow-xs'
                      : 'text-slate-700 bg-white border border-slate-100 hover:bg-slate-100'
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Award className={`w-4 h-4 ${pathname === '/about-mentor' ? 'text-amber-300' : 'text-[#0b3b60]'}`} />
                    <span>Editor-in-Chief</span>
                  </Link>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-3 bg-white border-t border-slate-200 shrink-0 text-center">
                <div className="text-[11px] text-slate-500 font-medium">
                  Mentored by <span className="font-bold text-[#0b3b60]">Rajiv Ranjan Singh</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

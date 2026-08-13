'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Detect scroll to style header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const getHomeLink = (hash: string) => {
    return pathname === '/' ? hash : `/${hash}`;
  };

  return (
    <>
      <header 
        className={`header ${scrolled ? 'scrolled shadow-lg' : ''}`} 
        style={{ 
          background: '#ffffff',
          borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: scrolled ? '0 8px 32px 0 rgba(31, 38, 135, 0.06)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="header-container" style={{ maxWidth: '100%', width: '100%', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" className="logo" aria-label="CivilsPage Home" style={{ flexShrink: 0 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--color-primary)"/>
              <path d="M2 17L12 22L22 17" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>CivilsPage</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-links" style={{ gap: '12px', fontSize: '0.78rem', flexWrap: 'nowrap' }} aria-label="Main Navigation">
            <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`} style={{ whiteSpace: 'nowrap' }}>Home</Link>
            <Link href="/aboutcse" className={`nav-link ${pathname === '/aboutcse' ? 'active' : ''}`} style={{ whiteSpace: 'nowrap' }}>About CSE Exam</Link>
            <Link href="/updates" className={`nav-link ${pathname === '/updates' && !pathname.includes('category') ? 'active' : ''}`} style={{ whiteSpace: 'nowrap' }}>Current News & Views</Link>
            
            <Link href="/updates?category=Legislation" className={`nav-link ${pathname.includes('category=Legislation') ? 'active' : ''}`} style={{ whiteSpace: 'nowrap' }}>Legislation</Link>
            <Link href="/updates?category=Constitutional Amendments" className={`nav-link ${pathname.includes('category=Constitutional Amendments') ? 'active' : ''}`} style={{ whiteSpace: 'nowrap' }}>Constitutional Amendments</Link>
            <Link href="/updates?category=Court Judgements" className={`nav-link ${pathname.includes('category=Court Judgements') ? 'active' : ''}`} style={{ whiteSpace: 'nowrap' }}>Court Judgements</Link>
            <Link href="/updates?category=Policies %26 Programs" className={`nav-link ${pathname.includes('category=Policies') ? 'active' : ''}`} style={{ whiteSpace: 'nowrap' }}>Policies & Programs</Link>
            <Link href="/updates?category=Commissions %26 Committees" className={`nav-link ${pathname.includes('category=Commissions') ? 'active' : ''}`} style={{ whiteSpace: 'nowrap' }}>Commissions & Committees</Link>
            
            <Link href="/subject/ethics" className={`nav-link ${pathname === '/subject/ethics' ? 'active' : ''}`} style={{ whiteSpace: 'nowrap' }}>Ethical Case Studies</Link>

            {/* Practice Test Dropdown */}
            <div className="dropdown" style={{ display: 'inline-block' }}>
              <button className="nav-link dropdown-trigger" aria-expanded="false" aria-haspopup="true" style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                Practice Test 
                <ChevronDown className="caret w-3.5 h-3.5 ml-1" />
              </button>
              <div className="dropdown-menu">
                <Link href="/pyqs" className="dropdown-item">PYQ's</Link>
                <Link href={getHomeLink('#mock-test')} className="dropdown-item">Mock Tests</Link>
                <Link href="/updates?category=Model Answers" className="dropdown-item">Model Answers</Link>
              </div>
            </div>
            
            <Link href="/direct-query" className={`nav-link ${pathname === '/direct-query' ? 'active' : ''}`} style={{ whiteSpace: 'nowrap' }}>Direct Queries</Link>
          </nav>

          {/* CTA & Hamburger */}
          <div className="header-actions" style={{ flexShrink: 0 }}>
            <Link href={getHomeLink('#mock-test')} className="btn btn-primary" style={{ padding: '10px 20px', minHeight: '40px' }}>
              Free Mock Test
            </Link>
            <button 
              className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu" 
              aria-expanded={mobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      <div 
        className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Mobile Drawer Navigation Drawer */}
      <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`} aria-label="Mobile Navigation" style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', position: 'fixed' }}>
        {/* Close Button inside Drawer */}
        <button 
          onClick={() => setMobileMenuOpen(false)}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', zIndex: 1060 }}
          className="text-slate-400 hover:text-slate-850 transition-colors"
          aria-label="Close Menu"
        >
          <X className="w-5 h-5" />
        </button>
        
        <Link href="/" className={`mobile-nav-link ${pathname === '/' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link href="/aboutcse" className={`mobile-nav-link ${pathname === '/aboutcse' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>About CSE Exam</Link>
        <Link href="/updates" className={`mobile-nav-link ${pathname === '/updates' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Current News & Views</Link>
        
        <Link href="/updates?category=Legislation" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Legislation</Link>
        <Link href="/updates?category=Constitutional Amendments" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Constitutional Amendments</Link>
        <Link href="/updates?category=Court Judgements" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Court Judgements</Link>
        <Link href="/updates?category=Policies %26 Programs" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Policies & Programs</Link>
        <Link href="/updates?category=Commissions %26 Committees" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Commissions & Committees</Link>
        
        <Link href="/subject/ethics" className={`mobile-nav-link ${pathname === '/subject/ethics' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Ethical Case Studies</Link>
        
        {/* Mobile Practice Test Dropdown */}
        <div className={`mobile-dropdown ${activeDropdown === 'practice' ? 'active' : ''}`}>
          <button className="mobile-dropdown-trigger" onClick={() => toggleDropdown('practice')}>
            <span>Practice Test</span>
            <ChevronDown className="caret w-4 h-4" />
          </button>
          <div className="mobile-dropdown-menu">
            <Link href="/pyqs" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>PYQ's</Link>
            <Link href={getHomeLink('#mock-test')} className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Mock Tests</Link>
            <Link href="/updates?category=Model Answers" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Model Answers</Link>
          </div>
        </div>
        
        <Link href="/direct-query" className={`mobile-nav-link ${pathname === '/direct-query' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Direct Queries</Link>
        <Link href={getHomeLink('#mock-test')} className="btn btn-primary w-full mt-4" onClick={() => setMobileMenuOpen(false)}>
          Start Free Test
        </Link>
      </nav>
    </>
  );
}

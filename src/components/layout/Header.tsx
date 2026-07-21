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
      <header className={`header ${scrolled ? 'scrolled shadow-md' : ''}`} style={{ background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)' }}>
        <div className="container header-container">
          <Link href="/" className="logo" aria-label="CivilsPage Home">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--color-primary)"/>
              <path d="M2 17L12 22L22 17" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>CivilsPage</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-links" aria-label="Main Navigation">
            <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
            <Link href="/aboutcse" className={`nav-link ${pathname === '/aboutcse' ? 'active' : ''}`}>About CSE Exam</Link>
            
            {/* Subject Dropdown */}
            <div className="dropdown">
              <button className="nav-link dropdown-trigger" aria-expanded="false" aria-haspopup="true">
                Subject 
                <ChevronDown className="caret w-3.5 h-3.5 ml-1" />
              </button>
              <div className="dropdown-menu">
                <Link href="/subject/polity" className="dropdown-item">Polity and Governance</Link>
                <Link href="/subject/ethics" className="dropdown-item">Ethics</Link>
              </div>
            </div>
            
            {/* Current Affairs Dropdown */}
            <div className="dropdown">
              <button className="nav-link dropdown-trigger" aria-expanded="false" aria-haspopup="true">
                Current Affairs 
                <ChevronDown className="caret w-3.5 h-3.5 ml-1" />
              </button>
              <div className="dropdown-menu">
                <Link href="/updates" className="dropdown-item">Current Updates</Link>
                <Link href="/updates" className="dropdown-item">News / Views</Link>
              </div>
            </div>
            
            {/* Practice Test Dropdown */}
            <div className="dropdown">
              <button className="nav-link dropdown-trigger" aria-expanded="false" aria-haspopup="true">
                Practice Test 
                <ChevronDown className="caret w-3.5 h-3.5 ml-1" />
              </button>
              <div className="dropdown-menu">
                <Link href={getHomeLink('#mock-test')} className="dropdown-item">Mock Tests</Link>
                <Link href={getHomeLink('#pyq-hub')} className="dropdown-item">PYQ (Previous Year Questions)</Link>
              </div>
            </div>
            
            <Link href="/direct-query" className={`nav-link ${pathname === '/direct-query' ? 'active' : ''}`}>Direct Query</Link>
          </nav>

          {/* CTA & Hamburger */}
          <div className="header-actions">
            <Link href={getHomeLink('#mock-test')} className="btn btn-primary" style={{ padding: '10px 20px', minHeight: '40px' }}>
              Free Mock Test
            </Link>
            <button 
              className={`hamburger ${mobileMenuOpen ? 'open' : ''} flex lg:hidden`}
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
      <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`} aria-label="Mobile Navigation">
        <Link href="/" className={`mobile-nav-link ${pathname === '/' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link href="/aboutcse" className={`mobile-nav-link ${pathname === '/aboutcse' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>About CSE Exam</Link>
        
        {/* Mobile Subject Dropdown */}
        <div className={`mobile-dropdown ${activeDropdown === 'subject' ? 'active' : ''}`}>
          <button className="mobile-dropdown-trigger" onClick={() => toggleDropdown('subject')}>
            <span>Subject</span>
            <ChevronDown className="caret w-4 h-4" />
          </button>
          <div className="mobile-dropdown-menu">
            <Link href="/subject/polity" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Polity and Governance</Link>
            <Link href="/subject/ethics" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Ethics</Link>
          </div>
        </div>
        
        {/* Mobile Current Affairs Dropdown */}
        <div className={`mobile-dropdown ${activeDropdown === 'affairs' ? 'active' : ''}`}>
          <button className="mobile-dropdown-trigger" onClick={() => toggleDropdown('affairs')}>
            <span>Current Affairs</span>
            <ChevronDown className="caret w-4 h-4" />
          </button>
          <div className="mobile-dropdown-menu">
            <Link href="/updates" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Current Updates</Link>
            <Link href="/updates" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>News / Views</Link>
          </div>
        </div>
        
        {/* Mobile Practice Test Dropdown */}
        <div className={`mobile-dropdown ${activeDropdown === 'practice' ? 'active' : ''}`}>
          <button className="mobile-dropdown-trigger" onClick={() => toggleDropdown('practice')}>
            <span>Practice Test</span>
            <ChevronDown className="caret w-4 h-4" />
          </button>
          <div className="mobile-dropdown-menu">
            <Link href={getHomeLink('#mock-test')} className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Mock Tests</Link>
            <Link href={getHomeLink('#pyq-hub')} className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>PYQ (Previous Year Questions)</Link>
          </div>
        </div>
        
        <Link href="/direct-query" className={`mobile-nav-link ${pathname === '/direct-query' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Direct Query</Link>
        <Link href={getHomeLink('#mock-test')} className="btn btn-primary w-full mt-4" onClick={() => setMobileMenuOpen(false)}>
          Start Free Test
        </Link>
      </nav>
    </>
  );
}

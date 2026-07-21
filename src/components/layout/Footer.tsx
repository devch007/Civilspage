'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' | null }>({ text: '', type: null });
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setFeedback({ text: '', type: null });

    // Simulate server side delay
    setTimeout(() => {
      setLoading(false);
      setFeedback({
        text: 'Successfully subscribed to high-yield updates!',
        type: 'success'
      });
      setEmail('');
    }, 1000);
  };

  return (
    <footer className="footer mt-auto">
      <div className="container">
        <div className="footer-grid">
          {/* Brand details */}
          <div className="footer-brand">
            <Link href="/" className="logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--color-primary)"/>
                <path d="M2 17L12 22L22 17" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>CivilsPage</span>
            </Link>
            <p>Empowering the next generation of civil servants with structured study materials, direct expert strategies, and responsive learning interfaces.</p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Twitter Page">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
              <a href="#" className="social-link" aria-label="YouTube Channel">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2a29 29 0 0 0-.46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
              <a href="#" className="social-link" aria-label="Telegram Channel">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="footer-title">UPSC Resources</h4>
            <ul className="footer-links">
              <li><Link href="/#study-material" className="footer-link">GS Study Notes</Link></li>
              <li><Link href="/#pyq-hub" className="footer-link">Prelims PYQ Solver</Link></li>
              <li><Link href="/#current-affairs" className="footer-link">Daily High-Yield News</Link></li>
              <li><Link href="/#mock-test" className="footer-link">Daily Prelims Mini-Quiz</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="footer-title">Contact Us</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Mail className="w-4 h-4" />
                <span>rajivranjansingh@civilspage.com</span>
              </div>
              <div className="contact-item">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="contact-item">
                <MapPin className="w-4 h-4" />
                <span>ORP, Rajinder Nagar,<br />New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Newsletter subscription */}
          <div className="footer-newsletter">
            <h4 className="footer-title">Newsletter</h4>
            <p>Get high-yield UPSC topics, weekly strategy notes, and exam notifications directly in your inbox.</p>
            
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <div className="newsletter-input-wrapper">
                <input 
                  type="email" 
                  className="newsletter-input" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  disabled={loading}
                  aria-label="Email for Newsletter"
                />
                <button type="submit" className="newsletter-submit" aria-label="Subscribe to newsletter" disabled={loading}>
                  <Send className="w-4.5 h-4.5" />
                </button>
              </div>
              {feedback.type && (
                <span className={`newsletter-feedback ${feedback.type === 'success' ? 'success text-emerald-600' : 'error text-red-600'} text-xs font-semibold mt-2 block`}>
                  {feedback.text}
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Copyright Bottom footer */}
        <div className="footer-bottom">
          <p>&copy; 2026 CivilsPage UPSC Academy. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link href="/admin" className="footer-link">Admin Dashboard</Link>
            <Link href="#" className="footer-link">Privacy Policy</Link>
            <Link href="#" className="footer-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

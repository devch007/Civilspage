'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Send } from 'lucide-react';
import { submitDirectQuery } from '@/lib/supabase';

export default function DirectQuery() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    // Map IDs to state fields
    const fieldMap: { [key: string]: string } = {
      'student-name': 'name',
      'student-email': 'email',
      'student-subject': 'subject',
      'student-message': 'message'
    };
    
    setFormData(prev => ({
      ...prev,
      [fieldMap[id]]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    setLoading(true);

    // Call Supabase handler (simulated or active)
    await submitDirectQuery(formData);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <main className="query-main">
      <div className="container flex justify-center w-full">
        <div className="query-card">
          <AnimatePresence mode="wait">
            
            {!submitted ? (
              <motion.div
                key="query-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                  <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Direct Access Channel</span>
                  <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
                    Query to Rajiv Sir
                  </h1>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    Have questions about syllabus topics, answer strategies, or mentorship courses? Send Sir a direct query below.
                  </p>
                </div>
                
                <form onSubmit={handleFormSubmit}>
                  {/* Student Name */}
                  <div className="form-group">
                    <label htmlFor="student-name" className="form-label">Student Name</label>
                    <input 
                      type="text" 
                      id="student-name" 
                      className="form-input" 
                      placeholder="e.g., Aditya Sharma" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                      disabled={loading}
                    />
                  </div>

                  {/* Student Email */}
                  <div className="form-group">
                    <label htmlFor="student-email" className="form-label">Student Email</label>
                    <input 
                      type="email" 
                      id="student-email" 
                      className="form-input" 
                      placeholder="e.g., aditya@example.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      disabled={loading}
                    />
                  </div>

                  {/* Subject */}
                  <div className="form-group">
                    <label htmlFor="student-subject" className="form-label">Subject</label>
                    <input 
                      type="text" 
                      id="student-subject" 
                      className="form-input" 
                      placeholder="e.g., Polity Mains Answer Writing Strategy" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      required 
                      disabled={loading}
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="form-group">
                    <label htmlFor="student-message" className="form-label">Message</label>
                    <textarea 
                      id="student-message" 
                      className="form-textarea" 
                      placeholder="Type your detailed question or doubt for Sir..." 
                      value={formData.message}
                      onChange={handleInputChange}
                      required 
                      disabled={loading}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="spinner"></div>
                        <span>Sending Query to Sir...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Query to Sir</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="query-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="success-container"
              >
                <div className="success-icon">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
                  Message Sent Successfully!
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '32px' }}>
                  Hi <strong>{formData.name}</strong>, your query regarding <strong>&ldquo;{formData.subject}&rdquo;</strong> has been successfully dispatched to Rajiv Ranjan Sir.
                  <br /><br />
                  A detailed response will be sent to you at <strong>{formData.email}</strong> within the next 24 hours.
                </p>
                <Link href="/" className="btn btn-secondary w-full" style={{ borderRadius: 'var(--border-radius-sm)' }}>
                  ← Return to Homepage
                </Link>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

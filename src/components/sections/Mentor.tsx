'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Mentor() {
  return (
    <section id="mentor-profile" className="section-padding" style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="mentor-grid">
          {/* Text Biography */}
          <motion.div 
            className="mentor-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge badge-primary">Lead Educator & Author</span>
            <h2 className="mentor-title" style={{ fontSize: '2.5rem', marginTop: '12px', marginBottom: '24px' }}>
              Meet Your Mentor:<br />
              <span style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-success))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Rajiv Ranjan Singh
              </span>
            </h2>
            <p className="mentor-bio" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.75' }}>
              Rajiv Ranjan Singh is a distinguished UPSC mentor and academic administrator with over 15 years of experience guiding aspirants through the intricate phases of the Civil Services Examination. Having mentored thousands of successful candidates who now serve as IAS, IPS, and IFS officers across the nation, his pedagogy focuses on conceptual clarity, multi-disciplinary syllabus correlation, and scientific answer-writing frameworks.
            </p>
            {/* Stats elements inside profile */}
            <div className="mentor-stats-row" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              <div className="mentor-stat-item">
                <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>15+ Yrs</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Teaching Experience</p>
              </div>
              <div className="mentor-stat-item">
                <h3 style={{ fontSize: '2rem', color: 'var(--color-success)', fontFamily: 'var(--font-heading)' }}>1,200+</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Selections in CSE</p>
              </div>
              <div className="mentor-stat-item">
                <h3 style={{ fontSize: '2rem', color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>100k+</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Online Students</p>
              </div>
            </div>
          </motion.div>
          
          {/* Image Biography Side */}
          <motion.div 
            className="mentor-visual"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
          >
            <div className="mentor-image-frame" style={{ position: 'relative', maxWidth: '580px', width: '100%', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '4px solid #FFFFFF' }}>
              <Image 
                src="/mentor_whiteboard.png" 
                alt="Rajiv Ranjan Singh Whiteboard Session" 
                width={580}
                height={326}
                style={{ width: '100%', height: 'auto', borderRadius: 'calc(var(--border-radius-lg) - 4px)', display: 'block' }}
                priority
              />
              {/* Accent glowing shadow overlay */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to top, rgba(15,23,42,0.3), transparent)', pointerEvents: 'none' }}></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Book, AlertCircle, FileText } from 'lucide-react';

export default function StudyMaterial() {
  return (
    <section id="study-material" className="section-padding">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge badge-primary">Study Material Hub</span>
          <h2>UPSC Core Syllabus Notes</h2>
          <p>Access high-quality study materials tailored for the Prelims & Mains examination, organized by GS papers.</p>
        </motion.div>

        <div className="material-grid">
          {/* Category Card 1 */}
          <motion.div 
            className="glass-card material-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="material-icon">
              <Book className="w-7 h-7" />
            </div>
            <h3>Mains GS Notes</h3>
            <p>Comprehensive subject notes for GS I (History & Geography), GS II (Polity & IR), GS III (Economy & S&T), and GS IV (Ethics).</p>
            <a href="#" className="btn btn-secondary" style={{ width: '100%' }}>Browse GS Topics</a>
          </motion.div>

          {/* Category Card 2 */}
          <motion.div 
            className="glass-card material-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="material-icon">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3>Prelims Cheat Sheets</h3>
            <p>High-yield factual pointers for quick revision: National Parks, constitutional bodies, economic indicators, and historical timelines.</p>
            <a href="#" className="btn btn-secondary" style={{ width: '100%' }}>Get Revision Sheets</a>
          </motion.div>

          {/* Category Card 3 */}
          <motion.div 
            className="glass-card material-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="material-icon">
              <FileText className="w-7 h-7" />
            </div>
            <h3>CSAT Practice Guides</h3>
            <p>Quantitative aptitude strategies, analytical reasoning tricks, and comprehension techniques designed to easily clear the paper 2 threshold.</p>
            <a href="#" className="btn btn-secondary" style={{ width: '100%' }}>View CSAT Guides</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

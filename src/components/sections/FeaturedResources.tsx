'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getNotes, type Note } from '@/lib/supabase';

export default function FeaturedResources() {
  const [resources, setResources] = useState<Note[]>([]);

  useEffect(() => {
    async function loadResources() {
      try {
        const list = await getNotes();
        // Take the first 2 guides to show as featured
        setResources(list.slice(0, 2));
      } catch (err) {
        console.error("Failed to load featured resources on homepage:", err);
      }
    }
    loadResources();
  }, []);

  return (
    <section className="section-padding" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge badge-amber">Must-Read High Yields</span>
          <h2>Featured UPSC Focus Resources</h2>
          <p>Hand-picked resources, core toppers strategies, and essential files trending among successful candidates this week.</p>
        </motion.div>

        <div className="featured-grid">
          {resources.length > 0 ? (
            resources.map((item, index) => (
              <motion.div 
                key={item.id}
                className={`glass-card featured-card ${index === 1 ? 'accent' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="featured-meta">
                  <span className={`badge ${index === 1 ? 'badge-amber' : 'badge-primary'}`}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    PDF Doc ({item.size})
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>
                  Explore high-yield study materials carefully designed to assist your preparation. Detailed guidelines, diagrams, and syllabus tracking.
                </p>
                <a href="#" className="card-link" aria-label={`Get study guide for ${item.title}`}>
                  Get Document
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-slate-500 font-semibold">
              No featured resources uploaded yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

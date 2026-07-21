'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Info, RotateCcw, Loader2 } from 'lucide-react';
import { getQuizQuestions, type QuizQuestion } from '@/lib/supabase';

interface Question {
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const staticQuizQuestions: Question[] = [
  {
    subject: 'Indian Polity',
    question: 'Which of the following statements best describes the concept of "Basic Structure" of the Constitution of India?',
    options: [
      'It is a doctrine explicitly defined in Article 368 of the Constitution regarding amendments.',
      'It refers to constitutional provisions that can only be amended with a two-thirds majority in Parliament and ratification by all States.',
      'It is a doctrine stating that certain features of the Constitution are fundamental and cannot be altered or destroyed by Parliament.',
      'It refers strictly to the Fundamental Rights enumerated in Part III of the Constitution.'
    ],
    correctAnswer: 2,
    explanation: 'The "Basic Structure" doctrine is a judicial innovation introduced by the Supreme Court in the Kesavananda Bharati judgment (1973). It does not appear in the text of the Constitution, but dictates that Parliament cannot amend the core features (like democracy, rule of law, federalism, judicial review) under Article 368.'
  },
  {
    subject: 'Indian Economy',
    question: 'Which of the following measures by the RBI would help control rising inflation in the economy?',
    options: [
      'Reducing the Cash Reserve Ratio (CRR) and lowering the Repo Rate.',
      'Selling government securities in open market operations and increasing the Bank Rate.',
      'Buying government bonds to pump liquidity and reducing Margin Requirements.',
      'Lending more money to commercial banks under the Marginal Standing Facility.'
    ],
    correctAnswer: 1,
    explanation: 'To control inflation, the RBI seeks to reduce money supply. Selling government securities sucks liquidity out of the banking system. Increasing key policy rates (Bank Rate/Repo Rate) makes credit expensive, thereby slowing down aggregate demand and price growth.'
  },
  {
    subject: 'History & Culture',
    question: 'Regarding the Ryotwari settlement implemented during the British Raj, consider the following statements: (1) Rent was paid directly by peasants, (2) Land revenue assessment was permanent, (3) The government gave pattas to ryots. Which of these are correct?',
    options: [
      '1 and 2 only',
      '2 and 3 only',
      '1 and 3 only',
      '1, 2 and 3'
    ],
    correctAnswer: 2,
    explanation: 'Under the Ryotwari System (introduced by Munro and Reed), the revenue was paid directly by the peasants (Ryots) to the government (Statement 1) and pattas were issued (Statement 3). However, the land assessment was NOT permanent; it was revised periodically (usually every 20-30 years). Thus statement 2 is incorrect.'
  }
];

export default function MockQuiz() {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load questions dynamically on mount
  useEffect(() => {
    async function loadQuiz() {
      try {
        const list = await getQuizQuestions();
        if (list && list.length > 0) {
          setQuizQuestions(list);
        } else {
          // Cast as QuizQuestion[] and load static fallback
          setQuizQuestions(staticQuizQuestions.map((q, idx) => ({ ...q, id: idx })));
        }
      } catch (err) {
        console.error("Failed to load dynamic quiz questions:", err);
        setQuizQuestions(staticQuizQuestions.map((q, idx) => ({ ...q, id: idx })));
      } finally {
        setLoading(false);
      }
    }
    loadQuiz();
  }, []);

  // Timer logic
  useEffect(() => {
    if (!quizFinished) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizFinished, currentIdx]);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionClick = (optIdx: number) => {
    if (answerSubmitted) return;
    setSelectedOpt(optIdx);
  };

  const handleSubmitOrNext = () => {
    if (!answerSubmitted) {
      // Evaluate Answer
      setAnswerSubmitted(true);
      if (selectedOpt === quizQuestions[currentIdx].correctAnswer) {
        setScore((prev) => prev + 1);
      }
    } else {
      // Go to next question or finish
      if (currentIdx < quizQuestions.length - 1) {
        setCurrentIdx((prev) => prev + 1);
        setSelectedOpt(null);
        setAnswerSubmitted(false);
      } else {
        setQuizFinished(true);
      }
    }
  };

  const handleRetry = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setAnswerSubmitted(false);
    setScore(0);
    setSeconds(0);
    setQuizFinished(false);
  };

  const currentQ = quizQuestions[currentIdx];
  const progressPercent = quizQuestions.length > 0 ? ((currentIdx + 1) / quizQuestions.length) * 100 : 0;
  const scoreDeg = quizQuestions.length > 0 ? (score / quizQuestions.length) * 360 : 0;

  // Determine feedback text
  const getResultTitle = () => {
    if (quizQuestions.length === 0) return 'Practice Quiz';
    if (score === quizQuestions.length) return 'Excellent Performance!';
    if (score >= Math.round(quizQuestions.length / 2)) return 'Good Job!';
    return 'Keep Practicing!';
  };

  const getResultSub = () => {
    if (quizQuestions.length === 0) return 'Try practicing core UPSC subjects.';
    if (score === quizQuestions.length) return 'You have a strong grasp of current UPSC core subjects. Continue practicing to keep the momentum.';
    if (score >= Math.round(quizQuestions.length / 2)) return 'Very close! A minor revision of basic principles will help you reach full marks.';
    return 'Syllabus alignment is essential. Read the core notes and syllabus keyword breakdowns to improve.';
  };

  return (
    <section id="mock-test" className="section-padding" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge badge-primary">Interactive Practice</span>
          <h2>Instant UPSC Prelims Mini-Quiz</h2>
          <p>Test your knowledge with 3 exam-standard UPSC multiple choice questions. Receive instant scoring and in-depth explanations.</p>
        </motion.div>

        <div className="glass-card quiz-widget">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              <span className="text-sm font-bold text-slate-400">Loading daily practice quiz...</span>
            </div>
          ) : quizQuestions.length > 0 ? (
            <AnimatePresence mode="wait">
              {!quizFinished ? (
                <motion.div 
                  key={`quiz-active-${currentIdx}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header */}
                  <div className="quiz-header">
                    <div className="quiz-progress-wrapper">
                      <div className="quiz-progress-bar">
                        <div 
                          className="quiz-progress-fill" 
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                      <span className="quiz-step-text">Question {currentIdx + 1} of {quizQuestions.length}</span>
                    </div>
                    <div className="quiz-timer">
                      <Timer className="w-3.5 h-3.5" />
                      Time: <span>{formatTime(seconds)}</span>
                    </div>
                  </div>

                  {/* Question body */}
                  <div className="quiz-body">
                    <div className="quiz-question-tag">
                      <span className="badge badge-primary">{currentQ.subject}</span>
                    </div>
                    <p className="quiz-question-text">{currentQ.question}</p>
                    
                    <div className="quiz-options">
                      {currentQ.options.map((option, oIdx) => {
                        // Styling indicators
                        let optionClass = '';
                        if (answerSubmitted) {
                          if (oIdx === currentQ.correctAnswer) {
                            optionClass = 'correct';
                          } else if (selectedOpt === oIdx) {
                            optionClass = 'incorrect';
                          } else {
                            optionClass = 'disabled';
                          }
                        } else if (selectedOpt === oIdx) {
                          optionClass = 'selected';
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleOptionClick(oIdx)}
                            className={`quiz-option ${optionClass}`}
                            disabled={answerSubmitted}
                          >
                            <span className="quiz-option-letter">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{option}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation Section */}
                    <div className={`quiz-explanation ${answerSubmitted ? 'show' : ''}`}>
                      <div className="explanation-title">
                        <Info className="w-4.5 h-4.5" />
                        Detailed Explanation
                      </div>
                      <p>{currentQ.explanation}</p>
                    </div>
                  </div>

                  {/* Footer action btn */}
                  <div className="quiz-footer">
                    <button 
                      className="btn btn-primary"
                      disabled={selectedOpt === null}
                      onClick={handleSubmitOrNext}
                    >
                      {!answerSubmitted ? 'Submit Answer' : (currentIdx < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz')}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="quiz-results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="quiz-result-card show"
                >
                  <div 
                    className="quiz-result-score-ring"
                    style={{
                      background: `radial-gradient(circle, var(--bg-surface) 60%, transparent 61%), conic-gradient(var(--color-success) ${scoreDeg}deg, rgba(15, 23, 42, 0.06) 0deg)`
                    }}
                  >
                    <div className="quiz-result-score-text">{score}/{quizQuestions.length}</div>
                  </div>
                  <h3>{getResultTitle()}</h3>
                  <p>{getResultSub()}</p>
                  <button 
                    className="btn btn-primary flex items-center gap-2 mx-auto" 
                    onClick={handleRetry}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Try Quiz Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-450 font-semibold text-sm">Practice questions are currently being loaded...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

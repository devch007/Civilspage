'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Info, RotateCcw, Loader2, GraduationCap, BookOpen, Layers, CheckCircle2, Award, FileText } from 'lucide-react';
import { getQuizQuestions, type QuizQuestion } from '@/lib/supabase';

interface Question {
  id?: number | string;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  examType?: string;
}

const staticPrelimsQuestions: Question[] = [
  {
    id: 1,
    subject: 'Indian Polity',
    examType: 'Preliminary Examination',
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
    id: 2,
    subject: 'Indian Economy',
    examType: 'Preliminary Examination',
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
    id: 3,
    subject: 'History & Culture',
    examType: 'Preliminary Examination',
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

const staticMainsQuestions = [
  {
    id: 'm1',
    subject: 'Ethics (GS Paper 4)',
    examType: 'Main Examination',
    question: '"Integrity without knowledge is weak and useless, and knowledge without integrity is dangerous and dreadful." Critically analyze this statement in the context of contemporary civil servants in India.',
    marks: 10,
    words: 150,
    dimensions: [
      'Balance between administrative competence (knowledge) and ethical probity (integrity)',
      'Real-world examples: Technocratic failures vs morally guided governance',
      'Institutional mechanisms promoting both value sets (Code of Conduct, ARC recommendations)'
    ]
  },
  {
    id: 'm2',
    subject: 'Governance & Polity (GS Paper 2)',
    examType: 'Main Examination',
    question: 'Examine the significance of cooperative federalism in India with special reference to the functioning of Inter-State Councils and GST Council in resolving inter-state disputes.',
    marks: 15,
    words: 250,
    dimensions: [
      'Constitutional mandate under Article 263 and Sarkaria/Punchhi Commission directives',
      'Evolving role of GST Council as a model of consensual federal decision-making',
      'Key roadblocks: Fiscal imbalances, asymmetric development, and political friction'
    ]
  }
];

type TabType = 'Preliminary Examination' | 'Main Examination' | 'All';

export default function MockQuiz() {
  const [activeTab, setActiveTab] = useState<TabType>('Preliminary Examination');
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
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
          setQuizQuestions(list.map(q => ({ ...q, examType: (q as any).examType || 'Preliminary Examination' })));
        } else {
          setQuizQuestions(staticPrelimsQuestions);
        }
      } catch (err) {
        console.error("Failed to load dynamic quiz questions:", err);
        setQuizQuestions(staticPrelimsQuestions);
      } finally {
        setLoading(false);
      }
    }
    loadQuiz();
  }, []);

  // Filter questions according to activeTab
  const prelimsList = quizQuestions.filter(q => (q.examType || 'Preliminary Examination') === 'Preliminary Examination');
  const mainsCount = staticMainsQuestions.length;

  const currentActiveList = activeTab === 'Main Examination' ? [] : prelimsList;

  // Timer logic for Prelims
  useEffect(() => {
    if (!quizFinished && activeTab === 'Preliminary Examination') {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizFinished, currentIdx, activeTab]);

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
      setAnswerSubmitted(true);
      if (selectedOpt === currentActiveList[currentIdx]?.correctAnswer) {
        setScore((prev) => prev + 1);
      }
    } else {
      if (currentIdx < currentActiveList.length - 1) {
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

  const currentQ = currentActiveList[currentIdx];
  const progressPercent = currentActiveList.length > 0 ? ((currentIdx + 1) / currentActiveList.length) * 100 : 0;
  const scoreDeg = currentActiveList.length > 0 ? (score / currentActiveList.length) * 360 : 0;

  const getResultTitle = () => {
    if (currentActiveList.length === 0) return 'Practice Quiz';
    if (score === currentActiveList.length) return 'Excellent Performance!';
    if (score >= Math.round(currentActiveList.length / 2)) return 'Good Job!';
    return 'Keep Practicing!';
  };

  const getResultSub = () => {
    if (currentActiveList.length === 0) return 'Try practicing core UPSC subjects.';
    if (score === currentActiveList.length) return 'You have a strong grasp of current UPSC core subjects. Continue practicing to keep the momentum.';
    if (score >= Math.round(currentActiveList.length / 2)) return 'Very close! A minor revision of basic principles will help you reach full marks.';
    return 'Syllabus alignment is essential. Read the core notes and syllabus keyword breakdowns to improve.';
  };

  return (
    <section id="mock-test" className="py-12 sm:py-16 bg-slate-50/50 min-h-screen">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Selection Tabs Above Heading (Matching PYQs Design) */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1.5">
            {/* Preliminary Examination Tab */}
            <button
              onClick={() => { setActiveTab('Preliminary Examination'); handleRetry(); }}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all relative ${
                activeTab === 'Preliminary Examination'
                  ? 'bg-[#0b3b60] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <GraduationCap className={`w-4 h-4 ${activeTab === 'Preliminary Examination' ? 'text-amber-300' : 'text-slate-400'}`} />
              <span>Preliminary Exam</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                activeTab === 'Preliminary Examination' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {prelimsList.length}
              </span>
            </button>

            {/* Main Examination Tab */}
            <button
              onClick={() => setActiveTab('Main Examination')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all relative ${
                activeTab === 'Main Examination'
                  ? 'bg-[#0b3b60] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${activeTab === 'Main Examination' ? 'text-amber-300' : 'text-slate-400'}`} />
              <span>Main Exam</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                activeTab === 'Main Examination' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {mainsCount}
              </span>
            </button>

            {/* All Tests Tab */}
            <button
              onClick={() => setActiveTab('All')}
              className={`py-3 px-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'All'
                  ? 'bg-[#0b3b60] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title="Show all practice tests"
            >
              <Layers className={`w-3.5 h-3.5 ${activeTab === 'All' ? 'text-amber-300' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">All</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                activeTab === 'All' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {prelimsList.length + mainsCount}
              </span>
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span>UPSC Examination Practice</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b3b60] font-serif leading-snug">
            {activeTab === 'Preliminary Examination' && 'UPSC Prelims Interactive Mock Quiz'}
            {activeTab === 'Main Examination' && 'UPSC Mains Mock Answer Writing Practice'}
            {activeTab === 'All' && 'UPSC Comprehensive Mock & Practice Papers'}
          </h1>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 bg-white rounded-2xl border border-slate-100 shadow-xs">
              <Loader2 className="w-8 h-8 text-[#0b3b60] animate-spin" />
              <span className="text-sm font-bold text-slate-500">Loading mock practice questions...</span>
            </div>
          ) : activeTab === 'Main Examination' ? (
            /* Mains Mock Test Questions */
            <div className="space-y-4">
              {staticMainsQuestions.map((q) => (
                <div key={q.id} className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide bg-purple-50 text-purple-700 border border-purple-200/60">
                        {q.examType}
                      </span>
                      <span className="text-[10px] px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-full font-bold">
                        {q.subject}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                      <span>Marks: <strong className="text-slate-800">{q.marks}</strong></span>
                      <span>Word Limit: <strong className="text-slate-800">{q.words} Words</strong></span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-snug mb-4">
                    {q.question}
                  </h3>

                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-4">
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Key Answer Dimensions &amp; Approach Structure:
                    </p>
                    <ul className="space-y-1.5">
                      {q.dimensions.map((dim, dIdx) => (
                        <li key={dIdx} className="text-xs text-slate-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                          <span>{dim}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-xs text-slate-400">Standard UPSC Format</span>
                    <a
                      href="/updates?category=Model Answers"
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <span>Explore Solved Model Answers →</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Prelims Interactive Quiz Widget */
            <div className="glass-card quiz-widget bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
              {currentActiveList.length > 0 ? (
                <AnimatePresence mode="wait">
                  {!quizFinished && currentQ ? (
                    <motion.div 
                      key={`quiz-active-${currentIdx}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Header */}
                      <div className="quiz-header flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                        <div className="quiz-progress-wrapper flex items-center gap-3">
                          <div className="quiz-progress-bar w-32 sm:w-48 bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div 
                              className="quiz-progress-fill bg-[#0b3b60] h-full rounded-full transition-all duration-300" 
                              style={{ width: `${progressPercent}%` }}
                            ></div>
                          </div>
                          <span className="quiz-step-text text-xs font-semibold text-slate-500">Question {currentIdx + 1} of {currentActiveList.length}</span>
                        </div>
                        <div className="quiz-timer flex items-center gap-1.5 text-xs font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">
                          <Timer className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{formatTime(seconds)}</span>
                        </div>
                      </div>

                      {/* Question body */}
                      <div className="quiz-body space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide bg-blue-50 text-blue-700 border border-blue-200/60">
                            {currentQ.examType || 'Preliminary Examination'}
                          </span>
                          <span className="text-[10px] px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-full font-bold">
                            {currentQ.subject}
                          </span>
                        </div>

                        <p className="quiz-question-text text-base sm:text-lg font-bold text-slate-900 font-serif leading-snug">
                          {currentQ.question}
                        </p>
                        
                        <div className="quiz-options space-y-2.5 pt-2">
                          {currentQ.options.map((option, oIdx) => {
                            let optionClass = '';
                            if (answerSubmitted) {
                              if (oIdx === currentQ.correctAnswer) {
                                optionClass = 'correct border-emerald-500 bg-emerald-50 text-emerald-900';
                              } else if (selectedOpt === oIdx) {
                                optionClass = 'incorrect border-red-500 bg-red-50 text-red-900';
                              } else {
                                optionClass = 'disabled opacity-50';
                              }
                            } else if (selectedOpt === oIdx) {
                              optionClass = 'selected border-indigo-600 bg-indigo-50/50 text-indigo-900 shadow-2xs font-semibold';
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleOptionClick(oIdx)}
                                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-all ${
                                  optionClass || 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                                }`}
                                disabled={answerSubmitted}
                              >
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                  selectedOpt === oIdx ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                                }`}>
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span className="pt-0.5 leading-relaxed">{option}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation Section */}
                        {answerSubmitted && currentQ.explanation && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4"
                          >
                            <div className="text-xs font-bold text-[#0b3b60] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                              <Info className="w-4 h-4 text-indigo-600" />
                              Detailed Explanation:
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed font-normal">{currentQ.explanation}</p>
                          </motion.div>
                        )}
                      </div>

                      {/* Footer action btn */}
                      <div className="quiz-footer pt-6 mt-4 border-t border-slate-100 flex justify-end">
                        <button 
                          className="btn btn-primary !py-2.5 !px-6 text-xs sm:text-sm font-semibold rounded-xl bg-[#0b3b60] text-white hover:bg-[#082e4e] disabled:opacity-50 transition-colors"
                          disabled={selectedOpt === null}
                          onClick={handleSubmitOrNext}
                        >
                          {!answerSubmitted ? 'Submit Answer' : (currentIdx < currentActiveList.length - 1 ? 'Next Question →' : 'Finish Quiz ✓')}
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="quiz-results"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <div 
                        className="w-24 h-24 rounded-full mx-auto flex items-center justify-center font-black text-2xl text-[#0b3b60] border-4 border-indigo-600 mb-4 shadow-sm"
                      >
                        {score}/{currentActiveList.length}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif leading-snug">{getResultTitle()}</h3>
                      <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">{getResultSub()}</p>
                      <button 
                        className="btn btn-primary flex items-center gap-2 mx-auto mt-6 bg-[#0b3b60] text-white hover:bg-[#082e4e] rounded-xl px-5 py-2.5 text-xs font-bold" 
                        onClick={handleRetry}
                      >
                        <RotateCcw className="w-4 h-4" />
                        Try Quiz Again
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                <div className="text-center py-16">
                  <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h4 className="text-lg font-bold font-serif text-[#0b3b60]">No questions available for this category.</h4>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  FileText, 
  Newspaper, 
  FileSpreadsheet, 
  BookOpen, 
  HelpCircle, 
  Users, 
  CreditCard, 
  Settings as SettingsIcon, 
  Search, 
  Plus, 
  Trash2, 
  Check, 
  MessageSquare,
  ArrowUpRight,
  TrendingUp,
  Layout,
  Menu,
  X,
  Upload,
  Loader2,
  Lock,
  BrainCircuit
} from 'lucide-react';
import {
  getBlogs,
  addBlog,
  deleteBlog,
  getAffairs,
  addAffair,
  deleteAffair,
  getNotes,
  addNote,
  getCourses,
  getPyqs,
  addPyq,
  deletePyq,
  getQuizQuestions,
  addQuizQuestion,
  deleteQuizQuestion,
  getDirectQueries,
  replyDirectQuery,
  getOrders,
  isMockMode,
  type Blog,
  type Affair,
  type Note,
  type Course,
  type Pyq,
  type QuizQuestion,
  type DirectQuery,
  type Order
} from '@/lib/supabase';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<string>('analytics');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  // Authentication States
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  // Core Data States
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [affairs, setAffairs] = useState<Affair[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [pyqs, setPyqs] = useState<Pyq[]>([]);
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>([]);
  const [students, setStudents] = useState<DirectQuery[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState({
    portalName: 'CivilsPage UPSC Academy',
    supportEmail: 'rajivranjansingh@civilspage.com',
    paymentStatus: 'Enabled',
    maintenanceMode: 'Disabled',
  });

  // Form States
  const [newBlog, setNewBlog] = useState({ title: '', category: '', author: 'Rajiv Ranjan Singh' });
  const [newAffair, setNewAffair] = useState({ title: '', category: '', summary: '', imageUrl: '' });
  
  // Note Form & Cloudflare R2 Upload States
  const [newNote, setNewNote] = useState({ title: '', category: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  const [newPyq, setNewPyq] = useState({ subject: 'polity', subjectLabel: 'Polity', year: '2025', question: '' });
  const [newQuiz, setNewQuiz] = useState({
    subject: 'Indian Polity',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: ''
  });
  const [activeQueryStudent, setActiveQueryStudent] = useState<DirectQuery | null>(null);
  const [replyText, setReplyText] = useState('');

  // ==========================================================================
  // INITIAL DATA LOADER (SUPABASE QUERY)
  // ==========================================================================

  useEffect(() => {
    async function checkAuthAndLoad() {
      setAuthChecking(true);
      try {
        const authRes = await fetch('/api/admin/check-auth');
        const authData = await authRes.json();
        
        if (authData.authenticated) {
          setIsAuthenticated(true);
          setLoadingData(true);
          const [blogsList, affairsList, notesList, coursesList, pyqsList, studentsList, ordersList, quizzesList] = await Promise.all([
            getBlogs(),
            getAffairs(),
            getNotes(),
            getCourses(),
            getPyqs(),
            getDirectQueries(),
            getOrders(),
            getQuizQuestions()
          ]);
          setBlogs(blogsList);
          setAffairs(affairsList);
          setNotes(notesList);
          setCourses(coursesList);
          setPyqs(pyqsList);
          setStudents(studentsList);
          setOrders(ordersList);
          setQuizzes(quizzesList);
          setLoadingData(false);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Authentication/Loading error:", err);
      } finally {
        setAuthChecking(false);
      }
    }
    checkAuthAndLoad();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;
    setLoginLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setLoadingData(true);
        const [blogsList, affairsList, notesList, coursesList, pyqsList, studentsList, ordersList, quizzesList] = await Promise.all([
          getBlogs(),
          getAffairs(),
          getNotes(),
          getCourses(),
          getPyqs(),
          getDirectQueries(),
          getOrders(),
          getQuizQuestions()
        ]);
        setBlogs(blogsList);
        setAffairs(affairsList);
        setNotes(notesList);
        setCourses(coursesList);
        setPyqs(pyqsList);
        setStudents(studentsList);
        setOrders(ordersList);
        setQuizzes(quizzesList);
        setLoadingData(false);
      } else {
        setAuthError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error("Login request failed:", err);
      setAuthError('Failed to connect to the authentication server');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to log out?")) return;
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(false);
        setBlogs([]);
        setAffairs([]);
        setNotes([]);
        setCourses([]);
        setPyqs([]);
        setStudents([]);
        setOrders([]);
        setQuizzes([]);
      }
    } catch (err) {
      console.error("Logout request failed:", err);
    }
  };

  // ==========================================================================
  // ACTION HANDLERS (SUPABASE CRUD & R2 UPLOADS)
  // ==========================================================================

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.category) return;
    try {
      const blogObj = await addBlog({
        title: newBlog.title,
        author: newBlog.author,
        category: newBlog.category,
        date: new Date().toISOString().split('T')[0]
      });
      setBlogs([blogObj, ...blogs]);
      setNewBlog({ title: '', category: '', author: 'Rajiv Ranjan Singh' });
    } catch (err) {
      alert("Failed to publish blog. See console for details.");
      console.error(err);
    }
  };

  const handleDeleteBlog = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (err) {
      alert("Failed to delete blog.");
      console.error(err);
    }
  };

  const handleDeleteAffair = async (id: number) => {
    if (!confirm("Are you sure you want to delete this update brief?")) return;
    try {
      await deleteAffair(id);
      setAffairs(affairs.filter(a => a.id !== id));
    } catch (err) {
      alert("Failed to delete update brief.");
      console.error(err);
    }
  };

  const handleAddAffair = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAffair.title || !newAffair.summary) return;
    try {
      const affairObj = await addAffair({
        date: new Date().toISOString().split('T')[0],
        title: newAffair.title,
        category: newAffair.category || 'General',
        summary: newAffair.summary,
        imageUrl: newAffair.imageUrl || undefined
      });
      setAffairs([affairObj, ...affairs]);
      setNewAffair({ title: '', category: '', summary: '', imageUrl: '' });
    } catch (err) {
      alert("Failed to save current affair.");
      console.error(err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.title || !newNote.category) return;

    let sizeLabel = '3.5 MB';
    let fileUrl = '';

    // If file is selected, upload to Cloudflare R2 first
    if (selectedFile) {
      setUploadingFile(true);
      const fd = new FormData();
      fd.append('file', selectedFile);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: fd
        });
        const uploadResult = await response.json();
        if (uploadResult.success) {
          sizeLabel = uploadResult.size;
          fileUrl = uploadResult.url;
        } else {
          throw new Error(uploadResult.error || 'R2 upload failure');
        }
      } catch (err) {
        console.error("Cloudflare R2 upload error:", err);
        alert("R2 file upload failed. Reverting to stub size.");
      } finally {
        setUploadingFile(false);
      }
    }

    try {
      const noteObj = await addNote({
        title: newNote.title,
        category: newNote.category,
        size: sizeLabel
      });
      setNotes([noteObj, ...notes]);
      setNewNote({ title: '', category: '' });
      setSelectedFile(null);
    } catch (err) {
      alert("Failed to add study guide note.");
      console.error(err);
    }
  };

  const handleAddPyq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPyq.question) return;
    const subLabelMap: { [key: string]: string } = {
      polity: 'Polity & Governance',
      history: 'History & Culture',
      economy: 'Economy',
      geography: 'Geography',
      environment: 'Environment & Ecology'
    };
    try {
      const pyqObj = await addPyq({
        subject: newPyq.subject,
        subjectLabel: subLabelMap[newPyq.subject] || 'Polity',
        year: newPyq.year,
        question: newPyq.question
      });
      setPyqs([pyqObj, ...pyqs]);
      setNewPyq({ subject: 'polity', subjectLabel: 'Polity', year: '2025', question: '' });
    } catch (err) {
      alert("Failed to add solved PYQ.");
      console.error(err);
    }
  };

  const handleDeletePyq = async (id: number) => {
    if (!confirm("Are you sure you want to delete this PYQ?")) return;
    try {
      await deletePyq(id);
      setPyqs(pyqs.filter(pq => pq.id !== id));
    } catch (err) {
      alert("Failed to delete PYQ.");
      console.error(err);
    }
  };

  const handleAddQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuiz.question || newQuiz.options.some(o => !o) || !newQuiz.explanation) {
      alert("Please fill in all options, the question, and the explanation.");
      return;
    }
    try {
      const quizObj = await addQuizQuestion({
        subject: newQuiz.subject,
        question: newQuiz.question,
        options: newQuiz.options,
        correctAnswer: Number(newQuiz.correctAnswer),
        explanation: newQuiz.explanation
      });
      setQuizzes([...quizzes, quizObj]);
      setNewQuiz({
        subject: 'Indian Polity',
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
      });
    } catch (err) {
      alert("Failed to add quiz question.");
      console.error(err);
    }
  };

  const handleDeleteQuiz = async (id: number) => {
    if (!confirm("Are you sure you want to delete this quiz question?")) return;
    try {
      await deleteQuizQuestion(id);
      setQuizzes(quizzes.filter(q => q.id !== id));
    } catch (err) {
      alert("Failed to delete quiz question.");
      console.error(err);
    }
  };


  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeQueryStudent || !replyText) return;
    
    try {
      await replyDirectQuery(activeQueryStudent.id, replyText);
      setStudents(students.map(s => {
        if (s.id === activeQueryStudent.id) {
          return { ...s, queryStatus: 'Resolved', replyMessage: replyText };
        }
        return s;
      }));
      setReplyText('');
      setActiveQueryStudent(null);
    } catch (err) {
      alert("Failed to submit reply.");
      console.error(err);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Settings successfully updated!');
  };

  if (authChecking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0F172A] text-white gap-3">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <span className="text-sm font-bold text-slate-400">Verifying session credentials...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0F172A] px-4 font-body">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 space-y-6 relative overflow-hidden text-slate-200">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-indigo-500/10 rounded-xl text-indigo-500 mb-2">
              <Lock className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">CivilsPage Admin Portal</h2>
            <p className="text-xs text-slate-400">Please enter your educator credentials to access the console</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/25 rounded-xl text-rose-400 text-xs font-semibold leading-relaxed">
                {authError}
              </div>
            )}

            <div className="form-group space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl text-white text-sm focus:border-indigo-500 focus:outline-none transition-all placeholder-slate-650"
                placeholder="educator@civilspage.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl text-white text-sm focus:border-indigo-500 focus:outline-none transition-all placeholder-slate-650"
                placeholder="••••••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              disabled={loginLoading}
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-slate-400 hover:text-indigo-400 transition-colors font-medium">
              &larr; Return to CivilsPage Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Sidebar Panel */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between">
          <Link href="/" className="admin-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--color-primary)"/>
              <path d="M2 17L12 22L22 17" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>CivilsPage</span>
          </Link>
          <button className="lg:hidden p-1 text-slate-500" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {isMockMode && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 font-semibold">
            ⚡ Running in Safe Mock Mode (localStorage persistence active)
          </div>
        )}

        <nav className="admin-nav">
          <button 
            className={`admin-nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => { setActiveTab('analytics'); setSidebarOpen(false); }}
          >
            <BarChart3 className="w-4.5 h-4.5" />
            <span>Analytics</span>
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'blogs' ? 'active' : ''}`}
            onClick={() => { setActiveTab('blogs'); setSidebarOpen(false); }}
          >
            <FileText className="w-4.5 h-4.5" />
            <span>Blogs</span>
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'affairs' ? 'active' : ''}`}
            onClick={() => { setActiveTab('affairs'); setSidebarOpen(false); }}
          >
            <Newspaper className="w-4.5 h-4.5" />
            <span>Subject & Current Updates</span>
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => { setActiveTab('notes'); setSidebarOpen(false); }}
          >
            <FileSpreadsheet className="w-4.5 h-4.5" />
            <span>Notes</span>
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => { setActiveTab('courses'); setSidebarOpen(false); }}
          >
            <BookOpen className="w-4.5 h-4.5" />
            <span>Courses</span>
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'pyqs' ? 'active' : ''}`}
            onClick={() => { setActiveTab('pyqs'); setSidebarOpen(false); }}
          >
            <HelpCircle className="w-4.5 h-4.5" />
            <span>PYQs</span>
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'quizzes' ? 'active' : ''}`}
            onClick={() => { setActiveTab('quizzes'); setSidebarOpen(false); }}
          >
            <BrainCircuit className="w-4.5 h-4.5" />
            <span>Mock Quizzes</span>
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => { setActiveTab('students'); setSidebarOpen(false); }}
          >
            <Users className="w-4.5 h-4.5" />
            <span>Students</span>
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => { setActiveTab('orders'); setSidebarOpen(false); }}
          >
            <CreditCard className="w-4.5 h-4.5" />
            <span>Orders</span>
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
          >
            <SettingsIcon className="w-4.5 h-4.5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100 space-y-2">
          <Link href="/" className="admin-nav-item">
            <Layout className="w-4.5 h-4.5" />
            <span>View Site Home</span>
          </Link>
          <button 
            onClick={handleLogout} 
            className="admin-nav-item w-full text-left text-red-600 hover:bg-red-50 hover:text-red-750 flex items-center gap-2 border-0 bg-transparent font-medium cursor-pointer"
          >
            <Lock className="w-4.5 h-4.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-content">
        <header className="admin-topbar">
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden p-2 border border-slate-200 rounded-md bg-white text-slate-600"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="admin-search-wrapper">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" className="admin-search-input" placeholder="Search parameters..." />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="block text-sm font-bold text-slate-900">Dr. Rajiv Ranjan</span>
              <span className="block text-xs text-slate-500 font-medium">Head Administrator</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              RR
            </div>
          </div>
        </header>

        {loadingData ? (
          <div className="flex flex-col items-center justify-center flex-grow py-20 gap-3">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <span className="text-sm font-bold text-slate-500">Querying Supabase database tables...</span>
          </div>
        ) : (
          <main className="admin-body">
            
            {/* ==========================================================================
               ANALYTICS TAB
               ========================================================================== */}
            {activeTab === 'analytics' && (
              <div>
                <div className="admin-stats-grid">
                  <div className="admin-stat-card">
                    <div className="admin-stat-info">
                      <h4>Total Page Views</h4>
                      <p>84,230</p>
                      <span className="admin-stat-trend up flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" /> +12.4% this week
                      </span>
                    </div>
                    <div className="admin-stat-icon bg-indigo-50 text-indigo-600">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="admin-stat-card">
                    <div className="admin-stat-info">
                      <h4>Active Candidates</h4>
                      <p>{students.length + 300}</p>
                      <span className="admin-stat-trend up flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" /> +4.2% this week
                      </span>
                    </div>
                    <div className="admin-stat-icon bg-emerald-50 text-emerald-600">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="admin-stat-card">
                    <div className="admin-stat-info">
                      <h4>Solved PYQ Cards</h4>
                      <p>{pyqs.length}</p>
                      <span className="admin-stat-trend up flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" /> +20 items added
                      </span>
                    </div>
                    <div className="admin-stat-icon bg-amber-50 text-amber-600">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="admin-stat-card">
                    <div className="admin-stat-info">
                      <h4>Monthly Sales</h4>
                      <p>₹65,000</p>
                      <span className="admin-stat-trend up flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" /> +8.3% target
                      </span>
                    </div>
                    <div className="admin-stat-icon bg-rose-50 text-rose-600">
                      <CreditCard className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="admin-charts-grid">
                  <div className="admin-card">
                    <div className="admin-card-header">
                      <h3 className="admin-card-title">Weekly Portal Traffic (Views)</h3>
                      <span className="text-xs font-semibold text-slate-500">July 13 - 19</span>
                    </div>
                    
                    <div className="relative h-64 w-full flex items-end">
                      <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                        <line x1="0" y1="50" x2="500" y2="50" stroke="#F1F5F9" strokeWidth="1" />
                        <line x1="0" y1="100" x2="500" y2="100" stroke="#F1F5F9" strokeWidth="1" />
                        <line x1="0" y1="150" x2="500" y2="150" stroke="#F1F5F9" strokeWidth="1" />
                        
                        <path 
                          d="M0 160 Q 80 120, 160 140 T 320 80 T 420 50 T 500 60" 
                          fill="none" 
                          stroke="var(--color-primary)" 
                          strokeWidth="3.5"
                        />
                        
                        <path 
                          d="M0 160 Q 80 120, 160 140 T 320 80 T 420 50 T 500 60 L 500 200 L 0 200 Z" 
                          fill="rgba(79, 70, 229, 0.05)" 
                        />
                      </svg>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-500 mt-4 px-2">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>

                  <div className="admin-card">
                    <div className="admin-card-header">
                      <h3 className="admin-card-title">Course Sales Distribution</h3>
                    </div>

                    <div className="h-64 w-full flex items-end justify-around gap-4 px-4 pt-6">
                      <div className="flex flex-col items-center gap-2 h-full justify-end w-full">
                        <div className="w-8 bg-indigo-500 rounded-t-md hover:opacity-90 transition-all" style={{ height: '70%' }}></div>
                        <span className="text-xs font-bold text-slate-500">IAS 27</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 h-full justify-end w-full">
                        <div className="w-8 bg-emerald-500 rounded-t-md hover:opacity-90 transition-all" style={{ height: '45%' }}></div>
                        <span className="text-xs font-bold text-slate-500">Ethics</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 h-full justify-end w-full">
                        <div className="w-8 bg-amber-500 rounded-t-md hover:opacity-90 transition-all" style={{ height: '30%' }}></div>
                        <span className="text-xs font-bold text-slate-500">CSAT</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Pending Student Direct Queries</h3>
                    <Link href="#students" onClick={() => setActiveTab('students')} className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                      Manage Queries <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Candidate Name</th>
                          <th>Email</th>
                          <th>Query Topic Summary</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.filter(s => s.queryStatus === 'Pending').map(st => (
                          <tr key={st.id}>
                            <td className="font-bold text-slate-900">{st.name}</td>
                            <td>{st.email}</td>
                            <td>{st.message}</td>
                            <td>
                              <span className="admin-badge admin-badge-warning">Pending Review</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================================================
               BLOGS TAB
               ========================================================================== */}
            {activeTab === 'blogs' && (
              <div className="space-y-8">
                <div className="admin-grid-2">
                  <div className="admin-card">
                    <div className="admin-card-header">
                      <h3 className="admin-card-title">Published Blog Articles</h3>
                    </div>
                    <div className="admin-table-wrapper">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Views</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {blogs.map(blog => (
                            <tr key={blog.id}>
                              <td className="font-semibold text-slate-900">{blog.title}</td>
                              <td><span className="admin-badge admin-badge-info">{blog.category}</span></td>
                              <td>{blog.views}</td>
                              <td>
                                <button className="text-rose-600 hover:text-rose-800 p-1" onClick={() => handleDeleteBlog(blog.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="admin-card">
                    <div className="admin-card-header">
                      <h3 className="admin-card-title">Compose New Blog Article</h3>
                    </div>
                    <form onSubmit={handleAddBlog} className="space-y-4">
                      <div className="form-group">
                        <label className="form-label">Article Title</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Mains GS Paper 3 Answer Strategy"
                          value={newBlog.title}
                          onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Category</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Polity, History, Economy"
                          value={newBlog.category}
                          onChange={(e) => setNewBlog({...newBlog, category: e.target.value})}
                          required
                        />
                      </div>
                      <button type="submit" className="admin-btn admin-btn-primary w-full gap-2">
                        <Plus className="w-4.5 h-4.5" />
                        Publish Article
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================================================
               CURRENT AFFAIRS TAB
               ========================================================================== */}
            {activeTab === 'affairs' && (
              <div className="admin-grid-2">
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Recent High-Yield Updates</h3>
                  </div>
                  <div className="space-y-4">
                    {affairs.map(af => (
                      <div key={af.id} className="p-4 border border-slate-100 rounded-lg hover:border-slate-200 transition-all bg-white">
                        <div className="flex justify-between items-center mb-2">
                          <span className="admin-badge admin-badge-info">{af.category}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 font-bold">{af.date}</span>
                            <button 
                              onClick={() => handleDeleteAffair(af.id)} 
                              className="text-red-500 hover:text-red-700 transition-colors p-1"
                              title="Delete update"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <h4 className="font-bold text-slate-900 mb-1">{af.title}</h4>
                        <p className="text-sm text-slate-500">{af.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Publish Daily Current Affair</h3>
                  </div>
                  <form onSubmit={handleAddAffair} className="space-y-4">
                    <div className="form-group">
                      <label className="form-label">Headline Title</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. India-UK Bilateral Trade Agreement Signs"
                        value={newAffair.title}
                        onChange={(e) => setNewAffair({...newAffair, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Syllabus Category</label>
                      <select 
                        className="form-input text-slate-800 bg-white" 
                        value={newAffair.category}
                        onChange={(e) => setNewAffair({...newAffair, category: e.target.value})}
                        required
                      >
                        <option value="">-- Select Subject/Category --</option>
                        <option value="Polity">Polity & Governance</option>
                        <option value="Ethics">Ethics, Integrity & Aptitude</option>
                        <option value="Economy">Economy</option>
                        <option value="International Relations">International Relations</option>
                        <option value="Science & Technology">Science & Technology</option>
                        <option value="General">General Current Updates</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Cover Image URL (Optional)</label>
                      <input 
                        type="url" 
                        className="form-input" 
                        placeholder="https://images.unsplash.com/... or blank"
                        value={newAffair.imageUrl}
                        onChange={(e) => setNewAffair({...newAffair, imageUrl: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Summary Brief</label>
                      <textarea 
                        className="form-textarea" 
                        placeholder="High-yield points, keywords, and syllabus references..."
                        value={newAffair.summary}
                        onChange={(e) => setNewAffair({...newAffair, summary: e.target.value})}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="admin-btn admin-btn-primary w-full gap-2">
                      <Plus className="w-4.5 h-4.5" />
                      Publish Brief
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ==========================================================================
               NOTES TAB (WITH CLOUDFLARE R2 FILE UPLOAD)
               ========================================================================== */}
            {activeTab === 'notes' && (
              <div className="admin-grid-2">
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Study Guides Directory</h3>
                  </div>
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Size</th>
                          <th>Downloads</th>
                        </tr>
                      </thead>
                      <tbody>
                        {notes.map(note => (
                          <tr key={note.id}>
                            <td className="font-semibold text-slate-900">{note.title}</td>
                            <td>{note.size}</td>
                            <td>{note.downloads}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Upload New Study Guide</h3>
                  </div>
                  <form onSubmit={handleAddNote} className="space-y-4">
                    <div className="form-group">
                      <label className="form-label">Guide Title</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Laxmikanth Chapter 5 Polity Notes"
                        value={newNote.title}
                        onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Paper Category</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. GS Paper I, Prelims Sheets"
                        value={newNote.category}
                        onChange={(e) => setNewNote({...newNote, category: e.target.value})}
                        required
                      />
                    </div>
                    
                    {/* Cloudflare R2 file drag and drop input */}
                    <div className="form-group">
                      <label className="form-label">PDF File Document (Uploads to Cloudflare R2)</label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 text-slate-400 mb-2" />
                            <p className="text-xs text-slate-500 font-semibold mb-1">
                              {selectedFile ? selectedFile.name : 'Click to select study PDF guide'}
                            </p>
                            <p className="text-[10px] text-slate-400">PDF, DOCX, or ZIP (max 20MB)</p>
                          </div>
                          <input type="file" className="hidden" accept=".pdf,.docx,.zip" onChange={handleFileChange} />
                        </label>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="admin-btn admin-btn-primary w-full gap-2"
                      disabled={uploadingFile}
                    >
                      {uploadingFile ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Uploading to R2...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4.5 h-4.5" />
                          Add Note PDF
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ==========================================================================
               COURSES TAB
               ========================================================================== */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Active Academic Programs</h3>
                  </div>
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Program Title</th>
                          <th>Pricing Scale</th>
                          <th>Enrolled Students</th>
                          <th>Seating Capacity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map(course => (
                          <tr key={course.id}>
                            <td className="font-bold text-slate-900">{course.title}</td>
                            <td className="text-indigo-600 font-bold">{course.price}</td>
                            <td>{course.enrolled} candidates</td>
                            <td>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{course.limit} limit</span>
                                <span className="text-xs text-slate-400">({Math.round((course.enrolled/course.limit)*100)}% full)</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================================================
               PYQS TAB
               ========================================================================== */}
            {activeTab === 'pyqs' && (
              <div className="admin-grid-2">
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Solved Question Directory</h3>
                  </div>
                  <div className="space-y-4">
                    {pyqs.map(pq => (
                      <div key={pq.id} className="p-4 border border-slate-100 rounded-lg hover:border-slate-200 transition-all bg-white flex justify-between items-start">
                        <div className="space-y-2 flex-1">
                          <div className="flex gap-2">
                            <span className="admin-badge admin-badge-info">{pq.subjectLabel}</span>
                            <span className="admin-badge admin-badge-warning">UPSC {pq.year}</span>
                          </div>
                          <p className="text-sm font-bold text-slate-900 leading-snug">{pq.question}</p>
                        </div>
                        <button 
                          onClick={() => handleDeletePyq(pq.id)} 
                          className="text-red-500 hover:text-red-700 transition-colors p-1 ml-2"
                          title="Delete PYQ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Add Solved UPSC Question</h3>
                  </div>
                  <form onSubmit={handleAddPyq} className="space-y-4">
                    <div className="form-group">
                      <label className="form-label">Core Subject</label>
                      <select 
                        className="calc-select w-full"
                        value={newPyq.subject}
                        onChange={(e) => setNewPyq({...newPyq, subject: e.target.value})}
                      >
                        <option value="polity">Polity & Governance</option>
                        <option value="history">History & Culture</option>
                        <option value="economy">Economy</option>
                        <option value="geography">Geography</option>
                        <option value="environment">Environment & Ecology</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Exam Year</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. 2025"
                        value={newPyq.year}
                        onChange={(e) => setNewPyq({...newPyq, year: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Question Text Description</label>
                      <textarea 
                        className="form-textarea" 
                        placeholder="Regarding structural checks and balance of Constitutional bodies..."
                        value={newPyq.question}
                        onChange={(e) => setNewPyq({...newPyq, question: e.target.value})}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="admin-btn admin-btn-primary w-full gap-2">
                      <Plus className="w-4.5 h-4.5" />
                      Add Solved PYQ Card
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ==========================================================================
               MOCK QUIZZES TAB
               ========================================================================== */}
            {activeTab === 'quizzes' && (
              <div className="admin-grid-2">
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Practice Quiz Directory</h3>
                  </div>
                  <div className="space-y-4">
                    {quizzes.map(qz => (
                      <div key={qz.id} className="p-4 border border-slate-100 rounded-lg hover:border-slate-200 transition-all bg-white flex justify-between items-start">
                        <div className="space-y-2 flex-1">
                          <div className="flex gap-2">
                            <span className="admin-badge admin-badge-info">{qz.subject}</span>
                            <span className="admin-badge admin-badge-success">Correct Option: {String.fromCharCode(65 + qz.correctAnswer)}</span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm leading-snug">{qz.question}</h4>
                          <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1 my-2">
                            {qz.options.map((opt, oIdx) => (
                              <li key={oIdx} className={oIdx === qz.correctAnswer ? "font-bold text-emerald-600" : ""}>
                                Option {String.fromCharCode(65 + oIdx)}: {opt}
                              </li>
                            ))}
                          </ul>
                          <div className="bg-slate-50 p-2.5 rounded border border-slate-100 text-xs text-slate-550 italic">
                            <strong>Explanation:</strong> {qz.explanation}
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDeleteQuiz(qz.id)} 
                          className="text-red-500 hover:text-red-700 transition-colors p-1 ml-2"
                          title="Delete Quiz Question"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Publish Practice Question</h3>
                  </div>
                  <form onSubmit={handleAddQuiz} className="space-y-4">
                    <div className="form-group">
                      <label className="form-label">Subject Domain</label>
                      <select 
                        className="calc-select w-full text-slate-800 bg-white"
                        value={newQuiz.subject}
                        onChange={(e) => setNewQuiz({...newQuiz, subject: e.target.value})}
                        required
                      >
                        <option value="Indian Polity">Indian Polity</option>
                        <option value="Indian Economy">Indian Economy</option>
                        <option value="History & Culture">History & Culture</option>
                        <option value="Geography">Geography</option>
                        <option value="Environment & Ecology">Environment & Ecology</option>
                        <option value="Science & Technology">Science & Technology</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Question Text</label>
                      <textarea 
                        className="form-textarea" 
                        placeholder="UPSC style conceptual question..."
                        value={newQuiz.question}
                        onChange={(e) => setNewQuiz({...newQuiz, question: e.target.value})}
                        required
                      ></textarea>
                    </div>
                    
                    <div className="space-y-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Question Options</span>
                      {newQuiz.options.map((opt, oIdx) => (
                        <div key={oIdx} className="flex gap-2 items-center">
                          <span className="text-sm font-bold text-slate-400 shrink-0 w-16 text-left">Option {String.fromCharCode(65 + oIdx)}</span>
                          <input 
                            type="text" 
                            className="form-input flex-1" 
                            placeholder={`Text for option ${String.fromCharCode(65 + oIdx)}`}
                            value={opt}
                            onChange={(e) => {
                              const opts = [...newQuiz.options];
                              opts[oIdx] = e.target.value;
                              setNewQuiz({...newQuiz, options: opts});
                            }}
                            required
                          />
                        </div>
                      ))}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Correct Answer Option</label>
                      <select 
                        className="calc-select w-full text-slate-800 bg-white"
                        value={newQuiz.correctAnswer}
                        onChange={(e) => setNewQuiz({...newQuiz, correctAnswer: Number(e.target.value)})}
                        required
                      >
                        <option value={0}>Option A</option>
                        <option value={1}>Option B</option>
                        <option value={2}>Option C</option>
                        <option value={3}>Option D</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Detailed Solution Explanation</label>
                      <textarea 
                        className="form-textarea" 
                        placeholder="Detailed academic reference logic..."
                        value={newQuiz.explanation}
                        onChange={(e) => setNewQuiz({...newQuiz, explanation: e.target.value})}
                        required
                      ></textarea>
                    </div>
                    
                    <button type="submit" className="admin-btn admin-btn-primary w-full gap-2">
                      <Plus className="w-4.5 h-4.5" />
                      Publish Quiz Question
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ==========================================================================
               STUDENTS TAB
               ========================================================================== */}
            {activeTab === 'students' && (
              <div className="space-y-8">
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Active Candidate Database</h3>
                  </div>
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Student Name</th>
                          <th>Email ID</th>
                          <th>Doubt Topic Summary</th>
                          <th>Direct Inquiry Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map(st => (
                          <tr key={st.id}>
                            <td className="font-bold text-slate-900">{st.name}</td>
                            <td>{st.email}</td>
                            <td className="font-semibold text-slate-600">{st.subject}</td>
                            <td>
                              <span className={`admin-badge ${st.queryStatus === 'Resolved' ? 'admin-badge-success' : 'admin-badge-warning'}`}>
                                {st.queryStatus}
                              </span>
                            </td>
                            <td>
                              {st.queryStatus === 'Pending' ? (
                                <button 
                                  className="admin-btn admin-btn-primary !py-1.5 !px-3 !min-h-[30px] flex items-center gap-1.5 text-xs"
                                  onClick={() => setActiveQueryStudent(st)}
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  Reply
                                </button>
                              ) : (
                                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5" /> Replied
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {activeQueryStudent && (
                  <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[1100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                        <h4 className="font-bold text-slate-900 text-lg">Reply to {activeQueryStudent.name}</h4>
                        <button className="text-slate-400 hover:text-slate-600" onClick={() => setActiveQueryStudent(null)}>
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Student Doubt Description:</span>
                        <p className="p-3 bg-slate-50 rounded-lg text-sm text-slate-700 italic border border-slate-100">
                          &ldquo;{activeQueryStudent.message}&rdquo;
                        </p>
                      </div>

                      <form onSubmit={handleSendReply} className="space-y-4">
                        <div className="form-group">
                          <label className="form-label">Write Response Email</label>
                          <textarea
                            className="form-textarea !min-h-[120px]"
                            placeholder="Dear Student, regarding your answer writing question, Rajiv Ranjan Sir suggests..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            required
                          ></textarea>
                        </div>
                        <div className="flex gap-3">
                          <button type="submit" className="admin-btn admin-btn-primary flex-grow">
                            Send Response
                          </button>
                          <button 
                            type="button" 
                            className="admin-btn admin-btn-secondary"
                            onClick={() => setActiveQueryStudent(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ==========================================================================
               ORDERS TAB
               ========================================================================== */}
            {activeTab === 'orders' && (
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3 className="admin-card-title">Commercial Purchase Invoices</h3>
                </div>
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Txn ID</th>
                        <th>Student Name</th>
                        <th>Purchased Program</th>
                        <th>Billing Fee</th>
                        <th>Transaction Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td className="font-bold text-slate-900">{order.id}</td>
                          <td className="font-semibold">{order.student}</td>
                          <td className="text-slate-500 font-medium">{order.course}</td>
                          <td className="font-bold text-indigo-600">{order.amount}</td>
                          <td>{order.date}</td>
                          <td>
                            <span className="admin-badge admin-badge-success">{order.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ==========================================================================
               SETTINGS TAB
               ========================================================================== */}
            {activeTab === 'settings' && (
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3 className="admin-card-title">Platform & Integration Settings</h3>
                </div>
                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Portal Brand Name</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={settings.portalName}
                        onChange={(e) => setSettings({...settings, portalName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Support Email Address</label>
                      <input 
                        type="email" 
                        className="form-input" 
                        value={settings.supportEmail}
                        onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Payment Gateway Status</label>
                      <select 
                        className="calc-select w-full"
                        value={settings.paymentStatus}
                        onChange={(e) => setSettings({...settings, paymentStatus: e.target.value})}
                      >
                        <option value="Enabled">Enabled (Live)</option>
                        <option value="Disabled">Disabled (Test Mode)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Maintenance Mode</label>
                      <select 
                        className="calc-select w-full"
                        value={settings.maintenanceMode}
                        onChange={(e) => setSettings({...settings, maintenanceMode: e.target.value})}
                      >
                        <option value="Enabled">Enabled</option>
                        <option value="Disabled">Disabled</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="admin-btn admin-btn-primary gap-2 min-h-[48px]">
                    Save Configuration
                  </button>
                </form>
              </div>
            )}

          </main>
        )}
      </div>
    </div>
  );
}

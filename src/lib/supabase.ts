import { createClient } from '@supabase/supabase-js';

// Fallback to placeholder values during build-time compilation to prevent pre-rendering crashes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key-string';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to determine if we are in mock fallback mode
export const isMockMode = 
  supabaseUrl.includes('placeholder-project-url') || 
  supabaseAnonKey.includes('placeholder-anon-key');

// ==========================================================================
// TYPE INTERFACES
// ==========================================================================

export interface Blog {
  id: number;
  title: string;
  author: string;
  category: string;
  views: number;
  date: string;
}

export interface Affair {
  id: number;
  date: string;
  title: string;
  category: string;
  summary: string;
  imageUrl?: string;
}

export interface Note {
  id: number;
  title: string;
  category: string;
  size: string;
  downloads: number;
}

export interface Course {
  id: number;
  title: string;
  price: string;
  enrolled: number;
  limit: number;
}

export interface Pyq {
  id: number;
  subject: string;
  subjectLabel: string;
  year: string;
  question: string;
}

export interface DirectQuery {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  queryStatus: 'Pending' | 'Resolved';
  replyMessage?: string;
  created_at: string;
}

export interface Order {
  id: string;
  student: string;
  course: string;
  amount: string;
  date: string;
  status: string;
}

// ==========================================================================
// LOCAL STORAGE MOCK DATABASE (Browser Fallback)
// ==========================================================================

const defaultBlogs: Blog[] = [
  { id: 1, title: 'How to Read Laxmikanth for Polity in 30 Days', author: 'Rajiv Ranjan Singh', category: 'Polity', views: 1240, date: '2026-07-18' },
  { id: 2, title: 'Environment & Climate Change - Core High-Yield Topics', author: 'Ananya Sharma', category: 'Environment', views: 890, date: '2026-07-15' },
  { id: 3, title: 'Economic Survey 2026 - Critical Analysis for Mains', author: 'Rajiv Ranjan Singh', category: 'Economy', views: 1560, date: '2026-07-10' }
];

const defaultAffairs: Affair[] = [
  { id: 1, date: '2026-07-18', title: "Polity: Supreme Court's Landmark Judgment on Minerals Taxation", category: 'Polity', summary: 'Mineral rights taxation powers analyzed under cooperative federalism.', imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800' },
  { id: 2, date: '2026-07-12', title: 'Economy: Capital Gain Tax Bracket Reforms Detailed Analysis', category: 'Economy', summary: 'Revisions to short and long term asset classes explained.', imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800' }
];

const defaultNotes: Note[] = [
  { id: 1, title: 'GS II Constitution & Governance Micro-Keywords Tracker', category: 'Mains GS II', size: '4.2 MB', downloads: 345 },
  { id: 2, title: 'IAS Mains Answer Writing Frameworks & Diagrams Solved Guide', category: 'Answer Writing', size: '8.7 MB', downloads: 512 }
];

const defaultCourses: Course[] = [
  { id: 1, title: 'IAS Foundation Integrated Program 2027', price: '₹45,000', enrolled: 142, limit: 200 },
  { id: 2, title: 'GS Paper IV Ethics & Integrity Mastery Batch', price: '₹12,500', enrolled: 98, limit: 120 },
  { id: 3, title: 'CSAT Quantitative Aptitude & Logical Reasoning Course', price: '₹7,500', enrolled: 64, limit: 100 }
];

const defaultPyqs: Pyq[] = [
  { id: 1, subject: 'polity', subjectLabel: 'Polity & Governance', year: '2025', question: 'Regarding the Governor’s power to reserve a Bill for the President\'s consideration...' },
  { id: 2, subject: 'economy', subjectLabel: 'Economy', year: '2025', question: 'Which of the following statements best describes the term \'Sterilization\' conducted by the RBI?' }
];

const defaultStudents: DirectQuery[] = [
  { id: 1, name: 'Aditya Sharma', email: 'aditya@example.com', subject: 'GS II Answer Writing', message: 'Polity GS II Answer writing guidelines help needed.', queryStatus: 'Pending', created_at: '2026-07-18T10:00:00Z' },
  { id: 2, name: 'Priya Patel', email: 'priya@gmail.com', subject: 'Ethics case study files', message: 'Are case study files uploaded?', queryStatus: 'Resolved', replyMessage: 'Yes, they are inside course resources tab.', created_at: '2026-07-17T14:30:00Z' },
  { id: 3, name: 'Amit Verma', email: 'amit.v@outlook.com', subject: 'MSF calculation doubts', message: 'MSF calculation formula explanation.', queryStatus: 'Pending', created_at: '2026-07-18T16:45:00Z' }
];

const defaultOrders: Order[] = [
  { id: 'TXN10248', student: 'Aditya Sharma', course: 'IAS Foundation Integrated Program 2027', amount: '₹45,000', date: '2026-07-18', status: 'Completed' },
  { id: 'TXN10249', student: 'Priya Patel', course: 'GS Paper IV Ethics & Integrity Mastery Batch', amount: '₹12,500', date: '2026-07-17', status: 'Completed' },
  { id: 'TXN10250', student: 'Rohan Sen', course: 'CSAT Quantitative Aptitude Course', amount: '₹7,500', date: '2026-07-16', status: 'Completed' }
];

// Helper to get/set browser localStorage items safely
function getMockStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  const stored = localStorage.getItem(`civilspage_${key}`);
  if (!stored) {
    localStorage.setItem(`civilspage_${key}`, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return defaultValue;
  }
}

function setMockStorage<T>(key: string, value: T): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`civilspage_${key}`, JSON.stringify(value));
  }
}

// ==========================================================================
// DB CRUD UTILITY ACTIONS
// ==========================================================================

/* --- BLOGS MANAGER --- */
export async function getBlogs(): Promise<Blog[]> {
  if (isMockMode) {
    return getMockStorage<Blog[]>('blogs', defaultBlogs);
  }
  const { data, error } = await supabase.from('blogs').select('*').order('date', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function addBlog(blog: Omit<Blog, 'id' | 'views'>): Promise<Blog> {
  if (isMockMode) {
    const list = getMockStorage<Blog[]>('blogs', defaultBlogs);
    const newBlog: Blog = { ...blog, id: Date.now(), views: 0 };
    setMockStorage('blogs', [newBlog, ...list]);
    return newBlog;
  }
  const { data, error } = await supabase.from('blogs').insert([{ ...blog, views: 0 }]).select().single();
  if (error) throw error;
  return data;
}

export async function deleteBlog(id: number): Promise<boolean> {
  if (isMockMode) {
    const list = getMockStorage<Blog[]>('blogs', defaultBlogs);
    setMockStorage('blogs', list.filter(b => b.id !== id));
    return true;
  }
  const { error } = await supabase.from('blogs').delete().eq('id', id);
  if (error) throw error;
  return true;
}

/* --- CURRENT AFFAIRS --- */
export async function getAffairs(): Promise<Affair[]> {
  if (isMockMode) {
    return getMockStorage<Affair[]>('affairs', defaultAffairs);
  }
  const { data, error } = await supabase.from('current_affairs').select('*').order('date', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function addAffair(affair: Omit<Affair, 'id'>): Promise<Affair> {
  if (isMockMode) {
    const list = getMockStorage<Affair[]>('affairs', defaultAffairs);
    const newAff: Affair = { ...affair, id: Date.now() };
    setMockStorage('affairs', [newAff, ...list]);
    return newAff;
  }
  const { data, error } = await supabase.from('current_affairs').insert([affair]).select().single();
  if (error) throw error;
  return data;
}

export async function deleteAffair(id: number): Promise<boolean> {
  if (isMockMode) {
    const list = getMockStorage<Affair[]>('affairs', defaultAffairs);
    setMockStorage('affairs', list.filter(a => a.id !== id));
    return true;
  }
  const { error } = await supabase.from('current_affairs').delete().eq('id', id);
  if (error) throw error;
  return true;
}


/* --- STUDY NOTES --- */
export async function getNotes(): Promise<Note[]> {
  if (isMockMode) {
    return getMockStorage<Note[]>('notes', defaultNotes);
  }
  const { data, error } = await supabase.from('study_materials').select('*').order('downloads', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function addNote(note: Omit<Note, 'id' | 'downloads'>): Promise<Note> {
  if (isMockMode) {
    const list = getMockStorage<Note[]>('notes', defaultNotes);
    const newNote: Note = { ...note, id: Date.now(), downloads: 0 };
    setMockStorage('notes', [newNote, ...list]);
    return newNote;
  }
  const { data, error } = await supabase.from('study_materials').insert([{ ...note, downloads: 0 }]).select().single();
  if (error) throw error;
  return data;
}

/* --- COURSES MANAGER --- */
export async function getCourses(): Promise<Course[]> {
  if (isMockMode) {
    return getMockStorage<Course[]>('courses', defaultCourses);
  }
  const { data, error } = await supabase.from('courses').select('*').order('id', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function updateCourse(id: number, enrolled: number): Promise<boolean> {
  if (isMockMode) {
    const list = getMockStorage<Course[]>('courses', defaultCourses);
    setMockStorage('courses', list.map(c => c.id === id ? { ...c, enrolled } : c));
    return true;
  }
  const { error } = await supabase.from('courses').update({ enrolled }).eq('id', id);
  if (error) throw error;
  return true;
}

/* --- SOLVED PYQS --- */
export async function getPyqs(): Promise<Pyq[]> {
  if (isMockMode) {
    return getMockStorage<Pyq[]>('pyqs', defaultPyqs);
  }
  const { data, error } = await supabase.from('pyqs').select('*').order('id', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function addPyq(pyq: Omit<Pyq, 'id'>): Promise<Pyq> {
  if (isMockMode) {
    const list = getMockStorage<Pyq[]>('pyqs', defaultPyqs);
    const newPyq: Pyq = { ...pyq, id: Date.now() };
    setMockStorage('pyqs', [newPyq, ...list]);
    return newPyq;
  }
  const { data, error } = await supabase.from('pyqs').insert([pyq]).select().single();
  if (error) throw error;
  return data;
}

/* --- DIRECT QUERY & REGISTRATIONS --- */
export async function getDirectQueries(): Promise<DirectQuery[]> {
  if (isMockMode) {
    return getMockStorage<DirectQuery[]>('students', defaultStudents);
  }
  const { data, error } = await supabase.from('direct_queries').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function submitDirectQuery(query: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ data: any; error: any }> {
  if (isMockMode) {
    const list = getMockStorage<DirectQuery[]>('students', defaultStudents);
    const newQuery: DirectQuery = {
      id: Date.now(),
      name: query.name,
      email: query.email,
      subject: query.subject,
      message: query.message,
      queryStatus: 'Pending',
      created_at: new Date().toISOString()
    };
    setMockStorage('students', [newQuery, ...list]);
    return { data: newQuery, error: null };
  }
  
  const { data, error } = await supabase
    .from('direct_queries')
    .insert([
      {
        student_name: query.name,
        student_email: query.email,
        subject: query.subject,
        message: query.message,
        query_status: 'Pending',
        created_at: new Date().toISOString()
      }
    ])
    .select();
  return { data, error };
}

export async function replyDirectQuery(id: number, replyMessage: string): Promise<boolean> {
  if (isMockMode) {
    const list = getMockStorage<DirectQuery[]>('students', defaultStudents);
    setMockStorage('students', list.map(s => s.id === id ? { ...s, queryStatus: 'Resolved', replyMessage } : s));
    return true;
  }
  const { error } = await supabase
    .from('direct_queries')
    .update({ query_status: 'Resolved', reply_message: replyMessage })
    .eq('id', id);
  if (error) throw error;
  return true;
}

/* --- ORDERS HISTORY --- */
export async function getOrders(): Promise<Order[]> {
  if (isMockMode) {
    return getMockStorage<Order[]>('orders', defaultOrders);
  }
  const { data, error } = await supabase.from('orders').select('*').order('date', { ascending: false });
  if (error) throw error;
  return data || [];
}

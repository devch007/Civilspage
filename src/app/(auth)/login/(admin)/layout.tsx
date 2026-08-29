import { getUserProfile } from '@/lib/auth';
import AdminSidebar from './_components/AdminSidebar';

// Force all /login/(admin)/* pages to be server-rendered at request time.
export const dynamic = 'force-dynamic';

// Safety timeout — prevents 504 if DB is slow
function withTimeout<T>(p: Promise<T>, ms: number, fallback: T) {
  return Promise.race([p, new Promise<T>((r) => setTimeout(() => r(fallback), ms))]);
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // 4s timeout — never block the page if DB is slow
  const user = await withTimeout(getUserProfile(), 4000, null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row antialiased">
      {/* Responsive Sidebar (Mobile App Bar + Drawer / Desktop Fixed Sidebar) */}
      <AdminSidebar 
        userEmail={user?.email || 'Educator'} 
        userRole={user?.role || 'admin'} 
      />

      {/* Main content area */}
      <main className="w-full md:pl-64 flex-1 p-4 sm:p-6 lg:p-8 pt-20 md:pt-8 min-h-screen">
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}

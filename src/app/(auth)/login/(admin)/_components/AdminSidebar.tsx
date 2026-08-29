'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3, Newspaper, HelpCircle, Settings, Layout, LogOut, Shield, Menu, X, ChevronRight, Sparkles
} from 'lucide-react';

interface AdminSidebarProps {
  userEmail?: string;
  userRole?: string;
}

const navItems = [
  { href: '/login/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/login/current-affairs', label: 'Current News & Views', icon: Newspaper },
  { href: '/login/pyqs', label: 'PYQs Database', icon: HelpCircle },
  { href: '/login/audit-log', label: 'Audit Log', icon: Shield },
  { href: '/login/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar({ userEmail, userRole }: AdminSidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ── 1. MOBILE TOP APP BAR (Visible on screens < md) ────────────────── */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0b3b60] text-white border-b border-white/10 z-40 px-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-1 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-amber-300"
            aria-label="Toggle Admin Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <Link href="/login/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-400 text-[#0b3b60] rounded-lg flex items-center justify-center font-black text-xs">
              CP
            </div>
            <div className="leading-tight">
              <span className="font-serif font-black text-sm text-white tracking-wide">CivilsPAGE</span>
              <span className="block text-[9px] font-bold text-amber-300 tracking-wider uppercase">Admin Portal</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="px-2.5 py-1 text-[11px] font-bold bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/15 transition-colors flex items-center gap-1"
          >
            <Layout className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Site</span>
          </Link>
        </div>
      </header>

      {/* ── 2. MOBILE SLIDE-OVER DRAWER & BACKDROP ─────────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <aside className="relative w-4/5 max-w-xs bg-white text-slate-800 h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="p-4 bg-[#0b3b60] text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-amber-400 text-[#0b3b60] rounded-xl flex items-center justify-center font-black text-xs">
                  CP
                </div>
                <div>
                  <h2 className="font-serif font-black text-sm text-white">CivilsPAGE</h2>
                  <p className="text-[10px] text-amber-300 font-bold">Admin Console</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
              <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Management Modules
              </span>
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href || (href !== '/login/dashboard' && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#0b3b60] text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
                      <span>{label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 opacity-40 ${isActive ? 'opacity-90 text-amber-300' : ''}`} />
                  </Link>
                );
              })}
            </nav>

            {/* Drawer User & Footer Actions */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
              <div className="p-2.5 bg-white border border-slate-200 rounded-xl space-y-0.5">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Logged In As</p>
                <p className="text-xs font-bold text-slate-800 truncate">{userEmail || 'Administrator'}</p>
                {userRole && (
                  <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-extrabold uppercase rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {userRole.replace('_', ' ')}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
                >
                  <Layout className="w-3.5 h-3.5 text-indigo-600" />
                  <span>View Site</span>
                </Link>

                <form action="/api/admin/logout" method="POST" className="w-full">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-500" />
                    <span>Log Out</span>
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* ── 3. DESKTOP FIXED SIDEBAR SPACER & SIDEBAR ────────────────── */}
      <div className="hidden md:block w-64 shrink-0" aria-hidden="true" />

      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col fixed inset-y-0 left-0 z-40 shadow-xs">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 bg-[#0b3b60] text-white">
          <Link href="/login/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-400 text-[#0b3b60] rounded-xl flex items-center justify-center font-black text-sm shadow-xs">
              CP
            </div>
            <div>
              <span className="font-serif font-black text-white text-base tracking-wide block leading-tight">CivilsPAGE</span>
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">Admin Console</span>
            </div>
          </Link>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 p-3.5 space-y-1 overflow-y-auto">
          <span className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">
            Modules
          </span>
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href !== '/login/dashboard' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                prefetch={true}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                  isActive
                    ? 'bg-[#0b3b60] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-amber-300' : 'text-slate-400 group-hover:text-indigo-600'}`} />
                  <span>{label}</span>
                </div>
                <ChevronRight className={`w-3 h-3 transition-opacity ${isActive ? 'opacity-100 text-amber-300' : 'opacity-0 group-hover:opacity-40'}`} />
              </Link>
            );
          })}
        </nav>

        {/* Desktop Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/70 space-y-2">
          <div className="px-3 py-2 bg-white rounded-xl border border-slate-200 space-y-0.5">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Account</p>
            <p className="text-xs text-slate-800 font-bold truncate">{userEmail || 'Educator'}</p>
            {userRole && (
              <span className="inline-block mt-0.5 px-2 py-0.2 text-[9px] bg-indigo-50 text-indigo-700 border border-indigo-100 rounded font-extrabold uppercase">
                {userRole.replace('_', ' ')}
              </span>
            )}
          </div>

          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
          >
            <Layout className="w-3.5 h-3.5 text-indigo-600" />
            <span>View Website</span>
          </Link>

          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors text-left cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-red-500" />
              <span>Log Out</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}

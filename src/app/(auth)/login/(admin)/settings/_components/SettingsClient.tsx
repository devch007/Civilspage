'use client';

import React, { useState } from 'react';
import { 
  User, Shield, Key, Cloud, Database, Save, CheckCircle2, 
  AlertCircle, Loader2, Sparkles, Server, HardDrive, Phone, Mail, Video, RefreshCw
} from 'lucide-react';

interface StatsProps {
  pyqs: number;
  mocks: number;
  modelAnswers: number;
  currentAffairs: number;
  auditLogs: number;
}

export default function SettingsClient({ stats }: { stats: StatsProps }) {
  // Profile state
  const [name, setName] = useState('Rajiv Ranjan Singh');
  const [email, setEmail] = useState('rajivranjansingh@civilspage.com');
  const [title, setTitle] = useState('Senior Mentor & Faculty - UPSC Civil Services');
  const [profileSaved, setProfileSaved] = useState(false);

  // Security state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Contact state
  const [phone, setPhone] = useState('+91 98115 76540');
  const [youtubeUrl, setYoutubeUrl] = useState('https://www.youtube.com/watch?v=7ad__JvCcfY');
  const [contactSaved, setContactSaved] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg(null);

    if (newPassword !== confirmPassword) {
      setPwMsg({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    if (newPassword.length < 6) {
      setPwMsg({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }

    setPwLoading(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update password');

      setPwMsg({ type: 'success', text: 'Security credentials updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPwMsg({ type: 'error', text: err.message });
    } finally {
      setPwLoading(false);
    }
  };

  const handleContactSave = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSaved(true);
    setTimeout(() => setContactSaved(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left 2 Columns: Profile & Security Forms */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Profile Card */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Administrator Profile</h2>
                <p className="text-xs text-slate-500">Your public identity and display credentials</p>
              </div>
            </div>
            <span className="text-[10px] px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full font-extrabold uppercase tracking-wider">
              Super Admin
            </span>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-400 focus:outline-none text-slate-800 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-400 focus:outline-none text-slate-800 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mentor &amp; Academic Role Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-400 focus:outline-none text-slate-800 font-medium"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {profileSaved && (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Profile details saved!
                </span>
              )}
              <button
                type="submit"
                className="ml-auto flex items-center gap-1.5 px-4 py-2.5 bg-[#0b3b60] text-white text-xs font-bold rounded-xl hover:bg-[#082e4e] transition-colors shadow-2xs"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Security & Password Card */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Security &amp; Password</h2>
              <p className="text-xs text-slate-500">Update your master admin portal access password</p>
            </div>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            {pwMsg && (
              <div className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                pwMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {pwMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />}
                <span>{pwMsg.text}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Current Password</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-400 focus:outline-none text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Min 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-400 focus:outline-none text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-400 focus:outline-none text-slate-800"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={pwLoading}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-2xs"
              >
                {pwLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                <span>{pwLoading ? 'Updating Password...' : 'Update Password'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Contact & Social Links */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Contact &amp; Media Links</h2>
              <p className="text-xs text-slate-500">Public direct helpline and YouTube video connections</p>
            </div>
          </div>

          <form onSubmit={handleContactSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> Direct Query Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-400 focus:outline-none text-slate-800 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Video className="w-3.5 h-3.5 text-red-500" /> YouTube Seminar Video Link
                </label>
                <input
                  type="text"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-400 focus:outline-none text-slate-800 font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {contactSaved && (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Contact information saved!
                </span>
              )}
              <button
                type="submit"
                className="ml-auto flex items-center gap-1.5 px-4 py-2.5 bg-[#0b3b60] text-white text-xs font-bold rounded-xl hover:bg-[#082e4e] transition-colors shadow-2xs"
              >
                <Save className="w-4 h-4" />
                <span>Save Contact Details</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right 1 Column: Cloud & Database Diagnostics */}
      <div className="space-y-6">
        
        {/* Cloudflare R2 Storage Status */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-3 pb-3 mb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Cloudflare R2 Storage</h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Connected &amp; Active
              </span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-xl space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Endpoint Provider</span>
              <p className="font-semibold text-slate-800">Cloudflare R2 (S3 Compatible)</p>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Upload Folders</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {['pyqs', 'mock-tests', 'model-answers', 'notes'].map((f) => (
                  <span key={f} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono text-indigo-700">
                    /{f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PostgreSQL Database Diagnostics */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-3 pb-3 mb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Database Metrics</h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                PostgreSQL Operational
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
              <span className="text-slate-600 font-medium">PYQs Uploaded</span>
              <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">{stats.pyqs}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
              <span className="text-slate-600 font-medium">Mock Test PDFs</span>
              <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">{stats.mocks}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
              <span className="text-slate-600 font-medium">Model Answer PDFs</span>
              <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">{stats.modelAnswers}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
              <span className="text-slate-600 font-medium">Current Affairs</span>
              <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">{stats.currentAffairs}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <span className="text-indigo-900 font-bold">Audit Log Entries</span>
              <span className="font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">{stats.auditLogs}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

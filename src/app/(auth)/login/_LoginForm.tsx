'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/login/dashboard';

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsPending(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    // 15-second client-side timeout so the user ALWAYS gets feedback
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, next }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error ?? 'Login failed. Please try again.');
      } else if (data.redirectTo) {
        // Full page reload so middleware picks up the new session cookie
        window.location.href = data.redirectTo;
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err?.name === 'AbortError') {
        setError('Request timed out. The server is taking too long. Please try again.');
      } else {
        setError(`Unexpected error: ${err?.message ?? String(err)}`);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-8 space-y-6">
        {/* Gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-t-2xl" />

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl mb-2">
            <Lock className="w-6 h-6 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">CivilsPage Admin</h1>
          <p className="text-sm text-slate-400">Sign in to access the educator console</p>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium break-all">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="educator@civilspage.com"
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/40 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                className="w-full px-4 py-3 pr-12 bg-slate-950/60 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/40 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 mt-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in…
              </>
            ) : (
              'Sign in to Dashboard'
            )}
          </button>
        </form>

        <div className="text-center">
          <Link href="/" className="text-xs text-slate-500 hover:text-indigo-400 transition-colors">
            ← Return to CivilsPage
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlogAction } from '@/actions/blog.actions';
import { generateSlug } from '@/lib/validations/blog';
import R2Upload from '@/components/admin/R2Upload';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    pdfUrl: '',
    seoTitle: '',
    seoDescription: '',
    published: false,
  });

  const set = (k: keyof typeof form, v: string | boolean) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await createBlogAction(form);
    if ('error' in result && result.error) {
      setError(JSON.stringify(result.error));
      setLoading(false);
      return;
    }
    router.push('/login/blogs');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/login/blogs" className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">New Blog Post</h1>
          <p className="text-slate-500 text-sm mt-0.5">Create and publish a new article</p>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Content */}
        <div className="bg-white border border-slate-100 rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-slate-800 text-xs uppercase tracking-wider">Content</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Title *</label>
            <input type="text" required value={form.title} onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none"
              placeholder="e.g. Understanding Directive Principles of State Policy" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Slug (auto-generated)</label>
            <input type="text" value={form.slug} onChange={(e) => set('slug', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-mono text-slate-500 focus:border-indigo-400 focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} rows={2}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none resize-none"
              placeholder="Short summary shown in listings..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Content</label>
            <textarea value={form.content} onChange={(e) => set('content', e.target.value)} rows={14}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-mono focus:border-indigo-400 focus:outline-none resize-none"
              placeholder="Full article content (Markdown supported)..." />
          </div>
        </div>

        {/* Media — R2 Upload */}
        <div className="bg-white border border-slate-100 rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-slate-800 text-xs uppercase tracking-wider">Media</h2>

          <R2Upload
            label="Featured Image"
            value={form.featuredImage}
            onChange={(url) => set('featuredImage', url)}
            folder="blogs"
            accept="image"
            previewImage
          />

          <R2Upload
            label="Attached PDF"
            value={form.pdfUrl}
            onChange={(url) => set('pdfUrl', url)}
            folder="blogs"
            accept="pdf"
            previewImage={false}
          />
        </div>

        {/* SEO */}
        <div className="bg-white border border-slate-100 rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-slate-800 text-xs uppercase tracking-wider">SEO</h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">SEO Title <span className="text-slate-400 font-normal">(max 70 chars)</span></label>
            <input maxLength={70} value={form.seoTitle} onChange={(e) => set('seoTitle', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none" />
            <p className="text-xs text-slate-400 mt-1 text-right">{form.seoTitle.length}/70</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">SEO Description <span className="text-slate-400 font-normal">(max 160 chars)</span></label>
            <textarea maxLength={160} rows={2} value={form.seoDescription} onChange={(e) => set('seoDescription', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none resize-none" />
            <p className="text-xs text-slate-400 mt-1 text-right">{form.seoDescription.length}/160</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} className="w-4 h-4 accent-indigo-600 rounded" />
            <span className="text-sm font-medium text-slate-700">Publish immediately</span>
          </label>
          <button type="submit" disabled={loading}
            className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-60 flex items-center gap-2 transition-all">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Creating...' : 'Create Blog Post'}
          </button>
        </div>
      </form>
    </div>
  );
}

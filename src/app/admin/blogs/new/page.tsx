'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlogAction } from '@/actions/blog.actions';
import { generateSlug } from '@/lib/validations/blog';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
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

    router.push('/admin/blogs');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/blogs" className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">New Blog Post</h1>
          <p className="text-slate-500 text-sm mt-0.5">Create and publish a new article</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-white border border-slate-100 rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-slate-800 text-sm uppercase tracking-wider">Content</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Title *</label>
            <input
              type="text" required
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none"
              placeholder="e.g. Understanding Directive Principles of State Policy"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none font-mono text-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none resize-none"
              placeholder="Short summary of the blog post..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Content</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={12}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none resize-none font-mono"
              placeholder="Full article content (Markdown supported)..."
            />
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-slate-800 text-sm uppercase tracking-wider">Media (Cloudflare R2 URLs)</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Featured Image URL</label>
            <input
              type="url"
              value={form.featuredImage}
              onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none"
              placeholder="https://your-r2.cloudflare.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">PDF URL</label>
            <input
              type="url"
              value={form.pdfUrl}
              onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none"
              placeholder="https://your-r2.cloudflare.com/file.pdf"
            />
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-slate-800 text-sm uppercase tracking-wider">SEO</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">SEO Title (max 70 chars)</label>
            <input
              type="text" maxLength={70}
              value={form.seoTitle}
              onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">SEO Description (max 160 chars)</label>
            <textarea
              maxLength={160} rows={2}
              value={form.seoDescription}
              onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="w-4 h-4 accent-indigo-600 rounded"
            />
            <span className="text-sm font-medium text-slate-700">Publish immediately</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-60 flex items-center gap-2 transition-all"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Creating...' : 'Create Blog Post'}
          </button>
        </div>
      </form>
    </div>
  );
}

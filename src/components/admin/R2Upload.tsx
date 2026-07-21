'use client';

import { useRef, useState } from 'react';
import { Upload, X, FileText, Image, Loader2, CheckCircle, Trash2 } from 'lucide-react';

type UploadFolder = 'blogs' | 'current-affairs' | 'notes' | 'courses' | 'pyqs' | 'avatars' | 'misc';

interface R2UploadProps {
  /** controlled value — the public R2 URL */
  value: string;
  onChange: (url: string) => void;
  /** which R2 sub-folder to upload to */
  folder?: UploadFolder;
  /** restrict accepted file types */
  accept?: 'image' | 'pdf' | 'any';
  /** label shown above the uploader */
  label?: string;
  /** show a thumbnail preview for images */
  previewImage?: boolean;
  className?: string;
}

const ACCEPT_MAP = {
  image: 'image/jpeg,image/png,image/webp,image/avif,image/gif',
  pdf: 'application/pdf',
  any: 'image/jpeg,image/png,image/webp,image/avif,image/gif,application/pdf',
};

export default function R2Upload({
  value,
  onChange,
  folder = 'misc',
  accept = 'any',
  label,
  previewImage = true,
  className = '',
}: R2UploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  const isPdf = value.endsWith('.pdf');
  const hasValue = value.trim().length > 0;

  async function handleFile(file: File) {
    setUploading(true);
    setError('');
    setProgress(10);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      // Simulate progress steps
      const progressInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 15, 85));
      }, 300);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? 'Upload failed');
      }

      const data = await res.json();
      onChange(data.url);
    } catch (err: any) {
      setError(err.message ?? 'Upload failed');
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 600);
    }
  }

  async function handleDelete() {
    if (!value) return;
    // Extract key from URL
    const publicBase = process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? '';
    const key = value.replace(`${publicBase}/`, '');

    try {
      await fetch('/api/r2/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });
    } catch {
      // Best-effort delete; always clear the value
    } finally {
      onChange('');
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-slate-600">{label}</label>
      )}

      {/* Preview */}
      {hasValue && (
        <div className="relative group">
          {previewImage && !isPdf && value ? (
            <div className="relative w-full h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              {isPdf ? <FileText className="w-5 h-5 text-emerald-600 shrink-0" /> : <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />}
              <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-700 font-medium truncate flex-1 hover:underline">
                {value.split('/').pop()}
              </a>
              <button
                type="button"
                onClick={handleDelete}
                className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Drop zone */}
      {!hasValue && (
        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed rounded-xl cursor-pointer transition-all
            ${uploading ? 'border-indigo-300 bg-indigo-50/30 cursor-wait' : 'border-slate-200 bg-slate-50/60 hover:border-indigo-300 hover:bg-indigo-50/40'}`}
          style={{ minHeight: '90px' }}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 p-4 w-full">
              <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
              <div className="w-full max-w-[160px] bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-indigo-600 font-medium">Uploading to R2...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 p-5">
              {accept === 'pdf' ? <FileText className="w-6 h-6 text-slate-300" /> : <Image className="w-6 h-6 text-slate-300" />}
              <p className="text-xs text-slate-500 font-medium">
                <span className="text-indigo-600">Click to upload</span> or drag & drop
              </p>
              <p className="text-[10px] text-slate-400">
                {accept === 'image' ? 'JPG, PNG, WebP, AVIF up to 50 MB' : accept === 'pdf' ? 'PDF up to 50 MB' : 'Images or PDFs up to 50 MB'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Manual URL input (paste option) */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-slate-100" />
        <span className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">or paste URL</span>
        <div className="flex-1 h-px bg-slate-100" />
      </div>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`https://pub-9c3572c4a825401b8917e1fae30f7d98.r2.dev/${folder}/...`}
        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono text-slate-500 focus:border-indigo-400 focus:outline-none placeholder-slate-300"
      />

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_MAP[accept]}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <X className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

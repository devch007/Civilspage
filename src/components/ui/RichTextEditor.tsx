'use client';

import React, { useState, useRef } from 'react';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  Highlighter, Heading2, Heading3, List, ListOrdered, 
  Quote, Minus, Link as LinkIcon, Eye, Edit3
} from 'lucide-react';
import RichContentRenderer from './RichContentRenderer';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Enter detailed analysis, key provisions, or judgements...',
  rows = 6,
}: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = (prefix: string, suffix: string = '', defaultPlaceholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = textarea.value;
    const selectedText = currentVal.substring(start, end);

    const insertionText = selectedText || defaultPlaceholder;
    const newText = 
      currentVal.substring(0, start) + 
      prefix + insertionText + suffix + 
      currentVal.substring(end);

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + insertionText.length;
      textarea.setSelectionRange(
        selectedText ? start + prefix.length : start + prefix.length,
        selectedText ? newCursorPos : newCursorPos
      );
    }, 10);
  };

  const applyLinePrefix = (linePrefix: string, placeholderIfEmpty: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = textarea.value;

    // Find the start of current line
    const beforeCursor = currentVal.substring(0, start);
    const lineStart = beforeCursor.lastIndexOf('\n') + 1;
    const afterCursor = currentVal.substring(end);

    const lineText = currentVal.substring(lineStart, end);
    const formattedLine = linePrefix + (lineText || placeholderIfEmpty);

    const newText = currentVal.substring(0, lineStart) + formattedLine + afterCursor;
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        lineStart + formattedLine.length,
        lineStart + formattedLine.length
      );
    }, 10);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.metaKey || e.ctrlKey) {
      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        applyFormat('**', '**', 'bold text');
      } else if (e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        applyFormat('*', '*', 'italic text');
      } else if (e.key === 'u' || e.key === 'U') {
        e.preventDefault();
        applyFormat('<u>', '</u>', 'underlined text');
      }
    }
  };

  return (
    <div className="space-y-1.5">
      {/* Editor Header Toolbar & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 bg-slate-100/90 border border-slate-200 rounded-t-xl px-2.5 py-1.5">
        
        {/* Formatting Action Tools */}
        <div className="flex flex-wrap items-center gap-0.5">
          {/* Bold */}
          <button
            type="button"
            onClick={() => applyFormat('**', '**', 'bold text')}
            className="p-1.5 text-slate-700 hover:text-indigo-700 hover:bg-white rounded-lg transition-colors"
            title="Bold (Ctrl/Cmd+B)"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>

          {/* Italic */}
          <button
            type="button"
            onClick={() => applyFormat('*', '*', 'italic text')}
            className="p-1.5 text-slate-700 hover:text-indigo-700 hover:bg-white rounded-lg transition-colors"
            title="Italic (Ctrl/Cmd+I)"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>

          {/* Underline */}
          <button
            type="button"
            onClick={() => applyFormat('<u>', '</u>', 'underlined text')}
            className="p-1.5 text-slate-700 hover:text-indigo-700 hover:bg-white rounded-lg transition-colors"
            title="Underline (Ctrl/Cmd+U)"
          >
            <UnderlineIcon className="w-3.5 h-3.5" />
          </button>

          {/* Strikethrough */}
          <button
            type="button"
            onClick={() => applyFormat('~~', '~~', 'strikethrough text')}
            className="p-1.5 text-slate-700 hover:text-indigo-700 hover:bg-white rounded-lg transition-colors"
            title="Strikethrough"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>

          {/* Highlight */}
          <button
            type="button"
            onClick={() => applyFormat('<mark>', '</mark>', 'highlighted text')}
            className="p-1.5 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
            title="Highlight Text"
          >
            <Highlighter className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-300 mx-1 self-center" />

          {/* Heading 2 */}
          <button
            type="button"
            onClick={() => applyLinePrefix('## ', 'Section Heading')}
            className="px-1.5 py-1 text-slate-700 hover:text-indigo-700 hover:bg-white rounded-lg text-xs font-bold transition-colors"
            title="Heading 2"
          >
            <Heading2 className="w-3.5 h-3.5" />
          </button>

          {/* Heading 3 */}
          <button
            type="button"
            onClick={() => applyLinePrefix('### ', 'Subheading')}
            className="px-1.5 py-1 text-slate-700 hover:text-indigo-700 hover:bg-white rounded-lg text-xs font-bold transition-colors"
            title="Heading 3"
          >
            <Heading3 className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-300 mx-1 self-center" />

          {/* Bullet list */}
          <button
            type="button"
            onClick={() => applyLinePrefix('- ', 'List item')}
            className="p-1.5 text-slate-700 hover:text-indigo-700 hover:bg-white rounded-lg transition-colors"
            title="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
          </button>

          {/* Numbered list */}
          <button
            type="button"
            onClick={() => applyLinePrefix('1. ', 'First step')}
            className="p-1.5 text-slate-700 hover:text-indigo-700 hover:bg-white rounded-lg transition-colors"
            title="Numbered List"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>

          {/* Quote / Key note */}
          <button
            type="button"
            onClick={() => applyLinePrefix('> ', 'Important Note / Key Observation')}
            className="p-1.5 text-slate-700 hover:text-indigo-700 hover:bg-white rounded-lg transition-colors"
            title="Callout Quote / Highlight Box"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>

          {/* Divider */}
          <button
            type="button"
            onClick={() => applyLinePrefix('\n---\n')}
            className="p-1.5 text-slate-700 hover:text-indigo-700 hover:bg-white rounded-lg transition-colors"
            title="Horizontal Divider"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          {/* Link */}
          <button
            type="button"
            onClick={() => applyFormat('[', '](https://example.com)', 'Link text')}
            className="p-1.5 text-slate-700 hover:text-indigo-700 hover:bg-white rounded-lg transition-colors"
            title="Insert Link"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tab switch: Write vs Preview */}
        <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all ${
              activeTab === 'write'
                ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-3 h-3" />
            <span>Write</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all ${
              activeTab === 'preview'
                ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Body or Live Preview */}
      {activeTab === 'write' ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={rows}
          className="w-full px-3.5 py-2.5 border border-slate-200 rounded-b-xl text-xs sm:text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none resize-y leading-relaxed font-sans bg-white"
          placeholder={placeholder}
        />
      ) : (
        <div className="min-h-[150px] p-4 border border-slate-200 rounded-b-xl bg-slate-50/50 text-xs sm:text-sm overflow-y-auto max-h-[350px]">
          {value ? (
            <RichContentRenderer content={value} />
          ) : (
            <p className="text-slate-400 italic text-center py-8">
              No content entered yet. Switch back to Write mode to type formatted notes.
            </p>
          )}
        </div>
      )}

      {/* Helper caption */}
      <p className="text-[10px] text-slate-400 flex items-center justify-between px-1">
        <span>Supports Markdown &amp; HTML (<b>Bold</b>, <i>Italic</i>, <u>Underline</u>, Lists, Headings, Highlights)</span>
        <span>Shortcuts: ⌘/Ctrl+B, ⌘/Ctrl+I, ⌘/Ctrl+U</span>
      </p>
    </div>
  );
}

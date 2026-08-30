'use client';

import React from 'react';

interface RichContentRendererProps {
  content: string;
  className?: string;
}

export default function RichContentRenderer({ content, className = '' }: RichContentRendererProps) {
  if (!content) return null;

  // Split into lines to parse block structures
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;
  let keyIndex = 0;

  const flushList = () => {
    if (currentList) {
      if (currentList.type === 'ul') {
        elements.push(
          <ul key={`list-${keyIndex++}`} className="list-disc list-outside ml-5 space-y-1.5 my-3 text-slate-800">
            {currentList.items.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {parseInline(item)}
              </li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`list-${keyIndex++}`} className="list-decimal list-outside ml-5 space-y-1.5 my-3 text-slate-800">
            {currentList.items.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {parseInline(item)}
              </li>
            ))}
          </ol>
        );
      }
      currentList = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Empty line
    if (!trimmed) {
      flushList();
      continue;
    }

    // Horizontal Divider
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      flushList();
      elements.push(<hr key={`hr-${keyIndex++}`} className="my-6 border-slate-200" />);
      continue;
    }

    // Headings
    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${keyIndex++}`} className="text-lg sm:text-xl font-bold font-serif text-[#0b3b60] mt-6 mb-2">
          {parseInline(trimmed.substring(4))}
        </h3>
      );
      continue;
    }
    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={`h2-${keyIndex++}`} className="text-xl sm:text-2xl font-bold font-serif text-[#0b3b60] mt-7 mb-3 border-b border-slate-100 pb-1">
          {parseInline(trimmed.substring(3))}
        </h2>
      );
      continue;
    }
    if (trimmed.startsWith('# ')) {
      flushList();
      elements.push(
        <h2 key={`h1-${keyIndex++}`} className="text-2xl sm:text-3xl font-black font-serif text-[#0b3b60] mt-8 mb-3">
          {parseInline(trimmed.substring(2))}
        </h2>
      );
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote key={`quote-${keyIndex++}`} className="border-l-4 border-[#0b3b60] bg-amber-50/50 pl-4 py-2 my-4 rounded-r-xl italic text-slate-800 font-medium">
          {parseInline(trimmed.substring(2))}
        </blockquote>
      );
      continue;
    }

    // Unordered list item
    const ulMatch = trimmed.match(/^[-*•]\s+(.+)$/);
    if (ulMatch) {
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(ulMatch[1]);
      continue;
    }

    // Ordered list item
    const olMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(olMatch[1]);
      continue;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p key={`p-${keyIndex++}`} className="my-2.5 leading-relaxed text-slate-800">
        {parseInline(rawLine)}
      </p>
    );
  }

  flushList();

  return <div className={`rich-text-content ${className}`}>{elements}</div>;
}

/**
 * Parses inline formatting:
 * - Bold: **text** or <b>text</b> or <strong>text</strong>
 * - Italic: *text* or <i>text</i> or <em>text</em>
 * - Underline: <u>text</u> or __text__
 * - Strikethrough: ~~text~~ or <s>text</s> or <strike>text</strike>
 * - Highlight: <mark>text</mark> or ==text==
 * - Inline Code: `text` or <code>text</code>
 * - Links: [label](url) or <a href="...">label</a>
 */
function parseInline(text: string): React.ReactNode {
  if (!text) return null;

  // Convert HTML markup to normalized tokens or render directly
  // We tokenize the string into styled React elements
  const tokens: React.ReactNode[] = [];
  
  // Regex to match markdown and HTML inline patterns
  const inlineRegex = /(?:(\*\*(.*?)\*\*|<b>(.*?)<\/b>|<strong>(.*?)<\/strong>)|(<u>(.*?)<\/u>|__(.*?)__)|(\*(.*?)\*|<i>(.*?)<\/i>|<em>(.*?)<\/em>)|(~~(.*?)~~|<s>(.*?)<\/s>|<strike>(.*?)<\/strike>)|(<mark(?:.*?)>(.*?)<\/mark>|==(.*?)==)|(`(.*?)`|<code>(.*?)<\/code>)|(\[(.*?)\]\((.*?)\)|<a\s+(?:[^>]*?\s+)?href=["'](.*?)["'][^>]*>(.*?)<\/a>))/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = inlineRegex.exec(text)) !== null) {
    const matchIndex = match.index;
    
    // Push preceding plain text
    if (matchIndex > lastIndex) {
      tokens.push(text.substring(lastIndex, matchIndex));
    }

    const fullMatch = match[0];

    // Bold
    if (match[1]) {
      const boldText = match[2] || match[3] || match[4] || '';
      tokens.push(<strong key={`b-${matchIndex}`} className="font-bold text-slate-950">{parseInline(boldText)}</strong>);
    }
    // Underline
    else if (match[5]) {
      const underlineText = match[6] || match[7] || '';
      tokens.push(<u key={`u-${matchIndex}`} className="underline underline-offset-2 decoration-indigo-500 font-semibold">{parseInline(underlineText)}</u>);
    }
    // Italic
    else if (match[8]) {
      const italicText = match[9] || match[10] || match[11] || '';
      tokens.push(<em key={`i-${matchIndex}`} className="italic">{parseInline(italicText)}</em>);
    }
    // Strikethrough
    else if (match[12]) {
      const strikeText = match[13] || match[14] || match[15] || '';
      tokens.push(<s key={`s-${matchIndex}`} className="line-through text-slate-400">{parseInline(strikeText)}</s>);
    }
    // Highlight
    else if (match[16]) {
      const markText = match[17] || match[18] || '';
      tokens.push(<mark key={`mark-${matchIndex}`} className="bg-amber-200/90 text-slate-950 px-1 py-0.5 rounded font-medium">{parseInline(markText)}</mark>);
    }
    // Code
    else if (match[19]) {
      const codeText = match[20] || match[21] || '';
      tokens.push(<code key={`code-${matchIndex}`} className="bg-slate-100 text-indigo-700 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">{codeText}</code>);
    }
    // Link
    else if (match[22]) {
      const linkLabel = match[23] || match[26] || 'Link';
      const linkUrl = match[24] || match[25] || '#';
      tokens.push(
        <a 
          key={`a-${matchIndex}`} 
          href={linkUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-indigo-600 hover:text-indigo-800 underline font-semibold transition-colors"
        >
          {linkLabel}
        </a>
      );
    }

    lastIndex = matchIndex + fullMatch.length;
  }

  // Push remaining text
  if (lastIndex < text.length) {
    tokens.push(text.substring(lastIndex));
  }

  return tokens.length > 0 ? tokens : text;
}

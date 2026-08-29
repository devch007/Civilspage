'use client';

import React from 'react';
import { Type, RotateCcw } from 'lucide-react';

interface FontSizeSliderProps {
  fontSize: number;
  setFontSize: (size: number | ((prev: number) => number)) => void;
  min?: number;
  max?: number;
  defaultSize?: number;
  className?: string;
}

export default function FontSizeSlider({
  fontSize,
  setFontSize,
  min = 13,
  max = 26,
  defaultSize = 16,
  className = '',
}: FontSizeSliderProps) {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-xl shadow-2xs text-xs select-none ${className}`}>
      {/* Label & Active Size Display */}
      <div className="flex items-center gap-2 text-slate-700 font-bold">
        <Type className="w-4 h-4 text-[#0b3b60]" />
        <span>Text Size</span>
        <span className="font-mono text-[11px] font-extrabold text-[#0b3b60] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          {fontSize}px
        </span>
      </div>

      {/* Slider & Quick Buttons */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setFontSize((prev) => Math.max(min, prev - 1))}
          disabled={fontSize <= min}
          className="p-1 text-[11px] font-bold text-slate-500 hover:text-[#0b3b60] disabled:opacity-30 transition-colors"
          title="Decrease font size"
          aria-label="Decrease font size"
        >
          A-
        </button>

        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-24 sm:w-36 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b3b60] focus:outline-none focus:ring-2 focus:ring-[#0b3b60]/20"
          aria-label="Font size slider"
        />

        <button
          type="button"
          onClick={() => setFontSize((prev) => Math.min(max, prev + 1))}
          disabled={fontSize >= max}
          className="p-1 text-sm font-bold text-slate-700 hover:text-[#0b3b60] disabled:opacity-30 transition-colors"
          title="Increase font size"
          aria-label="Increase font size"
        >
          A+
        </button>

        {fontSize !== defaultSize && (
          <button
            type="button"
            onClick={() => setFontSize(defaultSize)}
            className="flex items-center gap-1 ml-1.5 px-2 py-1 text-[10px] font-bold text-slate-500 hover:text-[#0b3b60] bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 transition-colors"
            title="Reset to default text size"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}

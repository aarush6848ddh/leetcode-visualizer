'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const Button = ({ children, onClick, disabled, variant = "default" }: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition border
      ${
        variant === "default"
          ? "bg-white/10 border-white/10 text-white hover:bg-white/15 disabled:opacity-50"
          : variant === "accent"
          ? "bg-emerald-500/90 border-emerald-400/20 text-white hover:bg-emerald-500"
          : "bg-transparent border-white/10 text-white hover:bg-white/10"
      }`}
  >
    {children}
  </button>
);

const Chip = ({ id, value, active, duplicate, inSet, unprocessed, current }: any) => (
  <motion.div
    layoutId={`chip-${id}`}
    className={`rounded-full px-4 sm:px-6 lg:px-12 py-2 sm:py-3 lg:py-4 text-sm sm:text-base font-bold tracking-wide shadow-lg min-w-[48px] sm:min-w-[56px] lg:min-w-[60px] flex items-center justify-center
      ${
        duplicate ? "bg-purple-600 shadow-purple-600/50" 
        : inSet ? "bg-emerald-600 shadow-emerald-600/50" 
        : unprocessed ? "bg-blue-600 shadow-blue-600/50"
        : current ? "bg-indigo-600 shadow-indigo-600/50"
        : "bg-emerald-600 shadow-emerald-600/50"
      }
      text-white`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: active ? 1.05 : 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 28 }}
  >
    {value}
  </motion.div>
);

function useInterval(cb: () => void, delay: number | null) {
  const saved = useRef(cb);
  useEffect(() => {
    saved.current = cb;
  }, [cb]);
  useEffect(() => {
    if (delay == null) return;
    const t = setInterval(() => saved.current(), delay);
    return () => clearInterval(t);
  }, [delay]);
}

export default function ContainsDuplicateVisualizer() {
  const parsed = [1, 2, 3, 1, 2, 4, 5, 3];

  // simulation state
  const [i, setI] = useState(0);
  const [seen, setSeen] = useState<number[]>([]); // set contents (unique)
  const [result, setResult] = useState<boolean | null>(null);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const speed = 800; // Fixed animation speed
  const AUTO_LOOP = true;

  const reset = () => {
    setI(0);
    setSeen([]);
    setResult(null);
    setActiveLine(null);
  };

  // step: convert array to set - duplicates are automatically discarded
  const step = () => {
    if (result !== null) return; // finished
    
    // First step: initialize length
    if (i === 0 && seen.length === 0 && activeLine === null) {
      setActiveLine(3); // length = len(nums)
      return;
    }
    
    // Second step: convert to set
    if (i === 0 && seen.length === 0 && activeLine === 3) {
      setActiveLine(4); // my_set = set(nums)
      // Process all elements at once for the set conversion
      const uniqueSet = Array.from(new Set(parsed));
      setSeen(uniqueSet);
      setI(parsed.length);
      return;
    }
    
    // Finished processing - compare lengths
    if (i >= parsed.length && result === null && seen.length > 0) {
      setActiveLine(5); // if length > len(my_set):
      const hasDuplicate = seen.length < parsed.length;
      setResult(hasDuplicate);
      if (hasDuplicate) {
        setActiveLine(6); // return True
      } else {
        setActiveLine(7); // return False
      }
      // Keep line visible for a moment, then clear
      setTimeout(() => setActiveLine(null), 500);
      return;
    }
  };

  useInterval(() => step(), result === null && i <= parsed.length ? speed : null);

  // auto-loop after a short pause
  useEffect(() => {
    if (result === null || !AUTO_LOOP) return;
    const t = setTimeout(() => reset(), 1500);
    return () => clearTimeout(t);
  }, [result]);

  const arrayItems = parsed.map((v, idx) => ({ id: `arr-${idx}`, v, idx }));
  const setItems = seen.map((v, idx) => ({ id: `set-${idx}-${v}`, v, idx }));

  return (
    <div className="w-full bg-[#0c0f14] text-white rounded-xl border border-gray-800 p-4 sm:p-6 lg:p-8 shadow-xl">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Contains Duplicate — Visualizer</h2>
        <p className="text-white/70 text-xs sm:text-sm">
          Algorithm: compare len(nums) to len(set(nums)) conceptually; here we simulate the set-building.
        </p>
      </div>


      {/* Code Display with Line-by-Line Highlighting */}
      <section className="mb-4 sm:mb-6 rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4">
        <div className="mb-2 sm:mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <h2 className="text-xs sm:text-sm uppercase tracking-widest text-white/60 font-semibold">Python Code Execution</h2>
          <span className="text-xs text-white/60">
            {activeLine ? `Line ${activeLine} executing...` : 'Ready'}
          </span>
        </div>
        <pre className="bg-slate-900/80 rounded-lg p-2 sm:p-4 overflow-x-auto border border-white/5">
          <code className="text-xs sm:text-sm font-mono text-white/90 leading-relaxed">
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 1 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              <span className="text-purple-400">class</span> <span className="text-blue-400">Solution</span>:
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 2 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">hasDuplicate</span>(<span className="text-green-400">self</span>, <span className="text-orange-400">nums</span>: <span className="text-blue-400">List</span>[<span className="text-blue-400">int</span>]) <span className="text-purple-400">-&gt;</span> <span className="text-blue-400">bool</span>:
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 3 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-orange-400">length</span> = <span className="text-blue-400">len</span>(<span className="text-orange-400">nums</span>)
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 4 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-orange-400">my_set</span> = <span className="text-blue-400">set</span>(<span className="text-orange-400">nums</span>)
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 5 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-purple-400">if</span> <span className="text-orange-400">length</span> &gt; <span className="text-blue-400">len</span>(<span className="text-orange-400">my_set</span>):
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 6 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : ''}`}>
              {'            '}<span className="text-purple-400">return</span> <span className="text-blue-400">True</span>
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 7 ? 'bg-rose-500/20 border-l-2 border-rose-400' : ''}`}>
              {'        '}<span className="text-purple-400">return</span> <span className="text-blue-400">False</span>
            </div>
          </code>
        </pre>
      </section>

      <LayoutGroup>
        {/* Array Section */}
        <section className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm uppercase tracking-widest text-white/80 font-semibold">ARRAY</h3>
            <span className="text-white/70 text-xs sm:text-sm font-mono">i = {Math.min(i, parsed.length)}</span>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 items-center min-h-[50px] sm:min-h-[60px]">
            {arrayItems.map(({ id, v, idx }) => {
              const active = result === null && idx === i;
              const alreadyProcessed = idx < i;
              const alreadyInSet = seen.includes(v);
              const unprocessed = idx > i;
              
              // Color logic based on conversion process:
              // - Green: Element was processed and added to set (unique element)
              // - Purple: Element is a duplicate (already in set when we try to add it)
              // - Blue: Not yet processed
              // - Indigo: Currently being processed (checking if it's in set)
              
              let chipState = 'unprocessed';
              if (alreadyProcessed && alreadyInSet) {
                // Check if this was the first occurrence (green) or duplicate (purple)
                const firstOccurrence = parsed.indexOf(v) === idx;
                chipState = firstOccurrence ? 'inSet' : 'duplicate';
              } else if (active) {
                chipState = alreadyInSet ? 'duplicate' : 'current';
              }
              
              return (
                <motion.div key={id} layout className="relative">
                  <Chip
                    id={id}
                    value={v}
                    active={active}
                    duplicate={chipState === 'duplicate'}
                    inSet={chipState === 'inSet'}
                    unprocessed={chipState === 'unprocessed'}
                    current={chipState === 'current'}
                  />
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Separator */}
        <div className="flex items-center justify-center my-4">
          <motion.div 
            initial={{ opacity: 0, y: -6 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-white/60 text-lg"
          >
            ▼
          </motion.div>
        </div>

        {/* Set Section */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm uppercase tracking-widest text-emerald-300 font-semibold">SET</h3>
            <span className="text-white/70 text-sm font-mono">size = {seen.length}</span>
          </div>
          <div className="rounded-xl border-2 border-emerald-400/30 bg-emerald-500/5 p-6 min-h-[100px] flex flex-wrap gap-3 items-center">
            {setItems.length > 0 ? (
              setItems.map(({ id, v }) => (
                <Chip key={id} id={id} value={v} active={false} duplicate={false} inSet />
              ))
            ) : (
              <span className="text-white/30 text-sm italic">Empty set - unique elements will appear here</span>
            )}
          </div>
        </section>
      </LayoutGroup>

      {/* Result Banner */}
      <AnimatePresence>
        {result !== null && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`mt-6 rounded-xl border-2 p-4 text-center text-base font-semibold ${
              result
                ? "bg-rose-500/10 border-rose-400/30 text-rose-200"
                : "bg-emerald-500/10 border-emerald-400/30 text-emerald-200"
            }`}
          >
            {result
              ? "Set size (" + seen.length + ") < Array size (" + parsed.length + ") → duplicates existed → True"
              : "Set size (" + seen.length + ") = Array size (" + parsed.length + ") → all unique → False"}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="mt-8 pt-6 border-t border-white/10 space-y-2 text-sm text-white/60 leading-relaxed">
        <p>
          <span className="font-semibold text-white/80">Visualization logic</span> mirrors the Python set approach: iterate through the entire array from left to right, adding unique elements to the Set (duplicates are automatically discarded). After processing all elements, compare the set size to the array size. If set size &lt; array size, duplicates existed.
        </p>
      </div>
    </div>
  );
}

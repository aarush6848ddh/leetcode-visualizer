'use client';

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const CharChip = ({ char, index, active, matched, isS }: { char: string; index: number; active?: boolean; matched?: boolean; isS: boolean }) => (
  <motion.div
    layout
    className={`rounded-lg px-4 py-3 text-center min-w-[60px] shadow-lg flex flex-col items-center justify-center relative
      ${active ? "bg-amber-500 shadow-amber-500/50 ring-2 ring-amber-300" 
        : matched ? "bg-emerald-600 shadow-emerald-600/50" 
        : "bg-slate-700 shadow-slate-700/50"}
      text-white`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: active ? 1.1 : 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 28 }}
  >
    <div className="text-xl font-bold">{char}</div>
    <div className="text-xs text-white/70 mt-1">i={index}</div>
    {isS && (
      <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
        s
      </div>
    )}
    {!isS && (
      <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
        t
      </div>
    )}
  </motion.div>
);

const AUTO_LOOP = true;

export default function IsSubsequenceVisualizer() {
  const s = "node";
  const t = "neetcode";
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [matchedChars, setMatchedChars] = useState<number[]>([]);
  const [result, setResult] = useState<boolean | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const speed = 1500;

  const reset = () => {
    setI(0);
    setJ(0);
    setActiveLine(null);
    setMatchedChars([]);
    setResult(null);
    setIsRunning(true);
  };

  const step = () => {
    if (!isRunning || result !== null) return; // finished or paused

    // Initialize pointers
    if (i === 0 && j === 0 && activeLine === null) {
      setActiveLine(3); // i = j = 0
      return;
    }

    // Check while loop condition
    if (activeLine === 3 || activeLine === 8) {
      if (i >= s.length || j >= t.length) {
        // Exit loop
        setActiveLine(8); // while i < len(s) and j < len(t): (condition false)
        setTimeout(() => {
          setActiveLine(9); // return i == len(s)
          const finalResult = i === s.length;
          setResult(finalResult);
          setTimeout(() => setActiveLine(null), 500);
        }, 300);
        return;
      }
      setActiveLine(4); // while i < len(s) and j < len(t):
      return;
    }

    // Check if characters match
    if (activeLine === 4) {
      // First check if we should exit the loop
      if (i >= s.length || j >= t.length) {
        // Exit loop - condition is false
        setActiveLine(8); // while i < len(s) and j < len(t): (condition false)
        setTimeout(() => {
          setActiveLine(9); // return i == len(s)
          const finalResult = i === s.length;
          setResult(finalResult);
          setTimeout(() => setActiveLine(null), 500);
        }, 300);
        return;
      }
      
      // Continue with the loop body
      if (s[i] === t[j]) {
        setActiveLine(5); // if s[i] == t[j]:
        return;
      } else {
        setActiveLine(7); // j += 1 (skip the if block)
        return;
      }
    }

    // If match found, increment i
    if (activeLine === 5) {
      setActiveLine(6); // i += 1
      setMatchedChars((prev) => [...prev, j]);
      const newI = i + 1;
      const currentJ = j; // Capture current j value
      setI(newI);
      
      setTimeout(() => {
        setActiveLine(7); // j += 1
        const newJ = currentJ + 1;
        setJ(newJ);
        
        // Check if we should exit after incrementing both i and j
        if (newI >= s.length || newJ >= t.length) {
          // Exit loop - condition is false
          setTimeout(() => {
            setActiveLine(8); // while i < len(s) and j < len(t): (condition false)
            setTimeout(() => {
              setActiveLine(9); // return i == len(s)
              const finalResult = newI === s.length;
              setResult(finalResult);
              setTimeout(() => setActiveLine(null), 500);
            }, 300);
          }, 200);
        } else {
          // Continue looping
          setTimeout(() => {
            setActiveLine(4); // loop back to condition check
          }, 200);
        }
      }, 300);
      return;
    }

    // Increment j (when no match or after match)
    if (activeLine === 7) {
      const newJ = j + 1;
      setJ(newJ);
      
      // Check if we should exit after incrementing j
      // Use the new value we just calculated
      if (i >= s.length || newJ >= t.length) {
        // Exit loop - condition is false
        setActiveLine(8); // while i < len(s) and j < len(t): (condition false)
        setTimeout(() => {
          setActiveLine(9); // return i == len(s)
          const finalResult = i === s.length;
          setResult(finalResult);
          setTimeout(() => setActiveLine(null), 500);
        }, 300);
        return;
      }
      
      // Continue looping
      setActiveLine(4); // loop back to condition check
      return;
    }
  };

  useInterval(() => step(), (isRunning && result === null) ? speed : null);

  // auto-loop after a short pause
  useEffect(() => {
    if (result === null || !AUTO_LOOP) return;
    setIsRunning(false); // Pause the interval
    const t = setTimeout(() => {
      reset();
      setIsRunning(true); // Resume after reset
    }, 3000);
    return () => clearTimeout(t);
  }, [result]);

  const sChars = s.split('').map((char, idx) => ({ char, idx }));
  const tChars = t.split('').map((char, idx) => ({ char, idx }));

  return (
    <div className="w-full bg-[#0c0f14] text-white rounded-xl border border-gray-800 p-4 sm:p-6 lg:p-8 shadow-xl">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Is Subsequence — Visualizer</h2>
        <p className="text-white/70 text-xs sm:text-sm">
          Algorithm: Use two pointers to check if string s is a subsequence of string t.
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
              {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">isSubsequence</span>(<span className="text-green-400">self</span>, <span className="text-orange-400">s</span>: <span className="text-blue-400">str</span>, <span className="text-orange-400">t</span>: <span className="text-blue-400">str</span>) <span className="text-purple-400">-&gt;</span> <span className="text-blue-400">bool</span>:
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 3 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-orange-400">i</span> = <span className="text-orange-400">j</span> = <span className="text-blue-400">0</span>
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 4 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-purple-400">while</span> <span className="text-orange-400">i</span> &lt; <span className="text-blue-400">len</span>(<span className="text-orange-400">s</span>) <span className="text-purple-400">and</span> <span className="text-orange-400">j</span> &lt; <span className="text-blue-400">len</span>(<span className="text-orange-400">t</span>):
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 5 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'            '}<span className="text-purple-400">if</span> <span className="text-orange-400">s</span>[<span className="text-orange-400">i</span>] == <span className="text-orange-400">t</span>[<span className="text-orange-400">j</span>]:
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 6 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'                '}<span className="text-orange-400">i</span> += <span className="text-blue-400">1</span>
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 7 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'            '}<span className="text-orange-400">j</span> += <span className="text-blue-400">1</span>
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 8 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-purple-400">return</span> <span className="text-orange-400">i</span> == <span className="text-blue-400">len</span>(<span className="text-orange-400">s</span>)
            </div>
          </code>
        </pre>
      </section>

      {/* String s Section */}
      <section className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-xs sm:text-sm uppercase tracking-widest text-blue-300 font-semibold">STRING S (subsequence to find)</h3>
          <div className="flex gap-3 text-white/70 text-xs sm:text-sm font-mono">
            <span>i = {i}</span>
            {i < s.length && <span>Looking for: <span className="text-amber-400 font-bold">{s[i]}</span></span>}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 items-center min-h-[80px]">
          {sChars.map(({ char, idx }) => {
            const active = idx === i && activeLine !== null && activeLine !== 8 && activeLine !== 9;
            const matched = idx < i;
            
            return (
              <motion.div key={`s-${idx}`} layout className="relative">
                <CharChip
                  char={char}
                  index={idx}
                  active={active}
                  matched={matched}
                  isS={true}
                />
              </motion.div>
            );
          })}
        </div>
        {i === s.length && (
          <div className="mt-2 text-xs text-emerald-400 text-center font-semibold">
            ✓ All characters matched!
          </div>
        )}
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

      {/* String t Section */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs sm:text-sm uppercase tracking-widest text-purple-300 font-semibold">STRING T (searching in)</h3>
          <div className="flex gap-3 text-white/70 text-xs sm:text-sm font-mono">
            <span>j = {j}</span>
            {j < t.length && <span>Current: <span className="text-amber-400 font-bold">{t[j]}</span></span>}
          </div>
        </div>
        <div className="rounded-xl border-2 border-purple-400/30 bg-purple-500/5 p-6 min-h-[100px] flex flex-wrap gap-3 items-center">
          {tChars.map(({ char, idx }) => {
            const active = idx === j && activeLine !== null && activeLine !== 8 && activeLine !== 9;
            const matched = matchedChars.includes(idx);
            
            return (
              <motion.div key={`t-${idx}`} layout className="relative">
                <CharChip
                  char={char}
                  index={idx}
                  active={active}
                  matched={matched}
                  isS={false}
                />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Result Banner */}
      <AnimatePresence>
        {result !== null && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`mt-6 rounded-xl border-2 p-4 text-center text-base font-semibold ${
              result 
                ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200' 
                : 'border-red-400/30 bg-red-500/10 text-red-200'
            }`}
          >
            Result: {result ? 'True' : 'False'} — {result ? 's is a subsequence of t' : 's is NOT a subsequence of t'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="mt-6 flex gap-3 justify-center">
        <Button onClick={reset} variant="ghost">
          Reset
        </Button>
      </div>

      {/* Instructions */}
      <div className="mt-8 pt-6 border-t border-white/10 space-y-2 text-sm text-white/60 leading-relaxed">
        <p>
          <span className="font-semibold text-white/80">Visualization logic:</span> Two pointers i and j traverse strings s and t respectively. When s[i] matches t[j], we increment i (found a character). We always increment j to continue searching. If i reaches the end of s, all characters were found in order → True.
        </p>
      </div>
    </div>
  );
}


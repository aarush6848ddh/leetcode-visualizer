'use client';

import React, { useEffect, useRef, useState } from "react";
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

const CharChip = ({ char, ascii, active, processed, isPair }: { char: string; ascii: number; active?: boolean; processed?: boolean; isPair?: boolean }) => (
  <motion.div
    layout
    className={`rounded-lg px-4 py-3 text-center min-w-[80px] shadow-lg flex flex-col items-center justify-center
      ${active ? "bg-amber-500 shadow-amber-500/50" : processed ? "bg-emerald-600 shadow-emerald-600/50" : isPair ? "bg-indigo-500 shadow-indigo-500/50" : "bg-blue-600 shadow-blue-600/50"}
      text-white`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: active ? 1.1 : 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 28 }}
  >
    <div className="text-2xl font-bold">{char}</div>
    <div className="text-xs text-white/80 mt-1">ASCII: {ascii}</div>
  </motion.div>
);

const AUTO_LOOP = true;

export default function ScoreOfStringVisualizer() {
  const inputString = "code";
  const [i, setI] = useState(0);
  const [res, setRes] = useState(0);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [currentDiff, setCurrentDiff] = useState<number | null>(null);
  const [calculatedPairs, setCalculatedPairs] = useState<number[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const speed = 2000;

  const reset = () => {
    setI(0);
    setRes(0);
    setActiveLine(null);
    setCurrentDiff(null);
    setCalculatedPairs([]);
    setResult(null);
  };

  const step = () => {
    if (result !== null) return; // finished

    // Initialize: convert string to list
    if (i === 0 && activeLine === null) {
      setActiveLine(3); // s_list = list(s)
      return;
    }

    // Initialize result
    if (i === 0 && activeLine === 3) {
      setActiveLine(4); // res = 0
      return;
    }

    // Start loop
    if (i === 0 && activeLine === 4) {
      setActiveLine(5); // for i in range(len(s_list) - 1):
      return;
    }

    // Check if we're done
    if (i >= inputString.length - 1 && activeLine === 5) {
      setActiveLine(7); // return res
      setResult(res);
      setTimeout(() => setActiveLine(null), 500);
      return;
    }

    // Calculate difference for current pair
    if (activeLine === 5) {
      setActiveLine(6); // res += abs(ord(s_list[i]) - ord(s_list[i + 1]))
      const char1 = inputString.charCodeAt(i);
      const char2 = inputString.charCodeAt(i + 1);
      const diff = Math.abs(char1 - char2);
      setCurrentDiff(diff);
      setRes((prev) => prev + diff);
      setCalculatedPairs((prev) => [...prev, i]);
      return;
    }

    // Move to next iteration
    if (activeLine === 6) {
      setI((prev) => prev + 1);
      setCurrentDiff(null);
      setActiveLine(5); // Back to loop
      return;
    }
  };

  useInterval(() => step(), result === null ? speed : null);

  // auto-loop after a short pause
  useEffect(() => {
    if (result === null || !AUTO_LOOP) return;
    const t = setTimeout(() => reset(), 2000);
    return () => clearTimeout(t);
  }, [result]);

  const chars = inputString.split('').map((char, idx) => ({
    char,
    ascii: char.charCodeAt(0),
    idx,
  }));

  return (
    <div className="w-full bg-[#0c0f14] text-white rounded-xl border border-gray-800 p-4 sm:p-6 lg:p-8 shadow-xl">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Score of a String — Visualizer</h2>
        <p className="text-white/70 text-xs sm:text-sm">
          Algorithm: Calculate the sum of absolute differences between ASCII values of adjacent characters.
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
              {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">scoreOfString</span>(<span className="text-green-400">self</span>, <span className="text-orange-400">s</span>: <span className="text-blue-400">str</span>) <span className="text-purple-400">-&gt;</span> <span className="text-blue-400">int</span>:
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 3 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-orange-400">s_list</span> = <span className="text-blue-400">list</span>(<span className="text-orange-400">s</span>)
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 4 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-orange-400">res</span> = <span className="text-blue-400">0</span>
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 5 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-purple-400">for</span> <span className="text-orange-400">i</span> <span className="text-purple-400">in</span> <span className="text-blue-400">range</span>(<span className="text-blue-400">len</span>(<span className="text-orange-400">s_list</span>) - <span className="text-blue-400">1</span>):
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 6 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'            '}<span className="text-orange-400">res</span> += <span className="text-blue-400">abs</span>(<span className="text-blue-400">ord</span>(<span className="text-orange-400">s_list</span>[<span className="text-orange-400">i</span>]) - <span className="text-blue-400">ord</span>(<span className="text-orange-400">s_list</span>[<span className="text-orange-400">i</span> + <span className="text-blue-400">1</span>]))
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 7 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : ''}`}>
              {'        '}<span className="text-purple-400">return</span> <span className="text-orange-400">res</span>
            </div>
          </code>
        </pre>
      </section>

      <LayoutGroup>
        {/* String Section */}
        <section className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm uppercase tracking-widest text-white/80 font-semibold">STRING</h3>
            <span className="text-white/70 text-xs sm:text-sm font-mono">i = {i}</span>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4 items-center min-h-[100px] justify-center">
            {chars.map(({ char, ascii, idx }) => {
              const active = idx === i || idx === i + 1;
              const processed = calculatedPairs.includes(idx) || calculatedPairs.includes(idx - 1);
              const isPair = idx === i || idx === i + 1;
              
              return (
                <motion.div key={idx} layout className="relative">
                  <CharChip
                    char={char}
                    ascii={ascii}
                    active={active && result === null}
                    processed={processed && !active}
                    isPair={isPair && !active && !processed}
                  />
                  {idx < chars.length - 1 && (
                    <motion.div
                      className="absolute -right-2 top-1/2 -translate-y-1/2 text-white/40 text-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      →
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Calculation Section */}
        {currentDiff !== null && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 sm:mb-6 rounded-xl border-2 border-amber-400/30 bg-amber-500/10 p-4"
          >
            <h3 className="text-xs sm:text-sm uppercase tracking-widest text-amber-300 font-semibold mb-3">Current Calculation</h3>
            <div className="text-center">
              <div className="text-lg sm:text-xl font-mono text-white">
                |{chars[i].ascii} - {chars[i + 1].ascii}| = {currentDiff}
              </div>
              <div className="text-sm text-white/70 mt-2">
                |'{chars[i].char}' - '{chars[i + 1].char}'| = {currentDiff}
              </div>
            </div>
          </motion.section>
        )}

        {/* Result Section */}
        <section className="mb-6 rounded-xl border-2 border-emerald-400/30 bg-emerald-500/5 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs sm:text-sm uppercase tracking-widest text-emerald-300 font-semibold">Running Sum</h3>
            <span className="text-white/70 text-sm font-mono">res = {res}</span>
          </div>
          <div className="text-center">
            <motion.div
              key={res}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-4xl sm:text-5xl font-bold text-emerald-400"
            >
              {res}
            </motion.div>
            {calculatedPairs.length > 0 && (
              <div className="mt-3 text-sm text-white/60">
                {calculatedPairs.map((pairIdx, calcIdx) => {
                  const diff = Math.abs(chars[pairIdx].ascii - chars[pairIdx + 1].ascii);
                  return (
                    <span key={calcIdx} className="mr-2">
                      {calcIdx > 0 && '+'} {diff}
                    </span>
                  );
                })}
                {calculatedPairs.length > 0 && ' = ' + res}
              </div>
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
            className="mt-6 rounded-xl border-2 border-emerald-400/30 bg-emerald-500/10 p-4 text-center text-base font-semibold text-emerald-200"
          >
            Final Score: {result}
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
          <span className="font-semibold text-white/80">Visualization logic:</span> Iterate through the string, calculating the absolute difference between ASCII values of each pair of adjacent characters. Sum all differences to get the final score.
        </p>
      </div>
    </div>
  );
}


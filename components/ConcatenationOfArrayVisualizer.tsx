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

const Chip = ({ id, value, active, processed, inResult, isSecondIteration }: any) => (
  <motion.div
    layoutId={`chip-${id}`}
    className={`rounded-full px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 text-sm sm:text-base font-bold tracking-wide shadow-lg min-w-[48px] sm:min-w-[56px] lg:min-w-[60px] flex items-center justify-center
      ${
        active ? "bg-amber-500 shadow-amber-500/50" 
        : processed && !inResult ? "bg-blue-600 shadow-blue-600/50"
        : inResult && !isSecondIteration ? "bg-emerald-600 shadow-emerald-600/50"
        : inResult && isSecondIteration ? "bg-purple-600 shadow-purple-600/50"
        : "bg-slate-700 shadow-slate-700/50"
      }
      text-white`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: active ? 1.05 : 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 28 }}
  >
    {value}
  </motion.div>
);

const AUTO_LOOP = true;

export default function ConcatenationOfArrayVisualizer() {
  const nums = [1, 4, 1, 2];
  const [outerI, setOuterI] = useState(0);
  const [innerI, setInnerI] = useState(0);
  const [ans, setAns] = useState<number[]>([]);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [result, setResult] = useState<number[] | null>(null);
  const [phase, setPhase] = useState<'init' | 'outer_loop' | 'inner_loop' | 'append' | 'done'>('init');
  const speed = 1500;

  const reset = () => {
    setOuterI(0);
    setInnerI(0);
    setAns([]);
    setActiveLine(null);
    setResult(null);
    setPhase('init');
  };

  const step = () => {
    if (phase === 'done') return;

    // Initialize ans array
    if (phase === 'init') {
      setActiveLine(3); // ans = []
      setPhase('outer_loop');
      return;
    }

    // Start outer loop
    if (phase === 'outer_loop') {
      if (outerI >= 2) {
        setActiveLine(7); // return ans
        setResult([...ans]);
        setPhase('done');
        setTimeout(() => setActiveLine(null), 500);
        return;
      }
      setActiveLine(4); // for i in range(2):
      setPhase('inner_loop');
      setInnerI(0);
      return;
    }

    // Inner loop - iterate through nums
    if (phase === 'inner_loop') {
      if (innerI >= nums.length) {
        // Finished inner loop, move to next outer iteration
        setOuterI((prev) => prev + 1);
        setPhase('outer_loop');
        return;
      }
      setActiveLine(5); // for n in nums:
      setPhase('append');
      return;
    }

    // Append current element
    if (phase === 'append') {
      setActiveLine(6); // ans.append(n)
      setAns((prev) => [...prev, nums[innerI]]);
      setInnerI((prev) => prev + 1);
      setPhase('inner_loop');
      return;
    }
  };

  useInterval(() => step(), phase !== 'done' ? speed : null);

  // auto-loop after a short pause
  useEffect(() => {
    if (phase !== 'done' || !AUTO_LOOP) return;
    const t = setTimeout(() => reset(), 2000);
    return () => clearTimeout(t);
  }, [phase]);

  const arrayItems = nums.map((v, idx) => ({ id: `arr-${idx}`, v, idx }));
  const resultItems = ans.map((v, idx) => ({ 
    id: `ans-${idx}`, 
    v, 
    idx,
    isSecondIteration: idx >= nums.length
  }));

  return (
    <div className="w-full bg-[#0c0f14] text-white rounded-xl border border-gray-800 p-4 sm:p-6 lg:p-8 shadow-xl">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Concatenation of Array — Visualizer</h2>
        <p className="text-white/70 text-xs sm:text-sm">
          Algorithm: Iterate twice through the array, appending all elements to the result array each time.
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
              {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">getConcatenation</span>(<span className="text-green-400">self</span>, <span className="text-orange-400">nums</span>: <span className="text-blue-400">List</span>[<span className="text-blue-400">int</span>]) <span className="text-purple-400">-&gt;</span> <span className="text-blue-400">List</span>[<span className="text-blue-400">int</span>]:
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 3 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-orange-400">ans</span> = []
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 4 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-purple-400">for</span> <span className="text-orange-400">i</span> <span className="text-purple-400">in</span> <span className="text-blue-400">range</span>(<span className="text-blue-400">2</span>):
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 5 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'            '}<span className="text-purple-400">for</span> <span className="text-orange-400">n</span> <span className="text-purple-400">in</span> <span className="text-orange-400">nums</span>:
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 6 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'                '}<span className="text-orange-400">ans</span>.<span className="text-blue-400">append</span>(<span className="text-orange-400">n</span>)
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 7 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : ''}`}>
              {'        '}<span className="text-purple-400">return</span> <span className="text-orange-400">ans</span>
            </div>
          </code>
        </pre>
      </section>

      <LayoutGroup>
        {/* Original Array Section */}
        <section className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm uppercase tracking-widest text-white/80 font-semibold">ORIGINAL ARRAY (nums)</h3>
            <div className="flex gap-3 text-white/70 text-xs sm:text-sm font-mono">
              <span>Outer loop: i = {outerI}/2</span>
              {phase === 'inner_loop' || phase === 'append' ? (
                <span>Inner loop: n = {nums[innerI]}</span>
              ) : null}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 items-center min-h-[50px] sm:min-h-[60px]">
            {arrayItems.map(({ id, v, idx }) => {
              const active = (phase === 'inner_loop' || phase === 'append') && idx === innerI;
              const processed = phase === 'append' && idx < innerI;
              
              return (
                <motion.div key={id} layout className="relative">
                  <Chip
                    id={id}
                    value={v}
                    active={active}
                    processed={processed}
                    inResult={false}
                    isSecondIteration={false}
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

        {/* Result Array Section */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm uppercase tracking-widest text-emerald-300 font-semibold">RESULT ARRAY (ans)</h3>
            <span className="text-white/70 text-sm font-mono">length = {ans.length}</span>
          </div>
          <div className="rounded-xl border-2 border-emerald-400/30 bg-emerald-500/5 p-6 min-h-[100px] flex flex-wrap gap-3 items-center">
            {resultItems.length > 0 ? (
              resultItems.map(({ id, v, idx, isSecondIteration }) => (
                <Chip 
                  key={id} 
                  id={id} 
                  value={v} 
                  active={false}
                  processed={false}
                  inResult={true}
                  isSecondIteration={isSecondIteration}
                />
              ))
            ) : (
              <span className="text-white/30 text-sm italic">Empty array - elements will appear here</span>
            )}
          </div>
          {ans.length > 0 && ans.length < nums.length * 2 && (
            <div className="mt-3 text-xs text-white/60 text-center">
              Iteration {outerI + 1} of 2: {ans.length} / {nums.length * 2} elements
            </div>
          )}
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
            Final Result: [{result.join(', ')}]
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
          <span className="font-semibold text-white/80">Visualization logic:</span> The algorithm iterates twice through the original array. In each iteration, all elements are appended to the result array. Green chips represent elements from the first iteration, purple chips represent elements from the second iteration.
        </p>
      </div>
    </div>
  );
}


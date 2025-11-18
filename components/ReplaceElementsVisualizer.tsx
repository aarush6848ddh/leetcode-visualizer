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

const Chip = ({ id, value, index, active, replaced, original }: { 
  id: string; 
  value: number; 
  index: number;
  active?: boolean; 
  replaced?: boolean;
  original?: number;
}) => (
  <motion.div
    layoutId={id}
    className={`rounded-lg px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 text-sm sm:text-base font-bold tracking-wide shadow-lg min-w-[48px] sm:min-w-[56px] lg:min-w-[60px] flex flex-col items-center justify-center relative
      ${
        active ? "bg-amber-500 shadow-amber-500/50 ring-2 ring-amber-300" 
        : replaced ? "bg-emerald-600 shadow-emerald-600/50"
        : "bg-slate-700 shadow-slate-700/50"
      }
      text-white`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: active ? 1.1 : 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 28 }}
  >
    <div className="text-xl font-bold">{value}</div>
    <div className="text-xs text-white/70 mt-1">i={index}</div>
    {original !== undefined && original !== value && (
      <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
        {original}
      </div>
    )}
  </motion.div>
);

const AUTO_LOOP = true;

export default function ReplaceElementsVisualizer() {
  const initialArr = [2, 4, 5, 3, 1, 2];
  const [arr, setArr] = useState<number[]>([...initialArr]);
  const [i, setI] = useState(initialArr.length - 1);
  const [rightMax, setRightMax] = useState(-1);
  const [newMax, setNewMax] = useState<number | null>(null);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [result, setResult] = useState<number[] | null>(null);
  const [phase, setPhase] = useState<'init' | 'loop' | 'calc_max' | 'replace' | 'update_max' | 'done'>('init');
  const [isRunning, setIsRunning] = useState(true);
  const speed = 2000;
  const inTransition = useRef(false);

  const reset = () => {
    setArr([...initialArr]);
    setI(initialArr.length - 1);
    setRightMax(-1);
    setNewMax(null);
    setActiveLine(null);
    setResult(null);
    setPhase('init');
    setIsRunning(true);
    inTransition.current = false;
  };

  const step = () => {
    if (!isRunning || result !== null || inTransition.current) return;

    // Initialize right_max
    if (phase === 'init') {
      setActiveLine(3); // right_max = -1
      inTransition.current = true;
      setTimeout(() => {
        setPhase('loop');
        inTransition.current = false;
      }, 400);
      return;
    }

    // Check loop condition
    if (phase === 'loop') {
      if (i < 0) {
        // Loop finished
        setActiveLine(8); // return arr
        setResult([...arr]);
        setPhase('done');
        setIsRunning(false);
        setTimeout(() => setActiveLine(null), 500);
        return;
      }
      setActiveLine(4); // for i in range(len(arr) - 1, -1, -1):
      inTransition.current = true;
      setTimeout(() => {
        setPhase('calc_max');
        inTransition.current = false;
      }, 400);
      return;
    }

    // Calculate new_max
    if (phase === 'calc_max') {
      setActiveLine(5); // new_max = max(right_max, arr[i])
      const currentValue = arr[i];
      const calculatedMax = Math.max(rightMax, currentValue);
      setNewMax(calculatedMax);
      inTransition.current = true;
      setTimeout(() => {
        setPhase('replace');
        inTransition.current = false;
      }, 400);
      return;
    }

    // Replace arr[i] with right_max
    if (phase === 'replace') {
      setActiveLine(6); // arr[i] = right_max
      setArr((prev) => {
        const newArr = [...prev];
        newArr[i] = rightMax;
        return newArr;
      });
      inTransition.current = true;
      setTimeout(() => {
        setPhase('update_max');
        inTransition.current = false;
      }, 400);
      return;
    }

    // Update right_max
    if (phase === 'update_max') {
      setActiveLine(7); // right_max = new_max (this happens after arr[i] = right_max)
      setRightMax(newMax!);
      setNewMax(null);
      inTransition.current = true;
      setTimeout(() => {
        setI((prev) => prev - 1);
        setPhase('loop');
        inTransition.current = false;
      }, 400);
      return;
    }
  };

  useInterval(() => step(), (isRunning && result === null) ? speed : null);

  // auto-loop after a short pause
  useEffect(() => {
    if (phase !== 'done' || !AUTO_LOOP) return;
    const t = setTimeout(() => {
      reset();
    }, 3000);
    return () => clearTimeout(t);
  }, [phase]);

  const arrayItems = arr.map((v, idx) => ({ 
    id: `arr-${idx}`, 
    value: v, 
    index: idx,
    original: initialArr[idx]
  }));

  return (
    <div className="w-full bg-[#0c0f14] text-white rounded-xl border border-gray-800 p-4 sm:p-6 lg:p-8 shadow-xl">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Replace Elements With Greatest Element On Right Side — Visualizer</h2>
        <p className="text-white/70 text-xs sm:text-sm">
          Algorithm: Traverse from right to left, replacing each element with the maximum element to its right.
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
              {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">replaceElements</span>(<span className="text-green-400">self</span>, <span className="text-orange-400">arr</span>: <span className="text-blue-400">List</span>[<span className="text-blue-400">int</span>]) <span className="text-purple-400">-&gt;</span> <span className="text-blue-400">List</span>[<span className="text-blue-400">int</span>]:
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 3 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-orange-400">right_max</span> = <span className="text-blue-400">-1</span>
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 4 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-purple-400">for</span> <span className="text-orange-400">i</span> <span className="text-purple-400">in</span> <span className="text-blue-400">range</span>(<span className="text-blue-400">len</span>(<span className="text-orange-400">arr</span>) <span className="text-purple-400">-</span> <span className="text-blue-400">1</span>, <span className="text-purple-400">-1</span>, <span className="text-purple-400">-1</span>):
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 5 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'            '}<span className="text-orange-400">new_max</span> = <span className="text-blue-400">max</span>(<span className="text-orange-400">right_max</span>, <span className="text-orange-400">arr</span>[<span className="text-orange-400">i</span>])
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 6 && phase === 'replace' ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'            '}<span className="text-orange-400">arr</span>[<span className="text-orange-400">i</span>] = <span className="text-orange-400">right_max</span>
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 7 && phase === 'update_max' ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'            '}<span className="text-orange-400">right_max</span> = <span className="text-orange-400">new_max</span>
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 8 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : ''}`}>
              {'        '}<span className="text-purple-400">return</span> <span className="text-orange-400">arr</span>
            </div>
          </code>
        </pre>
      </section>

      {/* Variables Display */}
      <section className="mb-4 sm:mb-6 rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4">
        <h3 className="text-xs sm:text-sm uppercase tracking-widest text-white/80 font-semibold mb-3">Variables</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          <div className="bg-slate-800/50 rounded-lg p-2">
            <div className="text-white/60 text-xs mb-1">i (current index)</div>
            <div className="text-emerald-400 font-mono font-bold text-lg">{i >= 0 ? i : 'done'}</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-2">
            <div className="text-white/60 text-xs mb-1">right_max</div>
            <div className="text-blue-400 font-mono font-bold text-lg">{rightMax}</div>
          </div>
          {newMax !== null && (
            <div className="bg-slate-800/50 rounded-lg p-2">
              <div className="text-white/60 text-xs mb-1">new_max</div>
              <div className="text-amber-400 font-mono font-bold text-lg">{newMax}</div>
            </div>
          )}
        </div>
      </section>

      <LayoutGroup>
        {/* Array Section */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm uppercase tracking-widest text-white/80 font-semibold">ARRAY (arr)</h3>
            <span className="text-white/70 text-sm font-mono">
              {phase === 'done' ? 'Final result' : `Processing index ${i}`}
            </span>
          </div>
          <div className="rounded-xl border-2 border-slate-600/50 bg-slate-800/30 p-6 min-h-[100px] flex flex-wrap gap-3 items-center justify-center">
            {arrayItems.map(({ id, value, index, original }) => {
              const active = phase !== 'init' && phase !== 'done' && index === i;
              const replaced = index > i || (index === i && phase === 'replace');
              
              return (
                <Chip
                  key={id}
                  id={id}
                  value={value}
                  index={index}
                  active={active}
                  replaced={replaced && index !== i}
                  original={original}
                />
              );
            })}
          </div>
          {phase !== 'init' && phase !== 'done' && (
            <div className="mt-3 text-xs text-white/60 text-center">
              {phase === 'calc_max' && (
                <span>Calculating: max({rightMax}, {arr[i]}) = {newMax !== null ? newMax : '...'}</span>
              )}
              {phase === 'replace' && (
                <span>Replacing arr[{i}] = {rightMax}</span>
              )}
              {phase === 'update_max' && (
                <span>Updating right_max = {newMax}</span>
              )}
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
          <span className="font-semibold text-white/80">Visualization logic:</span> The algorithm traverses the array from right to left. At each position, it replaces the element with the maximum value seen so far to the right (stored in right_max). The right_max is then updated to include the current element's original value.
        </p>
        <p className="mt-2">
          <span className="font-semibold text-white/80">Color coding:</span>
        </p>
        <ul className="list-disc list-inside ml-2 space-y-1 mt-1">
          <li><span className="text-amber-400">Orange chip</span> = Currently processing this element</li>
          <li><span className="text-emerald-400">Green chip</span> = Element has been replaced</li>
          <li><span className="text-slate-400">Gray chip</span> = Element not yet processed</li>
          <li><span className="text-blue-400">Blue badge (top-right corner)</span> = <strong>Original value</strong> before replacement (only shown when different from current value)</li>
        </ul>
      </div>
    </div>
  );
}


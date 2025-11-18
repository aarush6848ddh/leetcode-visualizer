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

const Chip = ({ id, value, index, active, processed, isResult }: { 
  id: string; 
  value: number; 
  index: number;
  active?: boolean; 
  processed?: boolean;
  isResult?: boolean;
}) => (
  <motion.div
    layoutId={id}
    className={`rounded-lg px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 text-sm sm:text-base font-bold tracking-wide shadow-lg min-w-[48px] sm:min-w-[56px] lg:min-w-[60px] flex flex-col items-center justify-center relative
      ${
        active ? "bg-amber-500 shadow-amber-500/50 ring-2 ring-amber-300" 
        : processed && !isResult ? "bg-blue-600 shadow-blue-600/50"
        : isResult && processed ? "bg-emerald-600 shadow-emerald-600/50"
        : isResult ? "bg-purple-600 shadow-purple-600/50"
        : "bg-slate-700 shadow-slate-700/50"
      }
      text-white`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: active ? 1.1 : 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 28 }}
  >
    <div className="text-xl font-bold">{value}</div>
    <div className="text-xs text-white/70 mt-1">i={index}</div>
  </motion.div>
);

const AUTO_LOOP = true;

export default function ProductOfArrayExceptSelfVisualizer() {
  const nums = [1, 2, 4, 6];
  const [res, setRes] = useState<number[]>([1, 1, 1, 1]);
  const [i, setI] = useState(0);
  const [prefix, setPrefix] = useState(1);
  const [postfix, setPostfix] = useState(1);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [result, setResult] = useState<number[] | null>(null);
  const [phase, setPhase] = useState<'init' | 'prefix_init' | 'prefix_loop' | 'prefix_assign' | 'prefix_update' | 'postfix_init' | 'postfix_loop' | 'postfix_multiply' | 'postfix_update' | 'done'>('init');
  const [isRunning, setIsRunning] = useState(true);
  const speed = 2000;
  const inTransition = useRef(false);

  const reset = () => {
    setRes([1, 1, 1, 1]);
    setI(0);
    setPrefix(1);
    setPostfix(1);
    setActiveLine(null);
    setResult(null);
    setPhase('init');
    setIsRunning(true);
    inTransition.current = false;
  };

  const step = () => {
    if (!isRunning || result !== null || inTransition.current) return;

    // Initialize result array
    if (phase === 'init') {
      setActiveLine(3); // res = [1] * (len(nums))
      inTransition.current = true;
      setTimeout(() => {
        setPhase('prefix_init');
        inTransition.current = false;
      }, 400);
      return;
    }

    // Initialize prefix
    if (phase === 'prefix_init') {
      setActiveLine(5); // prefix = 1
      inTransition.current = true;
      setTimeout(() => {
        setPhase('prefix_loop');
        setI(0);
        inTransition.current = false;
      }, 400);
      return;
    }

    // Prefix loop
    if (phase === 'prefix_loop') {
      if (i >= nums.length) {
        // Move to postfix phase
        setPhase('postfix_init');
        setI(nums.length - 1);
        return;
      }
      setActiveLine(6); // for i in range(len(nums)):
      inTransition.current = true;
      setTimeout(() => {
        setPhase('prefix_assign');
        inTransition.current = false;
      }, 400);
      return;
    }

    // Assign prefix to res[i]
    if (phase === 'prefix_assign') {
      setActiveLine(7); // res[i] = prefix
      setRes((prev) => {
        const newRes = [...prev];
        newRes[i] = prefix;
        return newRes;
      });
      inTransition.current = true;
      setTimeout(() => {
        setPhase('prefix_update');
        inTransition.current = false;
      }, 400);
      return;
    }

    // Update prefix
    if (phase === 'prefix_update') {
      setActiveLine(8); // prefix *= nums[i]
      setPrefix((prev) => prev * nums[i]);
      inTransition.current = true;
      setTimeout(() => {
        setI((prev) => prev + 1);
        setPhase('prefix_loop');
        inTransition.current = false;
      }, 400);
      return;
    }

    // Initialize postfix
    if (phase === 'postfix_init') {
      setActiveLine(10); // postfix = 1
      inTransition.current = true;
      setTimeout(() => {
        setPhase('postfix_loop');
        inTransition.current = false;
      }, 400);
      return;
    }

    // Postfix loop
    if (phase === 'postfix_loop') {
      if (i < 0) {
        // Done
        setActiveLine(14); // return res
        setResult([...res]);
        setPhase('done');
        setIsRunning(false);
        setTimeout(() => setActiveLine(null), 500);
        return;
      }
      setActiveLine(11); // for i in range(len(nums) - 1, -1, -1):
      inTransition.current = true;
      setTimeout(() => {
        setPhase('postfix_multiply');
        inTransition.current = false;
      }, 400);
      return;
    }

    // Multiply res[i] by postfix
    if (phase === 'postfix_multiply') {
      setActiveLine(12); // res[i] *= postfix
      setRes((prev) => {
        const newRes = [...prev];
        newRes[i] *= postfix;
        return newRes;
      });
      inTransition.current = true;
      setTimeout(() => {
        setPhase('postfix_update');
        inTransition.current = false;
      }, 400);
      return;
    }

    // Update postfix
    if (phase === 'postfix_update') {
      setActiveLine(13); // postfix *= nums[i]
      setPostfix((prev) => prev * nums[i]);
      inTransition.current = true;
      setTimeout(() => {
        setI((prev) => prev - 1);
        setPhase('postfix_loop');
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

  const numsItems = nums.map((v, idx) => ({ 
    id: `nums-${idx}`, 
    value: v, 
    index: idx
  }));

  const resItems = res.map((v, idx) => ({ 
    id: `res-${idx}`, 
    value: v, 
    index: idx
  }));

  const isPrefixPhase = phase.startsWith('prefix');
  const isPostfixPhase = phase.startsWith('postfix');

  return (
    <div className="w-full bg-[#0c0f14] text-white rounded-xl border border-gray-800 p-4 sm:p-6 lg:p-8 shadow-xl">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Product of Array Except Self — Visualizer</h2>
        <p className="text-white/70 text-xs sm:text-sm">
          Algorithm: Two-pass approach - first calculate prefix products, then multiply by postfix products.
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
              {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">productExceptSelf</span>(<span className="text-green-400">self</span>, <span className="text-orange-400">nums</span>: <span className="text-blue-400">List</span>[<span className="text-blue-400">int</span>]) <span className="text-purple-400">-&gt;</span> <span className="text-blue-400">List</span>[<span className="text-blue-400">int</span>]:
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 3 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-orange-400">res</span> = [<span className="text-blue-400">1</span>] * (<span className="text-blue-400">len</span>(<span className="text-orange-400">nums</span>))
            </div>
            <div className="px-2 py-1 rounded">
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 5 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-orange-400">prefix</span> = <span className="text-blue-400">1</span>
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 6 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-purple-400">for</span> <span className="text-orange-400">i</span> <span className="text-purple-400">in</span> <span className="text-blue-400">range</span>(<span className="text-blue-400">len</span>(<span className="text-orange-400">nums</span>)):
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 7 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'            '}<span className="text-orange-400">res</span>[<span className="text-orange-400">i</span>] = <span className="text-orange-400">prefix</span>
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 8 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'            '}<span className="text-orange-400">prefix</span> *= <span className="text-orange-400">nums</span>[<span className="text-orange-400">i</span>]
            </div>
            <div className="px-2 py-1 rounded">
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 10 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-orange-400">postfix</span> = <span className="text-blue-400">1</span>
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 11 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-purple-400">for</span> <span className="text-orange-400">i</span> <span className="text-purple-400">in</span> <span className="text-blue-400">range</span>(<span className="text-blue-400">len</span>(<span className="text-orange-400">nums</span>) <span className="text-purple-400">-</span> <span className="text-blue-400">1</span>, <span className="text-purple-400">-1</span>, <span className="text-purple-400">-1</span>):
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 12 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'            '}<span className="text-orange-400">res</span>[<span className="text-orange-400">i</span>] *= <span className="text-orange-400">postfix</span>
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 13 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'            '}<span className="text-orange-400">postfix</span> *= <span className="text-orange-400">nums</span>[<span className="text-orange-400">i</span>]
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 14 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : ''}`}>
              {'        '}<span className="text-purple-400">return</span> <span className="text-orange-400">res</span>
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
            <div className="text-emerald-400 font-mono font-bold text-lg">{i >= 0 && i < nums.length ? i : (i < 0 ? 'done' : 'done')}</div>
          </div>
          {isPrefixPhase && (
            <div className="bg-slate-800/50 rounded-lg p-2">
              <div className="text-white/60 text-xs mb-1">prefix</div>
              <div className="text-blue-400 font-mono font-bold text-lg">{prefix}</div>
            </div>
          )}
          {isPostfixPhase && (
            <div className="bg-slate-800/50 rounded-lg p-2">
              <div className="text-white/60 text-xs mb-1">postfix</div>
              <div className="text-purple-400 font-mono font-bold text-lg">{postfix}</div>
            </div>
          )}
        </div>
      </section>

      <LayoutGroup>
        {/* Input Array Section */}
        <section className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm uppercase tracking-widest text-white/80 font-semibold">INPUT ARRAY (nums)</h3>
            <span className="text-white/70 text-sm font-mono">
              {phase === 'done' ? 'Processing complete' : isPrefixPhase ? 'Prefix pass' : isPostfixPhase ? 'Postfix pass' : 'Initializing'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 items-center min-h-[50px] sm:min-h-[60px]">
            {numsItems.map(({ id, value, index }) => {
              const active = (isPrefixPhase || isPostfixPhase) && index === i;
              const processed = isPrefixPhase && index < i;
              
              return (
                <Chip
                  key={id}
                  id={id}
                  value={value}
                  index={index}
                  active={active}
                  processed={processed}
                  isResult={false}
                />
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
            <h3 className="text-sm uppercase tracking-widest text-emerald-300 font-semibold">RESULT ARRAY (res)</h3>
            <span className="text-white/70 text-sm font-mono">
              {isPrefixPhase ? 'Storing prefix products' : isPostfixPhase ? 'Multiplying by postfix' : 'Initialized'}
            </span>
          </div>
          <div className="rounded-xl border-2 border-emerald-400/30 bg-emerald-500/5 p-6 min-h-[100px] flex flex-wrap gap-3 items-center justify-center">
            {resItems.map(({ id, value, index }) => {
              const active = (isPrefixPhase || isPostfixPhase) && index === i;
              const processed = (isPrefixPhase && index <= i) || (isPostfixPhase && index >= i);
              
              return (
                <Chip
                  key={id}
                  id={id}
                  value={value}
                  index={index}
                  active={active}
                  processed={processed}
                  isResult={true}
                />
              );
            })}
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
          <span className="font-semibold text-white/80">Visualization logic:</span> The algorithm uses two passes. In the first pass (left to right), we store prefix products (product of all elements to the left) in each position. In the second pass (right to left), we multiply each position by the postfix product (product of all elements to the right). This gives us the product of all elements except the current one.
        </p>
        <p className="mt-2">
          <span className="font-semibold text-white/80">Color coding:</span>
        </p>
        <ul className="list-disc list-inside ml-2 space-y-1 mt-1">
          <li><span className="text-amber-400">Orange chip</span> = Currently processing this element</li>
          <li><span className="text-blue-400">Blue chip</span> = Element processed in prefix pass</li>
          <li><span className="text-emerald-400">Green chip</span> = Final result (after both passes)</li>
          <li><span className="text-purple-400">Purple chip</span> = Result array initialized (before processing)</li>
          <li><span className="text-slate-400">Gray chip</span> = Element not yet processed</li>
        </ul>
      </div>
    </div>
  );
}


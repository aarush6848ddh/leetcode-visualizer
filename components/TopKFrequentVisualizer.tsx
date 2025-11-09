'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

/**
 * Top K Frequent Elements Visualizer
 * 
 * Algorithm steps:
 * 1. Count frequencies using Counter
 * 2. Create frequency buckets (index = frequency, value = list of numbers)
 * 3. Iterate backwards through buckets to collect top K elements
 */

const Button = ({ children, onClick, disabled, variant = "default" }: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition border
      ${variant === "accent"
        ? "bg-indigo-500/90 border-indigo-400/20 text-white hover:bg-indigo-500"
        : variant === "ghost"
        ? "bg-transparent border-white/10 text-white hover:bg-white/10"
        : "bg-white/10 border-white/10 text-white hover:bg-white/15 disabled:opacity-50"}`}
  >
    {children}
  </button>
);

function useInterval(cb: () => void, delay: number | null) {
  const saved = useRef(cb);
  useEffect(() => void (saved.current = cb), [cb]);
  useEffect(() => {
    if (delay == null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

const Chip = ({ id, v, active, selected, freq }: { id: string; v: number; active?: boolean; selected?: boolean; freq?: number }) => (
  <motion.div
    layout
    layoutId={`chip-${id}`}
    className={`rounded-full px-4 py-2 text-sm font-semibold shadow select-none min-w-[48px] flex items-center justify-center flex-col gap-1
                ${selected ? "bg-emerald-600" : active ? "bg-amber-500" : "bg-slate-700"} text-white`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: active ? 1.06 : 1 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
  >
    <span>{v}</span>
    {freq !== undefined && (
      <span className="text-xs opacity-75">({freq})</span>
    )}
  </motion.div>
);

const AUTO_LOOP = true;

type Phase = "idle" | "counting" | "building_buckets" | "iterating_buckets" | "collecting" | "done";

export default function TopKFrequentVisualizer() {
  const nums = [1, 1, 1, 2, 2, 3, 4, 4, 4, 4];
  const k = 3;
  const [speed, setSpeed] = useState(1500);

  // algorithm state
  const [phase, setPhase] = useState<Phase>("idle");
  const [count, setCount] = useState<Record<number, number>>({});
  const [buckets, setBuckets] = useState<number[][]>([]);
  const [currentBucketIdx, setCurrentBucketIdx] = useState(-1);
  const [currentNumIdx, setCurrentNumIdx] = useState(-1);
  const [result, setResult] = useState<number[]>([]);
  const [playing, setPlaying] = useState(true);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [countingIdx, setCountingIdx] = useState(0);

  const reset = () => {
    setPhase("idle");
    setCount({});
    setBuckets([]);
    setCurrentBucketIdx(-1);
    setCurrentNumIdx(-1);
    setResult([]);
    setActiveLine(null);
    setCountingIdx(0);
    setPlaying(true);
  };

  const step = () => {
    if (phase === "done") return;

    if (phase === "idle") {
      setActiveLine(3); // count = Counter(nums)
      setPhase("counting");
      setCountingIdx(0);
      return;
    }

    if (phase === "counting") {
      if (countingIdx < nums.length) {
        const num = nums[countingIdx];
        setCount((prev) => {
          const next = { ...prev };
          next[num] = (next[num] || 0) + 1;
          return next;
        });
        setCountingIdx((idx) => idx + 1);
        return;
      }
      // Finished counting, move to building buckets
      setActiveLine(4); // freq = [[] for _ in range(len(nums) + 1)]
      setPhase("building_buckets");
      return;
    }

    if (phase === "building_buckets") {
      // Initialize buckets
      const maxFreq = Math.max(...Object.values(count), 0);
      const newBuckets: number[][] = Array(maxFreq + 1).fill(null).map(() => []);
      
      // Place numbers in buckets
      Object.entries(count).forEach(([num, freq]) => {
        newBuckets[freq].push(Number(num));
      });
      
      setBuckets(newBuckets);
      setActiveLine(6); // for num, cnt in count.items():
      setActiveLine(7); // freq[cnt].append(num)
      // Move to iterating phase
      setActiveLine(9); // for i in range(len(freq) - 1, 0, -1):
      setPhase("iterating_buckets");
      setCurrentBucketIdx(newBuckets.length - 1);
      setCurrentNumIdx(-1);
      return;
    }

    if (phase === "iterating_buckets") {
      // Iterate backwards through buckets
      if (currentBucketIdx < 0) {
        setPhase("done");
        setActiveLine(null);
        setPlaying(false);
        return;
      }

      const bucket = buckets[currentBucketIdx];
      
      if (bucket.length === 0) {
        // Empty bucket, move to next
        setCurrentBucketIdx((idx) => idx - 1);
        setCurrentNumIdx(-1);
        return;
      }

      if (currentNumIdx < 0) {
        // Start of bucket
        setActiveLine(10); // for n in freq[i]:
        setCurrentNumIdx(0);
        setPhase("collecting");
        return;
      }

      if (currentNumIdx < bucket.length) {
        // Collect number from current bucket
        const num = bucket[currentNumIdx];
        setActiveLine(11); // res.append(n)
        const newResult = [...result, num];
        setResult(newResult);
        
        if (newResult.length >= k) {
          // We have K elements
          setActiveLine(12); // if len(res) == k: return res
          setActiveLine(13); // return res
          setPhase("done");
          setPlaying(false);
          return;
        }
        
        setCurrentNumIdx((idx) => idx + 1);
        return;
      }

      // Finished current bucket, move to next
      setCurrentBucketIdx((idx) => idx - 1);
      setCurrentNumIdx(-1);
      setPhase("iterating_buckets");
      return;
    }

    if (phase === "collecting") {
      // This phase is handled in iterating_buckets
      setPhase("iterating_buckets");
      return;
    }
  };

  useInterval(() => step(), playing ? speed : null);

  // Auto-start on mount
  useEffect(() => {
    if (phase === "idle" && nums.length > 0) {
      step();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // auto-loop after done
  useEffect(() => {
    if (phase !== "done" || !AUTO_LOOP) return;
    const t = setTimeout(reset, 2000);
    return () => clearTimeout(t);
  }, [phase]);

  // Get frequency for each number
  const getFreq = (num: number) => count[num] || 0;
  const isCounting = phase === "counting" && countingIdx > 0;
  const currentNum = countingIdx > 0 ? nums[countingIdx - 1] : null;

  return (
    <div className="w-full bg-[#0b0e13] text-white p-6 rounded-xl border border-gray-800">
      <div className="mx-auto max-w-6xl space-y-5">
        <header className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold">Top K Frequent Elements — Visualizer</h2>
            <p className="text-white/60 text-sm mt-1">
              Find the <span className="font-semibold">K</span> most frequent elements using bucket sort.
              Count frequencies, create buckets, then iterate backwards to collect top <span className="font-semibold">K = {k}</span>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setPlaying((p) => !p)} variant="accent">{playing ? "Pause" : "Play"}</Button>
            <Button onClick={step} disabled={phase === "done"}>Step</Button>
            <Button onClick={reset} variant="ghost">Reset</Button>
          </div>
        </header>

        {/* Code Display */}
        <section className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4">
          <div className="mb-2 sm:mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <h2 className="text-xs sm:text-sm uppercase tracking-widest text-white/60 font-semibold">Python Code Execution</h2>
            <span className="text-xs text-white/60">
              {activeLine ? `Line ${activeLine} executing...` : 'Ready'}
            </span>
          </div>
          <pre className="bg-slate-900/80 rounded-lg p-2 sm:p-4 overflow-x-auto border border-white/5">
            <code className="text-xs sm:text-sm font-mono text-white/90 leading-relaxed">
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 1 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                <span className="text-purple-400">from</span> <span className="text-blue-400">collections</span> <span className="text-purple-400">import</span> <span className="text-blue-400">Counter</span>
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 2 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                <span className="text-purple-400">from</span> <span className="text-blue-400">typing</span> <span className="text-purple-400">import</span> <span className="text-blue-400">List</span>
              </div>
              <div className="px-2 py-1 rounded transition-colors">
                <span className="text-purple-400">class</span> <span className="text-blue-400">Solution</span>:
              </div>
              <div className="px-2 py-1 rounded transition-colors">
                {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">topKFrequent</span>(<span className="text-green-400">self</span>, <span className="text-orange-400">nums</span>: <span className="text-blue-400">List</span>[<span className="text-blue-400">int</span>], <span className="text-orange-400">k</span>: <span className="text-blue-400">int</span>) <span className="text-purple-400">-&gt;</span> <span className="text-blue-400">List</span>[<span className="text-blue-400">int</span>]:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 3 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-orange-400">count</span> = <span className="text-blue-400">Counter</span>(<span className="text-orange-400">nums</span>)
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 4 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-orange-400">freq</span> = [[] <span className="text-purple-400">for</span> <span className="text-orange-400">_</span> <span className="text-purple-400">in</span> <span className="text-blue-400">range</span>(<span className="text-blue-400">len</span>(<span className="text-orange-400">nums</span>) + <span className="text-green-400">1</span>)]
              </div>
              <div className="px-2 py-1 rounded transition-colors">
                {'        '}
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 6 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-purple-400">for</span> <span className="text-orange-400">num</span>, <span className="text-orange-400">cnt</span> <span className="text-purple-400">in</span> <span className="text-orange-400">count</span>.<span className="text-blue-400">items</span>():
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 7 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'            '}<span className="text-orange-400">freq</span>[<span className="text-orange-400">cnt</span>].<span className="text-blue-400">append</span>(<span className="text-orange-400">num</span>)
              </div>
              <div className="px-2 py-1 rounded transition-colors">
                {'        '}
              </div>
              <div className="px-2 py-1 rounded transition-colors">
                {'        '}<span className="text-orange-400">res</span> = []
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 9 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-purple-400">for</span> <span className="text-orange-400">i</span> <span className="text-purple-400">in</span> <span className="text-blue-400">range</span>(<span className="text-blue-400">len</span>(<span className="text-orange-400">freq</span>) - <span className="text-green-400">1</span>, <span className="text-green-400">0</span>, <span className="text-green-400">-1</span>):
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 10 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'            '}<span className="text-purple-400">for</span> <span className="text-orange-400">n</span> <span className="text-purple-400">in</span> <span className="text-orange-400">freq</span>[<span className="text-orange-400">i</span>]:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 11 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'                '}<span className="text-orange-400">res</span>.<span className="text-blue-400">append</span>(<span className="text-orange-400">n</span>)
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 12 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : ''}`}>
                {'                '}<span className="text-purple-400">if</span> <span className="text-blue-400">len</span>(<span className="text-orange-400">res</span>) == <span className="text-orange-400">k</span>:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 13 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : ''}`}>
                {'                    '}<span className="text-purple-400">return</span> <span className="text-orange-400">res</span>
              </div>
            </code>
          </pre>
        </section>

        {/* Speed control */}
        <div className="flex items-center gap-3">
          <label className="text-sm text-white/70">Speed</label>
          <input 
            type="range" 
            min={200} 
            max={1500} 
            step={100} 
            value={speed} 
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-32"
          />
        </div>

        <LayoutGroup>
          {/* Input Array */}
          <section className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-widest text-white/60 font-semibold">Input Array</h2>
              <span className="text-white/70 text-sm font-mono">k = {k}</span>
            </div>
            <div className="flex flex-wrap gap-3 items-end">
              {nums.map((v, idx) => {
                const active = phase === "counting" && idx === countingIdx - 1;
                const freq = getFreq(v);
                return (
                  <div key={`arr-wrapper-${idx}`} className="flex flex-col items-center gap-2">
                    <Chip id={`arr-${idx}`} v={v} active={active} freq={phase !== "idle" ? freq : undefined} />
                    <span className={`text-xs font-mono ${active ? "text-amber-400 font-bold" : "text-white/50"}`}>
                      [{idx}]
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Frequency Counter */}
          {phase !== "idle" && Object.keys(count).length > 0 && (
            <section className="rounded-xl border border-indigo-400/20 bg-indigo-500/5 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm uppercase tracking-widest text-indigo-300/90 font-semibold">Frequency Counter</h2>
                <span className="text-indigo-200/80 text-sm font-mono font-semibold">size = {Object.keys(count).length}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {Object.entries(count).map(([num, freq]) => (
                  <motion.div
                    key={`count-${num}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-lg px-4 py-2 border border-indigo-300/20 bg-indigo-700/80 text-sm font-semibold shadow-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-indigo-100">{num}</span>
                      <span className="text-indigo-300/80">→</span>
                      <span className="font-mono text-white font-bold">{freq}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Frequency Buckets */}
          {buckets.length > 0 && (
            <section className="rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm uppercase tracking-widest text-emerald-300/90 font-semibold">Frequency Buckets</h2>
                <span className="text-emerald-200/80 text-sm font-mono font-semibold">index = frequency</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {buckets.map((bucket, idx) => {
                  const isActive = phase === "iterating_buckets" || phase === "collecting" ? currentBucketIdx === idx : false;
                  const isEmpty = bucket.length === 0;
                  return (
                    <motion.div
                      key={`bucket-${idx}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-lg border p-3 min-h-[80px] ${
                        isActive
                          ? "bg-emerald-700/50 border-emerald-300 ring-2 ring-emerald-300 ring-offset-2 ring-offset-emerald-500/20"
                          : isEmpty
                          ? "bg-emerald-700/20 border-emerald-300/10"
                          : "bg-emerald-700/30 border-emerald-300/20"
                      }`}
                    >
                      <div className="mb-2 font-mono text-emerald-200 text-xs font-semibold">
                        freq[{idx}]
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {bucket.map((num, numIdx) => {
                          const isCurrent = isActive && currentNumIdx === numIdx;
                          const isCollected = result.includes(num);
                          return (
                            <motion.div
                              key={`bucket-${idx}-num-${num}`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                isCollected
                                  ? "bg-emerald-600 ring-2 ring-emerald-300"
                                  : isCurrent
                                  ? "bg-amber-500"
                                  : "bg-emerald-600/70"
                              } text-white`}
                            >
                              {num}
                            </motion.div>
                          );
                        })}
                        {isEmpty && (
                          <span className="text-emerald-300/30 text-xs italic">empty</span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Result */}
          <AnimatePresence>
            {result.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm uppercase tracking-widest text-emerald-300/90 font-semibold">Result (Top {k})</h2>
                  <span className="text-emerald-200/80 text-sm font-mono font-semibold">
                    {result.length} / {k}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {result.map((num, idx) => (
                    <motion.div
                      key={`result-${num}-${idx}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-full px-5 py-2.5 bg-emerald-600 text-white font-bold text-lg shadow-lg ring-2 ring-emerald-300"
                    >
                      {num}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>

        {/* Result banner */}
        <AnimatePresence>
          {phase === "done" && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border p-4 text-center text-lg font-semibold bg-emerald-500/10 border-emerald-400/20 text-emerald-200"
            >
              ✓ Top {k} frequent elements: <span className="font-mono">[{result.join(', ')}]</span>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="text-xs text-white/60 mt-4">
          <p><b>Time:</b> O(n). <b>Space:</b> O(n) for buckets and counter.</p>
        </footer>
      </div>
    </div>
  );
}


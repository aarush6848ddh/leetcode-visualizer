'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

/**
 * Two Sum (hash map) Visualizer
 *
 * Python-ish reference solution:
 *   my_hashmap = {}
 *   for i, n in enumerate(nums):
 *     diff = target - n
 *     if diff in my_hashmap: return [my_hashmap[diff], i]
 *     my_hashmap[n] = i
 *
 * What you see:
 *  - Array chips on top
 *  - A live Hash Map grid (value -> index)
 *  - Each step computes diff, checks the map, then inserts
 *  - When a hit is found, it draws a connection and shows [i1, i2]
 *  - Auto-loop on finish (toggle AUTO_LOOP)
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

const Chip = ({ id, v, active, matched }: { id: string; v: number; active?: boolean; matched?: boolean }) => (
  <motion.div
    layout
    layoutId={`chip-${id}`}
    className={`rounded-full px-5 py-2.5 text-base font-semibold shadow select-none min-w-[56px] flex items-center justify-center
                ${matched ? "bg-emerald-600" : active ? "bg-amber-500" : "bg-slate-700"} text-white`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: active ? 1.06 : 1 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
  >
    {v}
  </motion.div>
);

const AUTO_LOOP = true;

type Phase = "idle" | "init_map" | "loop_start" | "calc_diff" | "check_map" | "return_match" | "insert_map" | "done";

export default function TwoSumVisualizer() {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const target = 10;
  const [speed, setSpeed] = useState(1200);

  // algorithm state
  const [i, setI] = useState(0);
  const [map, setMap] = useState<Record<number, number>>({}); // value -> index
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<number[] | null>(null);
  const [playing, setPlaying] = useState(true);
  const [activeLine, setActiveLine] = useState<number | null>(null); // Track which code line is active

  const reset = () => {
    setI(0);
    setMap({});
    setResult(null);
    setPhase("idle");
    setActiveLine(null);
    setPlaying(true);
  };

  const step = () => {
    if (phase === "done") return;

    if (phase === "idle") {
      setActiveLine(3); // my_hashmap = {}
      setPhase("init_map");
      return;
    }

    if (phase === "init_map") {
      setActiveLine(4); // for i, n in enumerate(nums):
      setPhase("loop_start");
      return;
    }

    if (phase === "loop_start") {
      if (i >= nums.length) {
        setPhase("done");
        setActiveLine(null);
        setPlaying(false);
        return;
      }
      setActiveLine(5); // diff = target - n
      setPhase("calc_diff");
      return;
    }

    if (phase === "calc_diff") {
      setActiveLine(6); // if diff in my_hashmap:
      setPhase("check_map");
      return;
    }

    if (phase === "check_map") {
      const n = nums[i];
      const diff = target - n;

      if (map.hasOwnProperty(diff)) {
        setActiveLine(7); // return [my_hashmap[diff], i]
        setResult([map[diff], i]);
        setPhase("return_match");
      } else {
        setActiveLine(8); // my_hashmap[n] = i
        setPhase("insert_map");
      }
      return;
    }

    if (phase === "return_match") {
      setPhase("done");
      setActiveLine(null);
      setPlaying(false);
      return;
    }

    if (phase === "insert_map") {
      const n = nums[i];
      setMap((m) => ({ ...m, [n]: i }));
      setI((k) => k + 1);
      setActiveLine(4); // Back to loop start
      setPhase("loop_start");
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
    const t = setTimeout(reset, 1500);
    return () => clearTimeout(t);
  }, [phase]);

  // helpers
  const entries = Object.entries(map).map(([k, v]) => ({ key: Number(k), idx: v as number }));
  const activeVal = nums[i];
  const diff = target - activeVal;
  const hitIdx = map.hasOwnProperty(diff) ? map[diff] : null;

  return (
    <div className="w-full bg-[#0b0e13] text-white p-6 rounded-xl border border-gray-800">
      <div className="mx-auto max-w-5xl space-y-5">
        <header className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold">Two Sum — Hash Map Visualizer</h2>
            <p className="text-white/60 text-sm mt-1">
              We walk the array once. For each <span className="font-semibold">n</span>, compute
              <code className="bg-white/10 px-2 py-1 rounded"> diff = target - n</code>. If <code className="bg-white/10 px-2 py-1 rounded">diff</code> is already in the map, we return the
              two indices; otherwise we insert <code className="bg-white/10 px-2 py-1 rounded">map[n] = i</code>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setPlaying((p) => !p)} variant="accent">{playing ? "Pause" : "Play"}</Button>
            <Button onClick={step} disabled={phase === "done"}>Step</Button>
            <Button onClick={reset} variant="ghost">Reset</Button>
          </div>
        </header>

        {/* Code Display with Line-by-Line Highlighting */}
        <section className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm uppercase tracking-widest text-white/60 font-semibold">Python Code Execution</h2>
            <span className="text-xs text-white/60">
              {activeLine ? `Line ${activeLine} executing...` : 'Ready'}
            </span>
          </div>
          <pre className="bg-slate-900/80 rounded-lg p-4 overflow-x-auto border border-white/5">
            <code className="text-sm font-mono text-white/90 leading-relaxed">
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 1 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                <span className="text-purple-400">class</span> <span className="text-blue-400">Solution</span>:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 2 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">twoSum</span>(<span className="text-green-400">self</span>, <span className="text-orange-400">nums</span>, <span className="text-orange-400">target</span>):
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 3 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-orange-400">my_hashmap</span> = {'{}'}
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 4 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-purple-400">for</span> <span className="text-orange-400">i</span>, <span className="text-orange-400">n</span> <span className="text-purple-400">in</span> <span className="text-blue-400">enumerate</span>(<span className="text-orange-400">nums</span>):
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 5 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'            '}<span className="text-orange-400">diff</span> = <span className="text-orange-400">target</span> - <span className="text-orange-400">n</span>
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 6 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'            '}<span className="text-purple-400">if</span> <span className="text-orange-400">diff</span> <span className="text-purple-400">in</span> <span className="text-orange-400">my_hashmap</span>:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 7 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : ''}`}>
                {'                '}<span className="text-purple-400">return</span> [<span className="text-orange-400">my_hashmap</span>[<span className="text-orange-400">diff</span>], <span className="text-orange-400">i</span>]
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 8 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'            '}<span className="text-orange-400">my_hashmap</span>[<span className="text-orange-400">n</span>] = <span className="text-orange-400">i</span>
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
          {/* Array row */}
          <section className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-widest text-white/60 font-semibold">Array</h2>
              <span className="text-white/70 text-sm font-mono">i = {Math.min(i, nums.length)}</span>
            </div>
            <div className="flex flex-wrap gap-4 items-end">
              {nums.map((v, idx) => {
                const active = phase !== "done" && idx === i;
                const matched = result && (idx === result[0] || idx === result[1]);
                return (
                  <div key={`arr-wrapper-${idx}`} className="flex flex-col items-center gap-2">
                    <Chip id={`arr-${idx}`} v={v} active={active} matched={matched ?? false} />
                    <span className={`text-xs font-mono ${active ? "text-amber-400 font-bold" : matched ? "text-emerald-400 font-semibold" : "text-white/50"}`}>
                      [{idx}]
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Diff card */}
          {(phase === "calc_diff" || phase === "check_map" || phase === "insert_map" || phase === "return_match") && i < nums.length && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-md w-full rounded-xl border border-indigo-400/30 bg-indigo-500/10 p-4 text-center shadow-lg"
            >
              <div className="text-sm space-y-1">
                <div className="text-white/70 text-xs uppercase tracking-wider mb-2">Calculating Difference</div>
                <div className="text-base font-semibold">
                  <span className="text-white/80">target</span> <span className="font-mono text-indigo-300">{target}</span>
                  <span className="mx-2 text-white/60">−</span>
                  <span className="text-white/80">nums[{i}]</span> <span className="font-mono text-amber-300">{activeVal}</span>
                  <span className="mx-2 text-white/60">=</span>
                  <span className="font-mono text-emerald-300 font-bold text-lg">{diff}</span>
                </div>
                {phase === "return_match" && hitIdx !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-2 text-emerald-300 text-sm font-semibold"
                  >
                    ✓ Found in map at index {hitIdx}!
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Hash map grid */}
          <section className="rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-widest text-emerald-300/90 font-semibold">Hash Map (value → index)</h2>
              <span className="text-emerald-200/80 text-sm font-mono font-semibold">size = {entries.length}</span>
            </div>
            {entries.length === 0 && phase !== "idle" ? (
              <div className="text-center py-8 text-white/40 text-sm italic">
                Map is empty. Values will appear as they are processed.
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-w-md">
                {entries.map(({ key, idx }) => (
                  <motion.div 
                    key={`kv-${key}`} 
                    layout 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`rounded-lg px-4 py-3 border text-sm font-semibold shadow-lg transition-all
                      ${hitIdx === idx 
                        ? "bg-emerald-600 border-emerald-300 ring-2 ring-emerald-300 ring-offset-2 ring-offset-emerald-500/20 scale-105" 
                        : "bg-emerald-700/80 border-emerald-300/20 hover:bg-emerald-700/90"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-emerald-100">{key}</span>
                      <span className="text-emerald-300/80 mx-1">→</span>
                      <span className="font-mono text-white font-bold">{idx}</span>
                    </div>
                  </motion.div>
                ))}

                {/* Preview upcoming insert */}
                {phase === "insert_map" && i < nums.length && !map.hasOwnProperty(diff) && (
                  <motion.div 
                    layout 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 0.6, x: 0 }} 
                    className="rounded-lg px-4 py-3 border border-dashed border-emerald-300/30 text-sm bg-emerald-500/10"
                  >
                    <div className="flex items-center justify-between text-emerald-200/70">
                      <span className="font-mono">{activeVal}</span>
                      <span className="mx-1">→</span>
                      <span className="font-mono">{i}</span>
                    </div>
                    <div className="text-xs text-emerald-300/50 mt-1 text-center">adding...</div>
                  </motion.div>
                )}
              </div>
            )}
          </section>

          {/* Connection line when match found */}
          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-2"
              >
                <div className="rounded-lg bg-emerald-500/20 border border-emerald-400/30 px-4 py-2">
                  <span className="text-emerald-200 text-sm font-semibold">
                    ✓ Match found! Indices: <span className="font-mono text-emerald-100 font-bold">[{result[0]}, {result[1]}]</span>
                  </span>
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
              className={`rounded-xl border p-4 text-center text-lg font-semibold ${result ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-200" : "bg-rose-500/10 border-rose-400/20 text-rose-200"}`}
            >
              {result ? (
                <>Return <span className="font-mono">[{result[0]}, {result[1]}]</span> — because <span className="font-mono">nums[{result[0]}] + nums[{result[1]}] = {target}</span></>
              ) : (
                <>No pair sums to target</>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="text-xs text-white/60 mt-4">
          <p><b>Time:</b> O(n). <b>Space:</b> O(n) for the map.</p>
        </footer>
      </div>
    </div>
  );
}


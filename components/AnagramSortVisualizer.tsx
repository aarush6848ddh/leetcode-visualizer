'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

/** VISUAL IDEA
 * 1) Check lengths first
 * 2) If equal, sort both strings
 * 3) Compare sorted strings -> banner TRUE / FALSE
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

type Phase = "idle" | "check_length" | "sorting_s" | "sorting_t" | "compare" | "done";

function useInterval(cb: () => void, delay: number | null) {
  const saved = useRef(cb);
  useEffect(() => void (saved.current = cb), [cb]);
  useEffect(() => {
    if (delay == null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

const Chip = ({ id, ch, active }: { id: string; ch: string; active?: boolean }) => (
  <motion.div
    layout
    layoutId={id}
    className={`rounded-md px-4 py-2 text-sm font-semibold shadow min-w-[48px] flex items-center justify-center
                ${active ? "bg-amber-500" : "bg-slate-700"} text-white`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: active ? 1.06 : 1 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
  >
    {ch}
  </motion.div>
);

export default function AnagramSortVisualizer() {
  // inputs - hardcoded
  const s = "racecar";
  const t = "carrace";
  const [speed, setSpeed] = useState(800);

  // derived
  const sChars = useMemo(() => s.split(""), [s]);
  const tChars = useMemo(() => t.split(""), [t]);

  // viz state
  const [phase, setPhase] = useState<Phase>("idle");
  const [i, setI] = useState(0); // step inside sorting
  const [sArr, setSArr] = useState<string[]>([]);
  const [tArr, setTArr] = useState<string[]>([]);
  const [result, setResult] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(true);
  const [activeLine, setActiveLine] = useState<number | null>(null);

  const AUTO_LOOP = true;

  const reset = () => {
    setPhase("idle");
    setI(0);
    setSArr([]);
    setTArr([]);
    setResult(null);
    setActiveLine(null);
    setPlaying(true);
  };

  // step machine
  const step = () => {
    if (phase === "idle") {
      setActiveLine(3); // if len(s) != len(t):
      setPhase("check_length");
      return;
    }

    if (phase === "check_length") {
      setActiveLine(3); // if len(s) != len(t):
      if (s.length !== t.length) {
        // Lengths are different, return False
        setActiveLine(4); // return False
        setResult(false);
        setPhase("done");
        setActiveLine(null);
        return;
      }
      // Lengths are equal, proceed to sorting
      setSArr([...sChars]);
      setTArr([...tChars]);
      setActiveLine(5); // return sorted(s) == sorted(t)
      setPhase("sorting_s");
      setI(0);
      return;
    }

    if (phase === "sorting_s") {
      // Sort s first - Line 5 active
      setActiveLine(5); // return sorted(s) == sorted(t)
      const nextI = i + 1;
      const sSorted = [...sArr].slice(0, nextI).sort();
      setSArr((prev) => [...sSorted, ...prev.slice(nextI)]);
      setI(nextI);

      if (nextI >= sArr.length) {
        // Final sort of s_arr
        setSArr((prev) => [...prev].sort());
        setPhase("sorting_t");
        setI(0); // Reset index for sorting t
      }

      return;
    }

    if (phase === "sorting_t") {
      // Sort t - Line 5 still active
      setActiveLine(5); // return sorted(s) == sorted(t)
      const nextI = i + 1;
      const tSorted = [...tArr].slice(0, nextI).sort();
      setTArr((prev) => [...tSorted, ...prev.slice(nextI)]);
      setI(nextI);

      if (nextI >= tArr.length) {
        // Final sort of t_arr
        setTArr((prev) => [...prev].sort());
        setPhase("compare");
      }

      return;
    }

    if (phase === "compare") {
      setActiveLine(5); // return sorted(s) == sorted(t)
      const ok = sArr.length === tArr.length && sArr.every((c, k) => c === tArr[k]);
      setResult(ok);
      setPhase("done");
      setActiveLine(null);
      return;
    }
  };

  useInterval(() => step(), playing ? speed : null);

  // Auto-start on mount
  useEffect(() => {
    if (phase === "idle" && s && t) {
      step();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // auto-loop after finish
  useEffect(() => {
    if (phase !== "done" || !AUTO_LOOP) return;
    const t = setTimeout(reset, 1400);
    return () => clearTimeout(t);
  }, [phase]);

  // render helpers
  const renderRow = (label: string, arr: string[], highlightIndex?: number, isSorting?: boolean) => (
    <section className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm uppercase tracking-widest text-white/60">{label}</h3>
        <span className="text-xs text-white/60">
          {isSorting ? "sorting…" : ""}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 min-h-[48px]">
        {arr.map((ch, idx) => (
          <Chip key={`${label}-${idx}-${ch}`} id={`${label}-${idx}-${ch}`} ch={ch} active={idx === highlightIndex} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="w-full bg-[#0b0e13] text-white p-6 rounded-xl border border-gray-800">
      <div className="mx-auto max-w-5xl space-y-4">
        <header className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold">Valid Anagram — Sorting Visualizer</h2>
            <p className="text-white/60 text-sm mt-1">
              Algorithm shown: <code className="bg-white/10 px-2 py-1 rounded">if len(s) != len(t): return False; return sorted(s) == sorted(t)</code>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setPlaying((p) => !p)} variant="accent">
              {playing ? "Pause" : "Play"}
            </Button>
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
                {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">isAnagram</span>(<span className="text-green-400">self</span>, <span className="text-orange-400">s</span>: <span className="text-blue-400">str</span>, <span className="text-orange-400">t</span>: <span className="text-blue-400">str</span>) <span className="text-purple-400">-&gt;</span> <span className="text-blue-400">bool</span>:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 3 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-purple-400">if</span> <span className="text-blue-400">len</span>(<span className="text-orange-400">s</span>) != <span className="text-blue-400">len</span>(<span className="text-orange-400">t</span>):
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 4 ? 'bg-rose-500/20 border-l-2 border-rose-400' : ''}`}>
                {'            '}<span className="text-purple-400">return</span> <span className="text-blue-400">False</span>
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 5 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-purple-400">return</span> <span className="text-blue-400">sorted</span>(<span className="text-orange-400">s</span>) == <span className="text-blue-400">sorted</span>(<span className="text-orange-400">t</span>)
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
          {/* Stage 1 — strings */}
          <section className="rounded-xl border border-white/10 bg-transparent p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-white/60 mb-1">s (string)</div>
                <div className="rounded-lg bg-slate-800/80 px-3 py-2 font-mono">{s}</div>
                <div className="text-xs text-white/60 mt-1">length: {s.length}</div>
              </div>
              <div>
                <div className="text-xs text-white/60 mb-1">t (string)</div>
                <div className="rounded-lg bg-slate-800/80 px-3 py-2 font-mono">{t}</div>
                <div className="text-xs text-white/60 mt-1">length: {t.length}</div>
              </div>
            </div>
          </section>

          {/* Length check */}
          {phase === "check_length" && (
            <div className="flex items-center justify-center my-2">
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/60 text-sm"
              >
                {s.length === t.length ? (
                  <span className="text-emerald-400">✓ Lengths are equal ({s.length} == {t.length})</span>
                ) : (
                  <span className="text-rose-400">✗ Lengths are different ({s.length} != {t.length})</span>
                )}
              </motion.div>
            </div>
          )}

          {/* Show sorting only if lengths are equal */}
          {s.length === t.length && (phase === "sorting_s" || phase === "sorting_t" || phase === "compare" || phase === "done") && (
            <>
              {/* Arrow */}
              <div className="flex items-center justify-center my-2">
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white/60 text-sm"
                >
                  ▼ applying <code>sorted()</code>
                </motion.div>
              </div>

              {/* Stage 2 — sorting */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderRow("sorted(s)", sArr, phase === "sorting_s" ? i : undefined, phase === "sorting_s")}
                {renderRow("sorted(t)", tArr, phase === "sorting_t" ? i : undefined, phase === "sorting_t")}
              </div>
            </>
          )}

          {/* Result */}
          <AnimatePresence>
            {phase === "done" && result !== null && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`mt-2 rounded-xl border p-4 text-center text-lg font-semibold ${
                  result
                    ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-200"
                    : "bg-rose-500/10 border-rose-400/20 text-rose-200"
                }`}
              >
                {result ? "sorted(s) == sorted(t) → True (anagram)" :
                           s.length !== t.length ? "len(s) != len(t) → False (not an anagram)" :
                           "sorted(s) != sorted(t) → False (not an anagram)"}
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>

        <footer className="text-xs text-white/60 mt-4">
          <p><b>Time:</b> O(n log n) for the sorts. <b>Space:</b> O(n).</p>
        </footer>
      </div>
    </div>
  );
}

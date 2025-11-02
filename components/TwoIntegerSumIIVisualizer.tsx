'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const Button = ({ children, onClick, disabled, variant = "default" }: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition border select-none
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

const Chip = ({ id, v, tone = "slate", pulse = false, floatingText }: { id: string; v: number; tone?: "slate"|"emerald"|"amber"|"rose"; pulse?: boolean; floatingText?: string }) => (
  <motion.div layout layoutId={`chip-${id}`} className="relative">
    <motion.div
      className={`rounded-full px-5 py-2.5 text-base font-semibold select-none shadow min-w-[56px] flex items-center justify-center
        ${tone === "emerald" ? "bg-emerald-600" : tone === "amber" ? "bg-amber-500" : tone === "rose" ? "bg-rose-600" : "bg-slate-700"}
        text-white ${pulse ? "ring-4 ring-white/20" : ""}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: pulse ? 1.06 : 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      {v}
    </motion.div>
    {floatingText && (
      <motion.div
        className="absolute -top-3 -right-3 rounded-md px-1.5 py-[2px] text-[10px] font-mono bg-white/90 text-black"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {floatingText}
      </motion.div>
    )}
  </motion.div>
);

const AUTO_LOOP = true;
type Phase = "idle" | "walk" | "done"; // sub: 0 compute diff, 1 check, 2 insert or found

export default function TwoIntegerSumIIVisualizer() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const target = 10;
  const [speed, setSpeed] = useState(650);
  const [playing, setPlaying] = useState(true);

  const [phase, setPhase] = useState<Phase>("idle");
  const [sub, setSub] = useState(0);
  const [i, setI] = useState(0);
  const [mapHM, setMapHM] = useState<Record<number, number>>({});
  const [result, setResult] = useState<[number, number] | null>(null);

  const reset = () => {
    setPhase("idle");
    setSub(0);
    setI(0);
    setMapHM({});
    setResult(null);
    setPlaying(true);
  };

  const step = () => {
    if (phase === "done") return;

    if (phase === "idle") {
      setPhase("walk");
      setSub(0);
      return;
    }

    if (i >= numbers.length) {
      setPhase("done");
      setPlaying(false);
      return;
    }

    const n = numbers[i];
    const diff = target - n;

    if (sub === 0) {
      setSub(1);
      return; // show diff bubble
    }

    if (sub === 1) {
      // check map
      if (Object.prototype.hasOwnProperty.call(mapHM, diff)) {
        setResult([mapHM[diff] + 1, i + 1]);
        setPhase("done");
        setPlaying(false);
        return;
      }
      setSub(2);
      return; // not found → insert
    }

    if (sub === 2) {
      setMapHM((m) => ({ ...m, [n]: i }));
      setI((k) => k + 1);
      setSub(0);
      return;
    }
  };

  useInterval(() => step(), playing ? speed : null);

  useEffect(() => {
    if (phase !== "done" || !AUTO_LOOP) return;
    const t = setTimeout(reset, 1600);
    return () => clearTimeout(t);
  }, [phase]);

  // narration + code highlight
  const n = numbers[i];
  const diff = target - (Number.isFinite(n) ? n : 0);

  const status = (() => {
    if (phase === "idle") return "Ready: start with an empty hash map";
    if (phase === "walk" && sub === 0) return `Compute diff = target - n = ${target} - ${n} = ${diff}`;
    if (phase === "walk" && sub === 1) return `Check map for ${diff}${Object.prototype.hasOwnProperty.call(mapHM, diff) ? " → found!" : " → not found"}`;
    if (phase === "walk" && sub === 2) return `Insert ${n} → ${i} (store 0-index). Advance i.`;
    if (phase === "done") return result ? `Done: [${result[0]}, ${result[1]}]` : "Done";
    return "";
  })();

  const code = [
    "my_hashmap = {}",
    "for i, n in enumerate(numbers):",
    "    diff = target - n",
    "    if diff in my_hashmap:",
    "        return [my_hashmap[diff] + 1, i + 1]",
    "    my_hashmap[n] = i",
  ];

  const currentLine = (() => {
    if (phase === "idle") return 1;
    if (phase === "walk" && sub === 0) return 3;
    if (phase === "walk" && sub === 1) return 4;
    if (phase === "walk" && sub === 2) return 6;
    if (phase === "done") return 5;
    return 2;
  })();

  // helpers for nicer animations
  const found = phase === "done" && !!result;

  return (
    <div className="min-h-screen bg-[#0b0e13] text-white p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Two Integer Sum II — Hash Map Visualizer</h2>
            <p className="text-white/60 text-sm mt-1">
              Sorted array, 1-indexed answer. We track complements in a map.
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
              {currentLine ? `Line ${currentLine} executing...` : 'Ready'}
            </span>
          </div>
          <pre className="bg-slate-900/80 rounded-lg p-4 overflow-x-auto border border-white/5">
            <code className="text-sm font-mono text-white/90 leading-relaxed">
              <div className={`px-2 py-1 rounded transition-colors ${currentLine === 1 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                <span className="text-purple-400">class</span> <span className="text-blue-400">Solution</span>:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${currentLine === 2 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">twoSum</span>(<span className="text-green-400">self</span>, <span className="text-orange-400">numbers</span>: <span className="text-blue-400">List</span>[<span className="text-blue-400">int</span>], <span className="text-orange-400">target</span>: <span className="text-blue-400">int</span>) <span className="text-purple-400">-&gt;</span> <span className="text-blue-400">List</span>[<span className="text-blue-400">int</span>]:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${currentLine === 3 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-orange-400">my_hashmap</span> = {'{}'}
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${currentLine === 2 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-purple-400">for</span> <span className="text-orange-400">i</span>, <span className="text-orange-400">n</span> <span className="text-purple-400">in</span> <span className="text-blue-400">enumerate</span>(<span className="text-orange-400">numbers</span>):
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${currentLine === 3 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'            '}<span className="text-orange-400">diff</span> = <span className="text-orange-400">target</span> - <span className="text-orange-400">n</span>
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${currentLine === 4 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'            '}<span className="text-purple-400">if</span> <span className="text-orange-400">diff</span> <span className="text-purple-400">in</span> <span className="text-orange-400">my_hashmap</span>:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${currentLine === 5 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : ''}`}>
                {'                '}<span className="text-purple-400">return</span> [<span className="text-orange-400">my_hashmap</span>[<span className="text-orange-400">diff</span>] + <span className="text-cyan-400">1</span>, <span className="text-orange-400">i</span> + <span className="text-cyan-400">1</span>]
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${currentLine === 6 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
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
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm uppercase tracking-widest text-white/60">Array (sorted)</h3>
              <span className="text-xs text-white/60">
                i = {Math.min(i, numbers.length)}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 min-h-[48px]">
              {numbers.map((v, idx) => {
                let tone: any = "slate";
                let pulse = false;
                let badge: string | undefined;
                if (result && (idx === result[0] - 1 || idx === result[1] - 1)) tone = "emerald";
                else if (idx === i && phase !== "done") {
                  tone = "amber";
                  pulse = true;
                  badge = `n=${v}`;
                }
                return <Chip key={`arr-${idx}`} id={`arr-${idx}`} v={v} tone={tone} pulse={pulse} floatingText={badge} />;
              })}
            </div>
          </section>

          {/* Diff bubble */}
          {phase !== "idle" && i < numbers.length && (
            <section className="rounded-xl border border-indigo-400/20 bg-indigo-500/5 p-4">
              <div className="mb-2 text-xs uppercase tracking-widest text-indigo-200/90">Compute & Check</div>
              <div className="font-mono text-white/90 text-sm">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="rounded-lg bg-indigo-600/30 px-3 py-2">
                    diff = target - n = {target} - {n} = <span className="font-bold text-indigo-200">{diff}</span>
                  </div>
                  <span className="text-white/70">check map for diff</span>
                </div>
              </div>
            </section>
          )}

          {/* Hash Map - vertical stack */}
          <section className="rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm uppercase tracking-widest text-emerald-300/90">Hash Map (value → index +1 shown)</h3>
              <span className="text-xs text-white/60">
                size = {Object.keys(mapHM).length}
              </span>
            </div>
            <div className="flex flex-col gap-2.5 max-w-md min-h-[60px]">
              {Object.entries(mapHM).map(([k, idx]) => (
                <motion.div
                  key={`kv-${k}`}
                  layout
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    opacity: 1,
                    scale: Number(diff) === Number(k) && sub === 1 ? 1.02 : 1
                  }}
                  className={`rounded-lg px-3 py-2 border text-sm font-semibold shadow ${
                    Number(diff) === Number(k) && sub === 1 ? "bg-emerald-700/90 ring-2 ring-emerald-300" : "bg-emerald-700/70"
                  } border-emerald-300/20`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono">{k}</span>
                    <span className="text-white/80">→</span>
                    <span className="font-mono">{Number(idx) + 1}</span>
                  </div>
                </motion.div>
              ))}
              {/* Preview upcoming insert */}
              {phase === "walk" && i < numbers.length && !mapHM.hasOwnProperty(diff) && sub === 2 && (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  className="rounded-lg px-3 py-2 border text-sm bg-emerald-500/10 border-emerald-300/10"
                >
                  <div className="flex items-center justify-between text-white/60">
                    <span className="font-mono">{n}</span>
                    <span>→</span>
                    <span className="font-mono">{i + 1}</span>
                  </div>
                </motion.div>
              )}
            </div>
          </section>

          {/* Result banner */}
          <AnimatePresence>
            {phase === "done" && result && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`rounded-xl border p-4 text-center text-lg font-semibold ${
                  result
                    ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-200"
                    : "bg-rose-500/10 border-rose-400/20 text-rose-200"
                }`}
              >
                Return <span className="font-mono">[{result[0]}, {result[1]}]</span>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>

        <footer className="text-xs text-white/60 mt-4">
          <p><b>Time:</b> O(n). <b>Space:</b> O(n) for the map.</p>
        </footer>
      </div>
    </div>
  );
}

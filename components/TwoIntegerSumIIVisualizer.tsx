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
      className={`rounded-full px-4 py-2 text-sm font-semibold select-none shadow
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

const Arrow = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.svg
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full h-10"
        viewBox="0 0 600 80"
      >
        <path d="M10 40 C 200 40, 400 40, 560 40" stroke="rgba(255,255,255,0.5)" strokeWidth="4" fill="none" strokeLinecap="round" />
        <polygon points="560,40 545,33 545,47" fill="rgba(255,255,255,0.8)" />
      </motion.svg>
    )}
  </AnimatePresence>
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
      <div className="mx-auto max-w-[1600px] grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* LEFT: Viz */}
        <div className="space-y-5">
          <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">Two Integer Sum II — Hash Map Visualizer</h1>
              <p className="text-white/60 text-sm">Sorted array, 1-indexed answer. We track complements in a map.</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button onClick={() => setPlaying((p) => !p)} variant="accent">{playing ? "Pause" : "Play"}</Button>
              <Button onClick={step} disabled={phase === "done"}>Step</Button>
              <Button onClick={reset} variant="ghost">Reset</Button>
            </div>
          </header>

          {/* Controls row */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <label className="text-sm text-white/70 font-medium">Speed</label>
              <input
                type="range"
                min={200}
                max={1500}
                step={100}
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="w-36"
              />
            </div>
            {/* Status */}
            <div className="flex-1 min-w-[200px] rounded-xl border border-white/10 bg-white/5 p-3.5">
              <div className="text-white/60 text-xs uppercase tracking-widest mb-1.5">Status</div>
              <div className="font-medium text-sm leading-relaxed">{status}</div>
            </div>
          </div>

          <LayoutGroup>
            {/* Array row */}
            <section className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs uppercase tracking-widest text-white/60 font-semibold">Array (sorted)</h2>
                <span className="text-white/70 text-sm font-mono">i = {Math.min(i, numbers.length)}</span>
              </div>
              <div className="flex flex-wrap gap-3 items-center min-h-[60px]">
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

            {/* Diff bubble + arrow */}
            <section className="rounded-xl border border-indigo-400/20 bg-indigo-500/5 p-5">
              <div className="mb-3 text-xs uppercase tracking-widest text-indigo-200/90 font-semibold">Compute & Check</div>
              <div className="font-mono text-white/90">
                {phase !== "idle" && i < numbers.length && (
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="rounded-lg bg-indigo-600/30 px-4 py-2.5">
                      diff = target - n = {target} - {n} = <span className="font-bold text-indigo-200">{diff}</span>
                    </div>
                    <span className="text-white/70 text-sm">check map for diff</span>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <Arrow show={phase === "walk" && sub === 1} />
              </div>
            </section>

            {/* Map grid */}
            <section className="rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs uppercase tracking-widest text-emerald-300/90 font-semibold">Hash Map (value → index +1 shown)</h2>
                <span className="text-white/70 text-xs">size = {Object.keys(mapHM).length}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 min-h-[80px]">
                {Object.entries(mapHM).map(([k, idx]) => (
                  <motion.div
                    key={`kv-${k}`}
                    layout
                    className={`rounded-lg px-3 py-2 border text-sm font-semibold shadow ${
                      Number(diff) === Number(k) && sub === 1 ? "bg-emerald-700/90" : "bg-emerald-700/70"
                    } border-emerald-300/20`}
                    animate={{ scale: Number(diff) === Number(k) && sub === 1 ? 1.05 : 1 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono">{k}</span>
                      <span className="text-white/80">→</span>
                      <span className="font-mono">{Number(idx) + 1}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Result banner */}
            <AnimatePresence>
              {phase === "done" && result && (
                <motion.div
                  initial={{ y: 20, opacity: 0, scale: 0.98 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border p-5 text-center text-lg font-semibold bg-emerald-500/10 border-emerald-400/20 text-emerald-200"
                >
                  Return <span className="font-mono text-emerald-100">[{result[0]}, {result[1]}]</span>
                </motion.div>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </div>

        {/* RIGHT: Code pane */}
        <aside className="rounded-xl border border-white/10 bg-white/5 p-5 h-fit lg:sticky lg:top-24">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm uppercase tracking-widest text-white/60 font-semibold">Python (Hash Map)</h3>
            <span className="text-white/60 text-xs">line {currentLine}</span>
          </div>
          <pre className="font-mono text-sm leading-relaxed bg-slate-900/80 rounded-lg p-4 border border-white/5">
            {code.map((ln, idx) => {
              const lineNo = idx + 1;
              const active = lineNo === currentLine || (lineNo === 2 && phase !== "done" && sub === 0);
              return (
                <div key={idx} className={`px-2 py-1 rounded transition-colors ${active ? "bg-amber-500/20 border-l-2 border-amber-400" : ""}`}>
                  <span className="text-white/40 mr-3 select-none">{String(lineNo).padStart(2, ' ')}</span>
                  <code className="whitespace-pre text-white/90">{ln}</code>
                </div>
              );
            })}
          </pre>
          <div className="mt-4 text-xs text-white/60 leading-relaxed">
            <p>
              <b>Time:</b> O(n), <b>Space:</b> O(n). We store each seen value → index, and return <i>1-indexed</i> positions when the complement appears.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

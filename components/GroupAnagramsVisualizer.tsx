'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

/**
 * Group Anagrams — Teaching Visualizer (v2)
 *
 * Goals: make EVERY step explicit.
 *  - Numbered stepper (1: pick string, 2: sort chars → signature, 3: check bucket, 4: append/create)
 *  - Live status line describing what's happening in plain English
 *  - Color legend so viewers instantly map concepts → visuals
 *  - Code pane highlighting current line
 *  - Auto-play with pause/step/reset + speed control
 *
 * Tailwind + framer-motion required
 */

// ---------- UI bits ----------
const Button = ({ children, onClick, disabled, variant = "default" }: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition border select-none
      ${variant === "accent"
        ? "bg-indigo-500/90 border-indigo-400/20 text-white hover:bg-indigo-500"
        : variant === "danger"
        ? "bg-rose-600/90 border-rose-400/20 text-white hover:bg-rose-600"
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

const Chip = ({ id, text, tone = "slate", pulse = false }: { id: string; text: string; tone?: "slate"|"emerald"|"amber"|"indigo"; pulse?: boolean }) => (
  <motion.div
    layout
    layoutId={`chip-${id}`}
    className={`rounded-full px-4 py-2 text-sm font-semibold shadow whitespace-pre min-w-[56px] flex items-center justify-center
      ${tone === "emerald" ? "bg-emerald-600" : tone === "amber" ? "bg-amber-500" : tone === "indigo" ? "bg-indigo-600" : "bg-slate-700"}
      text-white ${pulse ? "ring-4 ring-white/20" : ""}`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: pulse ? 1.06 : 1 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
  >
    {text}
  </motion.div>
);

const AUTO_LOOP = true;
type Phase = "idle" | "processing" | "done"; // sub: 0 build signature, 1 check, 2 append/create

export default function GroupAnagramsVisualizer() {
  const arr = ["act", "pots", "tops", "cat", "stop", "hat"];
  const [speed, setSpeed] = useState(1200);
  const [playing, setPlaying] = useState(true);

  const [phase, setPhase] = useState<Phase>("idle");
  const [i, setI] = useState(0);
  const [sub, setSub] = useState(0);
  const [sigBuildIdx, setSigBuildIdx] = useState(0);
  const [buckets, setBuckets] = useState<Record<string, string[]>>({});
  const [order, setOrder] = useState<string[]>([]);

  const s = arr[i];
  const sortedFull = useMemo(() => (s ? s.split("").sort().join("") : ""), [s]);
  const sortedPartial = useMemo(() => sortedFull.slice(0, sigBuildIdx), [sortedFull, sigBuildIdx]);

  const reset = () => {
    setPhase("idle"); setI(0); setSub(0); setSigBuildIdx(0);
    setBuckets({}); setOrder([]); setPlaying(true);
  };

  const step = () => {
    if (phase === "done") return;

    if (phase === "idle") { setPhase("processing"); setSub(0); setSigBuildIdx(0); return; }

    if (i >= arr.length) { setPhase("done"); setPlaying(false); return; }

    if (sub === 0) { // build signature progressively
      if (sigBuildIdx < sortedFull.length) { setSigBuildIdx((k) => k + 1); return; }
      setSub(1); return;
    }

    if (sub === 1) { // check bucket
      setSub(2); return;
    }

    if (sub === 2) { // append/create then advance
      setBuckets((prev) => {
        const next = { ...prev } as Record<string, string[]>;
        if (!next[sortedFull]) next[sortedFull] = [];
        next[sortedFull] = [...next[sortedFull], s];
        return next;
      });
      setOrder((prev) => (prev.includes(sortedFull) ? prev : [...prev, sortedFull]));
      setI((k) => k + 1); setSub(0); setSigBuildIdx(0); return;
    }
  };

  useInterval(() => step(), playing ? speed : null);

  useEffect(() => {
    if (phase !== "done" || !AUTO_LOOP) return;
    const t = setTimeout(() => reset(), 1700);
    return () => clearTimeout(t);
  }, [phase]);

  // Auto-start on mount
  useEffect(() => {
    if (phase === "idle" && arr.length > 0) {
      step();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // ---------- code highlighting ----------
  const currentLine = (() => {
    if (phase === "idle") return 1;
    if (phase === "processing" && sub === 0) return 5; // s_sort = ''.join(sorted(s))
    if (phase === "processing" && sub === 1) return 6; // if s_sort in my_hashmap
    if (phase === "processing" && sub === 2) return (buckets.hasOwnProperty(sortedFull) ? 7 : 9);
    if (phase === "done") return 11;
    return 4;
  })();

  const stepLabel = (() => {
    if (phase === "idle") return "Ready: start processing";
    if (phase === "processing" && sub === 0) return `Step 2: sort characters of "${s}" → signature`;
    if (phase === "processing" && sub === 1) return `Step 3: does bucket for "${sortedFull}" exist?`;
    if (phase === "processing" && sub === 2) return buckets.hasOwnProperty(sortedFull)
      ? `Step 4: append "${s}" to bucket [${sortedFull}]`
      : `Step 4: create bucket [${sortedFull}] and insert "${s}"`;
    if (phase === "done") return "Done: return list(my_hashmap.values())";
    return "Processing";
  })();

  // ---------- Render ----------
  return (
    <div className="w-full bg-[#0b0e13] text-white p-6 rounded-xl border border-gray-800">
      <div className="mx-auto max-w-[1400px] w-full space-y-6">
        {/* Top Row: Header, Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-1.5">Group Anagrams — Visualizer</h2>
            <p className="text-white/60 text-sm mt-1">We compute a <span className="font-semibold">signature</span> by sorting characters, then bucket strings by that signature.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setPlaying((p) => !p)} variant="accent">{playing ? "Pause" : "Play"}</Button>
            <Button onClick={step} disabled={phase === "done"}>Step</Button>
            <Button onClick={reset} variant="ghost">Reset</Button>
          </div>
        </div>

        {/* Legend + status */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4">
          <div className="rounded-lg border border-white/10 bg-white/5 p-3.5 text-xs">
            <div className="font-semibold mb-2 text-sm text-white/90">Legend</div>
            <div className="flex flex-wrap gap-2 items-center">
              <Chip id="lg1" text="input s" tone="amber" />
              <Chip id="lg2" text="signature" tone="indigo" />
              <Chip id="lg3" text="bucket" tone="emerald" />
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-3.5 text-sm">
            <div className="text-white/60 text-xs mb-1.5 uppercase tracking-widest">Status</div>
            <div className="font-semibold text-base leading-relaxed text-white/95">{stepLabel}</div>
          </div>
        </div>
        
        {/* Speed control */}
        <div className="flex items-center gap-3">
          <label className="text-sm text-white/70">Speed:</label>
          <input type="range" min={200} max={1500} step={100} value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))} className="w-32" />
        </div>

        <LayoutGroup>
          {/* Row: array & signature */}
          <section className="rounded-lg border border-white/10 bg-white/5 p-4.5">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
              <div>
                <div className="mb-2.5 text-sm uppercase tracking-widest text-white/70 font-semibold">1) Input strings</div>
                <div className="flex flex-wrap gap-2">
                  {arr.map((str, idx) => (
                    <Chip key={`in-${idx}`} id={`in-${idx}`} text={str} tone={idx===i && phase!=="done"?"amber":"slate"} pulse={idx===i && phase!=="done"} />
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-2.5 text-sm uppercase tracking-widest text-white/70 font-semibold">2) Signature = sorted(s)</div>
                <div className="rounded-lg bg-slate-800/70 p-3.5 font-mono text-xl min-h-[52px] flex items-center">
                  <AnimatePresence>
                    <motion.span key={sortedPartial} initial={{ opacity: 0.2 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-indigo-200 font-semibold">
                      {sortedPartial || (phase!=="done"?"…":"")}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>

          {/* Buckets - More columns for wider layout */}
          <section className="rounded-lg border border-emerald-400/20 bg-emerald-500/5 p-4.5">
            <div className="mb-3.5 text-sm uppercase tracking-widest text-emerald-300/90 font-semibold">3) Buckets by signature → 4) Append/Create</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5">
              {order.map((sig) => (
                <motion.div key={`bucket-${sig}`} layout className={`rounded-lg border border-emerald-300/20 ${sig===sortedFull && sub>=1 && phase!=="done"?"bg-emerald-700/50":"bg-emerald-700/30"} p-3`}>
                  <div className="mb-2 font-mono text-emerald-200 text-sm flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-1 rounded bg-emerald-900/50 border border-emerald-300/20 font-semibold text-xs">{sig}</span>
                    {sig===sortedFull && sub===1 && <span className="text-white/70 text-xs">(checking…)</span>}
                    {sig===sortedFull && sub===2 && <span className="text-emerald-200 text-xs">(inserting)</span>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(buckets[sig]||[]).map((v, idx) => (
                      <Chip key={`b-${sig}-${idx}-${v}`} id={`b-${sig}-${idx}-${v}`} text={v} tone="emerald" />
                    ))}
                  </div>
                </motion.div>
              ))}
              {/* Preview bucket if signature not yet created */}
              {phase === "processing" && sub >= 1 && !buckets.hasOwnProperty(sortedFull) && (
                <motion.div layout className="rounded-lg border border-emerald-300/10 bg-emerald-700/10 p-3">
                  <div className="mb-2 font-mono text-emerald-300/70 text-sm font-semibold">{sortedFull}</div>
                  <div className="text-white/60 text-xs">(will create)</div>
                </motion.div>
              )}
            </div>
          </section>

          {/* Result banner */}
          <AnimatePresence>
            {phase === "done" && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} className="rounded-lg border p-4 text-center text-lg font-semibold bg-emerald-500/10 border-emerald-400/20 text-emerald-200">
                Done → <span className="font-mono">list(my_hashmap.values())</span>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>

        {/* Code pane - At bottom */}
        <aside className="rounded-lg border border-white/10 bg-white/5 p-4.5">
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-sm uppercase tracking-widest text-white/60 font-semibold">Python Code Execution</h3>
            <span className="text-white/60 text-xs">
              {currentLine ? `Line ${currentLine}` : 'Ready'}
            </span>
          </div>
          <pre className="bg-slate-900/80 rounded-lg p-3 overflow-x-auto border border-white/5">
            <code className="text-sm font-mono text-white/90 leading-relaxed">
              <div className={`px-2 py-1.5 rounded transition-colors ${currentLine === 1 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                <span className="text-purple-400">class</span> <span className="text-blue-400">Solution</span>:
              </div>
              <div className="px-2 py-1.5 rounded transition-colors">
                {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">groupAnagrams</span>(<span className="text-green-400">self</span>, <span className="text-orange-400">strs</span>: <span className="text-blue-400">List</span>[<span className="text-blue-400">str</span>]) <span className="text-purple-400">-&gt;</span> <span className="text-blue-400">List</span>[<span className="text-blue-400">List</span>[<span className="text-blue-400">str</span>]]:
              </div>
              <div className="px-2 py-1.5 rounded transition-colors">
                {'        '}<span className="text-orange-400">my_hashmap</span> = {'{}'}
              </div>
              <div className={`px-2 py-1.5 rounded transition-colors ${currentLine === 4 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-purple-400">for</span> <span className="text-orange-400">i</span>, <span className="text-orange-400">s</span> <span className="text-purple-400">in</span> <span className="text-blue-400">enumerate</span>(<span className="text-orange-400">strs</span>):
              </div>
              <div className={`px-2 py-1.5 rounded transition-colors ${currentLine === 5 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'            '}<span className="text-orange-400">s_sort</span> = <span className="text-green-400">""</span>.<span className="text-blue-400">join</span>(<span className="text-blue-400">sorted</span>(<span className="text-orange-400">s</span>))
              </div>
              <div className={`px-2 py-1.5 rounded transition-colors ${currentLine === 6 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'            '}<span className="text-purple-400">if</span> <span className="text-orange-400">s_sort</span> <span className="text-purple-400">in</span> <span className="text-orange-400">my_hashmap</span>:
              </div>
              <div className={`px-2 py-1.5 rounded transition-colors ${currentLine === 7 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : ''}`}>
                {'                '}<span className="text-orange-400">my_hashmap</span>[<span className="text-orange-400">s_sort</span>].<span className="text-blue-400">append</span>(<span className="text-orange-400">s</span>)
              </div>
              <div className={`px-2 py-1.5 rounded transition-colors ${currentLine === 8 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'            '}<span className="text-purple-400">else</span>:
              </div>
              <div className={`px-2 py-1.5 rounded transition-colors ${currentLine === 9 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'                '}<span className="text-orange-400">my_hashmap</span>[<span className="text-orange-400">s_sort</span>] = [<span className="text-orange-400">s</span>]
              </div>
              <div className="px-2 py-1.5 rounded">
                {'        '}
              </div>
              <div className={`px-2 py-1.5 rounded transition-colors ${currentLine === 11 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : ''}`}>
                {'        '}<span className="text-purple-400">return</span> <span className="text-blue-400">list</span>(<span className="text-orange-400">my_hashmap</span>.<span className="text-blue-400">values</span>())
              </div>
            </code>
          </pre>
          <div className="mt-3 text-xs text-white/60">
            <div><b>Time:</b> O(n · k log k). <b>Space:</b> O(n · k).</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

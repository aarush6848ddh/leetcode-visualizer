'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

type Phase = "idle" | "sorting_s" | "sorting_t" | "compare" | "done";

function useInterval(cb: () => void, delay: number | null) {
  const saved = useRef(cb);
  useEffect(() => {
    saved.current = cb;
  }, [cb]);
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
    className={`rounded-md px-3 py-2 text-sm font-bold shadow-lg min-w-[50px] flex items-center justify-center
                ${active ? "bg-amber-500 shadow-amber-500/50" : "bg-slate-700 shadow-slate-700/50"} text-white`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: active ? 1.1 : 1 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
  >
    {ch}
  </motion.div>
);

export default function AnagramSortVisualizer() {
  // inputs
  const [s, setS] = useState("racecar");
  const [t, setT] = useState("carrace");
  const speed = 800; // Fixed speed
  const AUTO_LOOP = true;

  // derived
  const sChars = useMemo(() => s.split(""), [s]);
  const tChars = useMemo(() => t.split(""), [t]);

  // viz state
  const [phase, setPhase] = useState<Phase>("idle");
  const [i, setI] = useState(0); // step inside sorting
  const [sSorted, setSSorted] = useState<string[]>([]);
  const [tSorted, setTSorted] = useState<string[]>([]);
  const [result, setResult] = useState<boolean | null>(null);

  const reset = () => {
    setPhase("idle");
    setI(0);
    setSSorted([]);
    setTSorted([]);
    setResult(null);
  };

  // step machine - animate sorting lexicographically
  const step = () => {
    if (phase === "idle") {
      // Start sorting string s
      setPhase("sorting_s");
      setI(0);
      setSSorted([...sChars]);
      setTSorted([...tChars]);
      return;
    }

    if (phase === "sorting_s") {
      // Sort string s lexicographically - animate step by step
      const nextI = i + 1;
      const partiallySorted = [...sSorted];
      
      // Insertion sort animation: move current character to correct position
      if (nextI <= partiallySorted.length) {
        // Sort up to nextI elements
        const sortedPortion = partiallySorted.slice(0, nextI).sort();
        const remaining = partiallySorted.slice(nextI);
        setSSorted([...sortedPortion, ...remaining]);
        setI(nextI);
        
        if (nextI >= sSorted.length) {
          // Finished sorting s, move to sorting t
          setSSorted([...sSorted].sort());
          setPhase("sorting_t");
          setI(0);
        }
      }
      return;
    }

    if (phase === "sorting_t") {
      // Sort string t lexicographically - animate step by step
      const nextI = i + 1;
      const partiallySorted = [...tSorted];
      
      if (nextI <= partiallySorted.length) {
        // Sort up to nextI elements
        const sortedPortion = partiallySorted.slice(0, nextI).sort();
        const remaining = partiallySorted.slice(nextI);
        setTSorted([...sortedPortion, ...remaining]);
        setI(nextI);
        
        if (nextI >= tSorted.length) {
          // Finished sorting t, move to compare
          setTSorted([...tSorted].sort());
          setPhase("compare");
        }
      }
      return;
    }

    if (phase === "compare") {
      const ok = sSorted.length === tSorted.length && sSorted.every((c, k) => c === tSorted[k]);
      setResult(ok);
      setPhase("done");
      return;
    }
  };

  useInterval(() => step(), phase !== "done" ? speed : null);

  // auto-loop after finish
  useEffect(() => {
    if (phase !== "done" || !AUTO_LOOP) return;
    const t = setTimeout(reset, 1500);
    return () => clearTimeout(t);
  }, [phase]);

  // Auto-start when input changes
  useEffect(() => {
    if (s && t) {
      reset();
    }
  }, [s, t]);

  const renderRow = (label: string, arr: string[], isSorting: boolean, highlightIndex?: number) => (
    <section className="rounded-xl border border-white/10 bg-white/5 p-5 mb-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm uppercase tracking-widest text-white/70 font-semibold">{label}</h3>
        <span className="text-xs text-white/60 font-mono">
          {isSorting ? "sorting lexicographically…" : phase === "compare" || phase === "done" ? "sorted()" : ""}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 min-h-[56px] items-center">
        {arr.length > 0 ? (
          arr.map((ch, idx) => {
            // Highlight characters that have been sorted
            const isSorted = isSorting && idx < (highlightIndex || 0);
            return (
              <Chip 
                key={`${label}-${idx}-${ch}-${arr.length}-${phase}-${isSorted}`} 
                id={`${label}-${idx}-${ch}`} 
                ch={ch} 
                active={isSorted} 
              />
            );
          })
        ) : (
          <span className="text-white/30 text-sm italic">Empty</span>
        )}
      </div>
    </section>
  );

  return (
    <div className="w-full bg-[#0c0f14] text-white rounded-xl border border-gray-800 p-8 shadow-xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-3">Valid Anagram — Sorting Visualizer</h2>
        <p className="text-white/60 text-sm mb-4 leading-relaxed">
          Algorithm shown: <code className="bg-white/10 px-2 py-1 rounded text-sm">sorted(list(s)) == sorted(list(t))</code>
        </p>
      </div>

      {/* Input Row */}
      <div className="mb-8 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <label className="text-sm text-white/70 font-medium">s:</label>
          <input
            value={s}
            onChange={(e) => setS(e.target.value)}
            className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono min-w-[150px]"
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-white/70 font-medium">t:</label>
          <input
            value={t}
            onChange={(e) => setT(e.target.value)}
            className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono min-w-[150px]"
          />
        </div>
      </div>

      <LayoutGroup>
        {/* Stage 1 — Original strings */}
        <section className="rounded-xl border border-white/10 bg-white/5 p-5 mb-4">
          <div className="mb-3">
            <h3 className="text-sm uppercase tracking-widest text-white/70 font-semibold mb-3">Original Strings</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-white/60 mb-2 uppercase tracking-widest font-semibold">s</div>
              <div className="rounded-lg bg-slate-800/80 px-4 py-3 font-mono text-lg">{s || "(empty)"}</div>
            </div>
            <div>
              <div className="text-xs text-white/60 mb-2 uppercase tracking-widest font-semibold">t</div>
              <div className="rounded-lg bg-slate-800/80 px-4 py-3 font-mono text-lg">{t || "(empty)"}</div>
            </div>
          </div>
        </section>

        {/* Arrow */}
        <div className="flex items-center justify-center my-4">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/60 text-base"
          >
            ▼ sorting lexicographically with <code className="bg-white/10 px-2 py-1 rounded">sorted()</code>
          </motion.div>
        </div>

        {/* Stage 2 — Sorting animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {renderRow("sorted(s)", sSorted, phase === "sorting_s", i)}
          {renderRow("sorted(t)", tSorted, phase === "sorting_t", i)}
        </div>

        {/* Arrow to compare */}
        {(phase === "compare" || phase === "done") && (
          <div className="flex items-center justify-center my-4">
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/60 text-base"
            >
              ▼ compare sorted strings
            </motion.div>
          </div>
        )}

        {/* Result */}
        <AnimatePresence>
          {phase === "done" && result !== null && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`mt-4 rounded-xl border-2 p-4 text-center text-lg font-semibold ${
                result
                  ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-200"
                  : "bg-rose-500/10 border-rose-400/30 text-rose-200"
              }`}
            >
              {result 
                ? "sorted(list(s)) == sorted(list(t)) → True (anagram)" 
                : "Not equal → False (not an anagram)"}
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>

      {/* Instructions */}
      <div className="mt-8 pt-6 border-t border-white/10 space-y-2 text-sm text-white/60 leading-relaxed">
        <p>
          <span className="font-semibold text-white/80">Time:</span> O(n log n) for the sorts. <span className="font-semibold text-white/80">Space:</span> O(n).
        </p>
        <p>
          <span className="font-semibold text-white/80">Tip:</span> Try examples: s=<code className="bg-white/10 px-1.5 py-0.5 rounded font-mono">"jar"</code>, t=<code className="bg-white/10 px-1.5 py-0.5 rounded font-mono">"jam"</code> or s=<code className="bg-white/10 px-1.5 py-0.5 rounded font-mono">"anagram"</code>, t=<code className="bg-white/10 px-1.5 py-0.5 rounded font-mono">"nagaram"</code>.
        </p>
      </div>
    </div>
  );
}


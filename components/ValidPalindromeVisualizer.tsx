'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

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

const Chip = ({ id, ch, active, filtered, matched }: { id: string; ch: string; active?: boolean; filtered?: boolean; matched?: boolean }) => (
  <motion.div
    layout
    layoutId={id}
    className={`rounded-md px-3 py-1.5 text-sm font-semibold shadow min-w-[40px] flex items-center justify-center
                ${matched ? "bg-emerald-600" : active ? "bg-amber-500" : filtered ? "bg-slate-600" : "bg-slate-700"} text-white`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: active ? 1.06 : 1 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
  >
    {ch}
  </motion.div>
);

const AUTO_LOOP = true;
type Phase = "idle" | "filter" | "lowercase" | "reverse" | "compare" | "done";

export default function ValidPalindromeVisualizer() {
  const s = "Was it a car or a cat I saw?";
  const [speed, setSpeed] = useState(400);
  const [playing, setPlaying] = useState(true);

  const [phase, setPhase] = useState<Phase>("idle");
  const [filteredIdx, setFilteredIdx] = useState(0);
  const [filteredChars, setFilteredChars] = useState<string[]>([]);
  const [lowercaseChars, setLowercaseChars] = useState<string[]>([]);
  const [reversedChars, setReversedChars] = useState<string[]>([]);
  const [compareIdx, setCompareIdx] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);
  const [activeLine, setActiveLine] = useState<number | null>(null);

  const reset = () => {
    setPhase("idle");
    setFilteredIdx(0);
    setFilteredChars([]);
    setLowercaseChars([]);
    setReversedChars([]);
    setCompareIdx(0);
    setResult(null);
    setActiveLine(null);
    setPlaying(true);
  };

  const step = () => {
    if (phase === "done") return;

    if (phase === "idle") {
      setActiveLine(2);
      setPhase("filter");
      setFilteredIdx(0);
      return;
    }

    if (phase === "filter") {
      setActiveLine(3);
      const chars = s.split("");
      if (filteredIdx < chars.length) {
        const ch = chars[filteredIdx];
        if (/[a-zA-Z0-9]/.test(ch)) {
          setFilteredChars((prev) => [...prev, ch]);
        }
        setFilteredIdx((i) => i + 1);
        return;
      }
      // Done filtering
      setPhase("lowercase");
      setFilteredIdx(0);
      return;
    }

    if (phase === "lowercase") {
      setActiveLine(4);
      if (filteredIdx < filteredChars.length) {
        const lowerCh = filteredChars[filteredIdx].toLowerCase();
        setLowercaseChars((prev) => [...prev, lowerCh]);
        setFilteredIdx((i) => i + 1);
        return;
      }
      // Done lowercasing
      setPhase("reverse");
      return;
    }

    if (phase === "reverse") {
      setActiveLine(6);
      setReversedChars([...lowercaseChars].reverse());
      setPhase("compare");
      setCompareIdx(0);
      return;
    }

    if (phase === "compare") {
      setActiveLine(6);
      if (compareIdx < lowercaseChars.length) {
        const left = lowercaseChars[compareIdx];
        const right = reversedChars[compareIdx];
        if (left !== right) {
          setResult(false);
          setPhase("done");
          setPlaying(false);
          setActiveLine(8);
          return;
        }
        setCompareIdx((i) => i + 1);
        return;
      }
      // All compared, they match
      setResult(true);
      setPhase("done");
      setPlaying(false);
      setActiveLine(7);
      return;
    }
  };

  useInterval(() => step(), playing ? speed : null);

  // Auto-start on mount
  useEffect(() => {
    if (phase === "idle" && s) {
      step();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // auto-loop after finish
  useEffect(() => {
    if (phase !== "done" || !AUTO_LOOP) return;
    const t = setTimeout(reset, 2000);
    return () => clearTimeout(t);
  }, [phase]);

  const originalChars = s.split("");
  const currentFilterIdx = phase === "filter" ? filteredIdx : -1;
  const currentLowerIdx = phase === "lowercase" ? filteredIdx : -1;
  const currentCompareLeftIdx = phase === "compare" ? compareIdx : -1;
  const currentCompareRightIdx = phase === "compare" ? compareIdx : -1;

  return (
    <div className="min-h-screen bg-[#0b0e13] text-white p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Valid Palindrome — Visualizer</h2>
            <p className="text-white/60 text-sm mt-1">
              Filter alphanumeric characters, convert to lowercase, then compare with reversed string.
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
                {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">isPalindrome</span>(<span className="text-green-400">self</span>, <span className="text-orange-400">s</span>: <span className="text-blue-400">str</span>) <span className="text-purple-400">-&gt;</span> <span className="text-blue-400">bool</span>:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 3 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-orange-400">new_s</span> = <span className="text-blue-400">"".join</span>([<span className="text-orange-400">char</span> <span className="text-purple-400">for</span> <span className="text-orange-400">char</span> <span className="text-purple-400">in</span> <span className="text-orange-400">s</span> <span className="text-purple-400">if</span> <span className="text-orange-400">char</span>.<span className="text-blue-400">isalnum</span>()])
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 4 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-orange-400">lower_s</span> = <span className="text-orange-400">new_s</span>.<span className="text-blue-400">lower</span>()
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 5 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-blue-400">print</span>(<span className="text-orange-400">lower_s</span>)
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 6 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-purple-400">if</span> <span className="text-orange-400">lower_s</span>[::<span className="text-cyan-400">-1</span>] == <span className="text-orange-400">lower_s</span>:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 7 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : ''}`}>
                {'            '}<span className="text-purple-400">return</span> <span className="text-blue-400">True</span>
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 8 ? 'bg-rose-500/20 border-l-2 border-rose-400' : ''}`}>
                {'        '}<span className="text-purple-400">return</span> <span className="text-blue-400">False</span>
              </div>
            </code>
          </pre>
        </section>

        <LayoutGroup>
          {/* Original string */}
          <section className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm uppercase tracking-widest text-white/60">Original String</h3>
              <span className="text-xs text-white/60">
                {phase === "filter" ? "Filtering alphanumeric..." : phase === "idle" ? "Ready" : "Done"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 min-h-[48px]">
              {originalChars.map((ch, idx) => {
                const isAlphanumeric = /[a-zA-Z0-9]/.test(ch);
                const isActive = phase === "filter" && idx === currentFilterIdx;
                return (
                  <Chip
                    key={`orig-${idx}`}
                    id={`orig-${idx}`}
                    ch={ch}
                    active={isActive}
                    filtered={phase !== "idle" && phase !== "filter" && !isAlphanumeric}
                  />
                );
              })}
            </div>
          </section>

          {/* Filtered string */}
          {filteredChars.length > 0 && (
            <section className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm uppercase tracking-widest text-white/60">Filtered (Alphanumeric Only)</h3>
                <span className="text-xs text-white/60">
                  {phase === "lowercase" ? "Converting to lowercase..." : phase === "idle" || phase === "filter" ? "" : "Done"}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 min-h-[48px]">
                {filteredChars.map((ch, idx) => (
                  <Chip key={`filt-${idx}`} id={`filt-${idx}`} ch={ch} active={phase === "filter" && idx === filteredChars.length - 1} />
                ))}
              </div>
            </section>
          )}

          {/* Lowercase string */}
          {lowercaseChars.length > 0 && (
            <section className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm uppercase tracking-widest text-white/60">Lowercase</h3>
                <span className="text-xs text-white/60">
                  {phase === "reverse" || phase === "compare" ? "Ready for comparison" : phase === "lowercase" ? "Converting..." : ""}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 min-h-[48px]">
                {lowercaseChars.map((ch, idx) => (
                  <Chip key={`lower-${idx}`} id={`lower-${idx}`} ch={ch} active={phase === "lowercase" && idx === currentLowerIdx} />
                ))}
              </div>
            </section>
          )}

          {/* Comparison: Original vs Reversed */}
          {lowercaseChars.length > 0 && (phase === "reverse" || phase === "compare" || phase === "done") && (
            <section className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm uppercase tracking-widest text-white/60">Comparison: Original vs Reversed</h3>
                <span className="text-xs text-white/60">
                  {phase === "compare" ? `Comparing index ${compareIdx}...` : phase === "done" ? (result ? "Match!" : "No match") : ""}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-2 text-xs text-white/60">lower_s</div>
                  <div className="flex flex-wrap gap-2">
                    {lowercaseChars.map((ch, idx) => (
                      <Chip
                        key={`comp-left-${idx}`}
                        id={`comp-left-${idx}`}
                        ch={ch}
                        active={phase === "compare" && idx === currentCompareLeftIdx}
                        matched={phase === "compare" && idx < compareIdx && lowercaseChars[idx] === reversedChars[idx]}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-2 text-xs text-white/60">lower_s[::-1] (reversed)</div>
                  <div className="flex flex-wrap gap-2">
                    {reversedChars.map((ch, idx) => (
                      <Chip
                        key={`comp-right-${idx}`}
                        id={`comp-right-${idx}`}
                        ch={ch}
                        active={phase === "compare" && idx === currentCompareRightIdx}
                        matched={phase === "compare" && idx < compareIdx && lowercaseChars[idx] === reversedChars[idx]}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Result */}
          <AnimatePresence>
            {phase === "done" && result !== null && (
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
                {result
                  ? "Palindrome detected → True"
                  : "Not a palindrome → False"}
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>

        <footer className="text-xs text-white/60 mt-4">
          <p><b>Time:</b> O(n). <b>Space:</b> O(n).</p>
        </footer>
      </div>
    </div>
  );
}


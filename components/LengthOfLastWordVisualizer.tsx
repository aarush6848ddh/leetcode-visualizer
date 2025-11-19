'use client';

import React, { useEffect, useRef, useState } from "react";
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

const CharChip = ({ char, index, active, counted, isSpace }: { char: string; index: number; active?: boolean; counted?: boolean; isSpace?: boolean }) => (
  <motion.div
    layout
    layoutId={`char-${index}`}
    className={`rounded-lg px-3 py-2 text-base font-semibold shadow select-none min-w-[40px] flex items-center justify-center
                ${counted ? "bg-emerald-600" : active ? "bg-amber-500" : isSpace ? "bg-slate-600" : "bg-slate-700"} text-white`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: active ? 1.1 : 1 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
  >
    {char === ' ' ? '·' : char}
  </motion.div>
);

const AUTO_LOOP = true;

type Phase = "idle" | "init" | "loop_start" | "check_char" | "increment" | "check_return_after_increment" | "check_return" | "return_result" | "done";

export default function LengthOfLastWordVisualizer() {
  const s = " fly me   to   the moon ";
  const [speed, setSpeed] = useState(1000);

  // algorithm state
  const [i, setI] = useState(s.length - 1);
  const [length, setLength] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [activeLine, setActiveLine] = useState<number | null>(null);

  const reset = () => {
    setI(s.length - 1);
    setLength(0);
    setResult(null);
    setPhase("idle");
    setActiveLine(null);
    setPlaying(true);
  };

  const step = () => {
    if (phase === "done") return;

    if (phase === "idle") {
      setActiveLine(3); // length = 0
      setPhase("init");
      return;
    }

    if (phase === "init") {
      setActiveLine(4); // for i in range(len(s) - 1, -1, -1):
      setPhase("loop_start");
      return;
    }

    if (phase === "loop_start") {
      if (i < 0) {
        setPhase("done");
        setActiveLine(null);
        setPlaying(false);
        if (length > 0) {
          setResult(length);
        }
        return;
      }
      setActiveLine(5); // if s[i].isalnum():
      setPhase("check_char");
      return;
    }

    if (phase === "check_char") {
      const char = s[i];
      if (char.match(/[a-zA-Z0-9]/)) {
        setActiveLine(6); // length += 1
        setPhase("increment");
      } else {
        // Not alphanumeric - check if we should return
        setActiveLine(7); // if length > 0:
        setPhase("check_return");
      }
      return;
    }

    if (phase === "increment") {
      setLength((l) => l + 1);
      setActiveLine(7); // if length > 0:
      setPhase("check_return_after_increment");
      return;
    }

    if (phase === "check_return_after_increment") {
      // After incrementing, check the same character (but it's alphanumeric so return won't trigger)
      // Then move to next character
      const char = s[i];
      // The check "if length > 0 and not char.isalnum()" will be false since char IS alphanumeric
      // So we continue to next character
      if (i <= 0) {
        // Reached the beginning, return length
        setActiveLine(10); // return length
        setResult(length);
        setPhase("return_result");
      } else {
        setI((idx) => idx - 1);
        setActiveLine(4); // Back to loop
        setPhase("loop_start");
      }
      return;
    }

    if (phase === "check_return") {
      const char = s[i];
      // We encountered a non-alphanumeric character
      if (length > 0) {
        // We've been counting, so this space ends the word
        setActiveLine(9); // return length
        setResult(length);
        setPhase("return_result");
      } else {
        // Haven't started counting yet, skip this space and continue
        setI((idx) => idx - 1);
        setActiveLine(4); // Back to loop
        setPhase("loop_start");
      }
      return;
    }

    if (phase === "return_result") {
      setPhase("done");
      setActiveLine(null);
      setPlaying(false);
      return;
    }
  };

  useInterval(() => step(), playing ? speed : null);

  // Auto-start on mount
  useEffect(() => {
    if (phase === "idle" && s.length > 0) {
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

  // Determine which characters are counted
  const countedIndices = new Set<number>();
  let tempLength = 0;
  for (let idx = s.length - 1; idx >= 0; idx--) {
    if (s[idx].match(/[a-zA-Z0-9]/)) {
      if (tempLength < length) {
        countedIndices.add(idx);
        tempLength++;
      } else {
        break;
      }
    } else if (tempLength > 0) {
      break;
    }
  }

  return (
    <div className="w-full bg-[#0b0e13] text-white p-6 rounded-xl border border-gray-800">
      <div className="mx-auto max-w-5xl space-y-5">
        <header className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold">Length of Last Word — Visualizer</h2>
            <p className="text-white/60 text-sm mt-1">
              We traverse the string from <span className="font-semibold">right to left</span>, counting alphanumeric characters.
              When we encounter a space after starting to count, we return the length.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setPlaying((p) => !p)} variant="accent">{playing ? "Pause" : "Play"}</Button>
            <Button onClick={step} disabled={phase === "done"}>Step</Button>
            <Button onClick={reset} variant="ghost">Reset</Button>
          </div>
        </header>

        {/* Code Display with Line-by-Line Highlighting */}
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
                <span className="text-purple-400">class</span> <span className="text-blue-400">Solution</span>:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 2 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">lengthOfLastWord</span>(<span className="text-green-400">self</span>, <span className="text-orange-400">s</span>: <span className="text-blue-400">str</span>) -&gt; <span className="text-blue-400">int</span>:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 3 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-orange-400">length</span> = <span className="text-cyan-400">0</span>
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 4 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-purple-400">for</span> <span className="text-orange-400">i</span> <span className="text-purple-400">in</span> <span className="text-blue-400">range</span>(<span className="text-blue-400">len</span>(<span className="text-orange-400">s</span>) - <span className="text-cyan-400">1</span>, -<span className="text-cyan-400">1</span>, -<span className="text-cyan-400">1</span>):
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 5 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'            '}<span className="text-purple-400">if</span> <span className="text-orange-400">s</span>[<span className="text-orange-400">i</span>].<span className="text-blue-400">isalnum</span>():
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 6 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'                '}<span className="text-orange-400">length</span> += <span className="text-cyan-400">1</span>
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 7 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'            '}<span className="text-purple-400">if</span> <span className="text-orange-400">length</span> &gt; <span className="text-cyan-400">0</span>:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 8 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : ''}`}>
                {'                '}<span className="text-purple-400">if</span> <span className="text-purple-400">not</span> <span className="text-orange-400">s</span>[<span className="text-orange-400">i</span>].<span className="text-blue-400">isalnum</span>():
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 9 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : ''}`}>
                {'                    '}<span className="text-purple-400">return</span> <span className="text-orange-400">length</span>
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 10 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-purple-400">return</span> <span className="text-orange-400">length</span>
              </div>
            </code>
          </pre>
        </section>

        {/* Speed control */}
        <div className="flex items-center gap-3">
          <label className="text-sm text-white/70">Speed</label>
          <input 
            type="range" 
            min={300} 
            max={1500} 
            step={100} 
            value={speed} 
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-32"
          />
        </div>

        <LayoutGroup>
          {/* String visualization */}
          <section className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-widest text-white/60 font-semibold">String</h2>
              <div className="flex items-center gap-4">
                <span className="text-white/70 text-sm font-mono">i = {i >= 0 ? i : 'done'}</span>
                <span className="text-white/70 text-sm font-mono">length = {length}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 items-end">
              {s.split('').map((char, idx) => {
                const active = phase !== "done" && idx === i;
                const counted = countedIndices.has(idx);
                const isSpace = char === ' ';
                return (
                  <div key={`char-wrapper-${idx}`} className="flex flex-col items-center gap-2">
                    <CharChip char={char} index={idx} active={active} counted={counted} isSpace={isSpace} />
                    <span className={`text-xs font-mono ${active ? "text-amber-400 font-bold" : counted ? "text-emerald-400 font-semibold" : "text-white/50"}`}>
                      [{idx}]
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Current character info */}
          {phase !== "idle" && phase !== "done" && i >= 0 && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-md w-full rounded-xl border border-indigo-400/30 bg-indigo-500/10 p-4 text-center shadow-lg"
            >
              <div className="text-sm space-y-1">
                <div className="text-white/70 text-xs uppercase tracking-wider mb-2">Current Character</div>
                <div className="text-base font-semibold">
                  <span className="text-white/80">s[{i}]</span> = <span className="font-mono text-indigo-300 text-lg">"{s[i] === ' ' ? '·' : s[i]}"</span>
                </div>
                {s[i].match(/[a-zA-Z0-9]/) && (
                  <div className="text-emerald-300 text-sm mt-2">
                    ✓ Alphanumeric - incrementing length
                  </div>
                )}
                {!s[i].match(/[a-zA-Z0-9]/) && length > 0 && (
                  <div className="text-rose-300 text-sm mt-2">
                    ✗ Non-alphanumeric - returning length
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </LayoutGroup>

        {/* Result banner */}
        <AnimatePresence>
          {phase === "done" && result !== null && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border p-4 text-center text-lg font-semibold bg-emerald-500/10 border-emerald-400/20 text-emerald-200"
            >
              Return <span className="font-mono text-emerald-100 font-bold text-xl">{result}</span> — The last word has {result} character{result !== 1 ? 's' : ''}
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="text-xs text-white/60 mt-4">
          <p><b>Time:</b> O(n). <b>Space:</b> O(1).</p>
        </footer>
      </div>
    </div>
  );
}


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

const AUTO_LOOP = true;

type Phase = "idle" | "init" | "loop_start" | "extract_age" | "check_age" | "increment" | "return_result" | "done";

// Example data from the problem
const initialDetails = [
  "7868190130M7522",
  "5303914400F9211",
  "9273338290F4010"
];

export default function NumberOfSeniorCitizensVisualizer() {
  const [speed, setSpeed] = useState(1000);
  const [details, setDetails] = useState(initialDetails);
  
  // algorithm state
  const [i, setI] = useState(0);
  const [count, setCount] = useState(0);
  const [currentAge, setCurrentAge] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [activeLine, setActiveLine] = useState<number | null>(null);

  const reset = () => {
    setI(0);
    setCount(0);
    setCurrentAge(null);
    setResult(null);
    setPhase("idle");
    setActiveLine(null);
    setPlaying(true);
    setDetails(initialDetails);
  };

  const step = () => {
    if (phase === "done") return;

    if (phase === "idle") {
      setActiveLine(3); // count = 0
      setPhase("init");
      return;
    }

    if (phase === "init") {
      setActiveLine(4); // for s in details:
      setPhase("loop_start");
      return;
    }

    if (phase === "loop_start") {
      if (i >= details.length) {
        setActiveLine(7); // return count
        setResult(count);
        setPhase("return_result");
        return;
      }
      setActiveLine(5); // if int(s[11:13]) > 60:
      setPhase("extract_age");
      return;
    }

    if (phase === "extract_age") {
      const ageStr = details[i].substring(11, 13);
      const age = parseInt(ageStr, 10);
      setCurrentAge(age);
      setActiveLine(5); // if int(s[11:13]) > 60:
      setPhase("check_age");
      return;
    }

    if (phase === "check_age") {
      if (currentAge !== null && currentAge > 60) {
        setActiveLine(6); // count += 1
        setPhase("increment");
      } else {
        // Age <= 60, continue to next passenger
        setI((idx) => idx + 1);
        setCurrentAge(null);
        setActiveLine(4); // Back to loop
        setPhase("loop_start");
      }
      return;
    }

    if (phase === "increment") {
      setCount((c) => c + 1);
      setI((idx) => idx + 1);
      setCurrentAge(null);
      setActiveLine(4); // Back to loop
      setPhase("loop_start");
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
    if (phase === "idle" && details.length > 0) {
      step();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // auto-loop after done
  useEffect(() => {
    if (phase !== "done" || !AUTO_LOOP) return;
    const t = setTimeout(reset, 2500);
    return () => clearTimeout(t);
  }, [phase]);

  const parseDetail = (detail: string) => {
    return {
      phone: detail.substring(0, 10),
      gender: detail[10],
      age: detail.substring(11, 13),
      seat: detail.substring(13, 15),
    };
  };

  return (
    <div className="w-full bg-[#0b0e13] text-white p-6 rounded-xl border border-gray-800">
      <div className="mx-auto max-w-6xl space-y-5">
        <header className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold">Number of Senior Citizens — Visualizer</h2>
            <p className="text-white/60 text-sm mt-1">
              We iterate through passenger details, extract the age from indices <span className="font-semibold">11-13</span>, and count those <span className="font-semibold">&gt; 60</span> years old.
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
                <span className="text-purple-400">class</span> <span className="text-blue-400">Solution</span>:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 2 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">countSeniors</span>(<span className="text-green-400">self</span>, <span className="text-orange-400">details</span>: <span className="text-blue-400">List</span>[<span className="text-blue-400">str</span>]) -&gt; <span className="text-blue-400">int</span>:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 3 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-orange-400">count</span> = <span className="text-cyan-400">0</span>
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 4 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-purple-400">for</span> <span className="text-orange-400">s</span> <span className="text-purple-400">in</span> <span className="text-orange-400">details</span>:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 5 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'            '}<span className="text-purple-400">if</span> <span className="text-blue-400">int</span>(<span className="text-orange-400">s</span>[<span className="text-cyan-400">11</span>:<span className="text-cyan-400">13</span>]) &gt; <span className="text-cyan-400">60</span>:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 6 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : ''}`}>
                {'                '}<span className="text-orange-400">count</span> += <span className="text-cyan-400">1</span>
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 7 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : ''}`}>
                {'        '}<span className="text-purple-400">return</span> <span className="text-orange-400">count</span>
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
          {/* Passenger Details */}
          <section className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-widest text-white/60 font-semibold">Passenger Details</h2>
              <div className="flex items-center gap-4">
                <span className="text-white/70 text-sm font-mono">i = {i}</span>
                <span className="text-white/70 text-sm font-mono">count = {count}</span>
              </div>
            </div>
            <div className="space-y-4">
              {details.map((detail, idx) => {
                const parsed = parseDetail(detail);
                const age = parseInt(parsed.age, 10);
                const isActive = phase !== "idle" && phase !== "done" && idx === i;
                const isProcessed = idx < i;
                const isSenior = age > 60;
                const wasCounted = isProcessed && isSenior;
                
                return (
                  <motion.div
                    key={`detail-${idx}`}
                    className={`rounded-lg border-2 p-4 transition-all ${
                      isActive 
                        ? "bg-amber-500/20 border-amber-400 ring-2 ring-amber-400" 
                        : wasCounted
                        ? "bg-emerald-600/20 border-emerald-400"
                        : isProcessed
                        ? "bg-slate-700/50 border-slate-600"
                        : "bg-slate-800 border-slate-700"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-white/80">Passenger {idx + 1}</span>
                      {wasCounted && (
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">Counted</span>
                      )}
                      {isActive && currentAge !== null && (
                        <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">
                          Age: {currentAge} {isSenior ? '&gt; 60 ✓' : '≤ 60'}
                        </span>
                      )}
                    </div>
                    
                    {/* String visualization with highlighted segments */}
                    <div className="font-mono text-sm space-y-2">
                      <div className="flex items-center gap-1 flex-wrap">
                        {detail.split('').map((char, charIdx) => {
                          let segment = '';
                          let bgColor = 'bg-slate-700';
                          let textColor = 'text-white';
                          
                          if (charIdx < 10) {
                            segment = 'phone';
                            bgColor = 'bg-blue-600/30';
                            textColor = 'text-blue-300';
                          } else if (charIdx === 10) {
                            segment = 'gender';
                            bgColor = 'bg-purple-600/30';
                            textColor = 'text-purple-300';
                          } else if (charIdx >= 11 && charIdx < 13) {
                            segment = 'age';
                            bgColor = isActive ? 'bg-amber-500/50' : 'bg-orange-600/30';
                            textColor = isActive ? 'text-amber-200 font-bold' : 'text-orange-300';
                          } else {
                            segment = 'seat';
                            bgColor = 'bg-green-600/30';
                            textColor = 'text-green-300';
                          }
                          
                          return (
                            <motion.span
                              key={`char-${idx}-${charIdx}`}
                              className={`px-1 py-0.5 rounded ${bgColor} ${textColor} ${
                                isActive && charIdx >= 11 && charIdx < 13 ? 'ring-2 ring-amber-400 scale-110' : ''
                              }`}
                              animate={isActive && charIdx >= 11 && charIdx < 13 ? { scale: [1, 1.1, 1] } : {}}
                              transition={{ duration: 0.5, repeat: Infinity }}
                            >
                              {char}
                            </motion.span>
                          );
                        })}
                      </div>
                      
                      {/* Breakdown */}
                      <div className="grid grid-cols-4 gap-2 text-xs mt-3 pt-3 border-t border-white/10">
                        <div>
                          <div className="text-white/60 mb-1">Phone</div>
                          <div className="text-blue-300 font-semibold">{parsed.phone}</div>
                        </div>
                        <div>
                          <div className="text-white/60 mb-1">Gender</div>
                          <div className="text-purple-300 font-semibold">{parsed.gender}</div>
                        </div>
                        <div>
                          <div className="text-white/60 mb-1">Age</div>
                          <div className={`font-bold ${isSenior ? 'text-emerald-300' : 'text-orange-300'}`}>
                            {parsed.age} {isSenior && '&gt; 60'}
                          </div>
                        </div>
                        <div>
                          <div className="text-white/60 mb-1">Seat</div>
                          <div className="text-green-300 font-semibold">{parsed.seat}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Current Age Display */}
          {phase !== "idle" && phase !== "done" && currentAge !== null && i < details.length && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-md w-full rounded-xl border border-indigo-400/30 bg-indigo-500/10 p-4 text-center shadow-lg"
            >
              <div className="text-sm space-y-1">
                <div className="text-white/70 text-xs uppercase tracking-wider mb-2">Extracted Age</div>
                <div className="text-base font-semibold">
                  <span className="text-white/80">details[{i}][11:13]</span> = <span className="font-mono text-indigo-300 text-lg">"{details[i].substring(11, 13)}"</span>
                </div>
                <div className="text-base font-semibold mt-2">
                  <span className="text-white/80">int(</span><span className="font-mono text-indigo-300">"{details[i].substring(11, 13)}"</span><span className="text-white/80">)</span> = <span className="font-mono text-emerald-300 font-bold text-xl">{currentAge}</span>
                </div>
                {currentAge > 60 ? (
                  <div className="text-emerald-300 text-sm mt-2 font-semibold">
                    ✓ {currentAge} &gt; 60 — Incrementing count
                  </div>
                ) : (
                  <div className="text-slate-400 text-sm mt-2">
                    {currentAge} ≤ 60 — Skipping
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
              Return <span className="font-mono text-emerald-100 font-bold text-xl">{result}</span> — {result} passenger{result !== 1 ? 's are' : ' is'} over 60 years old
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


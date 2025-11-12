'use client';

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const Button = ({ children, onClick, disabled, variant = "default" }: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition border
      ${
        variant === "default"
          ? "bg-white/10 border-white/10 text-white hover:bg-white/15 disabled:opacity-50"
          : variant === "accent"
          ? "bg-emerald-500/90 border-emerald-400/20 text-white hover:bg-emerald-500"
          : "bg-transparent border-white/10 text-white hover:bg-white/10"
      }`}
  >
    {children}
  </button>
);

function useInterval(cb: () => void, delay: number | null) {
  const saved = useRef(cb);
  useEffect(() => {
    saved.current = cb;
  }, [cb]);
  useEffect(() => {
    if (delay == null) return;
    const t = setInterval(() => saved.current(), delay);
    return () => clearInterval(t);
  }, [delay]);
}

const StringChip = ({ text, active, processed, isLength, isDelimiter, isContent }: any) => (
  <motion.span
    className={`inline-block px-3 py-2 rounded-lg text-sm font-mono font-semibold shadow-lg mx-1
      ${active ? "bg-amber-500 shadow-amber-500/50 scale-110" 
        : isLength ? "bg-blue-600 shadow-blue-600/50"
        : isDelimiter ? "bg-purple-600 shadow-purple-600/50"
        : isContent ? "bg-emerald-600 shadow-emerald-600/50"
        : processed ? "bg-slate-600 shadow-slate-600/50"
        : "bg-slate-700 shadow-slate-700/50"}
      text-white`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: active ? 1.1 : 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 28 }}
  >
    {text}
  </motion.span>
);

const AUTO_LOOP = true;

export default function EncodeDecodeStringsVisualizer() {
  const inputStrings = ["neet", "code", "love", "you"];
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encodedString, setEncodedString] = useState("");
  const [decodedStrings, setDecodedStrings] = useState<string[]>([]);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [encodePhase, setEncodePhase] = useState<'idle' | 'init' | 'encoding' | 'append' | 'done'>('idle');
  const [decodePhase, setDecodePhase] = useState<'idle' | 'init' | 'decoding' | 'done'>('idle');
  const [currentEncodeIndex, setCurrentEncodeIndex] = useState(0);
  const [decodeI, setDecodeI] = useState(0);
  const [decodeJ, setDecodeJ] = useState(0);
  const [currentLength, setCurrentLength] = useState<number | null>(null);
  const [decodeState, setDecodeState] = useState<'init_j' | 'find_delimiter' | 'extract_length' | 'extract_string'>('init_j');
  const speed = 1500;

  const reset = () => {
    setEncodedString("");
    setDecodedStrings([]);
    setActiveLine(null);
    setEncodePhase('idle');
    setDecodePhase('idle');
    setMode('encode');
    setCurrentEncodeIndex(0);
    setDecodeI(0);
    setDecodeJ(0);
    setCurrentLength(null);
    setDecodeState('init_j');
  };

  const encodeStep = () => {
    if (encodePhase === 'done') return;

    if (encodePhase === 'idle') {
      setActiveLine(2); // def encode
      setEncodePhase('init');
      return;
    }

    if (encodePhase === 'init') {
      setActiveLine(3); // res = ""
      setEncodePhase('encoding');
      setCurrentEncodeIndex(0);
      return;
    }

    if (encodePhase === 'encoding') {
      if (currentEncodeIndex >= inputStrings.length) {
        setActiveLine(6); // return res
        setEncodePhase('done');
        setTimeout(() => {
          setMode('decode');
          setDecodePhase('idle');
          setActiveLine(null);
        }, 1000);
        return;
      }

      setActiveLine(4); // for s in strs:
      setEncodePhase('append');
      return;
    }

    if (encodePhase === 'append') {
      const currentString = inputStrings[currentEncodeIndex];
      setActiveLine(5); // res += str(len(s)) + "#" + s
      
      // Build encoded string incrementally
      const lengthStr = currentString.length.toString();
      const encoded = lengthStr + "#" + currentString;
      setEncodedString(prev => prev + encoded);
      setCurrentEncodeIndex(prev => prev + 1);
      setEncodePhase('encoding');
      return;
    }
  };

  const decodeStep = () => {
    if (decodePhase === 'done' || encodedString === "") return;

    if (decodePhase === 'idle') {
      setActiveLine(8); // res = []
      setDecodePhase('init');
      return;
    }

    if (decodePhase === 'init') {
      setActiveLine(9); // i = 0
      setDecodePhase('decoding');
      setDecodeI(0);
      setDecodeJ(0);
      setDecodeState('init_j');
      return;
    }

    if (decodePhase === 'decoding') {
      // Check loop condition first
      if (decodeI >= encodedString.length) {
        setActiveLine(18); // return res
        setDecodePhase('done');
        setTimeout(() => setActiveLine(null), 500);
        return;
      }

      setActiveLine(11); // while i < len(s):

      if (decodeState === 'init_j') {
        setActiveLine(12); // j = i
        setDecodeJ(decodeI);
        setDecodeState('find_delimiter');
        return;
      }

      if (decodeState === 'find_delimiter') {
        // Check while loop condition
        setActiveLine(13); // while s[j] != "#"
        if (encodedString[decodeJ] === '#') {
          // Found delimiter - condition is false, exit while loop
          setDecodeState('extract_length');
          return;
        } else {
          // Condition is true, continue loop
          setActiveLine(14); // j += 1
          setDecodeJ(prev => prev + 1);
          return;
        }
      }

      if (decodeState === 'extract_length') {
        // After exiting while loop, extract length
        const lengthStr = encodedString.substring(decodeI, decodeJ);
        const length = parseInt(lengthStr);
        setCurrentLength(length);
        setActiveLine(15); // length = int(s[i:j])
        setDecodeState('extract_string');
        return;
      }

      if (decodeState === 'extract_string') {
        setActiveLine(16); // res.append(s[j + 1 : j + 1 + length])
        const start = decodeJ + 1;
        const end = start + (currentLength || 0);
        const decodedStr = encodedString.substring(start, end);
        setDecodedStrings(prev => [...prev, decodedStr]);
        setActiveLine(17); // i = j + 1 + length
        setDecodeI(end);
        setDecodeJ(end);
        setCurrentLength(null);
        setDecodeState('init_j');
        // Will loop back to line 11
        return;
      }
    }
  };

  useInterval(() => {
    if (mode === 'encode') {
      encodeStep();
    } else {
      decodeStep();
    }
  }, (mode === 'encode' && encodePhase !== 'done') || (mode === 'decode' && decodePhase !== 'done') ? speed : null);

  // auto-loop after a short pause
  useEffect(() => {
    if ((mode === 'decode' && decodePhase === 'done' && AUTO_LOOP) || (mode === 'encode' && encodePhase === 'done' && AUTO_LOOP && encodedString === "")) {
      const t = setTimeout(() => reset(), 3000);
      return () => clearTimeout(t);
    }
  }, [decodePhase, encodePhase, mode, encodedString]);


  return (
    <div className="w-full bg-[#0c0f14] text-white rounded-xl border border-gray-800 p-4 sm:p-6 lg:p-8 shadow-xl">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Encode and Decode Strings — Visualizer</h2>
        <p className="text-white/70 text-xs sm:text-sm">
          Algorithm: Encode strings using length-prefix format (length#string), then decode back to original list.
        </p>
      </div>

      {/* Code Display */}
      <section className="mb-4 sm:mb-6 rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4">
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
              {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">encode</span>(<span className="text-green-400">self</span>, <span className="text-orange-400">strs</span>: <span className="text-blue-400">List</span>[<span className="text-blue-400">str</span>]) <span className="text-purple-400">-&gt;</span> <span className="text-blue-400">str</span>:
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 3 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-orange-400">res</span> = <span className="text-blue-400">""</span>
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 4 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-purple-400">for</span> <span className="text-orange-400">s</span> <span className="text-purple-400">in</span> <span className="text-orange-400">strs</span>:
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 5 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'            '}<span className="text-orange-400">res</span> += <span className="text-blue-400">str</span>(<span className="text-blue-400">len</span>(<span className="text-orange-400">s</span>)) + <span className="text-blue-400">"#"</span> + <span className="text-orange-400">s</span>
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 6 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : ''}`}>
              {'        '}<span className="text-purple-400">return</span> <span className="text-orange-400">res</span>
            </div>
            <div className="px-2 py-1 rounded">
              {' '}
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 7 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">decode</span>(<span className="text-green-400">self</span>, <span className="text-orange-400">s</span>: <span className="text-blue-400">str</span>) <span className="text-purple-400">-&gt;</span> <span className="text-blue-400">List</span>[<span className="text-blue-400">str</span>]:
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 8 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-orange-400">res</span> = []
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 9 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-orange-400">i</span> = <span className="text-blue-400">0</span>
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 10 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {' '}
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 11 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'        '}<span className="text-purple-400">while</span> <span className="text-orange-400">i</span> &lt; <span className="text-blue-400">len</span>(<span className="text-orange-400">s</span>):
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 12 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'            '}<span className="text-orange-400">j</span> = <span className="text-orange-400">i</span>
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 13 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'            '}<span className="text-purple-400">while</span> <span className="text-orange-400">s</span>[<span className="text-orange-400">j</span>] != <span className="text-blue-400">"#"</span>:
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 14 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'                '}<span className="text-orange-400">j</span> += <span className="text-blue-400">1</span>
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 15 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'            '}<span className="text-orange-400">length</span> = <span className="text-blue-400">int</span>(<span className="text-orange-400">s</span>[<span className="text-orange-400">i</span>:<span className="text-orange-400">j</span>])
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 16 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'            '}<span className="text-orange-400">res</span>.<span className="text-blue-400">append</span>(<span className="text-orange-400">s</span>[<span className="text-orange-400">j</span> + <span className="text-blue-400">1</span> : <span className="text-orange-400">j</span> + <span className="text-blue-400">1</span> + <span className="text-orange-400">length</span>])
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 17 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
              {'            '}<span className="text-orange-400">i</span> = <span className="text-orange-400">j</span> + <span className="text-blue-400">1</span> + <span className="text-orange-400">length</span>
            </div>
            <div className={`px-2 py-1 rounded transition-colors ${activeLine === 18 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : ''}`}>
              {'        '}<span className="text-purple-400">return</span> <span className="text-orange-400">res</span>
            </div>
          </code>
        </pre>
      </section>

      <LayoutGroup>
        {/* Input Strings Section */}
        {mode === 'encode' && (
          <section className="mb-4 sm:mb-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-xs sm:text-sm uppercase tracking-widest text-white/80 font-semibold">INPUT STRINGS</h3>
              <span className="text-white/70 text-xs sm:text-sm font-mono">Processing: {currentEncodeIndex}/{inputStrings.length}</span>
            </div>
            <div className="flex flex-wrap gap-3 items-center min-h-[60px] p-4 rounded-lg bg-slate-800/50">
              {inputStrings.map((str, idx) => (
                <motion.div
                  key={idx}
                  className={`px-4 py-2 rounded-lg font-mono text-sm font-semibold
                    ${idx < currentEncodeIndex ? "bg-emerald-600" 
                      : idx === currentEncodeIndex && encodePhase === 'encoding' ? "bg-amber-500"
                      : "bg-slate-700"}
                    text-white`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: idx === currentEncodeIndex && encodePhase === 'encoding' ? 1.1 : 1 }}
                >
                  "{str}"
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Encoded String Section */}
        {encodedString && (
          <section className="mb-4 sm:mb-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-xs sm:text-sm uppercase tracking-widest text-emerald-300 font-semibold">ENCODED STRING</h3>
              <div className="flex gap-3 text-white/70 text-xs sm:text-sm font-mono">
                {mode === 'decode' && decodePhase === 'decoding' && (
                  <>
                    <span>i = {decodeI}</span>
                    <span>j = {decodeJ}</span>
                    {currentLength !== null && <span>length = {currentLength}</span>}
                  </>
                )}
                <span>Length: {encodedString.length}</span>
              </div>
            </div>
            <div className="rounded-xl border-2 border-emerald-400/30 bg-emerald-500/5 p-4 min-h-[80px] flex flex-wrap items-center font-mono text-sm">
              {encodedString.split('').map((char, idx) => {
                let isActive = false;
                let isLength = false;
                let isDelimiter = false;
                let isContent = false;

                if (mode === 'decode' && decodePhase === 'decoding') {
                  if (decodeState === 'find_delimiter' && idx >= decodeI && idx <= decodeJ) {
                    isActive = true;
                    if (idx < decodeJ) isLength = true;
                    if (idx === decodeJ && char === '#') isDelimiter = true;
                  } else if (decodeState === 'extract_length' && idx >= decodeI && idx <= decodeJ) {
                    isLength = true;
                  } else if (decodeState === 'extract_string' && currentLength !== null) {
                    const start = decodeJ + 1;
                    const end = start + currentLength;
                    if (idx >= start && idx < end) {
                      isContent = true;
                      isActive = true;
                    }
                  }
                }

                return (
                  <StringChip
                    key={idx}
                    text={char}
                    active={isActive}
                    processed={false}
                    isLength={isLength}
                    isDelimiter={isDelimiter}
                    isContent={isContent}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* Decoded Strings Section */}
        {mode === 'decode' && decodedStrings.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs sm:text-sm uppercase tracking-widest text-blue-300 font-semibold">DECODED STRINGS</h3>
              <span className="text-white/70 text-sm font-mono">Count: {decodedStrings.length}</span>
            </div>
            <div className="rounded-xl border-2 border-blue-400/30 bg-blue-500/5 p-4 min-h-[80px] flex flex-wrap gap-3 items-center">
              {decodedStrings.map((str, idx) => (
                <motion.div
                  key={idx}
                  className="px-4 py-2 rounded-lg bg-blue-600 font-mono text-sm font-semibold text-white shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  "{str}"
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </LayoutGroup>

      {/* Result Banner */}
      <AnimatePresence>
        {mode === 'decode' && decodePhase === 'done' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 rounded-xl border-2 border-emerald-400/30 bg-emerald-500/10 p-4 text-center text-base font-semibold text-emerald-200"
          >
            Successfully decoded! Result: [{decodedStrings.map(s => `"${s}"`).join(', ')}]
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="mt-6 flex gap-3 justify-center">
        <Button onClick={reset} variant="ghost">
          Reset
        </Button>
      </div>

      {/* Instructions */}
      <div className="mt-8 pt-6 border-t border-white/10 space-y-2 text-sm text-white/60 leading-relaxed">
        <p>
          <span className="font-semibold text-white/80">Visualization logic:</span> The encode phase shows how each string is prefixed with its length and a "#" delimiter. The decode phase shows how the encoded string is parsed by finding delimiters, reading lengths, and extracting the original strings.
        </p>
      </div>
    </div>
  );
}


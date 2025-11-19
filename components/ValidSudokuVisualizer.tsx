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

type Phase = "idle" | "init" | "loop_start" | "check_empty" | "check_duplicate" | "add_to_sets" | "return_false" | "return_true" | "done";

// Example board from the image
const initialBoard = [
  ["1", "2", ".", ".", "3", ".", ".", ".", "."],
  ["4", ".", ".", "5", ".", ".", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "3", "."],
  ["5", ".", ".", ".", "6", ".", ".", ".", "4"],
  [".", ".", ".", "8", "3", ".", ".", ".", "5"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", ".", ".", ".", ".", ".", "2", ".", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "8"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"]
];

export default function ValidSudokuVisualizer() {
  const [speed, setSpeed] = useState(800);
  const [board, setBoard] = useState(initialBoard);
  
  // algorithm state
  const [r, setR] = useState(0);
  const [c, setC] = useState(0);
  const [rows, setRows] = useState<Record<number, Set<string>>>({});
  const [cols, setCols] = useState<Record<number, Set<string>>>({});
  const [squares, setSquares] = useState<Record<string, Set<string>>>({});
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(true);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [duplicateFound, setDuplicateFound] = useState<{ type: 'row' | 'col' | 'square'; location: string } | null>(null);

  const reset = () => {
    setR(0);
    setC(0);
    setRows({});
    setCols({});
    setSquares({});
    setResult(null);
    setPhase("idle");
    setActiveLine(null);
    setPlaying(true);
    setDuplicateFound(null);
    setBoard(initialBoard);
  };

  const step = () => {
    if (phase === "done") return;

    if (phase === "idle") {
      setActiveLine(2); // cols = defaultdict(set)
      setPhase("init");
      return;
    }

    if (phase === "init") {
      setActiveLine(5); // for r in range(9):
      setPhase("loop_start");
      return;
    }

    if (phase === "loop_start") {
      if (r >= 9) {
        setActiveLine(16); // return True
        setResult(true);
        setPhase("return_true");
        return;
      }
      if (c >= 9) {
        setR((row) => row + 1);
        setC(0);
        setActiveLine(5); // Back to outer loop
        setPhase("loop_start");
        return;
      }
      setActiveLine(7); // if board[r][c] == ".":
      setPhase("check_empty");
      return;
    }

    if (phase === "check_empty") {
      if (board[r][c] === ".") {
        setC((col) => col + 1);
        setActiveLine(5); // Back to loop
        setPhase("loop_start");
        return;
      }
      setActiveLine(9); // if (board[r][c] in rows[r] or ...):
      setPhase("check_duplicate");
      return;
    }

    if (phase === "check_duplicate") {
      const val = board[r][c];
      const squareKey = `${Math.floor(r / 3)},${Math.floor(c / 3)}`;
      
      const inRow = rows[r]?.has(val) || false;
      const inCol = cols[c]?.has(val) || false;
      const inSquare = squares[squareKey]?.has(val) || false;

      if (inRow || inCol || inSquare) {
        setActiveLine(12); // return False
        setResult(false);
        if (inRow) setDuplicateFound({ type: 'row', location: `row ${r}` });
        else if (inCol) setDuplicateFound({ type: 'col', location: `column ${c}` });
        else setDuplicateFound({ type: 'square', location: `box (${Math.floor(r / 3)}, ${Math.floor(c / 3)})` });
        setPhase("return_false");
        return;
      }
      setActiveLine(13); // cols[c].add(board[r][c])
      setPhase("add_to_sets");
      return;
    }

    if (phase === "add_to_sets") {
      const val = board[r][c];
      const squareKey = `${Math.floor(r / 3)},${Math.floor(c / 3)}`;
      
      setCols((prev) => {
        const newCols = { ...prev };
        if (!newCols[c]) newCols[c] = new Set();
        newCols[c] = new Set(newCols[c]);
        newCols[c].add(val);
        return newCols;
      });
      
      setRows((prev) => {
        const newRows = { ...prev };
        if (!newRows[r]) newRows[r] = new Set();
        newRows[r] = new Set(newRows[r]);
        newRows[r].add(val);
        return newRows;
      });
      
      setSquares((prev) => {
        const newSquares = { ...prev };
        if (!newSquares[squareKey]) newSquares[squareKey] = new Set();
        newSquares[squareKey] = new Set(newSquares[squareKey]);
        newSquares[squareKey].add(val);
        return newSquares;
      });

      setC((col) => col + 1);
      setActiveLine(5); // Back to loop
      setPhase("loop_start");
      return;
    }

    if (phase === "return_false" || phase === "return_true") {
      setPhase("done");
      setActiveLine(null);
      setPlaying(false);
      return;
    }
  };

  useInterval(() => step(), playing ? speed : null);

  // Auto-start on mount
  useEffect(() => {
    if (phase === "idle") {
      step();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // auto-loop after done
  useEffect(() => {
    if (phase !== "done" || !AUTO_LOOP) return;
    const t = setTimeout(reset, 3000);
    return () => clearTimeout(t);
  }, [phase]);

  const getCellColor = (row: number, col: number) => {
    if (phase === "done") {
      if (result === false && duplicateFound) {
        if (duplicateFound.type === 'row' && row === r) return "bg-rose-600/30 border-rose-400";
        if (duplicateFound.type === 'col' && col === c) return "bg-rose-600/30 border-rose-400";
        const squareKey = `${Math.floor(row / 3)},${Math.floor(col / 3)}`;
        if (duplicateFound.type === 'square' && squareKey === duplicateFound.location.split('(')[1]?.split(')')[0]?.replace(' ', '')) {
          return "bg-rose-600/30 border-rose-400";
        }
      }
      return "bg-slate-800 border-slate-700";
    }
    
    if (row === r && col === c) {
      return "bg-amber-500/30 border-amber-400";
    }
    
    // Highlight processed cells
    if (row < r || (row === r && col < c)) {
      const val = board[row][col];
      if (val !== ".") {
        return "bg-emerald-600/20 border-emerald-400/30";
      }
    }
    
    return "bg-slate-800 border-slate-700";
  };

  return (
    <div className="w-full bg-[#0b0e13] text-white p-6 rounded-xl border border-gray-800">
      <div className="mx-auto max-w-6xl space-y-5">
        <header className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold">Valid Sudoku — Visualizer</h2>
            <p className="text-white/60 text-sm mt-1">
              We check each cell to ensure no duplicates in <span className="font-semibold">rows</span>, <span className="font-semibold">columns</span>, or <span className="font-semibold">3x3 sub-boxes</span>.
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
                {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">isValidSudoku</span>(<span className="text-green-400">self</span>, <span className="text-orange-400">board</span>: <span className="text-blue-400">List</span>[<span className="text-blue-400">List</span>[<span className="text-blue-400">str</span>]]) -&gt; <span className="text-blue-400">bool</span>:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 3 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-orange-400">cols</span> = <span className="text-blue-400">defaultdict</span>(<span className="text-blue-400">set</span>)
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 4 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-orange-400">rows</span> = <span className="text-blue-400">defaultdict</span>(<span className="text-blue-400">set</span>)
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 5 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-orange-400">squares</span> = <span className="text-blue-400">defaultdict</span>(<span className="text-blue-400">set</span>)
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 6 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 7 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'        '}<span className="text-purple-400">for</span> <span className="text-orange-400">r</span> <span className="text-purple-400">in</span> <span className="text-blue-400">range</span>(<span className="text-cyan-400">9</span>):
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 8 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'            '}<span className="text-purple-400">for</span> <span className="text-orange-400">c</span> <span className="text-purple-400">in</span> <span className="text-blue-400">range</span>(<span className="text-cyan-400">9</span>):
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 9 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'                '}<span className="text-purple-400">if</span> <span className="text-orange-400">board</span>[<span className="text-orange-400">r</span>][<span className="text-orange-400">c</span>] == <span className="text-yellow-400">"."</span>:
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 10 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'                    '}<span className="text-purple-400">continue</span>
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 11 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'                '}<span className="text-purple-400">if</span> (<span className="text-orange-400">board</span>[<span className="text-orange-400">r</span>][<span className="text-orange-400">c</span>] <span className="text-purple-400">in</span> <span className="text-orange-400">rows</span>[<span className="text-orange-400">r</span>] <span className="text-purple-400">or</span>
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 12 ? 'bg-rose-500/20 border-l-2 border-rose-400' : ''}`}>
                {'                    '}<span className="text-orange-400">board</span>[<span className="text-orange-400">r</span>][<span className="text-orange-400">c</span>] <span className="text-purple-400">in</span> <span className="text-orange-400">cols</span>[<span className="text-orange-400">c</span>] <span className="text-purple-400">or</span>
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 13 ? 'bg-rose-500/20 border-l-2 border-rose-400' : ''}`}>
                {'                    '}<span className="text-orange-400">board</span>[<span className="text-orange-400">r</span>][<span className="text-orange-400">c</span>] <span className="text-purple-400">in</span> <span className="text-orange-400">squares</span>[(<span className="text-orange-400">r</span> // <span className="text-cyan-400">3</span>, <span className="text-orange-400">c</span> // <span className="text-cyan-400">3</span>)]):
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 14 ? 'bg-rose-500/20 border-l-2 border-rose-400' : ''}`}>
                {'                    '}<span className="text-purple-400">return</span> <span className="text-blue-400">False</span>
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 15 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'                '}<span className="text-orange-400">cols</span>[<span className="text-orange-400">c</span>].<span className="text-blue-400">add</span>(<span className="text-orange-400">board</span>[<span className="text-orange-400">r</span>][<span className="text-orange-400">c</span>])
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 16 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'                '}<span className="text-orange-400">rows</span>[<span className="text-orange-400">r</span>].<span className="text-blue-400">add</span>(<span className="text-orange-400">board</span>[<span className="text-orange-400">r</span>][<span className="text-orange-400">c</span>])
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 17 ? 'bg-amber-500/20 border-l-2 border-amber-400' : ''}`}>
                {'                '}<span className="text-orange-400">squares</span>[(<span className="text-orange-400">r</span> // <span className="text-cyan-400">3</span>, <span className="text-orange-400">c</span> // <span className="text-cyan-400">3</span>)].<span className="text-blue-400">add</span>(<span className="text-orange-400">board</span>[<span className="text-orange-400">r</span>][<span className="text-orange-400">c</span>])
              </div>
              <div className={`px-2 py-1 rounded transition-colors ${activeLine === 18 ? 'bg-emerald-500/20 border-l-2 border-emerald-400' : ''}`}>
                {'        '}<span className="text-purple-400">return</span> <span className="text-blue-400">True</span>
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
          {/* Sudoku Board */}
          <section className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-widest text-white/60 font-semibold">Sudoku Board</h2>
              <span className="text-white/70 text-sm font-mono">r = {r}, c = {c}</span>
            </div>
            <div className="grid grid-cols-9 gap-1 max-w-[540px] mx-auto">
              {board.map((row, rowIdx) =>
                row.map((cell, colIdx) => {
                  const squareRow = Math.floor(rowIdx / 3);
                  const squareCol = Math.floor(colIdx / 3);
                  const isSquareBorder = rowIdx % 3 === 0 || colIdx % 3 === 0;
                  const cellColor = getCellColor(rowIdx, colIdx);
                  
                  return (
                    <motion.div
                      key={`cell-${rowIdx}-${colIdx}`}
                      className={`border-2 ${cellColor} aspect-square flex items-center justify-center text-lg font-bold transition-all
                        ${isSquareBorder ? 'border-slate-600' : ''}
                        ${rowIdx === r && colIdx === c ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900' : ''}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {cell === "." ? (
                        <span className="text-slate-600">·</span>
                      ) : (
                        <span className="text-white">{cell}</span>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </section>

          {/* Sets Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Rows */}
            <section className="rounded-xl border border-blue-400/20 bg-blue-500/5 p-4">
              <h3 className="text-sm uppercase tracking-widest text-blue-300/90 font-semibold mb-3">Rows</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {Object.entries(rows).slice(0, 9).map(([rowIdx, vals]) => (
                  <div key={rowIdx} className="text-xs">
                    <span className="text-blue-300 font-mono">Row {rowIdx}:</span>
                    <span className="ml-2 text-white">{Array.from(vals).join(', ')}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Columns */}
            <section className="rounded-xl border border-purple-400/20 bg-purple-500/5 p-4">
              <h3 className="text-sm uppercase tracking-widest text-purple-300/90 font-semibold mb-3">Columns</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {Object.entries(cols).slice(0, 9).map(([colIdx, vals]) => (
                  <div key={colIdx} className="text-xs">
                    <span className="text-purple-300 font-mono">Col {colIdx}:</span>
                    <span className="ml-2 text-white">{Array.from(vals).join(', ')}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Squares */}
            <section className="rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-4">
              <h3 className="text-sm uppercase tracking-widest text-emerald-300/90 font-semibold mb-3">3x3 Boxes</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {Object.entries(squares).map(([key, vals]) => (
                  <div key={key} className="text-xs">
                    <span className="text-emerald-300 font-mono">Box ({key}):</span>
                    <span className="ml-2 text-white">{Array.from(vals).join(', ')}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </LayoutGroup>

        {/* Result banner */}
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
              {result ? (
                <>✓ Valid Sudoku — All rules satisfied!</>
              ) : (
                <>✗ Invalid Sudoku — Duplicate found in {duplicateFound?.location}</>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="text-xs text-white/60 mt-4">
          <p><b>Time:</b> O(1) - fixed 9x9 board. <b>Space:</b> O(1) - fixed number of sets.</p>
        </footer>
      </div>
    </div>
  );
}


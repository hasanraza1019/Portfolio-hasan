import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiCornerDownLeft, FiTrash2 } from "react-icons/fi";
import { terminalCommands } from "../data/data";
import { playClickSound, playSuccessSound } from "../utils/sound";

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    {
      type: "system",
      content:
        "Welcome to Hasan's Cyber Terminal v2.6.0 [Interactive Mode]\nType 'help' to see available commands, or click any quick pill below.",
    },
  ]);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Only scroll the internal terminal container, never the window!
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdText) => {
    const raw = (cmdText || input).trim();
    if (!raw) return;

    const lower = raw.toLowerCase();
    playClickSound();

    if (lower === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    let response = terminalCommands[lower];

    if (!response) {
      if (lower.startsWith("sudo")) {
        response = "Permission granted: Muhammad Hasan is already hired! Ready to build amazing things with you.";
      } else {
        response = `Command not recognized: "${raw}". Type 'help' to see valid commands.`;
      }
    } else {
      playSuccessSound();
    }

    setHistory((prev) => [
      ...prev,
      { type: "user", content: `$ ${raw}` },
      { type: "output", content: response },
    ]);
    setInput("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
  };

  const handlePillClick = (cmd) => {
    handleCommand(cmd);
    inputRef.current?.focus();
  };

  return (
    <section id="terminal" className="relative py-24 px-6 overflow-hidden">
      {/* Background neon orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--color-primary)]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="section-label mb-2">Interactive Dev Playground</p>
          <h2 className="font-[var(--font-display)] text-3xl md:text-5xl font-bold">
            Interactive <span className="text-gradient">Terminal</span>
          </h2>
          <p className="text-white/60 text-sm mt-3 max-w-lg mx-auto">
            Interact with the portfolio directly using developer terminal commands or quick pills.
          </p>
        </motion.div>

        {/* Terminal Window Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="glass glow-border rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#060814]/90"
        >
          {/* Terminal Window Top Bar */}
          <div className="px-4 py-3 bg-[#0a0e24] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm" />
              <span className="ml-3 text-xs font-mono text-white/50 hidden sm:inline-block">
                hasan@portfolio: ~/developer (zsh)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playClickSound();
                  setHistory([]);
                }}
                title="Clear screen"
                className="text-xs text-white/40 hover:text-white flex items-center gap-1 transition-colors p-1"
              >
                <FiTrash2 />
                <span className="text-[10px] hidden sm:inline">clear</span>
              </button>
            </div>
          </div>

          {/* Quick Command Pills */}
          <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[11px] font-mono text-white/40">Quick Commands:</span>
            {["help", "skills", "projects", "hire", "status", "contact"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handlePillClick(cmd)}
                className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-[var(--color-primary)] hover:text-[#050816] font-mono text-[11px] text-white/80 transition-all"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Body */}
          <div
            ref={bodyRef}
            onClick={() => inputRef.current?.focus()}
            className="p-5 font-mono text-xs md:text-sm min-h-[300px] max-h-[420px] overflow-y-auto cursor-text text-left"
          >
            {history.map((item, idx) => (
              <div key={idx} className="mb-3 whitespace-pre-wrap leading-relaxed">
                {item.type === "system" && (
                  <div className="text-[var(--color-primary)] font-semibold pb-2 border-b border-white/5">
                    {item.content}
                  </div>
                )}
                {item.type === "user" && (
                  <div className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="text-white/40">&gt;</span> {item.content}
                  </div>
                )}
                {item.type === "output" && (
                  <div className="text-white/80 pl-3 border-l-2 border-[var(--color-secondary)]/50 mt-1">
                    {item.content}
                  </div>
                )}
              </div>
            ))}

            {/* Input Prompt */}
            <form onSubmit={onSubmit} className="flex items-center gap-2 mt-4 text-emerald-400">
              <span className="text-[var(--color-primary)] font-bold">hasan@web:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type a command (e.g. skills, hire)..."
                className="flex-1 bg-transparent text-white font-mono outline-none text-xs md:text-sm placeholder:text-white/20"
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="submit"
                aria-label="Run command"
                className="text-white/40 hover:text-[var(--color-primary)] p-1 transition-colors"
              >
                <FiCornerDownLeft />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

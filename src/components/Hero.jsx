import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiArrowRight, FiTerminal, FiBriefcase, FiCheckCircle } from "react-icons/fi";
import { roles, techMarquee } from "../data/data";
import { playClickSound, playHoverSound } from "../utils/sound";

function useTypewriter(words, speed = 80, pause = 1600) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), speed / 2);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(roles);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-6 pt-32 pb-20 overflow-hidden bg-cyber-grid"
    >
      {/* Dynamic ambient background orbs */}
      <div className="absolute top-1/4 left-[8%] w-80 h-80 rounded-full bg-[var(--color-primary)]/15 blur-[120px] pointer-events-none float" />
      <div
        className="absolute bottom-1/4 right-[8%] w-96 h-96 rounded-full bg-[var(--color-secondary)]/20 blur-[130px] pointer-events-none float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[var(--color-accent)]/10 blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass glow-border text-xs text-white/90 mb-8 shadow-lg"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-accent)]" />
          </span>
          <span className="font-medium tracking-wide">Available for Freelance &amp; Junior Roles</span>
          <span className="text-white/40">•</span>
          <span className="text-[var(--color-primary)] font-mono">2026 Ready</span>
        </motion.div>

        {/* Muhammad Hasan's VIP Avatar with Orbital Holographic Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-44 h-44 md:w-56 md:h-56 mb-8 group"
        >
          {/* Outer rotating cyber ring */}
          <div className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] animate-spin-slow opacity-80 blur-[2px] group-hover:opacity-100 transition-opacity" />

          {/* Secondary counter-rotating accent ring */}
          <div className="absolute -inset-1 rounded-full border border-dashed border-[var(--color-accent)]/50 animate-spin-reverse-slow pointer-events-none" />

          {/* Pulse Glow Aura */}
          <div className="absolute inset-0 rounded-full pulse-glow" />

          {/* Inner Clean Circular Mask */}
          <div className="relative w-full h-full rounded-full overflow-hidden bg-[#070b1e] border-2 border-white/20 p-1 shadow-2xl">
            <img
              src="/img/photo.jpg"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/img/WhatsApp Image 2026-10-23 at 4.41.18 PM.jpeg";
              }}
              alt="Muhammad Hasan — Frontend Web Developer"
              style={{ objectPosition: "46% 58%", transformOrigin: "46% 58%" }}
              className="w-full h-full rounded-full object-cover scale-[1.25] group-hover:scale-[1.32] transition-transform duration-700 ease-out"
            />
          </div>

          {/* Floating Micro-Badge Top Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute -top-1 -right-4 glass px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-mono shadow-xl border border-[var(--color-primary)]/40"
          >
            <span className="text-[var(--color-primary)] font-bold">⚡</span>
            <span className="text-white/90">Full stake</span>
          </motion.div>

          {/* Floating Micro-Badge Bottom Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="absolute -bottom-2 -left-4 glass px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-mono shadow-xl border border-[var(--color-accent)]/40"
          >
            <FiCheckCircle className="text-[var(--color-accent)] text-xs" />
            <span className="text-white/90">Verified Dev</span>
          </motion.div>
        </motion.div>

        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="section-label mb-3"
        >
          Engineering Premium Web Experiences
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="font-[var(--font-display)] text-4xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4 tracking-tight"
        >
          Hi, I'm <span className="text-gradient">Muhammad Hasan</span>
        </motion.h1>

        {/* Animated Typewriter Role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="min-h-12 flex items-center justify-center mb-6"
        >
          <div className="px-5 py-2 rounded-xl glass-subtle border border-white/10 flex items-center gap-2">
            <span className="text-[var(--color-primary)] font-mono">&gt;</span>
            <span className="text-lg md:text-2xl text-white font-mono font-medium">
              {typed}
              <span className="inline-block w-[3px] h-6 bg-[var(--color-primary)] ml-1 animate-pulse align-middle" />
            </span>
          </div>
        </motion.div>

        {/* Brief Elevator Pitch */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="text-white/70 max-w-2xl text-base md:text-lg mb-9 leading-relaxed font-light"
        >
          Detail-oriented Frontend Developer dedicated to engineering high-performance,
          responsive, and visually stunning web interfaces with modern React, JavaScript,
          and component-based architectures.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <a
            href="#contact"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            data-cursor="hover"
            className="group px-8 py-3.5 rounded-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] text-[#050816] font-semibold text-sm flex items-center gap-2.5 shadow-[0_0_25px_var(--glow-primary)] hover:shadow-[0_0_40px_var(--glow-primary)] hover:scale-105 transition-all duration-300"
          >
            <FiBriefcase className="text-base" />
            Hire Me <FiArrowRight className="group-hover:translate-x-1.5 transition-transform" />
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            data-cursor="hover"
            className="px-7 py-3.5 rounded-full glass glow-border text-sm font-medium flex items-center gap-2 hover:bg-white/10 hover:scale-105 transition-all duration-300"
          >
            Download CV <FiDownload className="text-base text-[var(--color-primary)]" />
          </a>

          <a
            href="#terminal"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            data-cursor="hover"
            className="px-6 py-3.5 rounded-full glass text-sm font-mono text-white/80 hover:text-[var(--color-accent)] border border-white/10 hover:border-[var(--color-accent)]/50 flex items-center gap-2 transition-all duration-300 hover:scale-105"
          >
            <FiTerminal className="text-base text-[var(--color-accent)]" />
            Terminal
          </a>

          <a
            href="#projects"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            data-cursor="hover"
            className="px-6 py-3.5 rounded-full text-sm text-white/70 hover:text-[var(--color-primary)] border border-white/10 hover:border-[var(--color-primary)]/40 transition-colors"
          >
            View Projects
          </a>
        </motion.div>

        {/* Live Quick Stats Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl pt-6 border-t border-white/10 mb-14"
        >
          {[
            { value: "4+", label: "Featured Projects", highlight: "100% Shipped" },
            { value: "8+", label: "Modern Tech Skills", highlight: "React & JS Stack" },
            { value: "200+", label: "Hours of Code", highlight: "Dedicated Focus" },
            { value: "< 2h", label: "Quick Response", highlight: "Active on WhatsApp" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-3 rounded-xl glass-subtle hover:bg-white/5 transition-colors">
              <p className="font-[var(--font-display)] text-2xl font-bold text-gradient">{stat.value}</p>
              <p className="text-xs font-medium text-white/80 mt-0.5">{stat.label}</p>
              <p className="text-[10px] text-white/40 font-mono mt-0.5">{stat.highlight}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Infinite Tech Stack Marquee Ticker */}
      <div className="relative w-full overflow-hidden py-4 border-y border-white/5 bg-black/20">
        <div className="animate-marquee flex items-center gap-8">
          {[...techMarquee, ...techMarquee].map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-1.5 rounded-full glass-subtle text-xs font-mono text-white/75 whitespace-nowrap hover:text-[var(--color-primary)] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-mono">Explore Work</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-primary)] to-transparent" />
      </motion.div>
    </section>
  );
}

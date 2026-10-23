import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiTerminal,
  FiCode,
  FiUser,
  FiDownload,
  FiCpu,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import { skillCategories } from "../data/data";
import { playClickSound, playHoverSound } from "../utils/sound";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function About() {
  const [activeTab, setActiveTab] = useState("all");
  const [photoView, setPhotoView] = useState("photo"); // 'photo' | 'cyber'

  const allSkillsList = [
    ...skillCategories.frontend.items,
    ...skillCategories.workflow.items,
    ...skillCategories.animations.items,
  ];

  const displayedSkills =
    activeTab === "all"
      ? allSkillsList
      : activeTab === "frontend"
      ? skillCategories.frontend.items
      : activeTab === "workflow"
      ? skillCategories.workflow.items
      : skillCategories.animations.items;

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-[var(--color-primary)]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[var(--color-secondary)]/15 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Identity &amp; Expertise</p>
          <h2 className="font-[var(--font-display)] text-3xl md:text-5xl font-bold">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: VIP Developer Identity Badge Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            {/* Outer ambient glow */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[var(--color-primary)]/20 via-[var(--color-secondary)]/20 to-[var(--color-accent)]/20 blur-xl opacity-75" />

            <div className="relative glass glow-border rounded-3xl p-6 md:p-8 flex flex-col items-center shadow-2xl border border-white/10">
              {/* Card Top Hologram Header */}
              <div className="w-full flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2 font-mono text-[var(--color-primary)]">
                  <FiCpu className="text-base" />
                  <span>DEV-ID // MH-2026</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Holographic Portrait / Cyber Avatar View */}
              <div className="relative mb-6">
                <AnimatePresence mode="wait">
                  {photoView === "photo" ? (
                    <motion.div
                      key="photo"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-44 h-44 rounded-full p-[3px] bg-gradient-to-tr from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] shadow-xl"
                    >
                      <div className="w-full h-full rounded-full overflow-hidden bg-[#060a1f]">
                        <img
                          src="/img/photo.jpg"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/img/WhatsApp Image 2026-10-23 at 4.41.18 PM.jpeg";
                          }}
                          alt="Muhammad Hasan"
                          style={{ objectPosition: "46% 58%", transformOrigin: "46% 58%" }}
                          className="w-full h-full rounded-full object-cover scale-[1.25] hover:scale-[1.32] transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute bottom-1 right-2 w-7 h-7 rounded-full bg-[var(--color-bg)] border border-white/20 flex items-center justify-center text-[var(--color-accent)] text-xs shadow-lg">
                        <FiCheckCircle />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="cyber"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-44 h-44 rounded-full p-[3px] bg-gradient-to-tr from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] flex items-center justify-center shadow-xl"
                    >
                      <div className="w-full h-full rounded-full bg-[#080d26] flex flex-col items-center justify-center p-4 text-center">
                        <FiTerminal className="text-4xl text-[var(--color-primary)] mb-2 animate-bounce" />
                        <span className="font-mono text-xs text-white/90 font-bold">&lt;MH_DEV /&gt;</span>
                        <span className="text-[10px] text-white/50 font-mono">React Engineer</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* View Switcher Toggle Pill */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 mb-6 text-xs">
                <button
                  onClick={() => {
                    playClickSound();
                    setPhotoView("photo");
                  }}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    photoView === "photo"
                      ? "bg-[var(--color-primary)] text-[#050816] font-semibold shadow-md"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <FiUser className="text-xs" />
                  <span>Photo</span>
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setPhotoView("cyber");
                  }}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    photoView === "cyber"
                      ? "bg-[var(--color-accent)] text-[#050816] font-semibold shadow-md"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <FiCode className="text-xs" />
                  <span>Hacker Card</span>
                </button>
              </div>

              {/* Identity Details */}
              <h3 className="font-[var(--font-display)] text-xl font-bold text-white mb-1">
                Muhammad Hasan
              </h3>
              <p className="text-xs text-[var(--color-primary)] font-mono tracking-wider mb-4">
                Frontend Web Developer
              </p>

              {/* Meta Tags */}
              <div className="w-full space-y-2.5 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex items-center justify-between text-white/70">
                  <span className="flex items-center gap-1.5 text-white/40">
                    <FiMapPin className="text-xs" /> Location:
                  </span>
                  <span className="text-white">Karachi, Pakistan</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span className="flex items-center gap-1.5 text-white/40">
                    <FiClock className="text-xs" /> Timezone:
                  </span>
                  <span className="text-white">PKT (UTC+5)</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span className="flex items-center gap-1.5 text-white/40">
                    <FiCheckCircle className="text-xs" /> Status:
                  </span>
                  <span className="text-emerald-400 font-medium">Available for Hire</span>
                </div>
              </div>

              {/* Quick Resume Button */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className="w-full mt-6 py-2.5 rounded-xl glass hover:bg-white/10 flex items-center justify-center gap-2 text-xs font-mono text-white/90 border border-white/10 hover:border-[var(--color-primary)]/40 transition-all"
              >
                <FiDownload className="text-[var(--color-primary)]" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Story, Philosophy & Interactive Skills Tabs */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="mb-8">
              <h3 className="font-[var(--font-display)] text-2xl md:text-3xl font-bold mb-4">
                Passion for <span className="text-gradient">Modern Web Engineering</span>
              </h3>
              <p className="text-white/75 leading-relaxed text-sm md:text-base mb-4 font-light">
                I am a focused and driven Frontend Web Developer with hands-on expertise
                in crafting modern, responsive web experiences. I bridge the gap between
                clean design aesthetics and robust component logic using React, JavaScript,
                and modern CSS.
              </p>
              <p className="text-white/60 leading-relaxed text-sm mb-6 font-light">
                Whether creating single-page web applications, interactive dashboards, or
                high-impact landing pages, my code is always built with performance,
                accessibility, and clean architecture as first-class priorities.
              </p>

              {/* 3 Core Pillars */}
              <div className="grid sm:grid-cols-3 gap-3 mb-8">
                {[
                  { title: "Clean Code", desc: "Modular, readable & maintainable" },
                  { title: "Fast & Smooth", desc: "High frame-rates & lightweight bundles" },
                  { title: "Mobile-First", desc: "Adapts flawlessly to any screen size" },
                ].map((pillar, i) => (
                  <div key={i} className="p-3.5 rounded-xl glass-subtle border border-white/10">
                    <p className="font-semibold text-xs text-white mb-1">{pillar.title}</p>
                    <p className="text-[11px] text-white/50 leading-snug">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Skills Showcase */}
            <div id="skills" className="scroll-mt-28">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h4 className="font-[var(--font-display)] text-sm tracking-wider uppercase text-[var(--color-primary)]">
                  Technical Arsenal
                </h4>

                {/* Filter Tabs */}
                <div className="flex gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
                  {[
                    { id: "all", label: "All Skills" },
                    { id: "frontend", label: "Frontend" },
                    { id: "workflow", label: "Tools" },
                    { id: "animations", label: "Motion" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        playClickSound();
                        setActiveTab(tab.id);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs transition-all ${
                        activeTab === tab.id
                          ? "bg-[var(--color-primary)] text-[#050816] font-semibold"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills Progress Grid */}
              <div className="grid sm:grid-cols-2 gap-3.5">
                {displayedSkills.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    onMouseEnter={playHoverSound}
                    className="p-3.5 rounded-xl glass-subtle border border-white/5 hover:border-[var(--color-primary)]/30 transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-medium text-white/85 group-hover:text-[var(--color-primary)] transition-colors">
                        {s.name}
                      </span>
                      <span className="font-mono text-[var(--color-accent)] text-[11px] font-semibold">
                        {s.level}%
                      </span>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: "easeOut", delay: i * 0.05 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

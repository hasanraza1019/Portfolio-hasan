import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiVolume2,
  FiVolumeX,
  FiChevronDown,
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { playClickSound, playHoverSound } from "../utils/sound";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Terminal", href: "#terminal" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const { theme, setTheme, soundOn, toggleSound, themes } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (y / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const currentThemeObj = themes.find((t) => t.id === theme) || themes[0];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-b border-white/10"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            className="font-[var(--font-display)] text-base sm:text-lg tracking-[0.2em] text-gradient flex items-center gap-1 group"
            data-cursor="hover"
          >
            <span>M.HASAN</span>
            <span className="w-1.5 h-4 bg-[var(--color-primary)] inline-block animate-pulse" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={playClickSound}
                onMouseEnter={playHoverSound}
                data-cursor="hover"
                className={`text-xs uppercase tracking-wider font-mono transition-colors relative py-1 ${
                  active === l.href.slice(1)
                    ? "text-[var(--color-primary)] font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
                {active === l.href.slice(1) && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full"
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Action Center: Theme Switcher, Sound & Hire Me Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  playClickSound();
                  setThemeMenuOpen(!themeMenuOpen);
                }}
                title="Change Color Theme"
                className="px-3 py-1.5 rounded-full glass hover:bg-white/10 text-xs font-mono flex items-center gap-2 border border-white/10 transition-colors"
                data-cursor="hover"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shadow-sm"
                  style={{ backgroundColor: currentThemeObj.primary }}
                />
                <span className="text-[11px] text-white/80">{currentThemeObj.name}</span>
                <FiChevronDown className="text-white/50 text-[10px]" />
              </button>

              <AnimatePresence>
                {themeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-44 glass rounded-2xl p-2 shadow-2xl border border-white/15 bg-[#090d24]/95 z-50"
                  >
                    <p className="px-2 py-1 text-[10px] uppercase font-mono tracking-wider text-white/40">
                      Select Theme
                    </p>
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setTheme(t.id);
                          setThemeMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors text-left ${
                          theme === t.id
                            ? "bg-white/10 text-white font-medium"
                            : "text-white/70 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: t.primary }}
                        />
                        <span>{t.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sound Toggle Button */}
            <button
              onClick={toggleSound}
              title={soundOn ? "Mute UI Audio" : "Unmute UI Audio"}
              className="w-8 h-8 rounded-full glass hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors border border-white/10 text-xs"
              data-cursor="hover"
            >
              {soundOn ? <FiVolume2 className="text-[var(--color-primary)]" /> : <FiVolumeX />}
            </button>

            {/* Hire Me CTA Button */}
            <a
              href="#contact"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              data-cursor="hover"
              className="px-5 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[#050816] hover:shadow-[0_0_20px_var(--glow-primary)] transition-all hover:scale-105"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu & Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleSound}
              aria-label="Toggle Sound"
              className="w-8 h-8 rounded-full glass flex items-center justify-center text-white/70 text-xs"
            >
              {soundOn ? <FiVolume2 className="text-[var(--color-primary)]" /> : <FiVolumeX />}
            </button>

            <button
              className="text-white text-2xl p-1"
              onClick={() => {
                playClickSound();
                setOpen(!open);
              }}
              aria-label="Toggle navigation menu"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden glass mt-3 mx-4 rounded-2xl overflow-hidden border border-white/15 bg-[#090d24]/95 shadow-2xl"
            >
              <div className="flex flex-col p-4 gap-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => {
                      playClickSound();
                      setOpen(false);
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors ${
                      active === l.href.slice(1)
                        ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)] font-bold"
                        : "text-white/80 hover:bg-white/5"
                    }`}
                  >
                    {l.label}
                  </a>
                ))}

                {/* Mobile Theme Selector Strip */}
                <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between px-2">
                  <span className="text-[11px] font-mono text-white/50">Theme:</span>
                  <div className="flex gap-2">
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`w-5 h-5 rounded-full border ${
                          theme === t.id ? "border-white scale-110" : "border-transparent opacity-60"
                        }`}
                        style={{ backgroundColor: t.primary }}
                      />
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-3 w-full py-2.5 text-center text-xs font-semibold rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[#050816]"
                >
                  Hire Me Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Top Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] transition-[width] duration-150 shadow-[0_0_8px_var(--glow-primary)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
}

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { testimonials } from "../data/data";
import { playClickSound } from "../utils/sound";

const AUTOPLAY_MS = 6000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progressKey, setProgressKey] = useState(0);
  const touchStartX = useRef(null);

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % testimonials.length);
      setProgressKey((k) => k + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [progressKey]);

  const goTo = (i) => {
    playClickSound();
    setDirection(i > index ? 1 : -1);
    setIndex(i);
    setProgressKey((k) => k + 1);
  };
  const next = () => {
    playClickSound();
    goTo((index + 1) % testimonials.length);
  };
  const prev = () => {
    playClickSound();
    goTo((index - 1 + testimonials.length) % testimonials.length);
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) prev();
    else if (delta < -50) next();
    touchStartX.current = null;
  };

  const current = testimonials[index];

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
  };

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-[var(--color-secondary)]/10 blur-[130px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center z-10">
        <p className="section-label mb-3">Client &amp; Collaborator Endorsements</p>
        <h2 className="font-[var(--font-display)] text-3xl md:text-5xl font-bold mb-14">
          Client <span className="text-gradient">Feedback</span>
        </h2>

        <div
          className="relative min-h-[260px] flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative z-10 glass glow-border rounded-3xl p-8 md:p-12 w-full border border-white/10 shadow-2xl"
            >
              {/* Star Rating */}
              <div className="flex items-center justify-center gap-1 text-amber-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-amber-400 text-sm" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-white/85 text-base md:text-lg leading-relaxed mb-8 font-light italic">
                "{current.text}"
              </p>

              {/* Author Meta */}
              <div className="flex items-center justify-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white font-mono font-bold text-sm shadow-md">
                  {current.avatar}
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-white text-sm">
                    {current.name}
                  </h4>
                  <p className="text-xs text-[var(--color-primary)] font-mono">
                    {current.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prev}
            data-cursor="hover"
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/50 transition-colors"
          >
            <FiChevronLeft />
          </button>

          <div className="flex gap-2.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="relative w-8 h-1.5 rounded-full bg-white/15 overflow-hidden"
              >
                {i === index && (
                  <motion.div
                    key={progressKey}
                    className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
                {i < index && (
                  <div className="absolute inset-0 bg-[var(--color-primary)]/60 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={next}
            data-cursor="hover"
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/50 transition-colors"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

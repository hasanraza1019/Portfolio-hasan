import { motion } from "framer-motion";
import { timeline } from "../data/data";
import { playHoverSound } from "../utils/sound";

export default function Timeline() {
  return (
    <section id="journey" className="relative py-28 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Evolution &amp; Milestones</p>
          <h2 className="font-[var(--font-display)] text-3xl md:text-5xl font-bold">
            My <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-white/60 text-sm mt-3 max-w-lg mx-auto font-light">
            From discovering HTML &amp; CSS to crafting production-ready React web apps.
          </p>
        </motion.div>

        <div className="relative pl-6 sm:pl-10">
          {/* Glowing Vertical Timeline Track */}
          <div className="absolute left-[11px] sm:left-[19px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)]" />

          {timeline.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              onMouseEnter={playHoverSound}
              className="relative mb-10 last:mb-0 group"
            >
              {/* Timeline Node Point */}
              <div className="absolute -left-[27px] sm:-left-[35px] top-4 w-6 h-6 rounded-full bg-[#050816] border-2 border-[var(--color-primary)] flex items-center justify-center shadow-[0_0_12px_var(--glow-primary)] group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-ping" />
              </div>

              {/* Milestone Card */}
              <div className="glass glow-border rounded-2xl p-6 border border-white/10 hover:border-[var(--color-primary)]/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold tracking-widest text-[var(--color-accent)] px-2.5 py-0.5 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20">
                    {t.year}
                  </span>
                  {t.tag && (
                    <span className="text-[10px] font-mono text-white/50 px-2 py-0.5 rounded-md bg-white/5">
                      {t.tag}
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-lg text-white mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {t.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                  {t.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

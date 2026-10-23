import { motion } from "framer-motion";
import {
  FiCode,
  FiSmartphone,
  FiLayout,
  FiZap,
  FiGrid,
  FiCheck,
} from "react-icons/fi";
import { services } from "../data/data";
import { playHoverSound } from "../utils/sound";

const icons = [FiCode, FiZap, FiSmartphone, FiLayout, FiGrid, FiCode];

export default function Services() {
  return (
    <section id="services" className="relative py-28 px-6 overflow-hidden">
      {/* Dynamic ambient lighting */}
      <div className="absolute top-1/2 left-[-10%] w-96 h-96 rounded-full bg-[var(--color-primary)]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Professional Offerings</p>
          <h2 className="font-[var(--font-display)] text-3xl md:text-5xl font-bold">
            Client &amp; Engineering <span className="text-gradient">Services</span>
          </h2>
          <p className="text-white/60 text-sm mt-3 max-w-lg mx-auto font-light">
            End-to-end frontend solutions tailored for clients, agencies, and high-growth startups.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -8 }}
                onMouseEnter={playHoverSound}
                data-cursor="hover"
                className="glass glow-border rounded-2xl p-6 relative overflow-hidden group flex flex-col justify-between border border-white/10"
              >
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-[var(--color-primary)]/10 rounded-full blur-2xl group-hover:bg-[var(--color-secondary)]/20 transition-colors duration-500 pointer-events-none" />

                <div className="relative z-10 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 flex items-center justify-center mb-4 text-[var(--color-primary)] text-xl group-hover:scale-110 transition-transform">
                    <Icon />
                  </div>
                  <span className="text-[10px] font-mono text-[var(--color-primary)] uppercase tracking-wider">
                    {s.tagline}
                  </span>
                  <h3 className="font-semibold text-lg text-white mt-1 mb-2.5">{s.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed font-light">{s.desc}</p>
                </div>

                {s.perks && (
                  <div className="relative z-10 pt-4 border-t border-white/5 space-y-1.5">
                    {s.perks.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-white/70">
                        <FiCheck className="text-[var(--color-accent)] shrink-0 text-xs" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { FiCode, FiSmartphone, FiLayout, FiGitBranch, FiCheck } from "react-icons/fi";
import { playHoverSound } from "../utils/sound";

const items = [
  {
    icon: FiCode,
    title: "Frontend Engineering",
    desc: "Writing modular, scalable code with HTML5, CSS3, ES6+ JavaScript, and modern React.",
    highlights: ["React Hooks & Components", "Modern State Management", "Clean Code Architecture"],
  },
  {
    icon: FiSmartphone,
    title: "Adaptive Responsive Design",
    desc: "Ensuring zero layout shifts and seamless touch usability across smartphones, tablets, and desktops.",
    highlights: ["Mobile-first CSS Grid/Flex", "Fluid Typography & Images", "Cross-Device Testing"],
  },
  {
    icon: FiLayout,
    title: "Modern UI/UX & Micro-Motion",
    desc: "Transforming design mockups into living web experiences with subtle micro-interactions and smooth feedback.",
    highlights: ["Framer Motion & GSAP", "Glassmorphic Luxury Styling", "Accessibility Standards"],
  },
  {
    icon: FiGitBranch,
    title: "Version Control & Workflow",
    desc: "Strict adherence to version control hygiene with Git, GitHub, Vite tooling, and semantic commit flows.",
    highlights: ["GitHub Open-Source Repos", "Automated Vite Bundling", "Production Deployments"],
  },
];

export default function Specialization() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Core Pillars</p>
          <h2 className="font-[var(--font-display)] text-3xl md:text-5xl font-bold">
            My <span className="text-gradient">Specialization</span>
          </h2>
          <p className="text-white/60 text-sm mt-3 max-w-lg mx-auto">
            Disciplines where I deliver focused execution and modern developer quality.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              onMouseEnter={playHoverSound}
              data-cursor="hover"
              className="glass glow-border rounded-2xl p-6 flex flex-col justify-between border border-white/10 hover:border-[var(--color-primary)]/40 transition-all duration-300"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 flex items-center justify-center text-[var(--color-primary)] text-2xl mb-5 shadow-inner">
                  <item.icon />
                </div>
                <h3 className="font-semibold text-base text-white mb-2">{item.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed mb-5 font-light">{item.desc}</p>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-1.5">
                {item.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] text-white/70">
                    <FiCheck className="text-[var(--color-accent)] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

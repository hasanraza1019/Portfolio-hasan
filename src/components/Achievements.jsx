import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { achievements } from "../data/data";
import { playHoverSound } from "../utils/sound";

function Counter({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="font-[var(--font-display)] text-4xl sm:text-5xl font-bold text-gradient">
      {val}
      {suffix}
    </span>
  );
}

export default function Achievements() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto glass glow-border rounded-3xl py-12 px-6 sm:px-10 border border-white/10 shadow-2xl relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/5">
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onMouseEnter={playHoverSound}
              className="flex flex-col items-center gap-1.5 pt-4 md:pt-0"
            >
              <Counter to={a.number} suffix={a.suffix} />
              <span className="text-xs font-semibold tracking-wider text-white uppercase mt-1">
                {a.label}
              </span>
              <span className="text-[10px] text-white/40 font-mono">
                {a.detail}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 400);
          setTimeout(() => onDone?.(), 900);
          return 100;
        }
        return p + Math.floor(Math.random() * 8) + 3;
      });
    }, 90);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050816]"
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative w-24 h-24 mb-8"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-t-[var(--color-primary)] border-r-[var(--color-secondary)] border-b-transparent border-l-transparent" />
            <div className="absolute inset-3 rounded-full border-2 border-t-transparent border-r-transparent border-b-[var(--color-accent)] border-l-[var(--color-primary)]" />
          </motion.div>
          <div className="font-[var(--font-display)] text-2xl tracking-[0.3em] text-gradient mb-4">
            M. HASAN
          </div>
          <div className="w-56 h-[2px] bg-white/10 overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)]"
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <div className="mt-3 text-xs tracking-[0.3em] text-white/50">
            {Math.min(progress, 100)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

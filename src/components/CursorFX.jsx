import { useEffect, useRef } from "react";

export default function CursorFX() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let glowX = -100, glowY = -100;
    let isVisible = false;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
        if (glowRef.current) glowRef.current.style.opacity = "1";
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      const target = e.target;
      const interactive = target && target.closest ? target.closest("a, button, [data-cursor='hover'], input, textarea, select") : null;
      if (ringRef.current) {
        ringRef.current.classList.toggle("cursor-hover", !!interactive);
      }
    };

    const onLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };

    const onEnter = () => {
      isVisible = true;
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
      if (glowRef.current) glowRef.current.style.opacity = "1";
    };

    const raf = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(raf);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    const id = requestAnimationFrame(raf);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none">
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 w-80 h-80 rounded-full z-[90] opacity-0 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle, rgba(0,229,255,0.12) 0%, rgba(123,47,247,0.06) 40%, transparent 70%)",
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed top-0 left-0 w-8 h-8 rounded-full border border-[var(--color-primary)]/80 z-[91] opacity-0 transition-[width,height,background-color,border-color,opacity] duration-200 shadow-[0_0_12px_var(--glow-primary)]"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--color-primary)] z-[92] opacity-0 transition-opacity duration-200 shadow-[0_0_8px_var(--color-primary)]"
      />
      <style>{`
        .cursor-hover { width: 3.2rem !important; height: 3.2rem !important; border-color: var(--color-accent) !important; background: rgba(0,255,174,0.12) !important; box-shadow: 0 0 20px var(--glow-secondary) !important; }
      `}</style>
    </div>
  );
}
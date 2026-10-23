import { FiGithub, FiLinkedin, FiMail, FiMessageCircle, FiCode } from "react-icons/fi";
import { playClickSound, playHoverSound } from "../utils/sound";

export default function Footer() {
  const socials = [
    { icon: FiMail, href: "mailto:hasanraza6565655@gmail.com", label: "Email" },
    { icon: FiGithub, href: "https://github.com/hasanraza1019", label: "GitHub" },
    { icon: FiLinkedin, href: "https://www.linkedin.com/in/muhammad-hasan-196335387/", label: "LinkedIn" },
    { icon: FiMessageCircle, href: "https://wa.me/923701235559", label: "WhatsApp" },
  ];

  return (
    <footer className="relative pt-16 overflow-hidden">
      {/* Wave SVG Divider */}
      <svg viewBox="0 0 1440 100" className="w-full h-16 -mb-1" preserveAspectRatio="none">
        <path
          fill="rgba(0,229,255,0.05)"
          d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,50 L1440,100 L0,100 Z"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,50 L1440,100 L0,100 Z;
              M0,50 C240,10 480,80 720,50 C960,20 1200,70 1440,30 L1440,100 L0,100 Z;
              M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,50 L1440,100 L0,100 Z
            "
          />
        </path>
      </svg>

      <div className="bg-[#03050f] border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <a
              href="#home"
              onClick={playClickSound}
              className="font-[var(--font-display)] text-base tracking-[0.2em] text-gradient flex items-center gap-1.5"
            >
              <span>M.HASAN</span>
              <span className="w-1.5 h-3.5 bg-[var(--color-primary)] inline-block" />
            </a>
            <p className="text-xs text-white/50 mt-1 font-mono">
              Crafting high-impact digital experiences
            </p>
          </div>

          {/* Social Icons Hub */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                onClick={playClickSound}
                onMouseEnter={playHoverSound}
                data-cursor="hover"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/50 transition-all hover:scale-110"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>

          {/* Tech Stack Badge & Copyright */}
          <div className="flex flex-col items-center md:items-end text-xs text-white/40 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/50">
              <FiCode className="text-[var(--color-accent)]" />
              <span>React 19 • Tailwind CSS • Framer Motion</span>
            </div>
            <p>© 2026 Muhammad Hasan. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

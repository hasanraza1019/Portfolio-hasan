import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMessageCircle,
  FiSend,
  FiCopy,
  FiCheck,
  FiClock,
} from "react-icons/fi";
import { playClickSound, playSuccessSound } from "../utils/sound";

const EMAILJS_SERVICE_ID = "service_63cqr1r";
const EMAILJS_TEMPLATE_ID = "template_fa7hucb";
const EMAILJS_PUBLIC_KEY = "X1AlDUIsGvPxXYPfE";

const PRESET_MESSAGES = [
  "Hi Hasan! I have a project inquiry for a modern frontend web application.",
  "Hello! We're looking to hire a passionate React / Frontend Developer.",
  "Hi Hasan, I'd like a custom, high-converting landing page built.",
  "Hi! Just saw your portfolio and wanted to connect with you!",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const handleCopyEmail = () => {
    playSuccessSound();
    navigator.clipboard.writeText("hasanraza6565655@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handlePresetClick = (preset) => {
    playClickSound();
    setForm((prev) => ({ ...prev, message: preset }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playClickSound();
    setStatus("sending");

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: form.name,
        email: form.email,
        message: form.message,
      })
      .then(() => {
        playSuccessSound();
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      });
  };

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-[var(--color-primary)]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 rounded-full bg-[var(--color-secondary)]/15 blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Initiate Collaboration</p>
          <h2 className="font-[var(--font-display)] text-3xl md:text-5xl font-bold">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-white/60 mt-3 max-w-lg mx-auto text-sm font-light">
            Have a project in mind, need a frontend developer, or want to collaborate? Reach out directly or send a message.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            className="md:col-span-3 glass glow-border rounded-3xl p-6 md:p-8 space-y-5 border border-white/10 shadow-2xl"
          >
            <div>
              <label className="text-xs text-white/50 mb-1.5 block font-mono">Your Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                type="text"
                placeholder="e.g. Alex Johnson"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[var(--color-primary)]/70 transition-colors placeholder:text-white/20"
              />
            </div>

            <div>
              <label className="text-xs text-white/50 mb-1.5 block font-mono">Your Email</label>
              <input
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                type="email"
                placeholder="alex@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[var(--color-primary)]/70 transition-colors placeholder:text-white/20"
              />
            </div>

            {/* Quick Message Preset Chips */}
            <div>
              <label className="text-xs text-white/50 mb-2 block font-mono">
                Quick Message Presets (Click to autofill):
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {PRESET_MESSAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePresetClick(preset)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-[11px] text-white/70 hover:text-white transition-all text-left border border-white/5"
                  >
                    {idx === 0 && "💼 Project Inquiry"}
                    {idx === 1 && "🚀 Hire React Dev"}
                    {idx === 2 && "⚡ Landing Page"}
                    {idx === 3 && "👋 Say Hello"}
                  </button>
                ))}
              </div>

              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                placeholder="Tell me about your project, timeline, or requirements..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[var(--color-primary)]/70 transition-colors resize-none placeholder:text-white/20"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              data-cursor="hover"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] text-[#050816] font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_30px_var(--glow-primary)] transition-all disabled:opacity-60 hover:scale-[1.01]"
            >
              {status === "sending" && "Transmitting Message..."}
              {status === "sent" && "✓ Message Received! Will reply soon."}
              {status === "error" && "Sending Failed — Please reach out on WhatsApp/Email"}
              {status === "idle" && (
                <>
                  <span>Send Message</span>
                  <FiSend className="text-base" />
                </>
              )}
            </button>
          </motion.form>

          {/* Direct Channels & Social Hub */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 flex flex-col gap-3.5"
          >
            {/* Direct Email Card with One-Click Copy */}
            <div className="glass glow-border rounded-2xl p-4 flex items-center justify-between border border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 flex items-center justify-center text-[var(--color-primary)] text-lg">
                  <FiMail />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Email Address</p>
                  <p className="text-xs text-white/90 font-mono truncate max-w-[170px]">
                    hasanraza6565655@gmail.com
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors flex items-center gap-1 text-xs"
              >
                {copiedEmail ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
                <span className="text-[10px]">{copiedEmail ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Direct WhatsApp Card with Instant Message */}
            <a
              href="https://wa.me/923701235559?text=Hi%20Muhammad%20Hasan,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              data-cursor="hover"
              className="glass glow-border rounded-2xl p-4 flex items-center gap-3.5 hover:bg-white/10 transition-colors border border-emerald-500/20 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg group-hover:scale-110 transition-transform">
                <FiMessageCircle />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">WhatsApp (Instant)</p>
                  <span className="text-[10px] text-emerald-400 font-mono font-medium">Fastest Reply</span>
                </div>
                <p className="text-xs text-white/90 font-mono">+92 370 1235559</p>
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/hasanraza1019"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              data-cursor="hover"
              className="glass glow-border rounded-2xl p-4 flex items-center gap-3.5 hover:bg-white/10 transition-colors border border-white/10 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white text-lg group-hover:scale-110 transition-transform">
                <FiGithub />
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">GitHub Profile</p>
                <p className="text-xs text-white/90 font-mono">github.com/hasanraza1019</p>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://www.linkedin.com/in/muhammad-hasan-196335387/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              data-cursor="hover"
              className="glass glow-border rounded-2xl p-4 flex items-center gap-3.5 hover:bg-white/10 transition-colors border border-white/10 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 text-lg group-hover:scale-110 transition-transform">
                <FiLinkedin />
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">LinkedIn Network</p>
                <p className="text-xs text-white/90 font-mono">linkedin.com/in/muhammad-hasan</p>
              </div>
            </a>

            {/* Turnaround Guarantee Pill */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs text-white/60">
              <FiClock className="text-[var(--color-primary)] text-sm shrink-0" />
              <span>Typical response time: Under 2 hours during active working hours.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

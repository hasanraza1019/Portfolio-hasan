import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiSearch,
  FiX,
  FiCheck,
  FiLayers,
  FiEye,
} from "react-icons/fi";
import { projects } from "../data/data";
import { playClickSound } from "../utils/sound";

function ProjectCard({ project, index, onOpenDetails }) {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -6;
    const rotateY = ((x - rect.width / 2) / rect.width) * 6;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="glass glow-border rounded-2xl overflow-hidden transition-transform duration-200 ease-out will-change-transform group flex flex-col justify-between border border-white/10"
      data-cursor="hover"
    >
      <div>
        {/* Browser Mockup Top Bar */}
        <div className="px-4 py-2 bg-[#090d24] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
          </div>
          <span className="text-[10px] font-mono text-white/40 truncate max-w-[150px]">
            {project.title.toLowerCase().replace(/\s+/g, "-")}.dev
          </span>
          <span className="text-[10px] text-white/30 font-mono">LIVE</span>
        </div>

        {/* Project Thumbnail Image with Gradient Overlay */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#0a0e27] to-[#1a0f3a]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060814] via-transparent to-transparent opacity-90" />

          {/* Category Tag Top Left */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full glass text-[10px] font-mono text-white/90 border border-white/15">
              {project.category}
            </span>
          </div>

          {/* Quick Details Trigger Overlay Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
            <button
              onClick={() => onOpenDetails(project)}
              className="px-4 py-2 rounded-full glass text-xs font-medium text-white flex items-center gap-2 hover:bg-white/20 transition-all scale-95 group-hover:scale-100"
            >
              <FiEye />
              <span>View Details</span>
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="font-semibold text-lg text-white group-hover:text-[var(--color-primary)] transition-colors">
              {project.title}
            </h3>
          </div>
          <p className="text-xs text-[var(--color-primary)]/80 font-mono mb-2.5">
            {project.subtitle}
          </p>
          <p className="text-xs text-white/60 leading-relaxed mb-5 line-clamp-2">
            {project.desc}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] px-2.5 py-0.8 rounded-md bg-white/5 border border-white/10 text-white/70 font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Links Footer */}
      <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClickSound}
          className="flex items-center gap-1.5 text-xs text-white/60 hover:text-[var(--color-primary)] transition-colors"
        >
          <FiGithub className="text-sm" /> Source Code
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClickSound}
          className="flex items-center gap-1.5 text-xs font-medium text-white bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)] hover:text-[#050816] px-3 py-1.5 rounded-lg border border-[var(--color-primary)]/30 transition-all shadow-sm"
        >
          <FiExternalLink className="text-sm" /> Live Demo
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Apps" },
    { id: "ui", label: "UI & Layouts" },
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "web"
        ? p.category.toLowerCase().includes("app") || p.title.toLowerCase().includes("clinic")
        : p.category.toLowerCase().includes("ui") || p.category.toLowerCase().includes("showcase");

    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="relative py-28 px-6 overflow-hidden">
      {/* Dynamic ambient orb */}
      <div className="absolute top-1/3 right-[5%] w-96 h-96 rounded-full bg-[var(--color-secondary)]/15 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">Portfolio Highlights</p>
          <h2 className="font-[var(--font-display)] text-3xl md:text-5xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-white/60 text-sm mt-3 max-w-xl mx-auto font-light">
            Real applications, responsive interfaces, and interactive experiments built with modern frontend tools.
          </p>
        </motion.div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl glass border border-white/10 text-xs">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  playClickSound();
                  setFilter(c.id);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === c.id
                    ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[#050816] font-semibold shadow-md"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-white/30 outline-none focus:border-[var(--color-primary)]/60 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <FiX className="text-xs" />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map((p, i) => (
              <ProjectCard
                key={p.title}
                project={p}
                index={i}
                onOpenDetails={(proj) => {
                  playClickSound();
                  setSelectedProject(proj);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass rounded-2xl">
            <FiLayers className="mx-auto text-3xl text-white/30 mb-3" />
            <p className="text-white/70 text-sm">No projects matched your search.</p>
            <button
              onClick={() => {
                setFilter("all");
                setSearch("");
              }}
              className="mt-3 text-xs text-[var(--color-primary)] underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-w-2xl w-full glass glow-border rounded-3xl p-6 md:p-8 bg-[#090d24]/95 border border-white/15 max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <button
                onClick={() => {
                  playClickSound();
                  setSelectedProject(null);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <FiX />
              </button>

              <div className="mb-4">
                <span className="px-3 py-1 rounded-full bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-xs font-mono">
                  {selectedProject.category}
                </span>
                <h3 className="font-[var(--font-display)] text-2xl font-bold text-white mt-3 mb-1">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-white/50 font-mono">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* Modal Image */}
              <div className="rounded-xl overflow-hidden mb-6 border border-white/10 aspect-video bg-black/40">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-xs md:text-sm text-white/70 leading-relaxed mb-6 font-light">
                <p>{selectedProject.desc}</p>

                {selectedProject.highlights && (
                  <div>
                    <h4 className="font-semibold text-white text-xs mb-2 uppercase tracking-wider font-mono">
                      Key Capabilities:
                    </h4>
                    <ul className="space-y-1.5">
                      {selectedProject.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <FiCheck className="text-[var(--color-accent)] mt-0.5 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-white text-xs mb-2 uppercase tracking-wider font-mono">
                    Built With:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md glass text-[11px] font-mono text-[var(--color-primary)] border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Links */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[#050816] font-semibold text-xs flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
                >
                  <FiExternalLink /> Open Live Demo
                </a>
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl glass hover:bg-white/10 text-white font-medium text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors"
                >
                  <FiGithub /> View on GitHub
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

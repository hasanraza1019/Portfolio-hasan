export const roles = [
  "Frontend Web Developer",
  "React Developer",
  "Modern UI/UX Enthusiast",
  "Freelance Web Crafter",
  "Clean Code Advocate",
];

export const techMarquee = [
  "React.js",
  "JavaScript (ES6+)",
  "Tailwind CSS",
  "Vite",
  "HTML5 & Semantic Web",
  "CSS3 Modern Layouts",
  "Git & GitHub",
  "Framer Motion",
  "GSAP Animations",
  "Responsive Design",
  "REST APIs",
  "Component Architecture",
  "Performance Tuning",
];

export const skillCategories = {
  frontend: {
    title: "Frontend Core",
    items: [
      { name: "HTML5 & Semantic Markup", level: 95, icon: "SiHtml5", color: "#e34f26" },
      { name: "CSS3 & Modern Layouts (Flex/Grid)", level: 92, icon: "SiCss3", color: "#1572b6" },
      { name: "JavaScript (ES6+, DOM, Async)", level: 86, icon: "SiJavascript", color: "#f7df1e" },
      { name: "React.js (Hooks, State, Components)", level: 84, icon: "SiReact", color: "#61dafb" },
      { name: "Tailwind CSS (Utility-First Design)", level: 90, icon: "SiTailwindcss", color: "#06b6d4" },
    ],
  },
  workflow: {
    title: "Tools & Ecosystem",
    items: [
      { name: "Git & Version Control", level: 85, icon: "SiGit", color: "#f05032" },
      { name: "GitHub & Collaborative Workflow", level: 85, icon: "SiGithub", color: "#ffffff" },
      { name: "Vite & Modern Build Tools", level: 82, icon: "SiVite", color: "#646cff" },
      { name: "Responsive & Mobile-First Design", level: 92, icon: "FiSmartphone", color: "#00ffae" },
      { name: "UI/UX Basics & Design Systems", level: 78, icon: "FiLayout", color: "#7b2ff7" },
    ],
  },
  animations: {
    title: "Interactions & Motion",
    items: [
      { name: "Framer Motion Animations", level: 82, icon: "FiZap", color: "#00e5ff" },
      { name: "GSAP & ScrollTrigger", level: 75, icon: "FiActivity", color: "#88ce02" },
      { name: "Web Audio & Micro-interactions", level: 80, icon: "FiVolume2", color: "#ec4899" },
      { name: "Cross-Browser Testing & Debugging", level: 88, icon: "FiCheckCircle", color: "#10b981" },
    ],
  },
};

export const skills = [
  { name: "HTML5", level: 95, category: "frontend" },
  { name: "CSS3 / Modern CSS", level: 92, category: "frontend" },
  { name: "JavaScript (ES6+)", level: 86, category: "frontend" },
  { name: "React.js", level: 84, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Responsive Design", level: 92, category: "workflow" },
  { name: "Git & GitHub", level: 85, category: "workflow" },
  { name: "UI/UX Basics", level: 78, category: "workflow" },
];

export const services = [
  {
    title: "Frontend Development",
    tagline: "Pixel-Perfect & Fast",
    desc: "Clean, robust, and semantic frontend interfaces built with modern HTML5, CSS3, JavaScript, and React patterns.",
    perks: ["Component-driven structure", "W3C valid semantic markup", "Fast rendering & light bundle"],
  },
  {
    title: "React Single Page Apps",
    tagline: "Smooth & Scalable",
    desc: "Single page web applications with clean state management, modular component breakdown, and fluid user workflows.",
    perks: ["Custom Hooks & State architecture", "Interactive data handling", "Scalable folder structure"],
  },
  {
    title: "Mobile-First Responsive Layouts",
    tagline: "Flawless on Every Screen",
    desc: "Pixel-perfect mobile, tablet, and widescreen layouts that maintain design fidelity, legibility, and effortless touch navigation.",
    perks: ["Touch-optimized gestures", "Adaptive typography", "Fluid CSS Grid & Flexbox"],
  },
  {
    title: "High-Converting Landing Pages",
    tagline: "Modern & Engaging",
    desc: "Eye-catching landing pages with sleek micro-interactions and smooth scroll animations engineered to captivate visitors.",
    perks: ["Strong call-to-action flow", "Engaging hero sections", "Optimized load times"],
  },
  {
    title: "Dashboard & Admin UI",
    tagline: "Data-Dense & Intuitive",
    desc: "Organized, easy-to-navigate dashboard layouts and data portals with clear visual hierarchy, widgets, and charts.",
    perks: ["Readable data cards", "Clean filter bars", "Dark/Light friendly design"],
  },
  {
    title: "UI/UX & Micro-Interactions",
    tagline: "Details That Delight",
    desc: "Translating wireframes into polished digital experiences with subtle hover states, glowing accents, and motion polish.",
    perks: ["Smooth hover transitions", "Framer Motion choreography", "Accessible interactive states"],
  },
];

export const projects = [
  {
    id: "clinic-management",
    title: "Clinic Management System",
    subtitle: "Healthcare Administration & Patient Records Portal",
    category: "Web Application",
    desc: "A comprehensive clinic management portal designed for medical staff to register patients, manage appointment schedules, review medical history, and access quick daily clinic metrics.",
    highlights: [
      "Patient records storage & fast search filter",
      "Interactive appointment booking flow",
      "Modern dashboard overview with clinic stats",
      "Responsive layout for tablets and desktop clinic stations",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
    github: "https://github.com/hasanraza1019/Clinic-Management-System",
    demo: "https://hasanraza1019.github.io/Clinic-Management-System/",
    image: "/img/projects/clinic.jpg",
    featured: true,
  },
  {
    id: "banto-grid",
    title: "Banto Grid Showcase",
    subtitle: "Modern Bento-Box UI Architecture",
    category: "UI / Component Architecture",
    desc: "A sleek, Apple & modern tech inspired Bento grid layout system demonstrating complex CSS Grid composition, responsive aspect ratios, and subtle hover interaction layers.",
    highlights: [
      "Modular bento tile layout with dynamic spans",
      "Interactive glassmorphic hover card reactions",
      "Zero layout shift across breakpoint transitions",
      "Dark-mode luxury aesthetics with neon accents",
    ],
    tech: ["HTML5", "CSS3 Modern Grid", "JavaScript"],
    github: "https://github.com/hasanraza1019/Banto-grid",
    demo: "https://hasanraza1019.github.io/Banto-grid/",
    image: "/img/projects/banto.jpg",
    featured: true,
  },
  {
    id: "cards-ui",
    title: "Interactive Cards UI",
    subtitle: "Creative 3D Tilt & Micro-Interactions",
    category: "UI / Motion Design",
    desc: "A creative UI experiment exploring 3D perspective mouse-tracking physics, glowing border reflections, and tactile responsive component interactions.",
    highlights: [
      "Dynamic 3D gyro perspective mouse tracking",
      "Conic gradient glow borders that track hover",
      "Smooth hardware-accelerated CSS transforms",
      "Clean, reusable component patterns",
    ],
    tech: ["HTML5", "CSS3 Transforms", "JavaScript ES6+"],
    github: "https://github.com/hasanraza1019/cards",
    demo: "https://hasanraza1019.github.io/cards/",
    image: "/img/projects/cards.jpg",
    featured: false,
  },
  {
    id: "portfolio-v1",
    title: "Personal Portfolio v1",
    subtitle: "Foundational Personal Website",
    category: "Frontend Showcase",
    desc: "An earlier personal portfolio site crafted as a foundational milestone in Muhammad Hasan's frontend journey, demonstrating structural growth and design evolution.",
    highlights: [
      "Custom responsive navigation and mobile drawer",
      "Direct GitHub deployment workflow",
      "Foundational CSS layout experiments",
      "Stepping stone to this ultra-VIP React edition",
    ],
    tech: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/hasanraza1019/portfolio-2",
    demo: "https://hasanraza1019.github.io/portfolio-2/",
    image: "/img/projects/portfolio.jpg",
    featured: false,
  },
];

export const timeline = [
  {
    year: "2024",
    title: "Started Web Fundamentals (HTML5 & CSS3)",
    desc: "Stepped into frontend engineering by mastering semantic markup, modern CSS box model, flexbox, and responsive principles.",
    tag: "Fundamentals",
  },
  {
    year: "2024",
    title: "JavaScript (ES6+) & DOM Engineering",
    desc: "Built logic, stateful DOM interactions, asynchronous workflows, and interactive web elements from scratch.",
    tag: "Logic & Scripting",
  },
  {
    year: "2025",
    title: "React.js & Component Architecture",
    desc: "Graduated to component-based frontend development, working with hooks, reusable layouts, and modern single-page apps.",
    tag: "Modern Frontend",
  },
  {
    year: "2025",
    title: "Git, GitHub & Version Control",
    desc: "Adopted professional developer workflows: git branching, semantic commits, open-source repositories, and public code deployment.",
    tag: "Workflow",
  },
  {
    year: "2026",
    title: "Matric (SSC) — Academic Milestone",
    desc: "Successfully completing secondary school education while dedicating daily hours to serious software engineering and building real projects.",
    tag: "Education",
  },
  {
    year: "2026",
    title: "Ready for Freelance & Junior Frontend Roles",
    desc: "Actively available to collaborate with startups, agencies, and clients worldwide to build cutting-edge web applications.",
    tag: "Current Status",
  },
];

export const achievements = [
  { number: 4, suffix: "+", label: "Completed Projects", detail: "Shipped & Live" },
  { number: 8, suffix: "+", label: "Technologies Mastered", detail: "Modern Frontend Stack" },
  { number: 200, suffix: "+", label: "Hours of Coding", detail: "Consistent Practice" },
  { number: 100, suffix: "%", label: "Commitment & Passion", detail: "Always Learning" },
];

export const testimonials = [
  {
    name: "Ayesha Khan",
    role: "Startup Founder & Product Lead",
    avatar: "AK",
    text: "Hasan delivered our landing page ahead of schedule with remarkable attention to detail. His understanding of responsive layout and crisp styling exceeded expectations.",
    rating: 5,
  },
  {
    name: "Bilal Ahmed",
    role: "Full-Stack Engineer & Mentor",
    avatar: "BA",
    text: "Clean, readable code with thoughtful UI decisions. Muhammad Hasan grasps modern React concepts rapidly and puts genuine care into every pixel.",
    rating: 5,
  },
  {
    name: "Sara Malik",
    role: "Business Owner",
    avatar: "SM",
    text: "I shared a concept with Hasan and he turned it into an elegant, working website. Very patient with adjustments and communication was seamless throughout.",
    rating: 5,
  },
];

export const terminalCommands = {
  help: "Available commands:\n  • about      - Learn about Muhammad Hasan\n  • skills     - View core technical stack\n  • projects   - List featured projects\n  • contact    - Get email, phone & social handles\n  • hire       - How to work with Hasan\n  • status     - Current availability status\n  • theme      - Change portfolio color theme\n  • clear      - Clear terminal screen",
  about: "Muhammad Hasan\nRole: Frontend Web Developer\nLocation: Pakistan\nFocus: React, JavaScript, Responsive UI/UX, High-performance Web Apps\nPassion: Turning creative ideas into pixel-perfect interactive reality.",
  skills: "Technical Arsenal:\n  [Core]        React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS\n  [Workflow]    Git, GitHub, Vite, npm, VS Code\n  [Animations]  Framer Motion, GSAP, CSS Animations\n  [Architecture] Responsive Mobile-First, Modular Components, Clean Code",
  projects: "Featured Works:\n  1. Clinic Management System -> https://hasanraza1019.github.io/Clinic-Management-System/\n  2. Banto Grid Layout       -> https://hasanraza1019.github.io/Banto-grid/\n  3. 3D Cards UI Interaction -> https://hasanraza1019.github.io/cards/\n  4. Portfolio v1 Milestone  -> https://hasanraza1019.github.io/portfolio-2/",
  contact: "Reach Muhammad Hasan:\n  • Email:    hasanraza6565655@gmail.com\n  • WhatsApp: +92 370 1235559\n  • GitHub:   https://github.com/hasanraza1019\n  • LinkedIn: https://www.linkedin.com/in/muhammad-hasan-196335387/",
  hire: "Status: OPEN FOR HIRE!\nAvailable for: Freelance gigs, frontend contracts, and junior developer positions.\nFast turnaround, daily updates, clean code.\nType 'contact' or scroll to the Contact section to get started.",
  status: "🟢 ONLINE & AVAILABLE\nTimezone: PKT (UTC+5)\nResponse Time: Under 2 hours\nWork Mode: Remote / Freelance",
};

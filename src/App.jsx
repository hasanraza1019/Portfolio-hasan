import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ThemeProvider } from "./context/ThemeContext";
import Loader from "./components/Loader";
import CursorFX from "./components/CursorFX";
import ParticleBackground from "./components/ParticleBackground";
import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import Hero from "./components/Hero";
import About from "./components/About";
import Specialization from "./components/Specialization";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Terminal from "./components/Terminal";
import Timeline from "./components/Timeline";
import Achievements from "./components/Achievements";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0.5, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, [loaded]);

  return (
    <ThemeProvider>
      <Loader onDone={() => setLoaded(true)} />
      <CursorFX />
      <ParticleBackground />
      <div className="relative z-10 selection:bg-[var(--color-primary)] selection:text-[#050816]">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Specialization />
          <Services />
          <Projects />
          <Terminal />
          <Timeline />
          <Achievements />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
      <BackToTop />
    </ThemeProvider>
  );
}

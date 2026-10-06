import { useEffect } from "react";
import { useTheme, useScrollReveal, useCursor } from "./hooks";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import ResearchInterests from "./components/ResearchInterests";
import Publications from "./components/Publications";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import "./index.css";

function Cursor() {
  const { dotRef, ringRef } = useCursor();
  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

function Footer() {
  return (
    <footer className="footer" aria-label="Footer">
      <p>
        Designed & built by{" "}
        <a href="https://github.com/alm03806-dev" target="_blank" rel="noopener noreferrer">
          Md. Al Mahmud
        </a>
        {" "}· {new Date().getFullYear()}
        {" "}· Bangladesh
      </p>
    </footer>
  );
}

function SectionDivider() {
  return <hr className="divider" aria-hidden="true" />;
}

export default function App() {
  const { theme, toggle } = useTheme();
  useScrollReveal();

  // Re-run scroll reveal when components render
  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll<HTMLElement>(".reveal");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );
      els.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Cursor />
      <Navigation theme={theme} onToggle={toggle} />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <SectionDivider />
        <ResearchInterests />
        <SectionDivider />
        <Publications />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Achievements />
        <SectionDivider />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

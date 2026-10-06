import { Download, ExternalLink, FlaskConical } from "lucide-react";
import ParticleField from "./ParticleField";
import { personalInfo } from "../data/portfolio";

export default function Hero() {
  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="hero" id="hero" aria-label="Introduction">
      <ParticleField />

      {/* Gradient vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, var(--bg) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div className="hero-content">
        <div className="hero-label">
          <span className="hero-label-dot" aria-hidden="true" />
          Available for research collaborations
        </div>

        <h1 className="hero-name">
          <span className="hero-name-accent">Md. Al</span>
          <br />
          Mahmud
        </h1>

        <p className="hero-roles" aria-label="Roles">
          <span>Machine Learning Researcher</span>
          <span className="hero-role-sep" aria-hidden="true">/</span>
          <span>AI Engineer</span>
          <span className="hero-role-sep" aria-hidden="true">/</span>
          <span>CS Undergraduate</span>
        </p>

        <p className="hero-tagline">{personalInfo.tagline}</p>

        <div className="hero-actions">
          <button
            className="btn btn-primary magnetic"
            onClick={() => scrollTo("#research")}
            id="hero-research-btn"
          >
            <FlaskConical size={16} />
            View Research
          </button>
          <button
            className="btn btn-secondary magnetic"
            onClick={() => scrollTo("#projects")}
            id="hero-projects-btn"
          >
            <ExternalLink size={16} />
            Explore Projects
          </button>
          <a
            href={personalInfo.cv}
            className="btn btn-ghost magnetic"
            download
            id="hero-cv-btn"
            aria-label="Download CV"
          >
            <Download size={16} />
            Download CV
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden="true"
          style={{
            marginTop: "4rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            opacity: 0,
            animation: "fadeUp 0.6s 1.2s ease forwards",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "2.5rem",
              background: "linear-gradient(to bottom, transparent, var(--border))",
            }}
          />
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
              fontFamily: "var(--font-mono)",
            }}
          >
            scroll
          </span>
        </div>
      </div>
    </section>
  );
}

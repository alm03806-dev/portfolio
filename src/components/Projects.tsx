import { ExternalLink, GitFork, Trophy } from "lucide-react";
import { projects } from "../data/portfolio";

export default function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <p className="section-label reveal">Build</p>
      <h2 className="section-title reveal reveal-delay-1" id="projects-title">
        Featured Projects
      </h2>
      <p className="section-desc reveal reveal-delay-2">
        End-to-end ML systems built with a focus on reproducibility, honest evaluation, and
        real-world deployment.
      </p>

      <div className="proj-grid">
        {projects.map((proj, i) => (
          <article
            key={proj.id}
            className={`proj-card reveal reveal-delay-${Math.min(i + 1, 4)}`}
            id={`project-${proj.id}`}
            aria-label={proj.title}
          >
            <div className="proj-card-top">
              <span className="proj-period">{proj.period}</span>
              {proj.badge && (
                <span className="badge badge-hackathon">
                  <Trophy size={10} />
                  {proj.badge}
                </span>
              )}
            </div>

            <h3 className="proj-title">{proj.title}</h3>
            <p className="proj-subtitle">{proj.subtitle}</p>
            <p className="proj-desc">{proj.description}</p>

            <ul className="proj-highlights" aria-label="Key highlights">
              {proj.highlights.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>

            <div className="proj-tags" aria-label="Technologies used">
              {proj.tags.map((tag) => (
                <span key={tag} className="proj-tag">
                  {tag}
                </span>
              ))}
            </div>

            {proj.links && proj.links.length > 0 && (
              <div className="proj-links">
                {proj.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-link magnetic"
                    aria-label={`${link.label} for ${proj.title}`}
                    id={`proj-link-${proj.id}-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {link.label.toLowerCase().includes("github") ? (
                      <GitFork size={13} />
                    ) : (
                      <ExternalLink size={13} />
                    )}
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

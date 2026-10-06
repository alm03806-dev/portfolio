import { MapPin } from "lucide-react";
import { education, experience } from "../data/portfolio";

export default function About() {
  return (
    <section className="section section-sm" id="about" aria-labelledby="about-title">
      {/* Education */}
      <div style={{ marginBottom: "4rem" }}>
        <p className="section-label reveal">Background</p>
        <h2 className="section-title reveal reveal-delay-1" id="about-title">
          Education
        </h2>

        <div className="timeline">
          {education.map((edu, i) => (
            <div key={edu.id} className={`timeline-item reveal reveal-delay-${Math.min(i + 2, 5)}`}>
              <div className="timeline-left" aria-hidden="true">
                <div className="timeline-dot" />
                {i < education.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-title">{edu.degree}</h3>
                  <span className="timeline-period">{edu.period}</span>
                </div>
                <p className="timeline-org">{edu.institution}</p>
                <p className="timeline-location">
                  <MapPin size={12} aria-hidden="true" />
                  {edu.location}
                </p>
                {"gpa" in edu && edu.gpa && (
                  <span className="timeline-gpa">{edu.gpa}</span>
                )}
                <p className="timeline-desc">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <p className="section-label reveal">Experience</p>
        <h2
          className="section-title reveal reveal-delay-1"
          id="experience-title"
          style={{ marginBottom: "2.5rem" }}
        >
          Volunteer & Teaching
        </h2>

        <div className="timeline">
          {experience.map((exp, i) => (
            <div key={exp.id} className={`timeline-item reveal reveal-delay-${Math.min(i + 2, 5)}`}>
              <div className="timeline-left" aria-hidden="true">
                <div className="timeline-dot" style={{ background: "var(--violet)" }} />
                {i < experience.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-title">
                    {exp.title}
                    <span
                      style={{
                        marginLeft: "0.5rem",
                        fontSize: "0.7rem",
                        color: "var(--violet)",
                        background: "var(--violet-soft)",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "999px",
                        fontWeight: 500,
                      }}
                    >
                      {exp.type}
                    </span>
                  </h3>
                  <span className="timeline-period">{exp.period}</span>
                </div>
                <p className="timeline-org" style={{ color: "var(--violet)" }}>
                  {exp.organization}
                </p>
                <p className="timeline-location">
                  <MapPin size={12} aria-hidden="true" />
                  {exp.location}
                </p>
                <ul className="timeline-highlights">
                  {exp.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

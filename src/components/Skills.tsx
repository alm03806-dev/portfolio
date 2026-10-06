import { skillGroups } from "../data/portfolio";

export default function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <p className="section-label reveal">Toolkit</p>
      <h2 className="section-title reveal reveal-delay-1" id="skills-title">
        Technical Skills
      </h2>
      <p className="section-desc reveal reveal-delay-2">
        A curated toolkit built through independent research, project work, and continuous
        learning.
      </p>

      <div className="skills-grid">
        {skillGroups.map((group, i) => (
          <div
            key={group.label}
            className={`skill-group reveal reveal-delay-${Math.min(i + 1, 5)}`}
            aria-label={`${group.label} skills`}
          >
            <p className="skill-group-label">{group.label}</p>
            <div className="skill-tags">
              {group.skills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

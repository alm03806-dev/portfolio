import { achievements } from "../data/portfolio";

export default function Achievements() {
  return (
    <section className="section section-sm" id="achievements" aria-labelledby="achievements-title">
      <p className="section-label reveal">Recognition</p>
      <h2 className="section-title reveal reveal-delay-1" id="achievements-title">
        Achievements & Certifications
      </h2>
      <p className="section-desc reveal reveal-delay-2">
        Hackathon recognition, cloud credentials, and research training.
      </p>

      <div className="achievement-grid">
        {achievements.map((ach, i) => (
          <div
            key={ach.id}
            className={`achievement-card reveal reveal-delay-${Math.min(i + 1, 5)}`}
            id={`achievement-${ach.id}`}
            aria-label={ach.title}
          >
            <div className="achievement-header">
              <h3 className="achievement-title">{ach.title}</h3>
              <span className="achievement-date">{ach.date}</span>
            </div>
            <p className="achievement-org">{ach.organization}</p>
            <p className="achievement-desc">{ach.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import {
  ShieldCheck,
  HeartPulse,
  Layers,
  ScanLine,
  FileText,
  Cpu,
} from "lucide-react";
import { researchInterests } from "../data/portfolio";

const iconMap: Record<string, React.ElementType> = {
  "shield-check": ShieldCheck,
  "heart-pulse": HeartPulse,
  layers: Layers,
  "scan-line": ScanLine,
  "file-text": FileText,
  cpu: Cpu,
};

export default function ResearchInterests() {
  return (
    <section className="section" id="research" aria-labelledby="research-title">
      <div className="section-sm" style={{ maxWidth: "100%" }}>
        <p className="section-label reveal">Research</p>
        <h2 className="section-title reveal reveal-delay-1" id="research-title">
          Research Interests
        </h2>
        <p className="section-desc reveal reveal-delay-2">
          My work sits at the intersection of rigorous evaluation methodology and real-world ML
          deployment — with a focus on making clinical and financial models genuinely trustworthy.
        </p>

        <div className="interest-grid">
          {researchInterests.map((interest, i) => {
            const Icon = iconMap[interest.icon] ?? Cpu;
            return (
              <div
                key={interest.id}
                className={`interest-card reveal reveal-delay-${Math.min(i + 1, 5)}`}
                aria-label={interest.title}
              >
                <div className="interest-icon" aria-hidden="true">
                  <Icon size={18} />
                </div>
                <h3 className="interest-title">{interest.title}</h3>
                <p className="interest-desc">{interest.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

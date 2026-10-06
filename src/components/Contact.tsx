import { Mail, GitFork, BookOpen, Database, Link2 } from "lucide-react";
import { personalInfo } from "../data/portfolio";

const CONTACT_LINKS = [
  {
    label: "Email",
    href: `mailto:${personalInfo.email}`,
    value: personalInfo.email,
    icon: Mail,
    id: "contact-email",
  },
  {
    label: "GitHub",
    href: personalInfo.links.github,
    value: "alm03806-dev",
    icon: GitFork,
    id: "contact-github",
  },
  {
    label: "Hugging Face",
    href: personalInfo.links.huggingface,
    value: "mahmudsiyam",
    icon: BookOpen,
    id: "contact-huggingface",
  },
  {
    label: "Kaggle",
    href: personalInfo.links.kaggle,
    value: "mahmudsiyam",
    icon: Database,
    id: "contact-kaggle",
  },
  {
    label: "ORCID",
    href: personalInfo.links.orcid,
    value: "0009-0004-0404-4761",
    icon: Link2,
    id: "contact-orcid",
  },
];

export default function Contact() {
  return (
    <section className="section section-sm" id="contact" aria-labelledby="contact-title">
      <p className="section-label reveal">Connect</p>
      <h2 className="section-title reveal reveal-delay-1" id="contact-title">
        Get in Touch
      </h2>

      <div className="contact-wrapper">
        <div className="reveal reveal-delay-2">
          <p className="contact-text">
            I'm always open to discussing research ideas, collaborations, or opportunities in
            machine learning and AI engineering. Whether you're working on a clinical ML problem,
            have a dataset integrity question, or just want to talk shop — reach out.
          </p>
          <p className="contact-text" style={{ marginTop: "-1rem" }}>
            <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>
              {personalInfo.location}
            </strong>
            <br />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--accent)" }}>
              {personalInfo.email}
            </span>
          </p>
        </div>

        <div className="contact-links reveal reveal-delay-3" aria-label="Contact and social links">
          {CONTACT_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.id}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="contact-link magnetic"
                id={link.id}
                aria-label={`${link.label}: ${link.value}`}
              >
                <span className="contact-link-icon" aria-hidden="true">
                  <Icon size={16} />
                </span>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1 }}>
                    {link.label}
                  </div>
                  <div style={{ marginTop: "0.125rem" }}>{link.value}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

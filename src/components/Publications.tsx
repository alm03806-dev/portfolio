import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, GitFork } from "lucide-react";
import { publications } from "../data/portfolio";
import type { Publication, PublicationStatus } from "../data/portfolio";

type Filter = "all" | PublicationStatus | "first-author";

const STATUS_LABELS: Record<PublicationStatus, string> = {
  accepted: "Accepted",
  submitted: "Submitted",
  "in-preparation": "In Preparation",
};

const STATUS_BADGE: Record<PublicationStatus, string> = {
  accepted: "badge-accepted",
  submitted: "badge-submitted",
  "in-preparation": "badge-in-preparation",
};

function formatAuthors(authors: string[]) {
  return authors.map((author, i) => {
    const isMe = author === "Md. Al Mahmud";
    return (
      <span key={i}>
        {i > 0 && ", "}
        {isMe ? <strong>{author}</strong> : author}
      </span>
    );
  });
}

function PublicationCard({ pub }: { pub: Publication }) {
  const [expanded, setExpanded] = useState(false);

  const linkIcon = (label: string) => {
    if (label.toLowerCase().includes("github")) return <GitFork size={12} />;
    return <ExternalLink size={12} />;
  };

  return (
    <article
      className={`pub-card ${pub.status}${expanded ? " expanded" : ""}`}
      id={`pub-${pub.id}`}
    >
      <div className="pub-card-header">
        <div className="pub-badges">
          <span className={`badge ${STATUS_BADGE[pub.status]}`}>
            {STATUS_LABELS[pub.status]}
          </span>
          <span
            className={`badge ${
              pub.role === "first-author" ? "badge-first-author" : "badge-co-author"
            }`}
          >
            {pub.role === "first-author" ? "First Author" : "Co-author"}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--text-muted)",
            }}
          >
            {pub.year}
          </span>
        </div>
      </div>

      <h3 className="pub-title">{pub.title}</h3>
      <p className="pub-authors">{formatAuthors(pub.authors)}</p>
      <p className="pub-venue">{pub.venue}</p>

      <div className="pub-abstract">
        <p>{pub.abstract}</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
        <button
          className="pub-toggle"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={`pub-abstract-${pub.id}`}
          id={`pub-toggle-${pub.id}`}
        >
          {expanded ? (
            <>
              <ChevronUp size={14} /> Hide abstract
            </>
          ) : (
            <>
              <ChevronDown size={14} /> Read abstract
            </>
          )}
        </button>

        {pub.links && pub.links.length > 0 && (
          <div className="pub-links">
            {pub.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="pub-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} for ${pub.title}`}
              >
                {linkIcon(link.label)}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "First Author", value: "first-author" },
  { label: "Accepted", value: "accepted" },
  { label: "Submitted", value: "submitted" },
  { label: "In Preparation", value: "in-preparation" },
];

export default function Publications() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = publications.filter((pub) => {
    if (filter === "all") return true;
    if (filter === "first-author") return pub.role === "first-author";
    return pub.status === filter;
  });

  return (
    <section className="section section-sm" id="publications" aria-labelledby="pub-title">
      <p className="section-label reveal">Selected Work</p>
      <h2 className="section-title reveal reveal-delay-1" id="pub-title">
        Publications
      </h2>
      <p className="section-desc reveal reveal-delay-2">
        {publications.length} papers across conference proceedings and journal submissions.
        Statuses are accurate as of October 2026.
      </p>

      <div className="pub-filters reveal reveal-delay-3" role="group" aria-label="Filter publications">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`pub-filter${filter === f.value ? " active" : ""}`}
            onClick={() => setFilter(f.value)}
            aria-pressed={filter === f.value}
            id={`pub-filter-${f.value}`}
          >
            {f.label}
            <span
              style={{
                marginLeft: "0.375rem",
                background: "var(--bg-raised)",
                borderRadius: "999px",
                padding: "0.05rem 0.4rem",
                fontSize: "0.65rem",
              }}
            >
              {f.value === "all"
                ? publications.length
                : f.value === "first-author"
                ? publications.filter((p) => p.role === "first-author").length
                : publications.filter((p) => p.status === f.value).length}
            </span>
          </button>
        ))}
      </div>

      <div className="pub-list" role="list" aria-label="Publications list">
        {filtered.map((pub, i) => (
          <div
            key={pub.id}
            className={`reveal reveal-delay-${Math.min(i + 1, 5)}`}
            role="listitem"
          >
            <PublicationCard pub={pub} />
          </div>
        ))}
      </div>
    </section>
  );
}

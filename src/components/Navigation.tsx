import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useScrolled } from "../hooks";

const NAV_LINKS = [
  { label: "Research", href: "#research" },
  { label: "Publications", href: "#publications" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

interface NavProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

export default function Navigation({ theme, onToggle }: NavProps) {
  const scrolled = useScrolled(20);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`} role="banner">
      <a
        href="#hero"
        className="nav-logo"
        onClick={(e) => handleNavClick(e, "#hero")}
        aria-label="Al Mahmud — Home"
      >
        almahmud
        <span style={{ color: "var(--accent)" }}>.</span>
      </a>

      {/* Desktop nav */}
      <nav className="nav-links" aria-label="Main navigation">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link"
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <button
          className="theme-btn"
          onClick={onToggle}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          id="theme-toggle-btn"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </nav>

      {/* Mobile controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <button
          className="theme-btn"
          onClick={onToggle}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          style={{ display: "none" }}
          id="theme-toggle-mobile"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          className="mobile-menu-btn"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          id="mobile-menu-btn"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <nav className={`mobile-nav${open ? " open" : ""}`} aria-label="Mobile navigation">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link"
            onClick={(e) => handleNavClick(e, link.href)}
            style={{ fontSize: "1rem" }}
          >
            {link.label}
          </a>
        ))}
        <button
          className="theme-btn"
          onClick={onToggle}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          style={{ alignSelf: "flex-start" }}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </nav>
    </header>
  );
}

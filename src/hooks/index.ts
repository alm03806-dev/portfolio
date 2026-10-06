import { useEffect, useRef, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggle };
}

export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

export function useCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouchDevice || prefersReducedMotion) return;

    // Actual pointer position
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;

    // Interpolated positions
    let dotX = targetX;
    let dotY = targetY;
    let ringX = targetX;
    let ringY = targetY;

    // Magnetic state
    let isMagnetic = false;
    let magTargetX = 0;
    let magTargetY = 0;
    
    let raf: number;
    let isVisible = false;

    const movePointer = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        dotX = e.clientX;
        dotY = e.clientY;
        ringX = e.clientX;
        ringY = e.clientY;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "0.6";
      }
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      // Determine actual target based on magnetic state
      const destX = isMagnetic ? magTargetX : targetX;
      const destY = isMagnetic ? magTargetY : targetY;

      // Lerp factors: dot is very highly responsive, ring is moderate
      dotX += (destX - dotX) * 0.85;
      dotY += (destY - dotY) * 0.85;
      
      ringX += (destX - ringX) * 0.22;
      ringY += (destY - ringY) * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(animate);
    };

    const onEnterHover = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      
      // Magnetic effect calculation
      if (target.classList.contains("magnetic") || target.tagName.toLowerCase() === "button" || target.classList.contains("btn")) {
        isMagnetic = true;
        target.classList.add("magnetic-active");
        
        const rect = target.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        
        // Calculate a subtle magnetic pull (e.g. 20% towards center)
        const pull = 0.2;
        magTargetX = targetX + (cx - targetX) * pull;
        magTargetY = targetY + (cy - targetY) * pull;
        
        // Move element slightly
        const dx = (targetX - cx) * 0.15;
        const dy = (targetY - cy) * 0.15;
        target.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }

      dotRef.current?.classList.add("hovering");
      ringRef.current?.classList.add("hovering");
      
      if (target.closest(".proj-card")) {
        ringRef.current?.classList.add("hovering-card");
      }
    };
    
    const onMoveHover = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      if (isMagnetic) {
        const mouseEv = e as MouseEvent;
        const rect = target.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const pull = 0.2;
        magTargetX = mouseEv.clientX + (cx - mouseEv.clientX) * pull;
        magTargetY = mouseEv.clientY + (cy - mouseEv.clientY) * pull;
        
        const dx = (mouseEv.clientX - cx) * 0.15;
        const dy = (mouseEv.clientY - cy) * 0.15;
        target.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }
    };

    const onLeaveHover = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      isMagnetic = false;
      target.classList.remove("magnetic-active");
      target.style.transform = "";
      
      dotRef.current?.classList.remove("hovering");
      ringRef.current?.classList.remove("hovering");
      ringRef.current?.classList.remove("hovering-card");
    };

    // Initialize invisible
    if (dotRef.current) dotRef.current.style.opacity = "0";
    if (ringRef.current) ringRef.current.style.opacity = "0";

    document.addEventListener("mousemove", movePointer, { passive: true });
    raf = requestAnimationFrame(animate);

    const hoverEls = document.querySelectorAll("a, button, [role='button'], .proj-card");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnterHover);
      el.addEventListener("mousemove", onMoveHover);
      el.addEventListener("mouseleave", onLeaveHover);
    });

    return () => {
      document.removeEventListener("mousemove", movePointer);
      cancelAnimationFrame(raf);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterHover);
        el.removeEventListener("mousemove", onMoveHover);
        el.removeEventListener("mouseleave", onLeaveHover);
      });
    };
  }, []);

  return { dotRef, ringRef };
}

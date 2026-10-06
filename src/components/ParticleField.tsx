import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const NODE_COUNT = 40;
const CONNECTION_DISTANCE = 150;
const MOUSE_RADIUS = 200;
const MOUSE_REPEL = 0.05;

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const nodes = useRef<Node[]>([]);
  const raf = useRef<number>(0);
  const isDark = useRef(document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      isDark.current = document.documentElement.classList.contains("dark");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isTouchDevice = window.matchMedia("(hover: none)").matches;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const speedMultiplier = prefersReducedMotion ? 0.1 : 0.4;

    const initNodes = () => {
      nodes.current = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speedMultiplier,
        vy: (Math.random() - 0.5) * speedMultiplier,
        radius: Math.random() * 1.5 + 0.5,
      }));
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initNodes();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    if (!isTouchDevice) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dark = isDark.current;
      
      // Draw soft gradient orbs
      const time = Date.now() * (prefersReducedMotion ? 0.0001 : 0.0005);
      const cx1 = canvas.width * 0.3 + Math.sin(time) * 100;
      const cy1 = canvas.height * 0.4 + Math.cos(time * 0.8) * 100;
      const cx2 = canvas.width * 0.7 + Math.cos(time * 1.1) * 100;
      const cy2 = canvas.height * 0.6 + Math.sin(time * 0.9) * 100;

      const grd1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, canvas.width * 0.5);
      grd1.addColorStop(0, dark ? "rgba(79, 70, 229, 0.08)" : "rgba(79, 70, 229, 0.04)");
      grd1.addColorStop(1, "transparent");
      
      const grd2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, canvas.width * 0.5);
      grd2.addColorStop(0, dark ? "rgba(6, 182, 212, 0.06)" : "rgba(6, 182, 212, 0.03)");
      grd2.addColorStop(1, "transparent");

      ctx.fillStyle = grd1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nodeColor = dark ? "rgba(129,140,248," : "rgba(79,70,229,";
      const lineColor = dark ? "rgba(129,140,248," : "rgba(79,70,229,";

      nodes.current.forEach((n) => {
        // Mouse repulsion
        const dx = n.x - mouse.current.x;
        const dy = n.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (!prefersReducedMotion && dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          n.vx += (dx / dist) * force * MOUSE_REPEL;
          n.vy += (dy / dist) * force * MOUSE_REPEL;
        }

        // Dampen
        n.vx *= 0.992;
        n.vy *= 0.992;

        // Clamp speed
        const maxSpeed = prefersReducedMotion ? 0.2 : 0.8;
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > maxSpeed) { n.vx = (n.vx / speed) * maxSpeed; n.vy = (n.vy / speed) * maxSpeed; }

        n.x += n.vx;
        n.y += n.vy;

        // Wrap
        if (n.x < -10) n.x = canvas.width + 10;
        if (n.x > canvas.width + 10) n.x = -10;
        if (n.y < -10) n.y = canvas.height + 10;
        if (n.y > canvas.height + 10) n.y = -10;

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor + "0.5)";
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < nodes.current.length; i++) {
        for (let j = i + 1; j < nodes.current.length; j++) {
          const a = nodes.current[i];
          const b = nodes.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.12;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = lineColor + alpha + ")";
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
      if (!isTouchDevice) window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-canvas"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}

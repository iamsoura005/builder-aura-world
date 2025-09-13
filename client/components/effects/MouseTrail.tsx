import { useEffect, useRef } from "react";

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<{ x: number; y: number; t: number }[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return () => {};

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const MAX_POINTS = 150;
    const DURATION = 1200; // ms trail lifetime

    const onMove = (e: MouseEvent) => {
      pointsRef.current.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (pointsRef.current.length > MAX_POINTS) pointsRef.current.shift();
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    const draw = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const pts = pointsRef.current;
      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1];
        const p1 = pts[i];
        const age = now - p1.t;
        const life = 1 - age / DURATION;
        if (life <= 0) continue;
        const speed = Math.hypot(p1.x - p0.x, p1.y - p0.y);
        const width = Math.max(1.5, Math.min(6, 10 - speed * 0.05)) * life;
        // Blend cyan -> emerald by index
        const mix = i / pts.length;
        const c1 = { r: 56, g: 189, b: 248 }; // cyan-400
        const c2 = { r: 16, g: 185, b: 129 }; // emerald-500
        const r = Math.round(c1.r * (1 - mix) + c2.r * mix);
        const g = Math.round(c1.g * (1 - mix) + c2.g * mix);
        const b = Math.round(c1.b * (1 - mix) + c2.b * mix);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0.08, 0.35 * life)})`;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${0.6 * life})`;
        ctx.shadowBlur = 12 * life;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }

      // Cull old points
      const cutoff = now - DURATION;
      while (pts.length && pts[0].t < cutoff) pts.shift();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 [mix-blend:screen]"
      aria-hidden
    />
  );
}

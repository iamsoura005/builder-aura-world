import { useEffect, useRef } from "react";

function isInteractive(el: EventTarget | null): boolean {
  if (!(el instanceof Element)) return false;
  const selectors = [
    "a",
    "button",
    "[role=button]",
    "input",
    "textarea",
    "select",
    ".btn-neon",
    ".btn-outline-neon",
  ];
  return selectors.some((s) => el.closest(s));
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const target = useRef({ x: pos.current.x, y: pos.current.y });
  const hoverRef = useRef(false);
  const downRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const supportsFine = window.matchMedia("(pointer: fine)").matches;
    if (!supportsFine) return;

    const body = document.body;
    body.classList.add("md:cursor-none");

    const move = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      hoverRef.current = isInteractive(e.target);
    };
    const down = () => { downRef.current = true; };
    const up = () => { downRef.current = false; };
    const leave = () => { /* hide when leaving window */ dotRef.current!.style.opacity = "0"; ringRef.current!.style.opacity = "0"; };
    const enter = () => { dotRef.current!.style.opacity = "1"; ringRef.current!.style.opacity = "1"; };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mouseenter", enter);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.18);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.18);

      const dot = dotRef.current!;
      const ring = ringRef.current!;

      const scale = hoverRef.current ? 1.25 : 1;
      const ringScale = downRef.current ? 0.9 : hoverRef.current ? 1.35 : 1.05;

      dot.style.transform = `translate3d(${pos.current.x - 4}px, ${pos.current.y - 4}px, 0) scale(${scale})`;
      ring.style.transform = `translate3d(${pos.current.x - 16}px, ${pos.current.y - 16}px, 0) scale(${ringScale})`;

      ring.style.boxShadow = hoverRef.current
        ? "0 0 32px rgba(16,185,129,0.45), 0 0 12px rgba(59,130,246,0.45)"
        : "0 0 18px rgba(59,130,246,0.35)";

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      body.classList.remove("md:cursor-none");
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseenter", enter);
    };
  }, []);

  // Two layered cursors: dot + ring
  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-50 top-0 left-0 h-2 w-2 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(59,130,246,0.5)]"
        style={{ opacity: 0 }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-50 top-0 left-0 h-8 w-8 rounded-full border border-cyan-300/70 bg-white/5 backdrop-blur-md"
        style={{ opacity: 0 }}
      />
    </>
  );
}

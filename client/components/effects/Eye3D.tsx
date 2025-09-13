import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function Eye3D({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const irisRef = useRef<HTMLDivElement | null>(null);
  const pupilRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const maxIris = 10; // px
      const maxPupil = 14; // px
      const ix = Math.max(-1, Math.min(1, dx)) * maxIris;
      const iy = Math.max(-1, Math.min(1, dy)) * maxIris;
      const px = Math.max(-1, Math.min(1, dx)) * maxPupil;
      const py = Math.max(-1, Math.min(1, dy)) * maxPupil;
      if (irisRef.current)
        irisRef.current.style.transform = `translate(${ix}px, ${iy}px)`;
      if (pupilRef.current)
        pupilRef.current.style.transform = `translate(${px}px, ${py}px)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative rounded-full grid place-items-center", className)}
    >
      {/* Sclera */}
      <div className="absolute inset-0 rounded-full border border-white/10 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.95),rgba(200,220,230,0.4)_60%,rgba(0,0,0,0.12)_100%)] shadow-2xl shadow-cyan-500/20" />

      {/* Iris */}
      <div
        ref={irisRef}
        className="relative h-2/3 w-2/3 rounded-full border border-cyan-300/40 shadow-[inset_0_0_48px_rgba(16,185,129,0.35),0_0_40px_rgba(16,185,129,0.15)]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(34,197,94,0.25) 0%, rgba(34,197,94,0.25) 20%, rgba(6,182,212,0.35) 45%, rgba(59,130,246,0.25) 60%, rgba(0,0,0,0.4) 100%)",
          maskImage:
            "radial-gradient(circle at 50% 50%, black 60%, transparent 65%)",
        }}
      >
        {/* Iris texture rings */}
        <div
          className="absolute inset-0 rounded-full opacity-70 animate-spin-slower"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(16,185,129,0) 0deg, rgba(16,185,129,0.35) 120deg, rgba(59,130,246,0.3) 240deg, rgba(16,185,129,0) 360deg)",
          }}
        />
      </div>

      {/* Pupil */}
      <div
        ref={pupilRef}
        className="absolute h-1/4 w-1/4 rounded-full bg-[radial-gradient(circle_at_50%_60%,rgba(0,0,0,1)_0%,rgba(0,0,0,0.9)_40%,rgba(0,0,0,0.6)_100%)] animate-pulse-slow"
      />

      {/* Highlight */}
      <div className="absolute left-[38%] top-[34%] h-5 w-5 rounded-full bg-white/80 blur-[1px]" />
      <div className="absolute left-[44%] top-[40%] h-2.5 w-2.5 rounded-full bg-white/70" />

      {/* Eyelids */}
      <div className="pointer-events-none absolute -inset-1">
        <div className="eyelid-top" />
        <div className="eyelid-bottom" />
      </div>
    </div>
  );
}

import { NavLink, Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Header() {
  const location = useLocation();
  const nav = [
    { to: "/", label: "Home" },
    { to: "/fundus", label: "Fundus Analyzer" },
    { to: "/color-test", label: "Color Blindness Test" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 border-b border-white/10">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="group inline-flex items-center gap-2">
          <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-400 text-black shadow-lg shadow-cyan-500/40">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="animate-glow">
              <path d="M2 12c3-4 6-6 10-6s7 2 10 6c-3 4-6 6-10 6s-7-2-10-6z" stroke="currentColor" strokeWidth="1.5" opacity="0.9"/>
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
            </svg>
          </span>
          <div className="leading-tight">
            <div className="font-heading text-lg font-semibold tracking-tight">Dristi</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Your Ultimate Ophthalmologist</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:text-white/90",
                  isActive || location.pathname === n.to
                    ? "text-white bg-white/5 border border-white/10"
                    : "text-white/70 hover:bg-white/5"
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/fundus" className="btn-neon hidden sm:inline-flex">Analyze Fundus Image</Link>
        </div>
      </div>
    </header>
  );
}

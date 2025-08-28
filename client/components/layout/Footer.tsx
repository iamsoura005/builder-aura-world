import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/30">
      <div className="container py-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-400 text-black">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M2 12c3-4 6-6 10-6s7 2 10 6c-3 4-6 6-10 6s-7-2-10-6z" stroke="currentColor" strokeWidth="1.5" opacity="0.9"/>
                <circle cx="12" cy="12" r="3" fill="currentColor"/>
              </svg>
            </span>
            <div>
              <div className="font-heading font-semibold">Dristi</div>
              <div className="text-xs text-white/60">AI-powered eye care</div>
            </div>
          </div>
          <p className="mt-4 text-white/60 max-w-xs">Futuristic medical + AI + ophthalmology platform for rapid, reliable screening.</p>
        </div>
        <div>
          <div className="font-semibold mb-3">Quick Links</div>
          <ul className="space-y-2 text-white/70">
            <li><Link to="/fundus" className="hover:text-white">Analyze Fundus Image</Link></li>
            <li><Link to="/color-test" className="hover:text-white">Take Color Blindness Test</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Legal</div>
          <ul className="space-y-2 text-white/70">
            <li><a href="#" className="hover:text-white">Privacy</a></li>
            <li><a href="#" className="hover:text-white">Terms</a></li>
            <li><a href="#" className="hover:text-white">Security</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Contact</div>
          <p className="text-white/70">support@dristi.ai</p>
          <p className="text-white/50">© {new Date().getFullYear()} Dristi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

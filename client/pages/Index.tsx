import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Eye3D from "@/components/effects/Eye3D";

export default function Index() {
  const snapRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ container: snapRef });

  const scannerScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const scannerRotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const statsOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

  const scrollNext = () => {
    const container = snapRef.current;
    if (!container) return;
    const sections = container.querySelectorAll("section");
    const next = sections[1] as HTMLElement | undefined;
    if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const features = [
    {
      title: "Fundus Analyzer",
      desc: "Upload retinal images for AI-driven detection of DR, Glaucoma, Cataract and more.",
      to: "/fundus",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M2 12c3-4 6-6 10-6s7 2 10 6c-3 4-6 6-10 6s-7-2-10-6z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "Color Blindness Test",
      desc: "Ishihara plates with timers and instant feedback to assess color vision.",
      to: "/color-test",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle
            cx="7"
            cy="12"
            r="4"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle
            cx="17"
            cy="12"
            r="4"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      title: "About",
      desc: "Timeline of how Dristi works with AI + healthcare illustrations and team profiles.",
      to: "/about",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2v20M4 6h16M4 12h16M4 18h16"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      title: "Contact",
      desc: "Reach us for partnerships, support, or clinical collaborations.",
      to: "/contact",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 5h18v10H6l-3 4V5z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <div
        ref={snapRef}
        className="h-[calc(100vh-0px)] overflow-y-auto snap-y snap-mandatory scroll-smooth scroll-pt-16"
      >
        {/* Section 1: Hero */}
        <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] snap-start pt-20 sm:pt-28 pb-16 sm:pb-24">
          <div className="container grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
              >
                Futuristic medical + AI + ophthalmology
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="mt-4 font-heading text-4xl sm:text-6xl font-semibold tracking-tight"
              >
                Dristi – Your Ultimate Ophthalmologist
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-4 text-lg text-white/80 max-w-xl"
              >
                AI-powered eye disease detection & vision tests.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link to="/fundus" className="btn-neon">
                  Analyze Fundus Image
                </Link>
                <Link to="/color-test" className="btn-outline-neon">
                  Take Color Blindness Test
                </Link>
              </motion.div>

              <motion.div
                style={{ opacity: statsOpacity }}
                className="mt-10 grid grid-cols-3 gap-4 text-center"
              >
                <div className="glass rounded-xl p-4">
                  <div className="text-2xl font-semibold">99.2%</div>
                  <div className="text-xs text-white/60">avg. sensitivity</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-2xl font-semibold">
                    <span className="text-emerald-400">HIPAA</span>
                  </div>
                  <div className="text-xs text-white/60">compliant</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-2xl font-semibold">24/7</div>
                  <div className="text-xs text-white/60">availability</div>
                </div>
              </motion.div>
            </div>

            <div className="relative">
              {/* Floating eye scanner illustration with scroll-driven parallax */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                style={{ scale: scannerScale, rotate: scannerRotate }}
                className="relative mx-auto aspect-square w-full max-w-[520px]"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/25 to-emerald-400/20 blur-2xl" />
                <div className="absolute inset-0 grid place-items-center">
                  <Eye3D className="h-72 w-72 sm:h-96 sm:w-96" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll down indicator */}
          <button
            onClick={scrollNext}
            aria-label="Scroll down"
            className="absolute left-1/2 -translate-x-1/2 bottom-6 grid place-items-center h-10 w-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path
                d="M6 10l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>
        </section>

        {/* Section 2: Feature highlights */}
        <section className="min-h-[calc(100vh-4rem)] snap-start flex items-center py-10">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="grid sm:grid-cols-3 gap-4"
            >
              <div className="holo rounded-xl p-6">
                <div className="text-sm text-white/70">Secure • Private</div>
                <div className="text-xs text-white/60">
                  End-to-end encrypted uploads
                </div>
              </div>
              <div className="holo rounded-xl p-6">
                <div className="text-sm text-white/70">Clinically aligned</div>
                <div className="text-xs text-white/60">
                  Built with ophthalmologists
                </div>
              </div>
              <div className="holo rounded-xl p-6">
                <div className="text-sm text-white/70">Fast results</div>
                <div className="text-xs text-white/60">
                  Under 10 seconds average
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link to="/fundus" className="btn-neon">
                Start Fundus Analysis
              </Link>
              <Link to="/color-test" className="btn-outline-neon">
                Try Color Blindness Test
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Section 3: List view of features */}
        <section className="min-h-[calc(100vh-4rem)] snap-start flex items-center py-16">
          <div className="container">
            <div className="max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight"
              >
                Explore Dristi
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="mt-2 text-white/70"
              >
                Core features and pages, presented in a clean, scroll-reveal
                list.
              </motion.p>
            </div>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
              className="mt-10 space-y-4 relative"
            >
              <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/40 via-white/10 to-emerald-400/40 pointer-events-none" />
              {features.map((f, idx) => (
                <motion.li
                  key={f.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="group glass rounded-2xl p-5 sm:p-6 flex items-start gap-4"
                >
                  <div className="relative">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 border border-white/10 text-cyan-300">
                      {f.icon}
                    </div>
                    <div className="absolute left-1/2 top-10 -ml-px w-px h-4 bg-white/10" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-medium text-white/90">{f.title}</h3>
                      <Link
                        to={f.to}
                        className="btn-outline-neon whitespace-nowrap"
                      >
                        Open
                      </Link>
                    </div>
                    <p className="mt-1 text-sm text-white/70">{f.desc}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>
      </div>
    </>
  );
}

import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Index() {
  const snapRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ container: snapRef });

  const scannerScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const scannerRotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const statsOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

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
                <Link to="/fundus" className="btn-neon">Analyze Fundus Image</Link>
                <Link to="/color-test" className="btn-outline-neon">Take Color Blindness Test</Link>
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
                  <div className="text-2xl font-semibold"><span className="text-emerald-400">HIPAA</span></div>
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
                  <div className="relative">
                    <motion.div className="h-72 w-72 sm:h-96 sm:w-96 rounded-full border border-white/10 backdrop-blur-xl bg-white/5 shadow-2xl shadow-cyan-500/20" animate={{ boxShadow: [
                      "0 0 0 0 rgba(59,130,246,0.15)",
                      "0 0 80px 0 rgba(59,130,246,0.35)"
                    ] }} transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }} />
                    <motion.div className="absolute inset-8 rounded-full border-2 border-cyan-400/60" animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} />
                    <div className="absolute inset-0 grid place-items-center">
                      <motion.div className="h-20 w-20 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.4, repeat: Infinity }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
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
                <div className="text-xs text-white/60">End-to-end encrypted uploads</div>
              </div>
              <div className="holo rounded-xl p-6">
                <div className="text-sm text-white/70">Clinically aligned</div>
                <div className="text-xs text-white/60">Built with ophthalmologists</div>
              </div>
              <div className="holo rounded-xl p-6">
                <div className="text-sm text-white/70">Fast results</div>
                <div className="text-xs text-white/60">Under 10 seconds average</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link to="/fundus" className="btn-neon">Start Fundus Analysis</Link>
              <Link to="/color-test" className="btn-outline-neon">Try Color Blindness Test</Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

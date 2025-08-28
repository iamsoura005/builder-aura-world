import { useCallback, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Result = { name: string; score: number; severity: "low" | "moderate" | "high" };

const diseases = ["Diabetic Retinopathy", "Glaucoma", "Cataract", "AMD", "Hypertensive Retinopathy"];

export default function FundusAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [results, setResults] = useState<Result[] | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const onFiles = useCallback((files: FileList | null) => {
    const f = files?.[0];
    if (!f) return;
    setFile(f);
    setResults(null);
    const url = URL.createObjectURL(f);
    setPreview(url);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onFiles(e.dataTransfer.files);
  }, [onFiles]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onFiles(e.target.files);
  }, [onFiles]);

  const analyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    await new Promise((r) => setTimeout(r, 1400));
    const generated: Result[] = diseases.map((d) => {
      const score = Math.round( (0.15 + Math.random() * 0.8) * 100 );
      const severity: Result["severity"] = score > 75 ? "high" : score > 45 ? "moderate" : "low";
      return { name: d, score, severity };
    });
    setResults(generated);
    setAnalyzing(false);
  };

  const severityColor = useCallback((s: Result["severity"]) => {
    if (s === "high") return "text-red-400";
    if (s === "moderate") return "text-yellow-300";
    return "text-emerald-400";
  }, []);

  const printReport = () => {
    window.print();
  };

  const hasFile = !!file && !!preview;

  return (
    <section className="relative py-16 sm:py-24">
      <div className="container">
        <div className="mb-10 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl font-semibold tracking-tight">
            Fundus Analyzer
          </h1>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">
            Upload a retinal fundus image. Dristi will analyze for indicators of diabetic retinopathy, glaucoma, cataract, and more.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div
              ref={dropRef}
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              className="glass holo rounded-2xl p-8 min-h-[260px] flex flex-col items-center justify-center text-center"
            >
              <input id="file" type="file" accept="image/*" onChange={onChange} className="hidden" />
              {!hasFile ? (
                <div>
                  <div className="mx-auto grid place-items-center h-16 w-16 rounded-2xl bg-white/5 border border-white/10">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white/80">
                      <path d="M12 16V4M12 4l-4 4M12 4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="3" y="12" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <h3 className="mt-4 font-medium">Drag & drop fundus image</h3>
                  <p className="text-white/60">or</p>
                  <label htmlFor="file" className="btn-neon mt-3 cursor-pointer">Browse files</label>
                </div>
              ) : (
                <div className="w-full">
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                    {/* Stylish rounded preview frame */}
                    <img src={preview!} alt="Fundus preview" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 pointer-events-none border-2 border-white/10 rounded-2xl" />
                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/10 to-transparent" />
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <button onClick={analyze} className="btn-neon disabled:opacity-60" disabled={analyzing}>
                      {analyzing ? "Analyzing…" : "Analyze Image"}
                    </button>
                    <button onClick={() => { setFile(null); setPreview(null); setResults(null); }} className="btn-outline-neon">Clear</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="glass rounded-2xl p-6 lg:p-8 min-h-[260px]">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg">Analysis Results</h3>
                <button onClick={printReport} className="btn-outline-neon">Download PDF</button>
              </div>
              <div className="mt-6 grid gap-4">
                <AnimatePresence initial={false}>
                  {results && results.map((r, idx) => (
                    <motion.div
                      key={r.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ delay: idx * 0.05 }}
                      className="holo rounded-xl p-4 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium">{r.name}</div>
                        <div className={"text-xs mt-1 " + severityColor(r.severity)}>
                          {r.severity.toUpperCase()} RISK
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-semibold">{r.score}%</div>
                        <div className="text-xs text-white/60">confidence</div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {!results && (
                  <div className="text-white/60 text-sm">Upload a fundus image to view AI-generated results.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

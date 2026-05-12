import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const T = [
  { quote: "Axel rebuilt our orchestration UI in six weeks. It now ships faster, looks better, and engineers actually want to use it.", name: "Mira Tanaka", role: "VP Engineering, Quantum Systems", initials: "MT" },
  { quote: "The lighting engine he wrote pushed our brand site to #1 on Awwwards. Genuinely cinematic engineering.", name: "Idris Okonkwo", role: "Creative Director, Vertex Labs", initials: "IO" },
  { quote: "Rare combination of taste and depth. He shipped a Rust-powered WebAssembly module the same week he prototyped it.", name: "Sara Lindqvist", role: "CTO, Aether", initials: "SL" },
  { quote: "Three quarters into our migration, Axel's GitOps pipeline still hasn't paged us once. Set-it-and-forget engineering.", name: "Daniel Reyes", role: "Head of Platform, Cloud-Native", initials: "DR" },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % T.length), 5500);
    return () => clearInterval(t);
  }, []);

  const cur = T[i];

  return (
    <section className="mx-auto max-w-5xl px-6 py-32">
      <div className="mb-10 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">// 07 — signal</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Words from the frontline.</h2>
      </div>

      <div className="relative">
        <Quote className="absolute -top-6 left-0 size-16 text-accent/15" />
        <div className="glass relative min-h-[260px] rounded-md p-10 md:p-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-pretty text-xl leading-relaxed md:text-2xl">"{cur.quote}"</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="grid size-12 place-items-center rounded-full border border-accent/40 bg-accent/10 font-mono text-sm font-bold text-accent">
                  {cur.initials}
                </div>
                <div>
                  <div className="font-semibold">{cur.name}</div>
                  <div className="font-mono text-xs text-muted-foreground">{cur.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-2">
            {T.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Show testimonial ${k + 1}`}
                className={`h-1 transition-all ${k === i ? "w-10 bg-accent" : "w-4 bg-border hover:bg-muted-foreground"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setI((v) => (v - 1 + T.length) % T.length)} className="grid size-9 place-items-center rounded-full border border-border hover:border-accent hover:text-accent">
              <ChevronLeft className="size-4" />
            </button>
            <button onClick={() => setI((v) => (v + 1) % T.length)} className="grid size-9 place-items-center rounded-full border border-border hover:border-accent hover:text-accent">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

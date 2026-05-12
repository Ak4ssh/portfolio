import { motion } from "framer-motion";
import { useMemo } from "react";

const LANGS = [
  { name: "TypeScript", pct: 45, color: "oklch(0.78 0.145 220)" },
  { name: "Python", pct: 25, color: "oklch(0.78 0.14 90)" },
  { name: "React / Node", pct: 15, color: "oklch(0.78 0.12 200)" },
  { name: "PHP", pct: 10, color: "oklch(0.7 0.18 320)" },
  { name: "Kotlin", pct: 5, color: "oklch(0.7 0.18 30)" },
];

const REPOS = [
  { name: "omnix-ai", desc: "Multimodal AI infra & Actor backend.", stars: "3.2k", lang: "Python" },
  { name: "scribe-bet", desc: "Full-stack casino gaming platform.", stars: "1.4k", lang: "PHP" },
  { name: "educationopedia", desc: "Global study abroad platform.", stars: "892", lang: "TS" },
];

function Heatmap() {
  const cells = useMemo(() => {
    const r = Math.random; // deterministic-enough for visual
    return Array.from({ length: 7 * 26 }, () => {
      const v = Math.pow(r(), 2.4);
      return v;
    });
  }, []);
  return (
    <div className="grid grid-flow-col grid-rows-7 gap-1">
      {cells.map((v, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: (i % 26) * 0.01, duration: 0.4 }}
          className="size-3 rounded-[2px]"
          style={{
            background: v < 0.05
              ? "color-mix(in oklab, white 5%, transparent)"
              : `color-mix(in oklab, var(--color-accent) ${Math.round(v * 90)}%, transparent)`,
            boxShadow: v > 0.7 ? "0 0 8px var(--color-accent)" : undefined,
          }}
        />
      ))}
    </div>
  );
}

export function GithubStats() {
  return (
    <section id="github" className="border-y border-border bg-black/30 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">// 05 — open source</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Commits in the wild.</h2>
          <div className="mt-4 h-1 w-24 bg-accent" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Heatmap */}
          <div className="glass rounded-3xl p-6 md:p-8 lg:col-span-2 overflow-hidden w-full">
            <div className="mb-4 flex items-baseline justify-between">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Contribution heatmap</h3>
              <span className="font-mono text-xs text-accent">1,284 commits</span>
            </div>
            <div className="w-full overflow-x-auto no-scrollbar pb-2">
              <div className="min-w-max pr-4">
                <Heatmap />
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="glass rounded-3xl p-6 md:p-8">
            <h3 className="mb-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Top languages</h3>
            <div className="space-y-4">
              {LANGS.map((l, i) => (
                <div key={l.name}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span>{l.name}</span>
                    <span className="font-mono text-muted-foreground">{l.pct}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-border">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.pct * 2}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{ background: l.color, boxShadow: `0 0 10px ${l.color}` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Repos */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {REPOS.map((r, i) => (
            <motion.a
              key={r.name}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass group block rounded-3xl p-6 transition-colors hover:border-accent/50"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-accent group-hover:underline">{r.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">★ {r.stars}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{r.desc}</p>
              <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{r.lang}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

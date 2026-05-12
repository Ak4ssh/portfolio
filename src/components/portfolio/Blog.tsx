import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";

const POSTS = [
  { title: "Building a deferred WebGL renderer in 600 lines", cat: "Graphics", read: "12 min", date: "May 2024" },
  { title: "Why your realtime UI feels slow (and how to fix it)", cat: "Frontend", read: "8 min", date: "Apr 2024" },
  { title: "Notes on running Rust in the browser at scale", cat: "Systems", read: "15 min", date: "Mar 2024" },
  { title: "GitOps without the tears: a Kubernetes pattern", cat: "Infra", read: "10 min", date: "Feb 2024" },
];

const CATS = ["All", "Graphics", "Frontend", "Systems", "Infra"] as const;

export function Blog() {
  const [c, setC] = useState<(typeof CATS)[number]>("All");
  const [q, setQ] = useState("");
  const list = useMemo(
    () => POSTS.filter((p) => (c === "All" || p.cat === c) && p.title.toLowerCase().includes(q.toLowerCase())),
    [c, q],
  );
  return (
    <section id="blog" className="border-y border-border bg-black/30 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">// 08 — field notes</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Things I write down.</h2>
            <div className="mt-4 h-1 w-24 bg-accent" />
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex items-center gap-2 rounded-sm border border-border bg-white/5 px-3 py-2">
              <Search className="size-3.5 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="search posts…" className="w-44 bg-transparent font-mono text-xs placeholder:text-muted-foreground focus:outline-none" />
            </div>
            <div className="flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-widest">
              {CATS.map((k) => (
                <button key={k} onClick={() => setC(k)} className={`pb-0.5 transition-colors ${c === k ? "border-b border-accent text-accent" : "text-muted-foreground hover:text-foreground"}`}>{k}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {list.map((p, i) => (
            <motion.a
              key={p.title}
              href="#"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group flex items-center justify-between gap-6 py-6 transition-colors hover:bg-white/5 md:py-8"
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent">{p.cat} · {p.date} · {p.read}</div>
                <h3 className="mt-2 text-xl font-semibold transition-colors group-hover:text-accent md:text-2xl">{p.title}</h3>
              </div>
              <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </motion.a>
          ))}
          {list.length === 0 && <p className="py-12 text-center font-mono text-sm text-muted-foreground">// nothing matches</p>}
        </div>
      </div>
    </section>
  );
}

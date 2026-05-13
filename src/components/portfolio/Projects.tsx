import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { ExternalLink, Github, Search, X } from "lucide-react";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";

type Project = {
  id: string;
  title: string;
  category: "Full-Stack" | "Mobile" | "Backend" | "Coming Soon";
  year: number;
  blurb: string;
  description: string;
  tech: string[];
  live?: string;
  repo?: string;
  cover: { hue: number; label: string };
};

const PROJECTS: Project[] = [
  { id: "scribe", title: "Scribe.bet", category: "Full-Stack", year: 2025, blurb: "A full casino-type gaming platform with 3 in-house games and REST APIs.", description: "Built a complete full-stack casino gaming site. Features include 3 original in-house games, PHP + MySQL custom backend, JWT authentication, wallet/balance management, and admin controls. All game logic runs server-side for security.", tech: ["PHP", "MySQL", "React", "JWT", "REST API"], live: "https://scribe.bet", cover: { hue: 0, label: "SCRIBE_BET" } },
  { id: "omnix", title: "Omnix / Valo AI", category: "Backend", year: 2024, blurb: "Multimodal AI infrastructure and Actor-based backend worker.", description: "Developed a highly capable, multimodal AI chatbot specialized in cybersecurity and STEM. Architected a thread-safe FastAPI server with an Actor-based background worker for the llama.cpp engine, supporting real-time concurrent inference.", tech: ["Python", "FastAPI", "llama.cpp", "AI/ML"], cover: { hue: 355, label: "OMNIX_AI" } },
  { id: "educationopedia", title: "Educationopedia", category: "Full-Stack", year: 2024, blurb: "Global study abroad and MBBS application platform.", description: "Engineered and rebranded the core platform for 'Experience Education Across The Globe'. Built comprehensive study abroad exploration and application systems for international students.", tech: ["React", "TypeScript", "Tailwind CSS"], cover: { hue: 10, label: "EDU_OPEDIA" } },
  { id: "roomie", title: "Roomie App", category: "Full-Stack", year: 2024, blurb: "Full-stack real estate and roommate matching application.", description: "Transformed an existing frontend project into a comprehensive full-stack application. Designed the backend architecture to support seamless data flow, user profiles, and real-time roommate matching.", tech: ["React", "Node.js", "PostgreSQL", "REST API"], cover: { hue: 350, label: "ROOMIE_APP" } },
  { id: "android", title: "Disbursement API", category: "Backend", year: 2024, blurb: "Disbursement Payout API integration with gateway callbacks.", description: "Integrated payout APIs and resolved complex callback processing issues. Handled user balance refunds, robust transaction states, and concurrent gateway notifications securely.", tech: ["Node.js", "MySQL", "Payments"], cover: { hue: 5, label: "PAYOUT_SYS" } },
];

const CATEGORIES = ["All", "Full-Stack", "Mobile", "Backend"] as const;

function TiltCard({ children }: { children: React.ReactNode }) {
  const [t, setT] = useState({ rx: 0, ry: 0 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -y * 8, ry: x * 8 });
  };
  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => setT({ rx: 0, ry: 0 })}
      style={{ transform: `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`, transition: "transform 0.15s ease-out" }}
      className="h-full w-full"
    >
      {children}
    </div>
  );
}

function Cover({ p }: { p: Project }) {
  return (
    <div
      className="relative grid aspect-[16/10] w-full place-items-center overflow-hidden rounded-3xl border border-border bg-zinc-950 transition-colors duration-500 group-hover:border-accent/60"
      style={{
        backgroundImage: `radial-gradient(circle at 70% 30%, hsl(${p.cover.hue} 90% 20% / 0.6), transparent 60%), linear-gradient(135deg, hsl(${p.cover.hue} 30% 8%), hsl(${p.cover.hue} 60% 4%))`,
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-x-6 top-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-white/40">
        <span>{p.cover.label}</span>
        <span>{p.year}</span>
      </div>
      <div className="relative font-mono text-xs uppercase tracking-[0.3em] text-white/60">{p.category} //</div>
      <div className="absolute inset-x-6 bottom-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-white/40">
        <span>render.live</span>
        <span className="flex items-center gap-1.5"><span className="size-1.5 animate-pulse rounded-full bg-accent" /> stable</span>
      </div>
    </div>
  );
}

export function Projects() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      PROJECTS.filter((p) => (cat === "All" || p.category === cat) &&
        (q === "" || (p.title + " " + p.tech.join(" ")).toLowerCase().includes(q.toLowerCase()))),
    [cat, q],
  );

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-32">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">// 03 — selected nodes</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">My Projects.</h2>
          <div className="mt-4 h-1 w-24 bg-accent" />
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex items-center gap-2 rounded-full border border-border bg-white/5 px-4 py-2">
            <Search className="size-3.5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="search projects…"
              className="w-44 bg-transparent font-mono text-xs placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-widest">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`pb-0.5 transition-colors ${cat === c ? "border-b border-accent text-accent" : "text-muted-foreground hover:text-foreground"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div layout className="grid gap-8 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard>
                <button
                  onClick={() => setOpen(p)}
                  className="group relative text-left w-full h-full block"
                >
                  <Cover p={p} />
                  <div className="mt-6 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight transition-colors group-hover:text-accent">{p.title}</h3>
                      <p className="mt-2 max-w-prose text-sm text-muted-foreground">{p.blurb}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.tech.map((t) => (
                          <span key={t} className="rounded-full border border-border bg-white/5 px-3 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t}</span>
                        ))}
                      </div>
                    </div>
                    <ExternalLink className="size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                </button>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <p className="col-span-full py-20 text-center font-mono text-sm text-muted-foreground">// no matches found</p>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-background/80 p-6 backdrop-blur-md"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 16, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute right-4 top-4 z-10 grid size-8 place-items-center rounded-full border border-border bg-background/60 text-muted-foreground transition-colors hover:text-accent"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
              <Cover p={open} />
              <div className="p-8">
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent">{open.category} · {open.year}</div>
                <h3 className="mt-2 text-3xl font-bold tracking-tight">{open.title}</h3>
                <p className="mt-4 text-muted-foreground">{open.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {open.tech.map((t) => (
                    <span key={t} className="rounded-full border border-border bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t}</span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  {open.live && (
                    <a href={open.live} target="_blank" rel="noopener noreferrer">
                      <GlassButton size="lg" contentClassName="flex items-center gap-2" className="px-8 text-white font-semibold" glassColor="oklch(from var(--accent) l c h / 20%)">
                        <ExternalLink className="size-3.5" /> Live Demo
                      </GlassButton>
                    </a>
                  )}
                  {open.repo && (
                    <a href={open.repo} target="_blank" rel="noopener noreferrer">
                      <GlassButton size="lg" contentClassName="flex items-center gap-2" className="px-8 text-white/80 font-medium" glassColor="oklch(from var(--foreground) l c h / 5%)">
                        <Github className="size-3.5" /> Source
                      </GlassButton>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

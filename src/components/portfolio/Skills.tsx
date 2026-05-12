import { motion } from "framer-motion";
import { useState, type MouseEvent } from "react";
import { Code2, Server, Smartphone } from "lucide-react";

type Skill = { name: string; level: number };
type Group = { id: string; label: string; icon: typeof Code2; items: Skill[] };

const GROUPS: Group[] = [
  { id: "languages", label: "Languages", icon: Code2, items: [
    { name: "PHP", level: 88 },
    { name: "JavaScript", level: 84 },
    { name: "Kotlin", level: 78 },
    { name: "SQL", level: 85 },
  ]},
  { id: "frontend", label: "Frontend", icon: Code2, items: [
    { name: "React", level: 82 },
    { name: "Tailwind CSS", level: 86 },
    { name: "Framer Motion", level: 75 },
    { name: "Mobile-style UI", level: 80 },
  ]},
  { id: "backend", label: "Backend", icon: Server, items: [
    { name: "Custom PHP APIs", level: 88 },
    { name: "MySQL Design", level: 85 },
    { name: "JWT Auth", level: 82 },
    { name: "REST APIs", level: 86 },
  ]},
  { id: "mobile", label: "Mobile", icon: Smartphone, items: [
    { name: "Android Studio", level: 78 },
    { name: "Kotlin (Native)", level: 75 },
    { name: "App Architecture", level: 72 },
    { name: "Navigation Systems", level: 76 },
  ]},
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const [t, setT] = useState({ rx: 0, ry: 0 });
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -y * 8, ry: x * 8 });
  };
  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => setT({ rx: 0, ry: 0 })}
      style={{ transform: `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`, transition: "transform 0.2s ease-out" }}
      className="h-full"
    >
      {children}
    </div>
  );
}

export function Skills() {
  const [active, setActive] = useState<Group["id"]>("frontend");
  const group = GROUPS.find((g) => g.id === active)!;

  return (
    <section id="skills" className="relative border-y border-border bg-black/30 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">// 02 — toolkit</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">My tech stack.</h2>
            <div className="mt-4 h-1 w-24 bg-accent" />
          </div>
          <div className="flex flex-wrap gap-2">
            {GROUPS.map((g) => {
              const Icon = g.icon;
              const on = g.id === active;
              return (
                <button
                  key={g.id}
                  onClick={() => setActive(g.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-all ${
                    on ? "border-accent bg-accent text-accent-foreground" : "border-border bg-white/5 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="size-3.5" />
                  {g.label}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {group.items.map((s, i) => (
            <TiltCard key={s.name}>
              <div className="glass relative h-full rounded-2xl p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-semibold">{s.name}</h3>
                  <span className="font-mono text-xs text-accent">{s.level}%</span>
                </div>
                <div className="mt-5 h-1 overflow-hidden rounded-full bg-border">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.level}%` }}
                    transition={{ duration: 1.1, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent/40 shadow-[0_0_12px_var(--color-accent)]"
                  />
                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

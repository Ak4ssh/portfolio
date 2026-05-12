import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
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
      className={className}
    >
      {children}
    </div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.floor(v).toString() + suffix);

  useEffect(() => {
    if (inView) {
      const c = animate(mv, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
      return c.stop;
    }
  }, [inView, mv, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const stats = [
  { label: "Projects Built", to: 5, suffix: "+" },
  { label: "Languages Used", to: 6, suffix: "" },
  { label: "Systems Designed", to: 10, suffix: "+" },
  { label: "Lines of Code", to: 50, suffix: "k+" },
];

const journey = [
  { year: "2025", title: "Scribe — Gaming Platform", body: "Built a full-stack casino gaming site with 3 in-house games, custom PHP + MySQL backend, JWT auth, and wallet logic." },
  { year: "2024", title: "Android Development", body: "Native Android apps using Kotlin + Android Studio. Custom navigation systems, Play/Wallet/Account screens." },
  { year: "2024", title: "Full-Stack Web Projects", body: "React frontends + PHP REST API backends with MySQL, session management, and admin dashboards." },
  { year: "2023", title: "BCA (Hons) @ Brainware University", body: "Started BCA program, began building real projects focusing on backend logic, database design, and frontend systems." },
];

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-32">
      <div className="mb-16 flex items-end justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">// 01 — origin</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Building real<br />products.</h2>
          <div className="mt-4 h-1 w-24 bg-accent" />
        </div>
        <p className="hidden max-w-md text-muted-foreground md:block">
          I'm a practical, project-driven developer who builds complete systems — from UI flow to backend logic and database control.
          I focus on real, working products, not just demos.
        </p>
      </div>

      <TiltCard>
        <div className="mb-24 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4 shadow-xl">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-background p-8"
            >
              <div className="font-mono text-4xl font-bold tracking-tighter text-accent md:text-5xl">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </TiltCard>

      {/* Timeline */}
      <div className="relative grid gap-16 md:grid-cols-[200px_1fr]">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">// trajectory</div>
        <ol className="relative border-l border-border pl-8">
          {journey.map((j, i) => (
            <motion.li
              key={j.year}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-12 last:mb-0"
            >
              <span className="absolute -left-[37px] top-2 grid size-4 place-items-center rounded-full border border-accent bg-background">
                <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
              </span>
              <div className="font-mono text-xs uppercase tracking-widest text-accent">{j.year}</div>
              <h3 className="mt-1 text-xl font-semibold">{j.title}</h3>
              <p className="mt-2 max-w-prose text-muted-foreground">{j.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

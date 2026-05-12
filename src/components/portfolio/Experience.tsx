import { motion } from "framer-motion";

const ITEMS = [
  { company: "Educationopedia", role: "Software Engineering Intern", period: "2024", logo: "ED", body: "Engineered robust features for the global study abroad platform and contributed to the modernization of the main application portal.", wins: ["Rebranded Hero Section", "Improved Platform SEO", "Enhanced Application Flow"] },
  { company: "Gameonix", role: "Intern", period: "2023", logo: "GO", body: "Worked closely with the development team on building interactive gaming interfaces and optimizing core platform logic.", wins: ["Developed interactive UI", "Optimized gaming logic", "Collaborated cross-functionally"] },
  { company: "Bharat Gaming News", role: "Developer", period: "2022", logo: "BG", body: "Developed and maintained web architecture for the Bharat Gaming News portal, focusing on performance and content delivery.", wins: ["Improved load times", "Refactored UI components", "Maintained content pipelines"] },
];

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 py-32">
      <div className="mb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">// 04 — trajectory</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Where I've operated.</h2>
        <div className="mt-4 h-1 w-24 bg-accent" />
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-border md:block" />
        <ol className="space-y-12">
          {ITEMS.map((it, i) => (
            <motion.li
              key={it.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid gap-6 md:grid-cols-[80px_1fr] md:gap-12"
            >
              <div className="relative z-10 flex md:block">
                <div className="grid size-16 place-items-center rounded-md border border-border bg-card font-mono text-sm font-bold text-accent shadow-[0_0_24px_-12px_var(--color-accent)]">
                  {it.logo}
                </div>
              </div>
              <div className="glass rounded-3xl p-8">
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{it.role}</h3>
                    <div className="mt-1 font-mono text-sm text-muted-foreground">@ {it.company}</div>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-accent">{it.period}</span>
                </div>
                <p className="mt-4 text-muted-foreground">{it.body}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                  {it.wins.map((w) => (
                    <li key={w} className="flex items-start gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-accent" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

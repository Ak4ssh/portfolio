import { useEffect, useRef, useState, type KeyboardEvent } from "react";

type Line = { kind: "in" | "out"; text: string };

const HELP = [
  "available commands:",
  "  about       — who I am",
  "  projects    — recent work",
  "  skills      — stack rundown",
  "  experience  — career trajectory",
  "  contact     — reach out",
  "  social      — links",
  "  whoami      — current session",
  "  clear       — reset terminal",
  "  help        — this menu",
];

const RESPONSES: Record<string, string[]> = {
  about: [
    "Akash Tiwari · full-stack developer & BCA student.",
    "Specialty: modern interfaces & high-performance systems.",
    "Currently building real systems and full-stack platforms.",
  ],
  projects: [
    "→ omnix-ai           (2024)  Multimodal AI infra",
    "→ scribe.bet         (2024)  Full-stack casino",
    "→ educationopedia    (2024)  Study abroad platform",
    "→ roomie-app         (2024)  Real estate application",
    "type 'open <name>' for details (or scroll up).",
  ],
  skills: [
    "frontend  · TS · React · WebGL · GSAP · Motion",
    "backend   · Node · Go · Postgres · GraphQL",
    "devops    · K8s · Terraform · AWS · Observability",
    "ai        · LLM tooling · pgvector · Agents",
  ],
  experience: [
    "2024  Educationopedia     · SWE Intern",
    "2023  Gameonix            · Intern",
    "2022  Bharat Gaming News  · Developer",
  ],
  contact: [
    "email   · hello@akashtiwari.com",
    "calendar· cal.com/akashtiwari/intro",
    "form    · scroll to #contact",
  ],
  social: [
    "github   · github.com/akashtiwari",
    "twitter  · @akashtiwari",
    "linkedin · linkedin.com/in/akashtiwari",
  ],
  whoami: ["guest@kinetic-core ~ session uid 0x9F2A · permissions: read"],
};

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "kinetic-bash · v3.0.1 — type 'help' to begin." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const next: Line[] = [...lines, { kind: "in", text: raw }];
    if (cmd === "") return setLines(next);
    if (cmd === "clear") return setLines([]);
    if (cmd === "help") {
      setLines([...next, ...HELP.map((t) => ({ kind: "out" as const, text: t }))]);
    } else if (cmd === "sudo make me a sandwich") {
      setLines([...next, { kind: "out", text: "// nice try, friend." }]);
    } else if (cmd === "matrix") {
      setLines([...next, { kind: "out", text: "wake up, neo… (easter egg unlocked)" }]);
    } else if (RESPONSES[cmd]) {
      setLines([...next, ...RESPONSES[cmd].map((t) => ({ kind: "out" as const, text: t }))]);
    } else {
      setLines([...next, { kind: "out", text: `command not found: ${cmd} — try 'help'` }]);
    }
    setHistory((h) => [raw, ...h].slice(0, 20));
    setHi(-1);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { run(input); setInput(""); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.min(history.length - 1, hi + 1);
      setHi(n); if (history[n]) setInput(history[n]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = Math.max(-1, hi - 1);
      setHi(n); setInput(n === -1 ? "" : history[n] || "");
    }
  };

  return (
    <section id="terminal" className="mx-auto max-w-5xl px-6 py-32">
      <div className="mb-10 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">// 06 — interactive shell</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Talk to the machine.</h2>
        <p className="mt-3 font-mono text-sm text-muted-foreground">type 'help' or try: about, projects, skills, contact, matrix.</p>
      </div>

      <div
        onClick={() => inputRef.current?.focus()}
        className="overflow-hidden rounded-md border border-border bg-black/60 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border bg-zinc-900/70 px-4 py-2">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-zinc-700" />
            <div className="size-2.5 rounded-full bg-zinc-700" />
            <div className="size-2.5 rounded-full bg-zinc-700" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            terminal — guest@kinetic-core
          </span>
          <span className="size-2.5" />
        </div>
        <div ref={scrollRef} className="h-80 overflow-y-auto p-6 font-mono text-sm leading-relaxed no-scrollbar">
          {lines.map((l, i) => (
            <div key={i} className={l.kind === "in" ? "flex gap-2 text-accent" : "text-muted-foreground"}>
              {l.kind === "in" ? (
                <>
                  <span>➜</span><span>~</span><span className="text-foreground">{l.text}</span>
                </>
              ) : (
                <span className="whitespace-pre">{l.text}</span>
              )}
            </div>
          ))}
          <div className="flex items-center gap-2 text-accent">
            <span>➜</span><span>~</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              spellCheck={false}
              className="flex-1 bg-transparent text-foreground caret-accent focus:outline-none"
              aria-label="terminal input"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

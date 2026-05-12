import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { ParticleField } from "./ParticleField";
import { ArrowDown, Github, Instagram, Send } from "lucide-react";

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

const AbstractGeometry = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden" style={{ perspective: "1000px" }}>
      <motion.div
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="relative w-full max-w-[600px] aspect-square opacity-40"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 rounded-full border border-accent/30" style={{ transform: "rotateX(75deg)" }} />
        <div className="absolute inset-0 rounded-full border border-accent/30" style={{ transform: "rotateY(75deg)" }} />
        <div className="absolute inset-0 rounded-full border border-accent/30" style={{ transform: "rotateZ(75deg)" }} />
        <div className="absolute inset-16 rounded-full border border-accent/20" style={{ transform: "rotateX(45deg) rotateY(45deg)" }} />
        <div className="absolute inset-16 rounded-full border border-accent/20" style={{ transform: "rotateX(-45deg) rotateY(-45deg)" }} />
      </motion.div>
    </div>
  );
};

const TYPED = [
  "full-stack developer",
  "mobile app builder",
  "backend systems engineer",
  "BCA student @ Brainware",
];

function useTypewriter(words: string[]) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDel(true), 1400);
      } else {
        const next = word.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (next === "") { setDel(false); setI(i + 1); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i, words]);

  return text;
}

export function Hero() {
  const typed = useTypewriter(TYPED);

  return (
    <section id="top" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0">
        <ParticleField />
      </div>
      <AbstractGeometry />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 animate-glow-pulse" />

      <TiltCard className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >

          <h1 className="text-balance text-5xl font-extrabold leading-[0.92] tracking-tighter sm:text-7xl md:text-[8rem]">
            BUILDING
            <br />
            <span className="text-gradient-accent">REAL SYSTEMS</span>
          </h1>

          <p className="mx-auto mt-8 max-w-[52ch] text-pretty text-lg text-muted-foreground">
            I'm <span className="text-foreground">Akash Tiwari</span> — a{" "}
            <span className="font-mono text-accent">{typed}<span className="ml-0.5 inline-block h-5 w-[2px] -translate-y-0.5 bg-accent align-middle animate-blink" /></span>
            <br />
            building complete products from UI flow to backend logic and database control.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <a href="#projects">
              <LiquidButton size="lg">
                View Projects
              </LiquidButton>
            </a>
            <a href="#contact">
              <LiquidButton size="lg" variant="default" className="border border-border/50 text-muted-foreground hover:text-foreground">
                Get In Touch
              </LiquidButton>
            </a>
          </div>

          <div className="mt-14 flex items-center justify-center gap-6 text-muted-foreground">
            <a href="https://github.com/ak4ssh" target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full border border-border transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_24px_-6px_var(--color-accent)]">
              <Github className="size-4" />
            </a>
            <a href="https://instagram.com/ak4shverse" target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full border border-border transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_24px_-6px_var(--color-accent)]">
              <Instagram className="size-4" />
            </a>
            <a href="https://t.me/ak4ssh" target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full border border-border transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_24px_-6px_var(--color-accent)]">
              <Send className="size-4" />
            </a>
          </div>
        </motion.div>
      </TiltCard>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">scroll</span>
        <ArrowDown className="size-3 animate-bounce" />
      </motion.div>
    </section>
  );
}

import { Github, Instagram, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="size-2 animate-pulse rounded-full bg-accent" />
              AKASH_TIWARI_v1.0
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Building real, working systems — from UI flow to backend logic and database control. Practical. Project-driven.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            <Col title="Navigate" links={[
              { label: "About", href: "#about" },
              { label: "Projects", href: "#projects" },
              { label: "Experience", href: "#experience" },
              { label: "Terminal", href: "#terminal" },
              { label: "Contact", href: "#contact" },
            ]} />
            <Col title="Connect" links={[
              { label: "GitHub", href: "https://github.com/ak4ssh" },
              { label: "Instagram", href: "https://instagram.com/ak4shverse" },
              { label: "Telegram", href: "https://t.me/ak4ssh" },
            ]} />
            <Col title="Channels" links={[
              { label: "About", href: "#about" },
              { label: "Projects", href: "#projects" },
              { label: "Contact", href: "#contact" },
            ]} />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground md:flex-row">
          <span>© 2025 Akash Tiwari · all rights reserved</span>
          <div className="flex items-center gap-5">
            <a href="https://github.com/ak4ssh" target="_blank" rel="noopener noreferrer" className="hover:text-accent"><Github className="size-4" /></a>
            <a href="https://instagram.com/ak4shverse" target="_blank" rel="noopener noreferrer" className="hover:text-accent"><Instagram className="size-4" /></a>
            <a href="https://t.me/ak4ssh" target="_blank" rel="noopener noreferrer" className="hover:text-accent"><Send className="size-4" /></a>
          </div>
          <span>latency · 14ms</span>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">{title}</div>
      <ul className="space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.label}><a href={l.href} className="text-muted-foreground transition-colors hover:text-foreground">{l.label}</a></li>
        ))}
      </ul>
    </div>
  );
}

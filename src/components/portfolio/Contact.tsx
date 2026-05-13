import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { Send } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-3xl px-6 py-32 text-center">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">// 09 — open channel</p>
        <h2 className="mt-3 text-5xl font-bold tracking-tight md:text-6xl">
          Let's build<br />something <span className="text-gradient-accent">unforgettable.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-prose text-muted-foreground">
          I'm available for engineering contracts, technical leadership engagements, and one-off cinematic launches.
          Reach out directly via my socials.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 font-mono text-sm">
          <div><span className="text-muted-foreground">telegram ·</span> <a href="https://t.me/ak4ssh" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">@ak4ssh</a></div>
          <div><span className="text-muted-foreground">github  ·</span> <a href="https://github.com/ak4ssh" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">ak4ssh</a></div>
          <div><span className="text-muted-foreground">insta   ·</span> <a href="https://instagram.com/ak4shverse" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">@ak4shverse</a></div>
          <div><span className="text-muted-foreground">based   ·</span> India</div>
          <div><span className="text-muted-foreground">status  ·</span> <span className="text-accent">open to work</span></div>
        </div>

        <div className="mt-12 flex justify-center">
          <a href="https://t.me/ak4ssh" target="_blank" rel="noopener noreferrer">
            <GlassButton size="lg" contentClassName="flex items-center gap-2" className="px-8">
              <Send className="size-4" /> Message on Telegram
            </GlassButton>
          </a>
        </div>
      </div>
    </section>
  );
}

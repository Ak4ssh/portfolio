import { motion } from "framer-motion";
import { SmokeBackground } from "@/components/ui/spooky-smoke-animation";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { Github, Instagram, Send } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative w-full h-screen overflow-hidden bg-black">
      {/* Spooky Smoke Animation Background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <SmokeBackground smokeColor="#FF0000" />
      </div>

      {/* Dark overlay to increase text contrast */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)'
        }}
      />

      {/* Hero Content Layer */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-2">

          {/* Custom Title - Responsive Scaling */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-bold text-[16vw] sm:text-[14vw] md:text-[9rem] leading-[0.8] tracking-tighter uppercase text-white select-none" style={{ fontFamily: "'Fira Code', monospace" }}>
              AKASH
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-bold text-[16vw] sm:text-[14vw] md:text-[9rem] leading-[0.8] tracking-tighter uppercase text-white select-none" style={{ fontFamily: "'Fira Code', monospace" }}>
              TIWARI
            </h1>
          </motion.div>

          {/* Subtitle Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-6 max-w-3xl mx-auto"
          >
            <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed tracking-wide px-6" style={{ fontFamily: "'Antic', sans-serif" }}>
              BUILDING COMPLETE PRODUCTS FROM UI FLOW TO BACKEND LOGIC AND DATABASE CONTROL
            </p>
          </motion.div>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 pt-2"
          >
            <GlassButton
              size="lg"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="w-48 sm:w-auto px-8 text-white font-bold tracking-wide"
              glassColor="oklch(from var(--foreground) l c h / 12%)"
            >
              View Projects
            </GlassButton>

            <GlassButton
              size="lg"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="w-48 sm:w-auto px-8 text-white/75 font-medium tracking-wide"
              glassColor="oklch(from var(--foreground) l c h / 4%)"
            >
              Get In Touch
            </GlassButton>
          </motion.div>

        </div>
      </div>

      {/* Floating Social Overlay at Absolute Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-6 text-white/60"
      >
        <a href="https://github.com/ak4ssh" target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full border border-white/10 bg-neutral-900/20 backdrop-blur-md transition-all hover:border-white/40 hover:text-white hover:scale-110">
          <Github className="size-4" />
        </a>
        <a href="https://instagram.com/ak4shverse" target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full border border-white/10 bg-neutral-900/20 backdrop-blur-md transition-all hover:border-white/40 hover:text-white hover:scale-110">
          <Instagram className="size-4" />
        </a>
        <a href="https://t.me/ak4ssh" target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full border border-white/10 bg-neutral-900/20 backdrop-blur-md transition-all hover:border-white/40 hover:text-white hover:scale-110">
          <Send className="size-4" />
        </a>
      </motion.div>
    </section>
  );
}

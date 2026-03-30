import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import headshot from "@/assets/headshot.png";

const ease = [0.16, 1, 0.3, 1] as const;

/** Served from `public/Harsh Shrishrimal - Resume.pdf`. */
const RESUME_HREF = "/Harsh%20Shrishrimal%20-%20Resume.pdf";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center px-6 md:px-12 lg:px-16 py-[10vh] overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.16),_transparent_55%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_center,_#fff_1px,_transparent_0)] bg-[length:80px_80px]" />

      <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col items-center gap-4"
        >
          <div className="h-40 w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 rounded-full overflow-hidden border border-border/80 shadow-[0_22px_60px_rgba(0,0,0,0.6)] bg-gradient-to-tr from-background via-background to-accent/15">
            <img src={headshot} alt="Harsh Shrishrimal" className="h-full w-full object-cover" />
          </div>

          <div className="flex items-center gap-2 mt-6">
            <span className="w-2 h-2 rounded-full bg-status-available animate-pulse-dot" />
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Available for opportunities
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-foreground leading-[0.9]"
        >
          Harsh
          <br />
          Shrishrimal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          className="max-w-xl text-base md:text-lg text-muted-foreground prose-body"
        >
          Data Science graduate student building AI-powered solutions, ML models, and scalable systems at the
          intersection of research and engineering.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="#contact"
            className="px-6 py-3 bg-accent text-accent-foreground font-medium rounded-sm text-sm tracking-wide hover:opacity-90 transition-opacity duration-200"
          >
            Get in Touch
          </a>
          <a
            href={RESUME_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-border text-foreground font-medium rounded-sm text-sm tracking-wide hover:bg-secondary transition-colors duration-200"
          >
            Download Resume
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="pointer-events-none absolute bottom-8 right-6 md:right-16 lg:right-24 flex items-center gap-2"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Scroll to explore
        </span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
};

export default HeroSection;


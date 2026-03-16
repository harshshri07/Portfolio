import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import headshot from "@/assets/headshot.png";

const ease = [0.16, 1, 0.3, 1] as const;

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-16 lg:px-24 py-[20vh]">
      <div className="max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-border">
            <img src={headshot} alt="Harsh Shrishrimal" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-status-available animate-pulse-dot" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Available for opportunities
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-foreground leading-[0.95]"
        >
          Harsh
          <br />
          Shrishrimal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          className="mt-8 text-lg md:text-xl text-muted-foreground prose-body"
        >
          Data Science graduate student building AI-powered solutions, ML models, and scalable systems at the intersection of research and engineering.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#contact"
            className="px-6 py-3 bg-accent text-accent-foreground font-medium rounded-sm text-sm tracking-wide hover:opacity-90 transition-opacity duration-200"
          >
            Get in Touch
          </a>
          <a
            href="https://harshshri07.github.io/Harsh%20Shrishrimal%20Resume.pdf"
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
        className="absolute bottom-8 right-6 md:right-16 lg:right-24 flex items-center gap-2"
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

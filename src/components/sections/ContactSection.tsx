import { motion } from "framer-motion";
import { Phone, Linkedin, Github } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const ContactSection = () => {
  return (
    <section id="contact" className="px-6 md:px-16 lg:px-24 py-[16vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease }}
        className="max-w-3xl"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Next Step</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mt-4">Let's work together</h2>

        <a
          href="mailto:shrishrimal38@gmail.com"
          className="inline-block mt-8 text-xl md:text-2xl text-accent hover:opacity-80 transition-opacity duration-200 break-all"
        >
          shrishrimal38@gmail.com
        </a>

        <div className="mt-12 flex flex-wrap gap-8">
          <a
            href="tel:2404136360"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Phone className="w-4 h-4" strokeWidth={1.5} />
            (240) 413-6360
          </a>
          <a
            href="https://linkedin.com/in/harsh-shrishrimal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Linkedin className="w-4 h-4" strokeWidth={1.5} />
            LinkedIn
          </a>
          <a
            href="https://github.com/harshshri07"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Github className="w-4 h-4" strokeWidth={1.5} />
            GitHub
          </a>
        </div>
      </motion.div>

      <div className="mt-24 pt-8 border-t border-border">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Harsh Shrishrimal. Built with precision.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;


import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const PublicationsSection = () => {
  return (
    <section id="publications" className="px-6 md:px-16 lg:px-24 py-[12vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease }}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Publications</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        className="mt-12 border border-border rounded-sm p-6 md:p-8"
      >
        <div className="flex items-start gap-4">
          <FileText className="w-5 h-5 text-accent mt-1 shrink-0" strokeWidth={1.5} />
          <div>
            <h3 className="text-lg md:text-xl font-medium text-foreground">
              Review on Handwritten Character Recognition
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              International Journal of Innovative Research in Computer and Communication Engineering (IJIRCCE)
            </p>
            <div className="flex flex-wrap gap-4 mt-3">
              <span className="font-mono text-xs text-muted-foreground">Vol. 11, Issue 3, March 2023</span>
              <span className="font-mono text-xs text-accent">DOI: 10.15680/IJIRCCE.2023.1103081</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PublicationsSection;

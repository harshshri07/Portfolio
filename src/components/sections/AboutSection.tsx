import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const AboutSection = () => {
  return (
    <section id="about" className="px-6 md:px-16 lg:px-24 py-[12vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease }}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">About</span>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mt-4">
          Building at the intersection of AI and engineering
        </h2>
        <p className="mt-6 text-muted-foreground prose-body text-base md:text-lg">
          I'm a Data Science graduate from the University of Maryland, College Park. I build AI agents, RAG systems, and
          production ML pipelines that move from raw data to something people can actually use.
        </p>
        <p className="mt-4 text-muted-foreground prose-body text-base md:text-lg">
          I've shipped multi-agent systems at Cloudforce and Mercor, hardened LLM chatbots against prompt injection at
          Converge, and built forecasting and recommendation systems at Shanti Technologies. Always focused on
          production-quality work, not just demos.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutSection;

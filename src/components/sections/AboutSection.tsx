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
          I'm a Data Science graduate student at the University of Maryland, College Park, with a strong foundation in
          Machine Learning, AI, and software development. I specialize in building AI-powered solutions, developing ML
          models, and creating innovative applications that solve real-world problems.
        </p>
        <p className="mt-4 text-muted-foreground prose-body text-base md:text-lg">
          With experience at Converge Technology Solutions and Shanti Technologies, I've worked on LLM security, dynamic
          pricing algorithms, and recommendation systems — always focused on shipping production-quality work.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutSection;


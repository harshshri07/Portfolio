import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const skillGroups = [
  {
    title: "Languages",
    skills: ["Python", "R", "SQL", "C++", "JavaScript", "Java", "HTML"],
  },
  {
    title: "Data & ML",
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "Tableau", "TensorFlow", "PyTorch", "OpenCV", "Scikit-learn", "DSPy"],
  },
  {
    title: "AI & Web",
    skills: ["NLP", "LLMs", "Reinforcement Learning", "Generative AI", "RecSys", "Django", "Flask", "Celery", "REST APIs", "WebSockets", "Flutter"],
  },
  {
    title: "Cloud & Tools",
    skills: ["Google Cloud", "BigQuery", "AWS", "Apache Airflow", "Hadoop", "Spark", "Docker", "Git", "Jupyter"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="px-6 md:px-16 lg:px-24 py-[12vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease }}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Skills</span>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mt-4">Technologies I've shipped with</h2>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {skillGroups.map((group, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: i * 0.05, ease }}
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">{group.title}</h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-xs px-3 py-1.5 rounded-sm border border-border text-muted-foreground hover:text-foreground hover:border-accent/30 transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;

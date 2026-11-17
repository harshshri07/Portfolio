import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const skillGroups = [
  {
    title: "Languages & Databases",
    skills: ["Python", "SQL", "TypeScript", "JavaScript", "R", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    title: "Machine Learning",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "XGBoost",
      "Transformers",
      "Computer Vision",
      "NLP",
      "Time-Series Forecasting",
    ],
  },
  {
    title: "LLMs & Agents",
    skills: [
      "LangGraph",
      "LangChain",
      "RAG",
      "MCP",
      "DSPy",
      "Prompt Engineering",
      "LLM Evaluation",
      "pgvector",
      "Pinecone",
    ],
  },
  {
    title: "MLOps & Cloud",
    skills: [
      "MLflow",
      "Docker",
      "CI/CD",
      "GitHub Actions",
      "Apache Airflow",
      "FastAPI",
      "AWS Bedrock",
      "Azure",
      "GCP",
    ],
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

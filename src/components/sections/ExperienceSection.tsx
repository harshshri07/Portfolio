import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const experiences = [
  {
    title: "AI Trainer, Writer (Project Odin)",
    company: "Mercor",
    location: "Remote",
    date: "Oct 2026 - Present",
    bullets: [
      "Build expert demonstrations that train frontier AI agents to complete real data analysis work, from raw files to final deliverable",
      "Design realistic analysis tasks and datasets, then model the full expert reasoning behind each decision",
      "Pass each demonstration through multi-stage expert review before it is accepted as training data for AI systems",
    ],
    tech: ["AI Training Data", "AI Agents", "Data Analysis"],
  },
  {
    title: "AI Solutions Intern",
    company: "Cloudforce",
    location: "Oxon Hill, MD",
    date: "Jul 2026 - Oct 2026",
    bullets: [
      "Cut token usage by 50% (165K to 82K) by redesigning a single agent into an orchestrator with 3 MCP-backed sub-agents",
      "Built a knowledgebase agent and its Confluence MCP server, then trained all Cloudforce employees on it, cutting search time",
      "Created a Model Health Insights agent and MCP server that scores 5 weighted health factors from live data in a dashboard",
    ],
    tech: ["Python", "MCP", "Multi-Agent Systems", "nebulaONE", "Azure"],
  },
  {
    title: "Artificial Intelligence Intern",
    company: "Converge Technology Solutions",
    location: "New York, NY",
    date: "Jun 2025 - Aug 2025",
    bullets: [
      "Tuned prompts with DSPy across 4 LLMs (GPT, Mistral, LLaMA, Qwen) to harden enterprise chatbots against prompt injection, raising vulnerability detection precision by 30%",
      "Ran 150+ adversarial test scenarios to find where the 4 models hallucinate or fail, with schema-validated outputs",
      "Packaged the evaluation pipeline in Docker with MLflow tracking and CI/CD, cutting manual evaluation overhead by 20%",
    ],
    tech: ["Python", "DSPy", "LLMs", "MLflow", "Docker", "CI/CD"],
  },
  {
    title: "Machine Learning Engineer",
    company: "Shanti Technologies",
    location: "Pune, India",
    date: "Jul 2023 - Jun 2024",
    bullets: [
      "Trained TensorFlow and PyTorch demand forecasting models with seasonality and holiday features, cutting inventory stockouts by 18%",
      "Scaled Airflow and GCP ETL pipelines to 2M+ daily records within a 25-minute SLA, powering real-time demand analytics",
      "Deployed recommendation models through FastAPI with automated retraining, lifting loyalty engagement by 15%",
    ],
    tech: ["Python", "TensorFlow", "PyTorch", "Apache Airflow", "GCP", "FastAPI"],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="px-6 md:px-16 lg:px-24 py-[12vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease }}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Experience</span>
      </motion.div>

      <div className="mt-12 space-y-16">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease }}
            className="grid grid-cols-12 gap-4 md:gap-8"
          >
            <div className="col-span-12 md:col-span-3">
              <span className="font-mono text-xs text-muted-foreground">{exp.date}</span>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h3 className="text-xl md:text-2xl font-medium text-foreground">{exp.title}</h3>
              <p className="text-accent text-sm mt-1">
                {exp.company} · {exp.location}
              </p>
              <ul className="mt-4 space-y-2">
                {exp.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="text-muted-foreground text-sm leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-px before:bg-muted-foreground/50"
                  >
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                {exp.tech.map((t) => (
                  <span key={t} className="font-mono text-xs px-2 py-1 rounded-sm bg-secondary text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;

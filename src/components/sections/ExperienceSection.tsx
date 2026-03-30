import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const experiences = [
  {
    title: "Artificial Intelligence Intern",
    company: "Converge Technology Solutions",
    location: "New York, NY (Remote)",
    date: "Jun 2025 - Aug 2025",
    bullets: [
      "Developed OWASP-based AI pentesting modules using Django, Celery, and DSPy to detect LLM vulnerabilities",
      "Integrated shared memory context and MIPROv2 optimizer, boosting injection accuracy to a 4.5/5 success grade",
      "Enhanced UI and built auto-stop attack flow using WebSockets, reducing manual testing time",
    ],
    tech: ["Django", "Celery", "DSPy", "WebSockets", "Docker"],
  },
  {
    title: "Machine Learning Engineer",
    company: "Shanti Technologies",
    location: "Pune, India",
    date: "Jul 2023 - Jun 2024",
    bullets: [
      "Trained TensorFlow models on historical sales data to minimize stockouts for perishable goods",
      "Developed dynamic pricing algorithms integrating seasonal and behavioral logic via custom APIs",
      "Designed ETL pipelines with Apache Airflow and Google Cloud Functions for automated data flow",
    ],
    tech: ["TensorFlow", "Python", "Apache Airflow", "Google Cloud", "ETL"],
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


import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

const projects = [
  {
    title: "Bitcoin News Keyword Trend Analysis",
    category: "NLP / Data Analysis",
    description: "Built an NLP pipeline using TextBlob and NewsAPI to match news keywords with CoinGecko price data. Ran Granger causality tests to analyze keyword-price relationships and deployed an interactive dashboard.",
    tech: ["Python", "TextBlob", "NewsAPI", "Pandas", "Docker", "Matplotlib"],
    github: "https://github.com/harshshri07",
    colStart: "md:col-start-1",
    colSpan: "md:col-span-8",
  },
  {
    title: "AI-Powered Stock Trading Bot",
    category: "Reinforcement Learning",
    description: "Trained a DQN agent in TensorFlow on market indicators (EMA, MACD) to optimize trade entry and exit. Simulated live trading with custom backtesting and integrated REST APIs for real-time data.",
    tech: ["TensorFlow", "DQN", "NumPy", "REST APIs", "Backtesting"],
    github: "https://github.com/harshshri07",
    colStart: "md:col-start-5",
    colSpan: "md:col-span-8",
  },
  {
    title: "Handwritten Character Recognition",
    category: "Mobile / Computer Vision",
    description: "Built a mobile OCR app using Flutter and Google ML Kit to recognize handwritten characters in real time. Applied OpenCV techniques for preprocessing and optimized for on-device inference.",
    tech: ["Flutter", "Google ML Kit", "OpenCV", "Android Studio"],
    github: "https://github.com/harshshri07",
    colStart: "md:col-start-1",
    colSpan: "md:col-span-8",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="px-6 md:px-16 lg:px-24 py-[12vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease }}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Projects</span>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mt-4">Selected Work</h2>
      </motion.div>

      <div className="mt-16 space-y-24">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease }}
            className={`grid grid-cols-12 gap-4`}
          >
            <div className={`col-span-12 ${project.colStart} ${project.colSpan}`}>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">{project.category}</span>
              <h3 className="text-2xl md:text-3xl font-medium text-foreground mt-3">{project.title}</h3>
              <p className="text-muted-foreground mt-4 prose-body text-sm md:text-base">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tech.map((t) => (
                  <span key={t} className="font-mono text-xs px-2 py-1 rounded-sm bg-secondary text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-6">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Github className="w-4 h-4" strokeWidth={1.5} />
                  View Code
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;

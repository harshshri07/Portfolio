import { motion } from "framer-motion";
import { Github } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const projects = [
  {
    title: "AI Hedge Fund – Multi-Agent Stock Analysis Platform",
    category: "LLMs · Multi‑Agent Systems",
    description:
      "Built a LangGraph-based multi-agent system with five specialized AI agents that analyze equities, surface risks, and generate structured trade signals with confidence scores and position sizing.",
    tech: ["LangGraph", "RAG", "ChromaDB", "Python", "Google Gemini", "OpenAI"],
    github: "https://github.com/harshshri07/ai-hedge-fund",
  },
  {
    title: "MedTeller – Vision‑Language Radiology Report Generator",
    category: "Vision · NLP · Healthcare",
    description:
      "Architected a multimodal pipeline combining Vision Transformers and GPT‑2 in PyTorch to generate structured radiology reports from 7.4K chest X‑rays, with custom preprocessing and attention tuning to improve clinical coherence.",
    tech: ["PyTorch", "Vision Transformer", "GPT‑2", "Python", "Pandas"],
    github: "https://github.com/harshshri07/MedTeller",
    demo: "https://medteller.streamlit.app/",
  },
  {
    title: "CAFB AI Document Generator",
    category: "RAG · Vector Search",
    description:
      "Built a Retrieval‑Augmented Generation system using CLIP embeddings and Pinecone vector search to generate grounded documents from large corpora, achieving over 90% semantic retrieval accuracy.",
    tech: ["CLIP", "Pinecone", "RAG", "Python", "FastAPI"],
    github: "https://github.com/harshshri07/CAFB_AI",
  },
  {
    title: "Career Shield – Fake Job Posting Detector",
    category: "NLP · Applied ML",
    description:
      "NLP-based fraud detection system that detects fake job postings using a fine‑tuned DistilBERT classifier, rule-based scam patterns, and impossible requirements checks, reaching 98% accuracy on an 18K‑sample dataset.",
    tech: ["DistilBERT", "PyTorch", "Transformers", "Streamlit", "scikit‑learn"],
    github: "https://github.com/harshshri07/career-shield",
    demo: "https://career-shield.streamlit.app/",
  },
  {
    title: "UMBC Student Success Dashboard",
    category: "Graphs · ML · Generative AI",
    description:
      "AI-powered academic advisory platform built for UMBC Hackathon that uses a Neo4j graph database, ML risk models, and a FastAPI backend to provide personalized course recommendations, risk assessment, and mentorship matching for students.",
    tech: ["Neo4j", "FastAPI", "Python", "LightGBM", "Google Generative AI"],
    github: "https://github.com/Info-stats-ai/UMBC_Hack_DoIT",
  },
  {
    title: "TerpTracker – Personal Finance Dashboard",
    category: "Cloud · Full‑Stack",
    description:
      "AWS-hosted Flask web app that lets users track expenses with DynamoDB-backed storage, monthly summaries, and interactive visualizations, including secure auth and Dockerized local development.",
    tech: ["Flask", "AWS DynamoDB", "Docker", "Python", "HTML"],
    github: "https://github.com/harshshri07/TerpTracker",
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
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mt-4">Featured AI & ML Projects</h2>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((project, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease }}
            className="h-full border border-border rounded-sm p-6 flex flex-col justify-between hover:border-accent/40 hover:bg-secondary/10 transition-colors duration-200"
          >
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                {project.category}
              </span>
              <h3 className="text-xl md:text-2xl font-medium text-foreground mt-3">{project.title}</h3>
              <p className="text-muted-foreground mt-4 prose-body text-sm md:text-[15px]">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] px-2 py-1 rounded-sm bg-secondary text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {"demo" in project && project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-medium rounded-sm bg-accent text-accent-foreground hover:opacity-90 transition-opacity duration-200"
                >
                  Live Demo
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Github className="w-4 h-4" strokeWidth={1.5} />
                GitHub Repo
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;


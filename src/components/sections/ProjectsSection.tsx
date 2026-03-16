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
    colStart: "md:col-start-1",
    colSpan: "md:col-span-8",
  },
  {
    title: "MedTeller – Vision‑Language Radiology Report Generator",
    category: "Vision · NLP · Healthcare",
    description:
      "Architected a multimodal pipeline combining Vision Transformers and GPT‑2 in PyTorch to generate structured radiology reports from 7.4K chest X‑rays, with custom preprocessing and attention tuning to improve clinical coherence.",
    tech: ["PyTorch", "Vision Transformer", "GPT‑2", "Python", "Pandas"],
    github: "https://github.com/harshshri07/MedTeller",
    colStart: "md:col-start-5",
    colSpan: "md:col-span-8",
  },
  {
    title: "CAFB AI Document Generator",
    category: "RAG · Vector Search",
    description:
      "Built a Retrieval‑Augmented Generation system using CLIP embeddings and Pinecone vector search to generate grounded documents from large corpora, achieving over 90% semantic retrieval accuracy.",
    tech: ["CLIP", "Pinecone", "RAG", "Python", "FastAPI"],
    github: "https://github.com/harshshri07/CAFB_AI",
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
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mt-4">Featured AI & ML Projects</h2>
      </motion.div>

      <div className="mt-16 space-y-24">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease }}
            className="grid grid-cols-12 gap-4"
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


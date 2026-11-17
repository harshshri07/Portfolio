/**
 * Source of truth for the portfolio chatbot.
 * Structured into tagged sections for relevance-based retrieval.
 * Keep in sync with resume & site.
 */

export interface KnowledgeSection {
  id: string;
  keywords: string[];
  alwaysInclude?: boolean;
  content: string;
}

export const KNOWLEDGE_SECTIONS: KnowledgeSection[] = [
  {
    id: "identity",
    alwaysInclude: true,
    keywords: [],
    content: `## Identity
- Full name: Harsh Shrishrimal
- Location: College Park / DC-Maryland area, USA
- Email: shrishrimal38@gmail.com
- Phone: +1 (240) 413-6360
- LinkedIn: linkedin.com/in/harsh-shrishrimal
- GitHub: github.com/harshshri07
- Website: harsh-shrishrimal.com
- Role: Data Science graduate (MS, University of Maryland, May 2026). Builds AI agents, RAG systems, multi-agent apps, and production ML pipelines.
- Spoken languages: English, Hindi, and Marathi - fluent.`,
  },

  {
    id: "education",
    keywords: [
      "education", "degree", "university", "college", "gpa", "grade", "course", "coursework",
      "study", "studying", "school", "master", "bachelor", "ms", "be", "umd", "maryland",
      "pune", "graduate", "graduation", "academic", "cgpa", "transcript",
    ],
    content: `## Education
- Master of Science in Data Science, University of Maryland, College Park - August 2024 to May 2026. GPA 3.81/4.0.
  - Master's courses: Principles of Data Science, Principles of Machine Learning, Deep Learning, Big Data Systems, Natural Language Processing, Algorithms for Data Science, Data Representation, Computer Vision, Probability & Statistics, Cloud Computing.
- Bachelor of Engineering in Computer Science, Savitribai Phule Pune University, India - August 2019 to June 2023. GPA 3.2/4.0.
  - Bachelor's highlights: Database Management Systems, Business Intelligence, Data Science and Big Data, Artificial Intelligence, Data Structures and Algorithms, Software Engineering, Software Testing and Quality Assurance.
- If someone asks for a full course list, say Harsh can provide a transcript on request.`,
  },

  {
    id: "experience",
    keywords: [
      "experience", "work", "job", "internship", "intern", "company", "role", "position",
      "mercor", "odin", "cloudforce", "converge", "shanti", "llm", "security", "prompt",
      "injection", "forecasting", "mcp", "agent", "nebula", "confluence", "azure",
      "dspy", "mlflow", "airflow", "etl", "recommendation", "pricing", "celery", "django",
    ],
    content: `## Experience
### Mercor - AI Trainer, Writer (Project Odin) (Oct 2026 - Present), Remote
- Build expert demonstrations that train frontier AI agents to complete real data analysis work, from raw files to final deliverable.
- Design realistic analysis tasks and datasets, then model the full expert reasoning behind each decision.
- Pass each demonstration through multi-stage expert review before it is accepted as training data for AI systems.

### Cloudforce - AI Solutions Intern (Jul 2026 - Oct 2026), Oxon Hill, MD
- Cut token usage by 50% (165K to 82K) by redesigning a single agent into an orchestrator with 3 MCP-backed sub-agents.
- Built a knowledgebase agent and its Confluence MCP server, then trained all Cloudforce employees on it, cutting search time.
- Created a Model Health Insights agent and MCP server that scores 5 weighted health factors from live data in a dashboard.
- Stack: Python, MCP, Multi-Agent Systems, nebulaONE, Confluence, Azure.

### Converge Technology Solutions - Artificial Intelligence Intern (Jun 2025 - Aug 2025), New York, NY
- Tuned prompts with DSPy across 4 LLMs (GPT, Mistral, LLaMA, Qwen) to harden enterprise chatbots against prompt injection, raising vulnerability detection precision by 30%.
- Ran 150+ adversarial test scenarios to find where the 4 models hallucinate or fail, with schema-validated outputs.
- Packaged the evaluation pipeline in Docker with MLflow tracking and CI/CD, cutting manual evaluation overhead by 20%.
- Also used Django, Celery, Redis, WebSockets, and Flower in the security testing stack.
- Context: the team initially used an internal chatbot (Gandalf) for automated testing; when API access was revoked, they pivoted to Converge's ConverseAI product and revalidated the full pipeline.

### Shanti Technologies - Machine Learning Engineer (Jul 2023 - Jun 2024), Pune, India
- Trained TensorFlow and PyTorch demand forecasting models with seasonality and holiday features, cutting inventory stockouts by 18%.
- Scaled Airflow and GCP ETL pipelines to 2M+ daily records within a 25-minute SLA.
- Deployed recommendation models through FastAPI with automated retraining, lifting loyalty engagement by 15%.
- Also built dynamic pricing via Flask APIs (about +10% campaign revenue) and collaborative filtering recommenders with Scikit-learn / TensorFlow.`,
  },

  {
    id: "projects",
    keywords: [
      "project", "projects", "built", "build", "demo", "github", "repo", "showcase",
      "lecturemate", "lecture mate", "pharma", "cargo", "medteller", "nourishnet",
      "nourish", "hedge fund", "cafb", "career shield", "terptracker", "umbc",
      "langgraph", "rag", "supabase", "pgvector", "bedrock", "azure", "foundry",
      "telemetry", "radiology", "etl", "multi-agent", "multiagent", "chromadb",
      "pinecone", "distilbert", "dynamodb", "flask", "streamlit",
    ],
    content: `## Featured Projects
1. LectureMate AI - Production study assistant (Next.js, TypeScript, Azure AI Foundry, LangGraph, Supabase). Turns YouTube lectures into summaries, flashcards, quizzes, semantic search, and chat. Live: lecturemateai.vercel.app. Repo: github.com/harshshri07/lecturemate-ai
2. Pharma Cargo Monitor - Real-time multi-agent telemetry (Python, LangGraph, FastAPI, Redis). 6 LangGraph agents score cold-chain risk from temperature, humidity, shock, and GPS streams. Repo: github.com/harshshri07/pharma-cargo
3. MedTeller - Vision-language radiology reports (ViT, GPT-2, PyTorch). Improved BLEU by 12% on 7.4K chest X-rays. Repo: github.com/harshshri07/MedTeller. Demo: medteller.streamlit.app
4. NourishNet - Multi-source data pipeline (Python, SQL, Pandas, GeoJSON, GCP). 25+ public sources into 6,800+ verified location records with choropleth dashboards. Repo: github.com/harshshri07/NourishNet
5. AI Hedge Fund - Multi-agent stock analysis (LangGraph, RAG, ChromaDB, Gemini/OpenAI). Repo: github.com/harshshri07/ai-hedge-fund
6. CAFB AI Document Generator - RAG with CLIP + Pinecone. Repo: github.com/harshshri07/CAFB_AI
7. Career Shield - Fake job detection (DistilBERT, Streamlit). Repo: github.com/harshshri07/career-shield. Demo: career-shield.streamlit.app
8. UMBC Student Success Dashboard - Hackathon project; Neo4j, FastAPI, LightGBM, Google Generative AI. Repo: github.com/Info-stats-ai/UMBC_Hack_DoIT
9. TerpTracker - Flask, AWS DynamoDB, expense tracking. Repo: github.com/harshshri07/TerpTracker`,
  },

  {
    id: "skills",
    keywords: [
      "skill", "skills", "tech", "stack", "language", "framework", "tool", "library",
      "python", "sql", "typescript", "javascript", "java", "pytorch", "tensorflow",
      "langchain", "langgraph", "mcp", "azure", "aws", "gcp", "fastapi", "django",
      "flask", "docker", "mlflow", "rag", "spark", "hadoop", "tableau",
    ],
    content: `## Skills
- Languages & Databases: Python, SQL, TypeScript, JavaScript, R, Java, C++, HTML, PostgreSQL, MongoDB, Redis
- Machine Learning: PyTorch, TensorFlow, Scikit-learn, XGBoost, Transformers, Computer Vision, NLP, Time-Series Forecasting, OpenCV, Pandas, NumPy, Matplotlib, Seaborn, Plotly, Tableau
- LLMs & Agents: LangGraph, LangChain, RAG, MCP, DSPy, Prompt Engineering, LLM Evaluation, Generative AI, Reinforcement Learning, RecSys, pgvector, Pinecone, ChromaDB, Gemini, OpenAI
- Web & Backend: FastAPI, Django, Flask, Celery, REST APIs, WebSockets, Next.js, Flutter
- MLOps & Cloud: MLflow, Docker, CI/CD, GitHub Actions, Apache Airflow, AWS, AWS Bedrock, Azure, GCP, BigQuery, Hadoop, Spark, Git, Jupyter`,
  },

  {
    id: "career",
    alwaysInclude: true,
    keywords: [],
    content: `## Career & Job Search
### Elevator pitch
"Hey - I'm Harsh. I just finished my Master's in Data Science at Maryland (May 2026, GPA 3.81). Before that I did Computer Science in India. I've worked as an ML engineer on forecasting and recommendations, interned in AI doing LLM security and multi-agent systems at Converge and Cloudforce, and now I'm an AI Trainer at Mercor building expert demos for frontier agents. On the side I ship projects like LectureMate, Pharma Cargo Monitor, and MedTeller. I'm open to AI, ML engineering, and applied agent roles where I can ship systems people trust."

- Target roles: AI / ML engineering, applied AI, multi-agent systems, RAG / LLM apps, data science.
- Industry: Open to strong teams across sectors.
- Location: Open to relocation in the United States.
- Work arrangement: Remote, hybrid, or onsite.
- Status: Currently at Mercor (Project Odin); open to new opportunities.
- Contact: Email shrishrimal38@gmail.com or LinkedIn linkedin.com/in/harsh-shrishrimal.
- Compensation: Focused on the right team and impact first; flexible on compensation for the role and location.
- Why Data Science: Data sits between messy reality and decisions that actually matter. ML and GenAI keep moving - latency, fairness, cost, and security force you to think like both an engineer and a scientist.
- Biggest strength: Punctual with deadlines and still pushes for quality - would rather clarify scope early than deliver something sloppy on time.`,
  },

  {
    id: "personal",
    keywords: [
      "hobby", "hobbies", "personal", "outside", "free time", "fun", "sport", "cricket",
      "soccer", "gym", "trek", "trekking", "hiking", "swim", "swimming", "drive", "series",
      "color", "blue", "unwind", "relax", "interest", "life", "outside work",
    ],
    content: `## Personal
- Hobbies: cricket, soccer, gym, trekking/hiking, swimming.
- Downtime: watching cricket, web series, chilling with friends, going for a drive.
- Favorite color: blue - calm, clear, helps focus. Portfolio uses a blue accent for the same reason.
- Cricket & soccer: teamwork, strategy under pressure, good break from screens.
- Gym: discipline, strength, and routine - complements long study and coding sessions.
- Trekking: outdoors, endurance, mental reset.
- Swimming: full-body, refreshing, almost meditative.`,
  },

  {
    id: "logistics",
    keywords: [
      "visa", "authorization", "opt", "f1", "f-1", "sponsorship", "h1b", "h-1b", "work permit",
      "schedule", "interview", "call", "timezone", "time zone", "available", "availability",
      "start date", "when can", "response", "reply time", "email response",
    ],
    content: `## Logistics & Communication
- Work authorization (U.S.): F-1 student status, eligible for post-completion OPT; STEM OPT can extend up to 36 months total. Phrase as "eligible to work in the U.S. under F-1 OPT / STEM OPT timelines as applicable."
- IMPORTANT: Do NOT proactively mention H-1B or sponsorship unless the visitor explicitly asks about long-term authorization or sponsorship after OPT.
- Interview scheduling: Flexible with at least 48 hours notice. Primary time zone: Eastern Time (ET).
- Email response: usually within 24 hours to shrishrimal38@gmail.com.`,
  },

  {
    id: "publication",
    keywords: [
      "publication", "paper", "research", "published", "journal", "ijircce", "handwritten",
      "character recognition", "doi", "co-author", "academic paper", "mnist",
    ],
    content: `## Publication
- Co-authored "Review on Handwritten Character Recognition", IJIRCCE Vol. 11 Issue 3, March 2023. LeNet-5 CNN on 70K MNIST images, 98.23% accuracy, real-time prediction GUI. DOI: 10.15680/IJIRCCE.2023.1103081. PDF: ijircce.com/admin/main/storage/app/pdf/6wUTmCpJrFQO5oQORBOWjb8QUdzdsgUiHTSQ3WFD.pdf`,
  },

  {
    id: "certifications",
    keywords: [
      "certification", "certifications", "certified", "azure", "microsoft", "google",
      "project management", "ibm", "oracle", "accenture", "certificate", "hadoop",
    ],
    content: `## Certifications
- Microsoft: Azure AI Apps and Agents Developer Associate, Azure Fundamentals, Azure Data Fundamentals, Azure AI Fundamentals
- Google: Google Project Management (Coursera)
- IBM: Artificial Intelligence Fundamentals, Big Data 101, Hadoop 101
- Accenture: Data Analytics & Visualization
- Oracle: Databases for Developers`,
  },

  {
    id: "campus",
    keywords: [
      "campus", "club", "clubs", "organization", "ieee", "nss", "ecell", "ai club", "desi",
      "bes", "nsbe", "bhakti", "yoga", "leadership", "involvement", "extracurricular",
      "student group", "member",
    ],
    content: `## Campus Involvement & Leadership
- Bachelor's (Pune): Founder member and Membership Development Head, IEEE student branch; active member of NSS; active member of Entrepreneurship Cell (E-Cell).
- Master's (UMD): Active member of AI/ML club; active member of DESI UMD (Indian student org); active member of Black Engineers Society (BES/NSBE network at bes.umd.edu); active member of Bhakti Yoga (campus group - mention factually only, no religious discussion).`,
  },

  {
    id: "awards",
    keywords: [
      "award", "awards", "hackathon", "competition", "olympiad", "medal", "gold", "silver",
      "bronze", "abacus", "nsbe", "convention", "achieve", "achievement", "prize",
    ],
    content: `## Awards & Competitions
- School (India): Two gold medals in Mathematics Olympiad, one silver and one bronze in IT Olympiad; national-level participation in Mathematics and Abacus Olympiads; completed 11 levels of abacus and placed first in the final level.
- Master's (U.S.): Competed in HackUMBC, an Agentic AI competition, Capital Area Food Bank hackathon, Deloitte Data Challenge - participant only, no placement wins to date.
- NSBE: Attended national convention 2025 in Chicago, IL and national convention 2026 in Baltimore, MD.`,
  },
];

/** Full knowledge string assembled from all sections (used as fallback and for context injection). */
export const PORTFOLIO_KNOWLEDGE = KNOWLEDGE_SECTIONS.map((s) => s.content).join("\n\n");

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
- Location: College Park, USA (University of Maryland area)
- Email: shrishrimal38@gmail.com
- Phone: +1 (240) 413-6360
- LinkedIn: linkedin.com/in/harsh-shrishrimal (display: harsh-shrishrimal)
- GitHub: github.com/harshshri07 (display: harshshri07)
- Website: harsh-shrishrimal.com (portfolio)
- Role: Data Science graduate student; builds AI/ML systems, LLM apps, and full-stack data products.
- Spoken languages (human): English, Hindi, and Marathi - fluent.`,
  },

  {
    id: "education",
    keywords: [
      "education", "degree", "university", "college", "gpa", "grade", "course", "coursework",
      "study", "studying", "school", "master", "bachelor", "ms", "be", "umd", "maryland",
      "pune", "graduate", "graduation", "academic", "cgpa", "transcript",
    ],
    content: `## Education
- Master of Science in Data Science, University of Maryland, College Park - August 2024 to May 20, 2026 (expected graduation). GPA ~3.78/4.0.
  - Master's courses (full names): Principles of Data Science, Principles of Machine Learning, Deep Learning, Big Data Systems, Natural Language Processing, Algorithms for Data Science, Data Representation, Computer Vision.
- Bachelor of Engineering in Computer Science, Savitribai Phule Pune University, India - August 2019 to June 2023. GPA ~3.2/4.0.
  - Bachelor's coursework highlights (not exhaustive): Software Testing and Quality Assurance, Software Engineering, Engineering Physics, Engineering Chemistry, Engineering Mathematics 1-3, Computer Graphics, Basic Electronics, Electrical Engineering, Engineering Mechanics, Programming and Problem Solving, Data Structures and Algorithms, Microprocessor; additionally: Database Management Systems, Business Intelligence, Data Science and Big Data, Artificial Intelligence.
  - If someone asks for a full official course list, say Harsh can provide a transcript or detailed list on request.`,
  },

  {
    id: "experience",
    keywords: [
      "experience", "work", "job", "internship", "intern", "company", "role", "position",
      "converge", "shanti", "llm", "security", "prompt", "injection", "forecasting", "pricing",
      "recommendation", "airflow", "docker", "redis", "celery", "mlflow", "dspy", "etl",
      "engineer", "ml engineer", "ai intern", "industry", "professional",
    ],
    content: `## Experience
### Converge Technology Solutions - Artificial Intelligence Intern (Jun 2025 - Aug 2025), New York NY (Remote)
- Built automated prompt-injection testing for LLM chatbots; ran 150+ attacks to find vulnerabilities.
- Used DSPy-based prompt optimization across multiple LLMs (e.g. GPT, Mistral, LLaMA, Qwen).
- Automated attacks with Docker, Redis, Celery, Flower; reduced manual testing effort ~20%.
- Integrated AI chatbot endpoints into security pipelines; improved backend orchestration and MLflow experiment tracking.
- Pivot during internship: The team initially relied on an internal chatbot codenamed Gandalf for automated testing. Gandalf's API access was revoked. The team pivoted to Converge's in-house product (ConverseAI), reran the full pipeline on ConverseAI, and validated the security testing workflow end to end.

### Shanti Technologies - Machine Learning Engineer (Jul 2023 - Jun 2024), Pune, India
- TensorFlow demand forecasting with seasonality/holiday features; reduced inventory stockouts ~18%.
- Dynamic pricing (Python, Flask APIs); increased campaign revenue ~10%.
- ETL with Apache Airflow and GCP; 2M+ daily records, <25 min latency.
- Collaborative filtering recommendation systems (Scikit-learn, TensorFlow); loyalty engagement ~15%.
- ML deployment with Docker, Git, Jupyter.`,
  },

  {
    id: "projects",
    keywords: [
      "project", "projects", "built", "build", "demo", "github", "repo", "showcase",
      "hedge fund", "medteller", "cafb", "career shield", "terptracker", "umbc",
      "langraph", "langgraph", "chromadb", "pinecone", "rag", "retrieval", "vision",
      "radiology", "fake job", "distilbert", "dynamodb", "flask", "streamlit",
      "multi-agent", "multiagent", "agentic", "vector", "embedding",
    ],
    content: `## Featured Projects
1. AI Hedge Fund - Multi-agent stock analysis (LangGraph, RAG, ChromaDB, Gemini/OpenAI). Repo: github.com/harshshri07/ai-hedge-fund
2. MedTeller - Vision-language radiology reports (ViT, GPT-2, PyTorch). Repo: github.com/harshshri07/MedTeller. Demo: medteller.streamlit.app
3. CAFB AI Document Generator - RAG with CLIP + Pinecone. Repo: github.com/harshshri07/CAFB_AI
4. Career Shield - Fake job detection (DistilBERT, Streamlit). Repo: github.com/harshshri07/career-shield. Demo: career-shield.streamlit.app
5. UMBC Student Success Dashboard - Hackathon project; Neo4j, FastAPI, LightGBM, Google Generative AI. Repo: github.com/Info-stats-ai/UMBC_Hack_DoIT
6. TerpTracker - Flask, AWS DynamoDB, expense tracking. Repo: github.com/harshshri07/TerpTracker`,
  },

  {
    id: "skills",
    keywords: [
      "skill", "skills", "tech", "stack", "language", "framework", "tool", "library",
      "python", "sql", "java", "javascript", "pytorch", "tensorflow", "scikit", "langchain",
      "gcp", "aws", "spark", "hadoop", "fastapi", "django", "openai", "cloud", "backend",
      "frontend", "ml", "deep learning", "nlp", "computer vision", "r ", "c++",
    ],
    content: `## Skills
- Programming: Python, SQL, R, Java, C++, JavaScript, HTML
- ML/DL: PyTorch, TensorFlow, scikit-learn, DSPy, RAG, LangChain/LangGraph, CLIP, OpenCV, MLflow
- LLM stack: Gemini, OpenAI, ChromaDB, Pinecone
- Cloud/data: GCP (BigQuery, Cloud Functions), AWS, Airflow, Spark, Hadoop
- Web/backend: FastAPI, Django, Flask, Celery, Redis, Next.js`,
  },

  {
    id: "career",
    alwaysInclude: true,
    keywords: [],
    content: `## Career & Job Search
### Elevator pitch
"Hey - I'm Harsh. I'm wrapping up my Master's in Data Science at Maryland; before that I did my Bachelor's in Computer Science in India. I've worked in industry as a machine learning engineer on forecasting, pricing, and pipelines, and more recently I interned in AI doing LLM security and prompt-injection testing. On the side I build projects I actually want to show off: multi-agent systems, retrieval-augmented setups, vision-and-language stuff, full-stack demos. I'm looking for AI, machine learning, or data roles where I can ship systems people trust, and I'd love to tell you more about any of the work on this site."

- Target roles: AI, ML, data science, ML engineering, applied AI, analytics engineering.
- Industry: Open to strong teams across sectors.
- Location: Open to relocation anywhere in the United States.
- Work arrangement: Remote, hybrid, or onsite - flexible.
- Job search status: Actively searching.
- Earliest full-time start: Right after graduation (May 2026).
- Contact: Email shrishrimal38@gmail.com or LinkedIn linkedin.com/in/harsh-shrishrimal.
- Compensation: Focused on finding the right team and impact first; flexible and happy to align with what's fair for the role and location.
- Why Data Science: Data sits between messy reality and decisions that actually matter. ML and GenAI are exciting because the field keeps moving - there's always a new constraint (latency, fairness, cost, security) that forces you to think like both an engineer and a scientist.
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
- Favorite color: blue - calm, clear, helps focus. His portfolio uses a blue accent for the same reason.
- Cricket & soccer: teamwork, strategy under pressure, good break from screens.
- Gym: discipline, strength, and routine - complements long study and coding sessions.
- Trekking: outdoors, endurance, mental reset away from campus.
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
- IMPORTANT: Do NOT proactively mention H-1B or "sponsorship" unless the visitor explicitly asks about long-term authorization or sponsorship after OPT.
- Interview scheduling: Flexible with at least 48 hours notice. Primary time zone: Eastern Time (ET).
- Email response: usually within 24 hours to shrishrimal38@gmail.com.`,
  },

  {
    id: "publication",
    keywords: [
      "publication", "paper", "research", "published", "journal", "ijircce", "handwritten",
      "character recognition", "doi", "co-author", "academic paper",
    ],
    content: `## Publication
- Co-authored "Review on Handwritten Character Recognition", IJIRCCE, Vol. 11 Issue 3, March 2023. DOI: 10.15680/IJIRCCE.2023.1103081. PDF available from portfolio Publications section.`,
  },

  {
    id: "certifications",
    keywords: [
      "certification", "certifications", "certified", "ibm", "oracle", "accenture", "certificate",
    ],
    content: `## Certifications
IBM (AI Fundamentals, Big Data 101, Hadoop 101), Accenture Data Analytics & Visualization, Oracle Databases for Developers.`,
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

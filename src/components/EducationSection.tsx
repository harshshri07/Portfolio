import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const education = [
  {
    degree: "Master of Science in Data Science",
    school: "University of Maryland, College Park",
    date: "Expected May 2026",
    gpa: "3.73/4.0",
    courses: ["Probability & Statistics", "Machine Learning", "Cloud Computing", "NLP", "Deep Learning"],
  },
  {
    degree: "Bachelor of Engineering in Computer Science",
    school: "Savitribai Phule Pune University, India",
    date: "Jun 2023",
    gpa: "3.2/4.0",
    courses: ["Database Management", "Business Intelligence", "Data Science & Big Data", "AI"],
  },
];

const EducationSection = () => {
  return (
    <section id="education" className="px-6 md:px-16 lg:px-24 py-[12vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease }}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Education</span>
      </motion.div>

      <div className="mt-12 space-y-12">
        {education.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease }}
            className="border-l border-border pl-6 md:pl-8"
          >
            <span className="font-mono text-xs text-muted-foreground">{edu.date}</span>
            <h3 className="text-xl md:text-2xl font-medium text-foreground mt-2">{edu.degree}</h3>
            <p className="text-muted-foreground mt-1">{edu.school}</p>
            <p className="font-mono text-xs text-accent mt-2">GPA: {edu.gpa}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {edu.courses.map((c) => (
                <span key={c} className="font-mono text-xs px-2 py-1 rounded-sm bg-secondary text-muted-foreground">
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;

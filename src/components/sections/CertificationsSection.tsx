import { motion } from "framer-motion";
import { Award } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const certs = [
  { name: "Artificial Intelligence Fundamentals", issuer: "IBM" },
  { name: "Big Data 101", issuer: "IBM" },
  { name: "Data Analytics & Visualization", issuer: "Accenture" },
  { name: "Databases for Developers", issuer: "Oracle" },
  { name: "Hadoop 101", issuer: "IBM" },
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="px-6 md:px-16 lg:px-24 py-[12vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease }}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Certifications</span>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certs.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease }}
            className="border border-border rounded-sm p-5 hover:border-accent/30 transition-colors duration-200"
          >
            <Award className="w-4 h-4 text-accent mb-3" strokeWidth={1.5} />
            <h3 className="text-sm font-medium text-foreground">{cert.name}</h3>
            <p className="font-mono text-xs text-muted-foreground mt-1">{cert.issuer}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;


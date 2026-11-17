import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const certs: { name: string; issuer: string; href?: string }[] = [
  {
    name: "Azure AI Apps and Agents Developer Associate",
    issuer: "Microsoft",
    href: "https://learn.microsoft.com/api/credentials/share/en-us/HarshShrishrimal-6587/943A2D8D43686A9A?sharingId",
  },
  {
    name: "Azure Fundamentals",
    issuer: "Microsoft",
    href: "https://learn.microsoft.com/api/credentials/share/en-us/HarshShrishrimal-6587/4B1DAD5062833328?sharingId",
  },
  {
    name: "Azure Data Fundamentals",
    issuer: "Microsoft",
    href: "https://learn.microsoft.com/api/credentials/share/en-in/HarshShrishrimal-6587/B04101F84CBAADCA?sharingId",
  },
  {
    name: "Azure AI Fundamentals",
    issuer: "Microsoft",
    href: "https://learn.microsoft.com/api/credentials/share/en-in/HarshShrishrimal-6587/66C59013B84E8126?sharingId",
  },
  {
    name: "Google Project Management",
    issuer: "Google",
    href: "https://www.coursera.org/account/accomplishments/specialization/NH57QV04EOS2",
  },
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
        {certs.map((cert, i) => {
          const className =
            "group border border-border rounded-sm p-5 hover:border-accent/30 transition-colors duration-200 block";
          const body = (
            <>
              <div className="flex items-start justify-between gap-2">
                <Award className="w-4 h-4 text-accent mb-3" strokeWidth={1.5} />
                {cert.href && (
                  <ExternalLink
                    className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    strokeWidth={1.5}
                  />
                )}
              </div>
              <h3
                className={`text-sm font-medium text-foreground ${cert.href ? "group-hover:text-accent transition-colors duration-200" : ""}`}
              >
                {cert.name}
              </h3>
              <p className="font-mono text-xs text-muted-foreground mt-1">{cert.issuer}</p>
            </>
          );

          return cert.href ? (
            <motion.a
              key={i}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease }}
              className={className}
            >
              {body}
            </motion.a>
          ) : (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease }}
              className={className}
            >
              {body}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default CertificationsSection;

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import PublicationsSection from "@/components/PublicationsSection";
import CertificationsSection from "@/components/CertificationsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import FloatingNav from "@/components/FloatingNav";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <FloatingNav />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <ExperienceSection />
      <ProjectsSection />
      <PublicationsSection />
      <CertificationsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
};

export default Index;

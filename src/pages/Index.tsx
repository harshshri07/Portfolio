import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import EducationSection from "@/components/sections/EducationSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import PublicationsSection from "@/components/sections/PublicationsSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";
import FloatingNav from "@/components/layout/FloatingNav";
import { PortfolioChatbot } from "@/components/chat/PortfolioChatbot";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <FloatingNav />
      <PortfolioChatbot />
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

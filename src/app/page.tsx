import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { AIAssistant } from "@/components/AIAssistant";
import { SecretTerminal } from "@/components/SecretTerminal";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AIAssistant />
      <SecretTerminal />
      <About />
      <JourneyTimeline />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
    </main>
  );
}

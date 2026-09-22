import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { TrustMetrics } from "@/components/sections/TrustMetrics";
import { Projects } from "@/components/sections/Projects";
import { Technology } from "@/components/sections/Technology";
import { Certificates } from "@/components/sections/Certificates";
import { Clients } from "@/components/sections/Clients";
import { IndustryDistribution } from "@/components/sections/IndustryDistribution";
import { IsoCertificates } from "@/components/sections/IsoCertificates";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustMetrics />
        <Projects />
        <IndustryDistribution />
        <IsoCertificates />
        <Technology />
        <Clients />
        <Certificates />
        <CTA />
      </main>
    </>
  );
}

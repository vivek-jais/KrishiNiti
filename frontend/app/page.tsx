import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Stats from "@/components/Stats";
import Workflow from "@/components/Workflow";
import DemoBox from "@/components/DemoBox";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Stats />
      <Workflow />
      <DemoBox />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
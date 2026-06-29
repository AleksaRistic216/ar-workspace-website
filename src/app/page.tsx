import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import Features from "@/components/Features";
import CrossPlatform from "@/components/CrossPlatform";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Pillars />
        <Features />
        <CrossPlatform />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}

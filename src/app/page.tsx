import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import CrossPlatform from "@/components/CrossPlatform";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cross Platform Terminal (CPT)",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Linux, Windows, macOS",
  description:
    "GPU-accelerated cross-platform terminal and developer workspace with dockable panels, AI workflow integration for Claude Code and GitHub Copilot, and automatic cross-platform quirks resolution.",
  offers: {
    "@type": "Offer",
    price: "8",
    priceCurrency: "EUR",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "8",
      priceCurrency: "EUR",
      unitText: "MONTH",
    },
  },
  featureList: [
    "GPU-accelerated terminal rendering",
    "Full VT/PTY support with tabbed sessions",
    "Dockable panels and widgets",
    "AI Workflow Pipeline with Claude Code and GitHub Copilot",
    "Cross-platform quirks resolution",
    "In-app auto-update",
    "No installation required",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Pillars />
        <CrossPlatform />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}

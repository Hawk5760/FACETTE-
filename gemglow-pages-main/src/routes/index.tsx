import { createFileRoute } from "@tanstack/react-router";
import { ScrollRingHero } from "@/components/site/ScrollRingHero";
import { FourVerticals } from "@/components/site/FourVerticals";
import { PhilosophySection } from "@/components/site/PhilosophySection";
import { ConnectedByCraft } from "@/components/site/ConnectedByCraft";
import { EnquirySection } from "@/components/site/EnquiryForm";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Facette & Co. — Modern Luxury House, Design Studio & Precision Metal Craft",
      description:
        "Facette & Co. operates across four verticals: Gemstones, Design & Manufacturing, Fashion Hardware, and Corporate Gifting. A design-led house working across materials, objects and manufacturing.",
      path: "/",
      jsonLd: {
        "@type": "Organization",
        name: "Facette & Co.",
        url: "/",
        description: "Modern luxury house, design studio and precision manufacturing company.",
      },
    }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* 1. HERO EXPERIENCE: Built around scroll-triggered ring animation */}
      <ScrollRingHero />

      {/* 2. FOUR VISUAL VERTICALS: Overwhelmingly visual, 4 large rectangular compositions */}
      <FourVerticals />

      {/* 3. BRAND PHILOSOPHY: Typography-led section with progressive scroll reveals */}
      <PhilosophySection />

      {/* 4. GLOBAL PRESENCE (CONNECTED BY CRAFT): Dark world map with illuminated location points */}
      <ConnectedByCraft />

      {/* 5. FINAL ENQUIRY SECTION: Two-column editorial enquiry form */}
      <EnquirySection
        eyebrow="BEGIN THE CONVERSATION"
        title={
          <>
            Every great object
            <br />
            begins with
            <br />
            <span className="text-gold italic font-serif">an idea.</span>
          </>
        }
        copy="Whether you have a finished specification, a reference, a rough concept or simply a requirement — start the conversation."
        additionalLine="Every enquiry is reviewed personally and directed to the right capability."
        locationLine="INDIA · GLOBAL B2B ENQUIRIES"
        cta="SEND ENQUIRY"
      />
    </>
  );
}

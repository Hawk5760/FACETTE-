import { createFileRoute } from "@tanstack/react-router";
import { GemPage } from "@/components/site/GemPage";
import { pageHead, breadcrumb } from "@/lib/seo";
import img from "@/assets/emerald.jpg";

export const Route = createFileRoute("/emeralds")({
  head: () => pageHead({
    title: "Natural Certified Emeralds — Sourced to Specification",
    description: "Source natural, IGI and GIA certified emeralds from Colombia, Zambia and Brazil. Loose emeralds matched to your colour, size, cut and quantity.",
    path: "/emeralds",
    jsonLd: breadcrumb("Emeralds", "/emeralds"),
  }),
  component: () => (
    <GemPage c={{
      name: "Emeralds",
      eyebrow: "Gemstones · Emeralds",
      title: <>Natural emeralds, <em className="text-gold">sourced to your specification.</em></>,
      intro: "Certified loose emeralds selected for colour, character and possibility — from single statement stones to calibrated parcels.",
      image: img,
      imageAlt: "Faceted natural green emerald held in gemologist tweezers",
      storyTitle: "The green that defines the house.",
      story: [
        "Emerald is the green variety of beryl, valued above all for the depth and saturation of its colour. Its natural inclusions — the 'jardin' — are part of each stone's character.",
        "Facette & Co. sources emeralds through generational trade channels connected to Jaipur, one of the world's great coloured gemstone centres, and reviews every stone against your requirement before it is presented.",
      ],
      qualities: [
        { label: "Colour", text: "Hue, tone and saturation — from bluish-green to pure vivid green." },
        { label: "Clarity", text: "Natural inclusions assessed for visibility and durability." },
        { label: "Cut", text: "Proportions that bring out colour and protect the crystal." },
        { label: "Treatment", text: "Oil and enhancement disclosed as part of certification." },
      ],
      origins: ["Colombia", "Zambia", "Brazil", "Afghanistan"],
      shapes: ["Emerald cut", "Oval", "Cushion", "Pear", "Round", "Cabochon", "Calibrated parcels"],
      interest: "Emeralds",
    }} />
  ),
});

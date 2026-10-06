import { createFileRoute } from "@tanstack/react-router";
import { GemPage } from "@/components/site/GemPage";
import { pageHead, breadcrumb } from "@/lib/seo";
import img from "@/assets/sapphire.jpg";

export const Route = createFileRoute("/sapphires")({
  head: () => pageHead({
    title: "Natural Certified Sapphires — Blue & Fancy Colour",
    description: "Source natural blue and fancy sapphires from Sri Lanka, Madagascar and beyond. IGI and GIA certified loose sapphires matched to your specification.",
    path: "/sapphires",
    jsonLd: breadcrumb("Sapphires", "/sapphires"),
  }),
  component: () => (
    <GemPage c={{
      name: "Sapphires",
      eyebrow: "Gemstones · Sapphires",
      title: <>Sapphires of <em className="text-gold">depth, brilliance and endurance.</em></>,
      intro: "Natural blue and fancy-colour sapphires, certified and matched to your colour, size, grade and quantity.",
      image: img,
      imageAlt: "Oval faceted blue sapphire resting on dark stone",
      storyTitle: "Second only to diamond in hardness.",
      story: [
        "Sapphire is corundum in every colour except red. Celebrated for royal and cornflower blues, it also occurs in pink, yellow, padparadscha and green.",
        "Its hardness makes sapphire ideal for rings and everyday jewellery. We source loose sapphires around your brief — colour, origin, treatment and certification considered from the beginning.",
      ],
      qualities: [
        { label: "Colour", text: "Hue, tone and saturation; even colour distribution valued most." },
        { label: "Clarity", text: "Eye-clean stones, silk and natural inclusions reviewed." },
        { label: "Origin", text: "Origin reports available where certification allows." },
        { label: "Treatment", text: "Heated or unheated status disclosed and documented." },
      ],
      origins: ["Sri Lanka", "Madagascar", "Myanmar", "Thailand", "Australia"],
      shapes: ["Oval", "Cushion", "Round", "Emerald cut", "Pear", "Cabochon", "Fancy colours"],
      interest: "Sapphires",
    }} />
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { GemPage } from "@/components/site/GemPage";
import { pageHead, breadcrumb } from "@/lib/seo";
import img from "@/assets/ruby.jpg";

export const Route = createFileRoute("/ruby")({
  head: () => pageHead({
    title: "Natural Certified Ruby — Loose Rubies Sourced to Order",
    description: "Source natural, certified loose rubies from Mozambique, Myanmar and Thailand. Rubies matched to your colour, size, cut, grade and quantity.",
    path: "/ruby",
    jsonLd: breadcrumb("Ruby", "/ruby"),
  }),
  component: () => (
    <GemPage c={{
      name: "Rubies",
      eyebrow: "Gemstones · Ruby",
      title: <>Ruby, <em className="text-gold">the stone of fire and rarity.</em></>,
      intro: "Natural certified rubies, from vivid pigeon's-blood reds to rich pinkish tones — sourced around your requirement.",
      image: img,
      imageAlt: "Cushion-cut natural red ruby on dark stone",
      storyTitle: "Red corundum, rarer than it looks.",
      story: [
        "Ruby is the red variety of corundum. Fine, large rubies are among the rarest coloured gemstones in the world, prized for their glowing fluorescence and saturated colour.",
        "We work through direct trade access across key ruby markets to identify stones that match your specification, with certification reviewed before any option is presented.",
      ],
      qualities: [
        { label: "Colour", text: "Pure to slightly purplish red with strong saturation." },
        { label: "Clarity", text: "Silk and natural inclusions assessed for beauty and durability." },
        { label: "Size", text: "Fine rubies above one carat are scarce — tell us your range." },
        { label: "Treatment", text: "Heat and other treatments disclosed through certification." },
      ],
      origins: ["Mozambique", "Myanmar", "Thailand", "Madagascar"],
      shapes: ["Oval", "Cushion", "Round", "Pear", "Heart", "Cabochon", "Calibrated parcels"],
      interest: "Rubies",
    }} />
  ),
});

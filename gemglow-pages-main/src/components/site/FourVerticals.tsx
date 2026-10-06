import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import gemstonesVerticalImg from "@/assets/gemstones-vertical.jpg";
import designMfgImg from "@/assets/design-manufacturing.jpg";
import fashionHardwareImg from "@/assets/fashion-hardware.jpg";
import corporateGiftingImg from "@/assets/corporate-gifting.jpg";

interface VerticalItem {
  id: string;
  title: string;
  sentence: string;
  to: "/gemstones" | "/design-manufacturing" | "/fashion-hardware" | "/corporate-gifting";
  image: string;
  alt: string;
}

const verticalGemstones: VerticalItem = {
  id: "gemstones",
  title: "Gemstones",
  sentence: "Natural gemstones selected for colour, character and possibility.",
  to: "/gemstones",
  image: gemstonesVerticalImg,
  alt: "Towering crystalline emerald and tourmaline gemstone monolith on dark basalt",
};

const verticalDesignMfg: VerticalItem = {
  id: "design-manufacturing",
  title: "Design & Manufacturing",
  sentence: "From an idea to a precisely finished piece.",
  to: "/design-manufacturing",
  image: designMfgImg,
  alt: "Craftsman filing precision cast gold jewelry at atelier workbench",
};

const verticalFashionHardware: VerticalItem = {
  id: "fashion-hardware",
  title: "Fashion Hardware",
  sentence: "Distinctive metal components made to define the details.",
  to: "/fashion-hardware",
  image: fashionHardwareImg,
  alt: "Precision-machined titanium and champagne gold architectural buckle",
};

const verticalCorporateGifting: VerticalItem = {
  id: "corporate-gifting",
  title: "Corporate Gifting",
  sentence: "Thoughtfully crafted objects made to be remembered.",
  to: "/corporate-gifting",
  image: corporateGiftingImg,
  alt: "Sculptural bespoke executive gold and obsidian object in presentation case",
};

function CompositionCard({
  item,
  className = "",
  eager = false,
}: {
  item: VerticalItem;
  className?: string;
  eager?: boolean;
}) {
  return (
    <Link
      to={item.to}
      className={`group relative block w-full overflow-hidden rounded-[2px] border hairline border-white/10 bg-[#06080c] transition-all duration-500 hover:border-gold/40 shadow-2xl ${className}`}
      aria-label={`${item.title} — ${item.sentence}`}
    >
      {/* 1. Full-Bleed Photograph */}
      <img
        src={item.image}
        alt={item.alt}
        loading={eager ? "eager" : "lazy"}
        width={1600}
        height={1008}
        className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.06] transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.03] group-hover:brightness-[0.82]"
      />

      {/* 2. Deep Cinematic Vignette Gradient for Perfect Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/35 to-black/10 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_transparent_45%,_rgba(6,8,12,0.5)_100%)] pointer-events-none" />

      {/* 3. Subtle Hairline Frame Inset on Hover */}
      <div className="absolute inset-3 sm:inset-4 border hairline border-transparent transition-colors duration-500 group-hover:border-gold/20 pointer-events-none" />

      {/* 4. Bottom Content Bar (Title + ONE sentence on left, Arrow on right) */}
      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 lg:p-8 flex items-end justify-between gap-4 pointer-events-none">
        {/* Left: Category Name + ONE Short Sentence */}
        <div className="max-w-[85%]">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ivory tracking-wide leading-tight transition-colors duration-300 group-hover:text-gold">
            {item.title}
          </h2>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm lg:text-base text-ivory/80 font-light tracking-wide leading-snug line-clamp-2">
            {item.sentence}
          </p>
        </div>

        {/* Right: Minimalist Diagonal Arrow Icon */}
        <div className="shrink-0 mb-1 text-ivory/70 transition-all duration-300 group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1">
          <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
        </div>
      </div>
    </Link>
  );
}

export function FourVerticals() {
  return (
    <section
      className="relative w-full bg-[#06080c] py-8 sm:py-12 lg:py-16 border-t border-b hairline border-gold/25 overflow-hidden"
      aria-label="Four Verticals"
    >
      <div className="container-x">
        {/* Asymmetrical Bento Grid: 1 Tall Vertical Left, 1 Wide Top-Right, 2 Square Bottom-Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5 min-h-[640px] lg:h-[82vh] lg:min-h-[740px] lg:max-h-[880px]">
          {/* LEFT: Tall Vertical Composition (Gemstones) */}
          <div className="lg:col-span-5 h-[520px] sm:h-[600px] lg:h-full">
            <CompositionCard
              item={verticalGemstones}
              className="h-full"
              eager
            />
          </div>

          {/* RIGHT: Stacked 1 Wide Top + 2 Side-by-Side Bottom */}
          <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-4 lg:gap-5 h-full">
            {/* Top: Wide Landscape Composition (Design & Manufacturing) */}
            <div className="h-[300px] sm:h-[340px] lg:h-[50%]">
              <CompositionCard
                item={verticalDesignMfg}
                className="h-full"
                eager
              />
            </div>

            {/* Bottom: 2 Side-by-Side Compositions (Fashion Hardware & Corporate Gifting) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 lg:h-[50%]">
              <div className="h-[280px] sm:h-full">
                <CompositionCard
                  item={verticalFashionHardware}
                  className="h-full"
                />
              </div>
              <div className="h-[280px] sm:h-full">
                <CompositionCard
                  item={verticalCorporateGifting}
                  className="h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { VerticalHero } from "@/components/site/VerticalHero";
import { Reveal } from "@/components/site/Reveal";
import { RequirementBuilder } from "@/components/site/RequirementBuilder";
import { EnquirySection } from "@/components/site/EnquiryForm";
import { pageHead, breadcrumb } from "@/lib/seo";
import gemstonesHero from "@/assets/gemstones.jpg";

export const Route = createFileRoute("/gemstones")({
  head: () =>
    pageHead({
      title: "Gemstones — Certified Sourcing to Specification | Facette & Co.",
      description:
        "Natural and certified stones sourced around your requirements — from colour and cut to size, origin and certification. IGI and GIA certification as standard.",
      path: "/gemstones",
      jsonLd: breadcrumb("Gemstones", "/gemstones"),
    }),
  component: GemstonesVerticalPage,
});

const whyItems = [
  {
    title: "SPECIFICATION-LED SOURCING",
    description: "Sourcing built around your exact requirements, not a fixed catalogue.",
  },
  {
    title: "CERTIFICATION",
    description: "Certification requirements considered from the beginning of the sourcing process.",
  },
  {
    title: "DIRECT ACCESS",
    description: "Access to a wider network across key gemstone and jewellery markets.",
  },
];

const workSteps = [
  {
    step: "01",
    title: "SPECIFY",
    description: "Tell us the stone, size, colour, grade, quantity and certification you require.",
  },
  {
    step: "02",
    title: "SOURCE",
    description: "We identify stones matching your specification through our sourcing network.",
  },
  {
    step: "03",
    title: "VERIFY",
    description: "Relevant certification and documentation are reviewed against the requirement.",
  },
  {
    step: "04",
    title: "PRESENT",
    description: "You receive matched options with the information needed to make a decision.",
  },
];

function GemstonesVerticalPage() {
  return (
    <>
      {/* 01 — HERO + VISUAL (One major visual integrated into hero, no scroll interaction) */}
      <VerticalHero
        eyebrow="01 — GEMSTONES"
        title={
          <>
            Certified gemstones,
            <br />
            <span className="text-gold italic font-serif">
              sourced around your specification.
            </span>
          </>
        }
        description="Natural and certified stones sourced around your requirements — from colour and cut to size, origin and certification."
        ctaText="ENQUIRE ABOUT GEMSTONES"
        ctaTargetId="requirement-builder"
        subline="IGI and GIA certification as standard. Direct trade access, generational sourcing channels."
        image={gemstonesHero}
        imageAlt="Photorealistic cinematic gemstone visual showing natural rough and faceted stones"
      />

      {/* 02 — WHAT YOU NEED */}
      <section className="py-28 md:py-36 bg-background border-b hairline">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-4">02 — WHAT YOU NEED</p>
            <h2 className="display text-4xl sm:text-5xl md:text-6xl text-ivory max-w-3xl leading-[1.08]">
              You tell us the specification.
              <br />
              <span className="text-gold italic font-serif">We source to it.</span>
            </h2>
            <p className="mt-8 text-lg sm:text-xl text-ivory/80 max-w-2xl font-light leading-relaxed">
              Whether you need a particular stone, colour, size, grade or certification, we build the sourcing process around your requirement.
            </p>
          </Reveal>

          {/* 3 Pillars */}
          <div className="mt-16 grid gap-10 md:grid-cols-3 pt-12 border-t hairline">
            {whyItems.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 120} className="space-y-4">
                <h3 className="font-serif text-2xl text-ivory tracking-wide">{item.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — HOW WE WORK */}
      <section className="py-28 md:py-36 bg-[#080b10] border-b hairline">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-4">03 — HOW WE WORK</p>
            <h2 className="display text-4xl sm:text-5xl md:text-6xl text-ivory">
              From requirement to stone.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 pt-12 border-t hairline">
            {workSteps.map((s, idx) => (
              <Reveal key={s.step} delay={idx * 100} className="border-l hairline pl-6 space-y-3">
                <span className="font-serif text-4xl text-gold/70">{s.step}</span>
                <h3 className="font-serif text-2xl text-ivory tracking-wide">{s.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{s.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — SPECIFICATIONS */}
      <section className="py-28 md:py-36 bg-background border-b hairline">
        <div className="container-x grid gap-14 lg:grid-cols-2 items-start">
          <Reveal>
            <p className="eyebrow mb-4">04 — SPECIFICATIONS</p>
            <h2 className="display text-4xl sm:text-5xl text-ivory leading-[1.08]">
              Built around the details that matter.
            </h2>
          </Reveal>

          <div className="space-y-10 lg:pt-8">
            <Reveal delay={100} className="border-t hairline pt-6">
              <p className="eyebrow !text-gold mb-3">WHAT WE SOURCE</p>
              <p className="font-serif text-2xl sm:text-3xl text-ivory leading-snug">
                Emerald · Ruby · Sapphire · Diamond · Spinel · Tourmaline · Garnet · Opal · Other coloured gemstones
              </p>
            </Reveal>

            <Reveal delay={200} className="border-t hairline pt-6">
              <p className="eyebrow !text-gold mb-3">SPECIFICATIONS</p>
              <p className="text-lg text-muted-foreground font-light tracking-wide leading-relaxed">
                Colour · Cut · Shape · Size · Clarity · Origin · Certification · Quantity
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 05 — REQUIREMENT BUILDER */}
      <section id="requirement-builder" className="py-28 md:py-36 bg-[#080b10] border-b hairline">
        <div className="container-x max-w-5xl">
          <div className="mb-10">
            <p className="eyebrow mb-3">05 — REQUIREMENT BUILDER</p>
            <h2 className="display text-4xl sm:text-5xl text-ivory">
              Tell us what you're looking for.
            </h2>
          </div>
          <RequirementBuilder
            vertical="gemstones"
            title="Gemstone Sourcing Parameters"
            ctaText="REQUEST SOURCING"
          />
        </div>
      </section>

      {/* 06 — ENQUIRE */}
      <EnquirySection
        eyebrow="06 — ENQUIRE"
        title={
          <>
            Looking for something specific?
            <br />
            <span className="text-gold italic font-serif">Let's find it.</span>
          </>
        }
        copy="Send us your requirement, reference or specification and we'll take it from there."
        defaultInterest="Gemstones"
        cta="SEND ENQUIRY"
      />
    </>
  );
}

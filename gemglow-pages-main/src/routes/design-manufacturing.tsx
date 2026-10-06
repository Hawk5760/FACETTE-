import { createFileRoute } from "@tanstack/react-router";
import { VerticalHero } from "@/components/site/VerticalHero";
import { Reveal } from "@/components/site/Reveal";
import { RequirementBuilder } from "@/components/site/RequirementBuilder";
import { EnquirySection } from "@/components/site/EnquiryForm";
import { pageHead, breadcrumb } from "@/lib/seo";
import designMfgHero from "@/assets/design-manufacturing.jpg";

export const Route = createFileRoute("/design-manufacturing")({
  head: () =>
    pageHead({
      title: "Design & Manufacturing — Precision Fine Jewellery & Metal Craft | Facette & Co.",
      description:
        "Design development, technical engineering, prototyping and precision manufacturing for jewellery, metal objects and bespoke components. Concept to finished object.",
      path: "/design-manufacturing",
      jsonLd: breadcrumb("Design & Manufacturing", "/design-manufacturing"),
    }),
  component: DesignManufacturingPage,
});

const whyFacette = [
  {
    title: "DESIGN + ENGINEERING",
    description: "Creative intent is developed alongside technical feasibility.",
  },
  {
    title: "DEDICATED TECHNICAL EXPERTISE",
    description: "CAD designers, 3D development specialists and finishing experts work across the development process.",
  },
  {
    title: "PROTOTYPE BEFORE COMMITMENT",
    description: "A physical sample can be developed before larger production.",
  },
  {
    title: "FINISHING AS PART OF THE DESIGN",
    description: "Enamelling, plating, polishing, texturing and other surface treatments are considered as part of the object.",
  },
];

const developmentSteps = [
  { step: "01", title: "CONCEPT", description: "We understand your creative direction, reference material, application and intended outcome." },
  { step: "02", title: "CAD & 3D DEVELOPMENT", description: "Our CAD and 3D design team translates the concept into a precise digital model." },
  { step: "03", title: "TECHNICAL REFINEMENT", description: "Dimensions, tolerances, construction, assembly and production feasibility are reviewed." },
  { step: "04", title: "PROTOTYPE", description: "A sample can be developed to evaluate form, fit, functionality and finish." },
  { step: "05", title: "SURFACE & FINISH DEVELOPMENT", description: "Plating, enamelling, polishing, texturing and other finishing requirements are developed according to the desired result." },
  { step: "06", title: "PRODUCTION", description: "The approved specification moves into production." },
];

const capabilities = [
  {
    category: "DESIGN & CAD",
    items: "Jewellery CAD · 3D product modelling · Technical modelling · STL preparation · Design refinement · Production-ready digital files",
  },
  {
    category: "PRODUCT DEVELOPMENT",
    items: "Concept development · Design engineering · Prototyping · Sample development · Technical refinement · Production feasibility",
  },
  {
    category: "METAL MANUFACTURING",
    items: "Jewellery manufacturing · Bespoke metal objects · Custom components · Fashion hardware · Private-label production",
  },
  {
    category: "SURFACE & FINISHING",
    items: "Plating · Enamelling · Polishing · Brushing · Texturing · Surface treatments · Custom finishes",
  },
];

function DesignManufacturingPage() {
  return (
    <>
      {/* 01 — HERO + VISUAL (One major visual integrated into hero, no scroll interaction) */}
      <VerticalHero
        eyebrow="02 — DESIGN & MANUFACTURING"
        title={
          <>
            From concept to finished object,
            <br />
            <span className="text-gold italic font-serif">
              built around your vision.
            </span>
          </>
        }
        description="Design development, technical engineering, prototyping and precision manufacturing for jewellery, metal objects and bespoke components."
        ctaText="START A PROJECT"
        ctaTargetId="requirement-builder"
        subline="A multidisciplinary team brings together jewellery CAD, 3D modelling, technical development, prototyping, enamelling, plating and finishing expertise."
        image={designMfgHero}
        imageAlt="Master jewellery craftsman at atelier bench with sketches, wax models, casting and calipers"
      />

      {/* 02 — WHAT YOU NEED */}
      <section className="py-28 md:py-36 bg-background border-b hairline">
        <div className="container-x max-w-4xl">
          <Reveal>
            <p className="eyebrow mb-4">02 — WHAT YOU NEED</p>
            <h2 className="display text-4xl sm:text-5xl md:text-6xl text-ivory leading-[1.08]">
              You bring the idea.
              <br />
              <span className="text-gold italic font-serif">We develop everything around it.</span>
            </h2>
            <p className="mt-8 text-lg sm:text-xl text-ivory/80 font-light leading-relaxed">
              From an initial sketch, reference or concept to a production-ready piece, our technical and creative teams work together to translate the idea into a manufacturable object.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 03 — WHY FACETTE */}
      <section className="py-28 md:py-36 bg-[#080b10] border-b hairline">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-4">03 — WHY FACETTE</p>
            <h2 className="display text-4xl sm:text-5xl text-ivory">
              Good manufacturing starts before production.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 pt-12 border-t hairline">
            {whyFacette.map((w, idx) => (
              <Reveal key={w.title} delay={idx * 100} className="border-t hairline pt-6 space-y-3">
                <h3 className="font-serif text-xl text-ivory tracking-wide">{w.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{w.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — DEVELOPMENT PROCESS */}
      <section className="py-28 md:py-36 bg-background border-b hairline">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-4">04 — DEVELOPMENT PROCESS</p>
            <h2 className="display text-4xl sm:text-5xl md:text-6xl text-ivory">
              From idea to production-ready object.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-12 border-t hairline">
            {developmentSteps.map((s, idx) => (
              <Reveal key={s.step} delay={idx * 80} className="border-l hairline pl-6 space-y-3">
                <span className="font-serif text-4xl text-gold/70">{s.step}</span>
                <h3 className="font-serif text-2xl text-ivory tracking-wide">{s.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{s.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — CAPABILITIES */}
      <section className="py-28 md:py-36 bg-[#080b10] border-b hairline">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-4">05 — CAPABILITIES</p>
            <h2 className="display text-4xl sm:text-5xl md:text-6xl text-ivory">
              Designed with intention. Made with precision.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-2 pt-12 border-t hairline">
            {capabilities.map((cap, idx) => (
              <Reveal key={cap.category} delay={idx * 100} className="border-t hairline pt-6 space-y-3">
                <p className="eyebrow !text-gold">{cap.category}</p>
                <p className="font-serif text-2xl text-ivory leading-snug">{cap.items}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — DEVELOPMENT & CONFIDENTIALITY */}
      <section className="py-28 md:py-36 bg-background border-b hairline">
        <div className="container-x max-w-4xl space-y-12">
          <Reveal>
            <p className="eyebrow mb-4">06 — DEVELOPMENT &amp; CONFIDENTIALITY</p>
            <h2 className="display text-4xl sm:text-5xl text-ivory leading-[1.08]">
              Develop before you scale.
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-ivory/80 font-light leading-relaxed">
              A single-piece sample can be developed alongside the applicable development and production costs, allowing you to assess the design before moving into larger quantities.
            </p>
          </Reveal>

          <Reveal delay={150} className="pt-8 border-t hairline space-y-4">
            <h3 className="eyebrow !text-gold">YOUR IDEA REMAINS YOURS</h3>
            <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
              Where required, development can be undertaken under an NDA to maintain confidentiality around designs, concepts and product development.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 07 — REQUIREMENT BUILDER */}
      <section id="requirement-builder" className="py-28 md:py-36 bg-[#080b10] border-b hairline">
        <div className="container-x max-w-5xl">
          <div className="mb-10">
            <p className="eyebrow mb-3">07 — REQUIREMENT BUILDER</p>
            <h2 className="display text-4xl sm:text-5xl text-ivory">
              Tell us what you're creating.
            </h2>
          </div>
          <RequirementBuilder
            vertical="design-manufacturing"
            title="Design &amp; Manufacturing Specification"
            ctaText="DISCUSS YOUR PROJECT"
          />
        </div>
      </section>

      {/* 08 — ENQUIRE */}
      <EnquirySection
        eyebrow="08 — ENQUIRE"
        title={
          <>
            Have an idea worth making?
            <br />
            <span className="text-gold italic font-serif">Let's explore.</span>
          </>
        }
        copy="Send us your concept, reference or requirement and let's explore what it can become."
        defaultInterest="Design & Manufacturing"
        cta="START A CONVERSATION"
      />
    </>
  );
}

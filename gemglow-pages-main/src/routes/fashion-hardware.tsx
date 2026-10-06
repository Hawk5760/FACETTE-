import { createFileRoute } from "@tanstack/react-router";
import { VerticalHero } from "@/components/site/VerticalHero";
import { Reveal } from "@/components/site/Reveal";
import { RequirementBuilder } from "@/components/site/RequirementBuilder";
import { EnquirySection } from "@/components/site/EnquiryForm";
import { pageHead, breadcrumb } from "@/lib/seo";
import fashionHardwareHero from "@/assets/fashion-hardware.jpg";

export const Route = createFileRoute("/fashion-hardware")({
  head: () =>
    pageHead({
      title: "Fashion Hardware — Curated Luxury Metal Components | Facette & Co.",
      description:
        "Custom metal components developed for fashion, accessories and luxury products — without being confined to conventional categories. Curated, design-led metal craft.",
      path: "/fashion-hardware",
      jsonLd: breadcrumb("Fashion Hardware", "/fashion-hardware"),
    }),
  component: FashionHardwarePage,
});

const whyFacette = [
  {
    title: "CURATED, NOT COMMODITISED",
    description: "We focus on distinctive, design-led metal products rather than low-cost bulk commodity production.",
  },
  {
    title: "YOUR DESIGN REMAINS YOURS",
    description: "We respect the creative ownership behind every client project. Where required, development can be undertaken under NDA to protect confidentiality and agreed ownership rights.",
  },
  {
    title: "NO MOQ-FIRST APPROACH",
    description: "We don't begin the conversation by pushing a minimum order quantity. Sampling can start with a single piece alongside relevant development and production costs.",
  },
];

const workSteps = [
  { step: "01", title: "DEFINE", description: "Understand the product, application, dimensions and creative direction." },
  { step: "02", title: "DEVELOP", description: "Translate the concept into a considered metal component or accessory." },
  { step: "03", title: "SAMPLE", description: "A single-piece sample can be developed alongside applicable development and production costs." },
  { step: "04", title: "PRODUCE", description: "Once approved, the final design moves into production according to the agreed specification and quantity." },
];

function FashionHardwarePage() {
  return (
    <>
      {/* 01 — HERO + VISUAL (One major visual integrated into hero, no scroll interaction) */}
      <VerticalHero
        eyebrow="03 — FASHION HARDWARE"
        title={
          <>
            Hardware designed
            <br />
            <span className="text-gold italic font-serif">
              to become part of the product.
            </span>
          </>
        }
        description="Custom metal components developed for fashion, accessories and luxury products — without being confined to conventional categories."
        ctaText="ENQUIRE ABOUT HARDWARE"
        ctaTargetId="requirement-builder"
        subline="We don't compete with China on low-cost, high-volume commodity production. We specialise in curated, design-led metal products developed around your requirements."
        image={fashionHardwareHero}
        imageAlt="Sculptural luxury bespoke metal buckle with dark titanium and brushed gold finish"
      />

      {/* 02 — WHAT YOU NEED */}
      <section className="py-28 md:py-36 bg-background border-b hairline">
        <div className="container-x max-w-4xl">
          <Reveal>
            <p className="eyebrow mb-4">02 — WHAT YOU NEED</p>
            <h2 className="display text-4xl sm:text-5xl md:text-6xl text-ivory leading-[1.08]">
              You specify the vision.
              <br />
              <span className="text-gold italic font-serif">We develop the metal around it.</span>
            </h2>
            <div className="mt-8 space-y-5 text-lg sm:text-xl text-ivory/80 font-light leading-relaxed">
              <p>
                Our expertise lies in developing curated metal products for customers who value design, originality and execution.
              </p>
              <p className="text-muted-foreground text-base sm:text-lg">
                Your product does not have to fit an existing category. Our metal expertise allows us to develop accessories and components beyond conventional definitions — giving you the freedom to create something that can ultimately be named and defined by your brand.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — WHY FACETTE */}
      <section className="py-28 md:py-36 bg-[#080b10] border-b hairline">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-4">03 — WHY FACETTE</p>
            <h2 className="display text-4xl sm:text-5xl text-ivory">
              We don't believe every product needs a pre-existing name.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-3 pt-12 border-t hairline">
            {whyFacette.map((w, idx) => (
              <Reveal key={w.title} delay={idx * 100} className="border-t hairline pt-6 space-y-3">
                <h3 className="font-serif text-xl text-ivory tracking-wide">{w.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{w.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — HOW WE WORK */}
      <section className="py-28 md:py-36 bg-background border-b hairline">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-4">04 — HOW WE WORK</p>
            <h2 className="display text-4xl sm:text-5xl md:text-6xl text-ivory">
              Development before commitment.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 pt-12 border-t hairline">
            {workSteps.map((s, idx) => (
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
        <div className="container-x grid gap-14 lg:grid-cols-[1.1fr_1fr] items-start">
          <Reveal>
            <p className="eyebrow mb-4">05 — CAPABILITIES</p>
            <h2 className="display text-4xl sm:text-5xl text-ivory leading-[1.08]">
              If you can imagine it, we can explore it in metal.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
              There is no fixed vocabulary for what we create. Our metal expertise allows us to develop accessories and components according to the application, design language and imagination of the client.
            </p>
          </Reveal>

          <div className="space-y-10 lg:pt-8">
            <Reveal delay={100} className="border-t hairline pt-6">
              <p className="eyebrow !text-gold mb-3">WHAT WE CREATE</p>
              <p className="font-serif text-2xl sm:text-3xl text-ivory leading-snug">
                Buckles · Clasps · Hooks · Fasteners · Fittings · Closures · Ornamental hardware · Custom metal components · Bespoke metal accessories
              </p>
            </Reveal>

            <Reveal delay={200} className="border-t hairline pt-6">
              <p className="eyebrow !text-gold mb-3">SPECIFICATIONS</p>
              <p className="text-lg text-muted-foreground font-light tracking-wide leading-relaxed">
                Material · Dimensions · Mechanism · Finish · Texture · Engraving · Logo application · Quantity
              </p>
              <p className="mt-6 text-sm text-gold italic font-serif">
                Some pieces already have a name. Others are waiting for one.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 06 — REQUIREMENT BUILDER */}
      <section id="requirement-builder" className="py-28 md:py-36 bg-background border-b hairline">
        <div className="container-x max-w-5xl">
          <div className="mb-10">
            <p className="eyebrow mb-3">06 — REQUIREMENT BUILDER</p>
            <h2 className="display text-4xl sm:text-5xl text-ivory">
              Tell us what the component needs to do.
            </h2>
          </div>
          <RequirementBuilder
            vertical="fashion-hardware"
            title="Component Specification Engine"
            ctaText="REQUEST DEVELOPMENT"
          />
        </div>
      </section>

      {/* 07 — ENQUIRE */}
      <EnquirySection
        eyebrow="07 — ENQUIRE"
        title={
          <>
            Have a component in mind?
            <br />
            <span className="text-gold italic font-serif">Let's shape it.</span>
          </>
        }
        copy="It doesn't need to have a name yet. Share the idea, drawing, reference or application and let's explore what it can become."
        defaultInterest="Fashion Hardware"
        cta="ENQUIRE ABOUT HARDWARE"
      />
    </>
  );
}

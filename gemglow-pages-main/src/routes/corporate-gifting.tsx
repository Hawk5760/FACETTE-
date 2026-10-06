import { createFileRoute } from "@tanstack/react-router";
import { VerticalHero } from "@/components/site/VerticalHero";
import { Reveal } from "@/components/site/Reveal";
import { RequirementBuilder } from "@/components/site/RequirementBuilder";
import { EnquirySection } from "@/components/site/EnquiryForm";
import { pageHead, breadcrumb } from "@/lib/seo";
import corporateGiftingHero from "@/assets/corporate-gifting.jpg";

export const Route = createFileRoute("/corporate-gifting")({
  head: () =>
    pageHead({
      title: "Corporate Gifting — Bespoke Luxury Objects & Commemoratives | Facette & Co.",
      description:
        "Corporate gifts, made with intention. Custom-crafted fine metal objects designed around your brand, occasion and audience. Complete bespoke gifting experiences.",
      path: "/corporate-gifting",
      jsonLd: breadcrumb("Corporate Gifting", "/corporate-gifting"),
    }),
  component: CorporateGiftingPage,
});

const whyFacette = [
  {
    title: "BRAND-LED DESIGN",
    description: "Our dedicated designers develop concepts around your brand identity.",
  },
  {
    title: "CUSTOM CREATION",
    description: "The object can be developed specifically around your requirement.",
  },
  {
    title: "CONSIDERED EXPERIENCE",
    description: "The object, personalisation and presentation are treated as one complete experience.",
  },
];

const workSteps = [
  { step: "01", title: "UNDERSTAND", description: "We understand your brand, offering, audience, occasion and message." },
  { step: "02", title: "CONCEPTUALISE", description: "Our dedicated design team develops concepts aligned with your brand." },
  { step: "03", title: "CREATE", description: "The selected concept moves into development, customisation and production." },
  { step: "04", title: "PRESENT", description: "The finished object is prepared as a complete gifting experience." },
];

const applications = [
  {
    title: "EXECUTIVE GIFTING",
    description: "Considered objects for leadership, clients and key relationships.",
  },
  {
    title: "MILESTONES",
    description: "Bespoke pieces for anniversaries, achievements and important moments.",
  },
  {
    title: "BRAND EXPERIENCES",
    description: "Objects created for launches, events and VIP experiences.",
  },
  {
    title: "EMPLOYEE RECOGNITION",
    description: "Thoughtful pieces designed to recognise people and contribution.",
  },
  {
    title: "CUSTOM PROJECTS",
    description: "A concept developed specifically around your brand, audience and occasion.",
  },
];

function CorporateGiftingPage() {
  return (
    <>
      {/* 01 — HERO + VISUAL (One major visual integrated into hero, no scroll interaction) */}
      <VerticalHero
        eyebrow="04 — CORPORATE GIFTING"
        title={
          <>
            Corporate gifts,
            <br />
            <span className="text-gold italic font-serif">
              made with intention.
            </span>
          </>
        }
        description="Custom-crafted objects designed around your brand, occasion and audience."
        ctaText="PLAN YOUR GIFTING PROJECT"
        ctaTargetId="requirement-builder"
        subline="A dedicated team of designers works around your brand, its identity and the way it presents itself to the market."
        image={corporateGiftingHero}
        imageAlt="Bespoke sculptural executive metal desk piece resting inside a luxury velvet presentation box"
      />

      {/* 02 — WHAT YOU NEED */}
      <section className="py-28 md:py-36 bg-background border-b hairline">
        <div className="container-x max-w-4xl">
          <Reveal>
            <p className="eyebrow mb-4">02 — WHAT YOU NEED</p>
            <h2 className="display text-4xl sm:text-5xl md:text-6xl text-ivory leading-[1.08]">
              You bring the occasion.
              <br />
              <span className="text-gold italic font-serif">We create the object around your brand.</span>
            </h2>
            <p className="mt-8 text-lg sm:text-xl text-ivory/80 font-light leading-relaxed">
              Our dedicated design team develops gifting concepts around your company's identity, offerings, audience and position in the market.
            </p>
          </Reveal>

          {/* 3 Pillars */}
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

      {/* 03 — HOW WE WORK */}
      <section className="py-28 md:py-36 bg-[#080b10] border-b hairline">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-4">03 — HOW WE WORK</p>
            <h2 className="display text-4xl sm:text-5xl md:text-6xl text-ivory">
              From brand to bespoke object.
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

      {/* 04 — GIFTING APPLICATIONS */}
      <section className="py-28 md:py-36 bg-background border-b hairline">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-4">04 — GIFTING APPLICATIONS</p>
            <h2 className="display text-4xl sm:text-5xl text-ivory">
              Gifts that feel like your brand.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-12 border-t hairline">
            {applications.map((app, idx) => (
              <Reveal key={app.title} delay={idx * 80} className="border-t hairline pt-6 space-y-3">
                <h3 className="font-serif text-2xl text-ivory tracking-wide">{app.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{app.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — REQUIREMENT BUILDER */}
      <section id="requirement-builder" className="py-28 md:py-36 bg-[#080b10] border-b hairline">
        <div className="container-x max-w-5xl">
          <div className="mb-10">
            <p className="eyebrow mb-3">05 — REQUIREMENT BUILDER</p>
            <h2 className="display text-4xl sm:text-5xl text-ivory">
              Tell us what you're planning.
            </h2>
          </div>
          <RequirementBuilder
            vertical="corporate-gifting"
            title="Corporate Gifting Project Brief"
            ctaText="DISCUSS YOUR GIFTING PROJECT"
          />
        </div>
      </section>

      {/* 06 — ENQUIRE */}
      <EnquirySection
        eyebrow="06 — ENQUIRE"
        title={
          <>
            Planning something worth remembering?
            <br />
            <span className="text-gold italic font-serif">Let's shape it.</span>
          </>
        }
        copy="Tell us about your brand, the occasion, the people and the experience you want to create. Our design team will help shape the right object around it."
        defaultInterest="Corporate Gifting"
        cta="START A GIFTING CONVERSATION"
      />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => pageHead({
    title: "Contact & Enquiries — Begin the Conversation",
    description: "Send Facette & Co. your gemstone, jewellery, fashion hardware or corporate gifting requirement. Every enquiry is reviewed personally by our team.",
    path: "/contact",
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="pb-28 pt-40">
      <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow">Begin the conversation</p>
          <h1 className="display mt-6 text-6xl md:text-7xl">Every great object begins with <em className="text-gold">an idea.</em></h1>
          <p className="mt-8 max-w-md text-lg text-muted-foreground">
            Whether you have a finished specification, a reference, a rough concept or simply a requirement — start the conversation.
          </p>
          <p className="mt-4 max-w-md text-muted-foreground">Every enquiry is reviewed personally and directed to the right capability.</p>
          <ul className="mt-12 grid grid-cols-2 gap-6 border-t hairline pt-8">
            {[["Surat", "India"], ["Jaipur", "India"], ["Dubai", "UAE"], ["Antwerp", "Belgium"]].map(([c, k]) => (
              <li key={c}><p className="font-serif text-2xl">{c}</p><p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">{k}</p></li>
            ))}
          </ul>
        </div>
        <EnquiryForm />
      </div>
    </section>
  );
}

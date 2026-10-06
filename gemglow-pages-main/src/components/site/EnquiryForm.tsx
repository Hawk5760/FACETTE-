import { useState, type FormEvent, type ChangeEvent } from "react";
import { Upload, CheckCircle2 } from "lucide-react";

const interests = [
  "Gemstones",
  "Design & Manufacturing",
  "Fashion Hardware",
  "Corporate Gifting",
  "Multiple / Not sure",
];

const sources = [
  "Referral",
  "LinkedIn",
  "Instagram",
  "Exhibition",
  "Search",
  "Other",
];

export function EnquiryForm({
  defaultInterest = "",
  cta = "SEND ENQUIRY",
}: {
  defaultInterest?: string | undefined;
  cta?: string | undefined;
}) {
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="border hairline p-10 md:p-14 bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-3 text-gold">
          <CheckCircle2 size={24} strokeWidth={1.5} />
          <p className="eyebrow">Enquiry Received</p>
        </div>
        <p className="display mt-4 text-3xl sm:text-4xl text-ivory">
          Thank you. Your message has reached our executive desk.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Every enquiry is reviewed personally and directed to the appropriate capability within our gemstone and manufacturing house.
        </p>
        <p className="mt-8 text-[0.68rem] uppercase tracking-[0.26em] text-gold font-medium">
          YOUR REQUIREMENT WILL BE REVIEWED BY OUR TEAM.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 md:grid-cols-2">
      {/* FULL NAME */}
      <label className="block">
        <span className="field-label">Full Name</span>
        <input
          required
          name="name"
          className="field"
          placeholder="Your full name"
          autoComplete="name"
        />
      </label>

      {/* EMAIL */}
      <label className="block">
        <span className="field-label">Email Address</span>
        <input
          required
          type="email"
          name="email"
          className="field"
          placeholder="your.name@company.com"
          autoComplete="email"
        />
      </label>

      {/* COMPANY & ROLE */}
      <label className="block">
        <span className="field-label">Company &amp; Role</span>
        <input
          name="company"
          className="field"
          placeholder="Company name · Your role"
        />
      </label>

      {/* COUNTRY / REGION */}
      <label className="block">
        <span className="field-label">Country / Region</span>
        <input
          name="country"
          className="field"
          placeholder="Country or region"
        />
      </label>

      {/* PRODUCT INTEREST */}
      <label className="block md:col-span-2">
        <span className="field-label">Product Interest</span>
        <select
          name="interest"
          defaultValue={defaultInterest}
          className="field"
        >
          <option value="" disabled>
            Select your interest
          </option>
          {interests.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </label>

      {/* PROJECT / REQUIREMENT */}
      <label className="block md:col-span-2">
        <span className="field-label">Project / Requirement</span>
        <textarea
          name="message"
          rows={3}
          className="field resize-none"
          placeholder="Tell us what you're looking to create, source or develop."
        />
      </label>

      {/* REFERENCE / BRIEF (OPTIONAL FILE UPLOAD) */}
      <div className="block md:col-span-2">
        <span className="field-label">Reference / Brief</span>
        <label className="field flex items-center justify-between cursor-pointer py-3 text-sm">
          <span className="truncate text-muted-foreground">
            {fileName || "Upload a reference, specification or brief"}
          </span>
          <Upload size={16} className="text-gold shrink-0 ml-2" />
          <input
            type="file"
            name="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.png,.jpg,.jpeg,.stl,.step,.ai"
          />
        </label>
      </div>

      {/* HOW DID YOU HEAR ABOUT US? */}
      <label className="block md:col-span-2">
        <span className="field-label">How did you hear about us?</span>
        <select name="source" defaultValue="" className="field">
          <option value="" disabled>
            Select
          </option>
          {sources.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      {/* FORM CTA: Large full-width muted gold button */}
      <div className="md:col-span-2 pt-2">
        <button
          type="submit"
          className="btn-gold w-full justify-center !py-5 text-xs tracking-[0.28em]"
        >
          {cta} →
        </button>
        <p className="mt-4 text-center text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
          YOUR REQUIREMENT WILL BE REVIEWED BY OUR TEAM.
        </p>
      </div>
    </form>
  );
}

export function EnquirySection({
  eyebrow = "BEGIN THE CONVERSATION",
  title = (
    <>
      Every great object
      <br />
      begins with
      <br />
      <span className="text-gold italic">an idea.</span>
    </>
  ),
  copy = "Whether you have a finished specification, a reference, a rough concept or simply a requirement — start the conversation.",
  additionalLine = "Every enquiry is reviewed personally and directed to the right capability.",
  locationLine = "INDIA · GLOBAL B2B ENQUIRIES",
  defaultInterest,
  cta = "SEND ENQUIRY",
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  copy?: string;
  additionalLine?: string;
  locationLine?: string;
  defaultInterest?: string | undefined;
  cta?: string | undefined;
}) {
  return (
    <section id="enquire" className="border-t hairline py-32 bg-background relative overflow-hidden" aria-label="Enquiry">
      <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.2fr] items-start">
        {/* Left Side: Large editorial statement */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold/70" />
            <p className="eyebrow !text-gold tracking-[0.32em]">{eyebrow}</p>
          </div>

          <h2 className="display text-5xl sm:text-6xl md:text-7xl text-ivory leading-[1.05]">
            {title}
          </h2>

          <p className="mt-8 max-w-md text-lg text-ivory/80 font-light leading-relaxed">
            {copy}
          </p>

          {additionalLine && (
            <p className="text-sm text-muted-foreground max-w-md border-l hairline pl-4">
              {additionalLine}
            </p>
          )}

          {locationLine && (
            <p className="pt-6 text-[0.68rem] uppercase tracking-[0.32em] text-gold font-medium">
              {locationLine}
            </p>
          )}
        </div>

        {/* Right Side: Structured enquiry form */}
        <div className="bg-card/25 border hairline p-8 sm:p-12 backdrop-blur-sm">
          <EnquiryForm defaultInterest={defaultInterest} cta={cta} />
        </div>
      </div>
    </section>
  );
}

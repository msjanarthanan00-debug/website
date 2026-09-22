import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, subtitle, align = "center", light = false }) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col ${alignClass} mb-16 ${align === "center" ? "mx-auto" : ""}`}>
      {eyebrow && (
        <Reveal>
          <span className={`text-xs tracking-[0.25em] uppercase mb-5 ${light ? "text-beauty-champagne" : "text-beauty-gold"}`}>
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2 className={`font-serif text-4xl md:text-6xl leading-[1.05] ${light ? "text-white" : "text-beauty-charcoal"}`}>
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className={`mt-6 max-w-xl text-base leading-relaxed ${light ? "text-white/70" : "text-beauty-charcoal/60"}`}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
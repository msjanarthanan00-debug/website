import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { packages } from "@/config/brand";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Packages() {
  return (
    <section id="packages" className="py-24 md:py-40 px-6 lg:px-12 bg-beauty-ivory">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeading
          eyebrow="Packages"
          title="The Collections"
          subtitle="Thoughtfully curated packages for every occasion. Contact for bespoke pricing tailored to your event."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`relative h-full flex flex-col p-8 lg:p-10 ${
                  pkg.featured
                    ? "bg-beauty-charcoal text-white"
                    : "bg-white text-beauty-charcoal border border-beauty-charcoal/8"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute top-0 right-0 bg-beauty-gold text-white text-[10px] tracking-[0.2em] uppercase px-4 py-2">
                    Most Loved
                  </span>
                )}
                <h3 className="font-serif text-3xl">{pkg.name}</h3>
                <p className={`mt-2 text-sm ${pkg.featured ? "text-white/60" : "text-beauty-charcoal/50"}`}>{pkg.tagline}</p>

                <div className={`my-8 h-px ${pkg.featured ? "bg-white/15" : "bg-beauty-charcoal/10"}`} />

                <ul className="flex-1 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <Check size={15} className={pkg.featured ? "text-beauty-gold" : "text-beauty-gold"} />
                      <span className={pkg.featured ? "text-white/85" : "text-beauty-charcoal/75"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className={`mt-8 pt-6 border-t ${pkg.featured ? "border-white/15" : "border-beauty-charcoal/10"}`}>
                  <p className={`text-xs tracking-[0.2em] uppercase ${pkg.featured ? "text-white/50" : "text-beauty-charcoal/40"}`}>Contact for Pricing</p>
                  <a
                    href="#booking"
                    onClick={(e) => { e.preventDefault(); document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }); }}
                    className={`mt-4 inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase group ${
                      pkg.featured ? "text-beauty-gold" : "text-beauty-charcoal"
                    }`}
                  >
                    Book This Package <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
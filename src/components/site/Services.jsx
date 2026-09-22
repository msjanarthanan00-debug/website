import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/config/brand";
import { Image } from "@/components/ui/image";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-40 px-6 lg:px-12 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeading
          eyebrow="Services"
          title="The Artistry"
          subtitle="A curated collection of makeup and styling services, each crafted to make your moment unforgettable."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <Reveal key={service.name} delay={(i % 4) * 0.08}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden bg-beauty-ivory h-full flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fittingType="fill"
                    className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-beauty-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif text-2xl text-beauty-charcoal">{service.name}</h3>
                  <p className="mt-3 text-sm text-beauty-charcoal/60 leading-relaxed flex-1">{service.desc}</p>
                  <a
                    href="#booking"
                    onClick={(e) => { e.preventDefault(); document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }); }}
                    className="mt-5 inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-beauty-gold group-hover:gap-3 transition-all duration-300"
                  >
                    Learn More <ArrowRight size={14} />
                  </a>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
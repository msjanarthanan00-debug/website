import { motion } from "framer-motion";
import { brand } from "@/config/brand";
import { Image } from "@/components/ui/image";
import Reveal from "./Reveal";

export default function Bridal() {
  const images = [brand.images.hero, brand.images.bridalEye, brand.images.hair, brand.images.saree];

  return (
    <section id="bridal" className="py-24 md:py-40 px-6 lg:px-12 bg-beauty-charcoal text-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text */}
        <div>
          <Reveal>
            <span className="text-beauty-gold uppercase tracking-[0.25em] text-xs mb-5 block">Bridal</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05]">
              Your Special Day.<br />Your Signature Look.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-white/70 leading-relaxed max-w-md">
              From the first brushstroke to the final touch-up, your bridal look is crafted to be timeless, radiant, and entirely yours. Every detail — makeup, eyes, hair, and saree — harmonized into one unforgettable vision.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a href="#booking" onClick={(e) => { e.preventDefault(); document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }); }}
              className="mt-10 inline-flex items-center justify-center gap-2 border border-white/40 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-beauty-charcoal transition-all duration-500">
              Discuss Your Bridal Look
            </a>
          </Reveal>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.4 }} className={`relative overflow-hidden ${i % 2 === 0 ? "mt-8" : ""}`}>
                <Image
                  src={img}
                  alt="Bridal makeup and styling"
                  fittingType="fill"
                  className="w-full aspect-[3/4] object-cover"
                />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
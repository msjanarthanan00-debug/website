import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/config/brand";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(t);
  }, [count]);

  const t = testimonials[index];

  return (
    <section className="py-24 md:py-40 px-6 lg:px-12 bg-white">
      <div className="max-w-[900px] mx-auto text-center">
        <SectionHeading eyebrow="Testimonials" title="Kind Words" />

        <Reveal>
          <div className="relative min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <Quote className="text-beauty-gold/40" size={40} />
                <div className="mt-6 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-beauty-gold text-beauty-gold" />
                  ))}
                </div>
                <p className="mt-6 font-serif text-2xl md:text-3xl leading-relaxed text-beauty-charcoal italic">
                  “{t.text}”
                </p>
                <p className="mt-8 text-xs tracking-[0.25em] uppercase text-beauty-gold">— {t.name}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button onClick={() => setIndex((i) => (i - 1 + count) % count)} className="p-2 text-beauty-charcoal/40 hover:text-beauty-gold transition-colors" aria-label="Previous testimonial">
            <ChevronLeft size={22} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 transition-all duration-300 ${i === index ? "w-8 bg-beauty-gold" : "w-1.5 bg-beauty-charcoal/20"}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={() => setIndex((i) => (i + 1) % count)} className="p-2 text-beauty-charcoal/40 hover:text-beauty-gold transition-colors" aria-label="Next testimonial">
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
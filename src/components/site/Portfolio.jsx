import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { portfolio, portfolioCategories } from "@/config/brand";
import { Image } from "@/components/ui/image";
import Reveal from "./Reveal";

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === "All" ? portfolio : portfolio.filter((p) => p.category === active);

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(() => setLightbox((i) => (i === null ? i : (i + 1) % filtered.length)), [filtered.length]);
  const prev = useCallback(() => setLightbox((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length)), [filtered.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox, close, next, prev]);

  return (
    <section id="portfolio" className="py-24 md:py-40 px-6 lg:px-12 bg-beauty-ivory">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Reveal>
            <span className="text-beauty-gold uppercase tracking-[0.25em] text-xs mb-5 block">Portfolio</span>
            <h2 className="font-serif text-4xl md:text-6xl text-beauty-charcoal leading-[1.05]">The Gallery</h2>
            <p className="mt-6 text-beauty-charcoal/60 leading-relaxed">
              A curated selection of looks — each one a study in light, color, and the art of enhancement.
            </p>
          </Reveal>
        </div>

        {/* Filters + count */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-6 border-b border-beauty-charcoal/10">
            <div className="flex flex-wrap gap-2">
              {portfolioCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-4 py-2 text-[11px] tracking-[0.15em] uppercase transition-all duration-300 border ${
                    active === cat
                      ? "bg-beauty-charcoal text-white border-beauty-charcoal"
                      : "bg-transparent text-beauty-charcoal/60 border-beauty-charcoal/15 hover:border-beauty-gold hover:text-beauty-gold"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="text-beauty-charcoal/40 text-xs tracking-[0.2em] uppercase">
              {filtered.length} {filtered.length === 1 ? "Look" : "Looks"}
            </span>
          </div>
        </Reveal>

        {/* Editorial grid */}
        <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => {
              const isFeatured = item.featured && active === "All";
              const span = isFeatured ? "lg:col-span-2 lg:row-span-2" : "";
              return (
                <motion.button
                  layout
                  key={`${item.url}-${i}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setLightbox(i)}
                  className={`group relative overflow-hidden block ${span}`}
                >
                  <div className={`relative w-full ${isFeatured ? "aspect-[4/5] lg:aspect-auto lg:h-full min-h-[400px]" : "aspect-[3/4]"}`}>
                    <Image
                      src={item.url}
                      alt={item.alt}
                      fittingType="fill"
                      className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-beauty-charcoal/80 via-beauty-charcoal/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                    {/* Category tag */}
                    <span className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase text-white/90 bg-beauty-charcoal/40 backdrop-blur-sm px-3 py-1 border border-white/10">
                      {item.category}
                    </span>
                    {/* Zoom icon */}
                    <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <ZoomIn size={14} />
                    </span>
                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-left translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-serif text-xl md:text-2xl text-white leading-tight">{item.title}</h3>
                      <span className="flex items-center gap-2 text-beauty-gold text-[10px] tracking-[0.2em] uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <ZoomIn size={11} /> View Look
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <Reveal>
          <div className="text-center mt-14">
            <a href="#booking" onClick={(e) => { e.preventDefault(); document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-beauty-charcoal border-b border-beauty-gold pb-1 hover:text-beauty-gold transition-colors">
              Book Your Signature Look
            </a>
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-beauty-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={close}
          >
            <button className="absolute top-6 right-6 text-white/80 hover:text-white p-2 z-10" onClick={close} aria-label="Close">
              <X size={28} />
            </button>
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 z-10"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              <ChevronLeft size={32} />
            </button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].url}
                alt={filtered[lightbox].alt}
                fittingType="fit"
                className="w-full max-h-[75vh] object-contain"
              />
              <div className="text-center mt-5">
                <span className="text-beauty-gold text-[10px] tracking-[0.25em] uppercase">{filtered[lightbox].category}</span>
                <h3 className="font-serif text-2xl md:text-3xl text-white mt-1">{filtered[lightbox].title}</h3>
                <p className="text-white/50 text-sm mt-2 italic font-serif text-lg max-w-xl">{filtered[lightbox].alt}</p>
              </div>
            </motion.div>
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 z-10"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
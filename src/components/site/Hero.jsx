import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { brand } from "@/config/brand";
import { Image } from "@/components/ui/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-beauty-ivory overflow-hidden flex flex-col md:flex-row">
      {/* Left typography side */}
      <div className="w-full md:w-2/5 flex flex-col justify-center px-6 md:px-12 lg:px-16 z-10 pt-24 md:pt-0 pb-12 md:pb-0">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-beauty-gold uppercase tracking-[0.25em] text-xs mb-5"
        >
          {brand.tagline}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="font-serif text-6xl md:text-7xl lg:text-8xl text-beauty-charcoal leading-[0.95]"
        >
          {brand.name}
          <span className="text-beauty-gold">.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 text-beauty-charcoal/70 text-lg max-w-sm italic font-serif text-xl"
        >
          “{brand.quote}”
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a href="#booking" onClick={(e) => { e.preventDefault(); document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-primary">
            Book Your Appointment
          </a>
          <a href="#portfolio" onClick={(e) => { e.preventDefault(); document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-outline">
            View My Work
          </a>
        </motion.div>
      </div>

      {/* Right image side */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:w-3/5 h-[55vh] md:h-screen relative"
      >
        <Image
          src={brand.images.hero}
          alt="Bridal makeup featuring soft rose-gold eyeshadow and matte nude lips"
          fittingType="fill"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-beauty-ivory via-beauty-ivory/10 to-transparent hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-beauty-ivory/40 to-transparent md:hidden" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-beauty-charcoal/50"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
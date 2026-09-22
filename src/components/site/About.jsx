import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { brand } from "@/config/brand";
import { Image } from "@/components/ui/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const stepTime = 16;
    const steps = duration / stepTime;
    const inc = value / steps;
    const timer = setInterval(() => {
      start += inc;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 md:py-40 px-6 lg:px-12 bg-beauty-ivory">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <Reveal>
          <div className="relative">
            <div className="absolute -left-4 -top-4 w-24 h-24 border border-beauty-gold/40 hidden md:block" />
            <Image
              src={brand.images.artist}
              alt="Professional makeup artist portrait"
              fittingType="fill"
              className="w-full aspect-[3/4] object-cover"
            />
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-beauty-champagne/30 -z-10 hidden md:block" />
          </div>
        </Reveal>

        {/* Text */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="About"
            title="Beauty is not about changing who you are. It's about bringing out the best version of you."
          />
          <Reveal delay={0.2}>
            <p className="mt-2 text-beauty-charcoal/70 leading-relaxed text-base">
              With over eight years of artistry behind the brush, {brand.name} has become a trusted name in bridal and editorial makeup. Every face is a canvas, and every look is tailored to enhance your natural features with precision, warmth, and an editorial eye for detail.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-4 text-beauty-charcoal/70 leading-relaxed text-base">
              Specializing in bridal, reception, and HD makeup, the philosophy is simple: flawless, long-lasting, photo-ready beauty that feels like you — only elevated. A calm, personal approach ensures you feel relaxed, confident, and radiant on your most important days.
            </p>
          </Reveal>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-8">
            {brand.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.1 * i}>
                <div className="border-l border-beauty-gold/40 pl-4">
                  <div className="font-serif text-4xl md:text-5xl text-beauty-charcoal">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-xs tracking-[0.18em] uppercase text-beauty-charcoal/50">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
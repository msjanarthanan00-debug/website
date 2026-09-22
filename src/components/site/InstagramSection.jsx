import { Instagram } from "lucide-react";
import { brand, portfolio } from "@/config/brand";
import { Image } from "@/components/ui/image";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function InstagramSection() {
  const grid = portfolio.slice(0, 6);

  return (
    <section className="py-24 md:py-40 px-6 lg:px-12 bg-beauty-ivory">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeading eyebrow="Social" title="Follow the Beauty Journey" subtitle="A glimpse of the everyday artistry — follow along for the latest looks and behind-the-scenes moments." />

        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {grid.map((item, i) => (
              <a
                key={i}
                href={brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden"
              >
                <Image src={item.url} alt={item.alt} fittingType="fill" className="w-full h-full transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-beauty-charcoal/0 group-hover:bg-beauty-charcoal/50 transition-colors duration-500 flex items-center justify-center">
                  <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" size={22} />
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <a
              href={brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <Instagram size={16} /> Follow on Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
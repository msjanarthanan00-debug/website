import { useRef, useState, useCallback } from "react";
import { brand } from "@/config/brand";
import { Image } from "@/components/ui/image";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const update = useCallback((clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const onMove = (e) => { if (dragging.current) update(e.touches ? e.touches[0].clientX : e.clientX); };
  const onDown = (e) => { dragging.current = true; update(e.touches ? e.touches[0].clientX : e.clientX); };
  const onUp = () => { dragging.current = false; };

  return (
    <section className="py-24 md:py-40 px-6 lg:px-12 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeading eyebrow="Transformation" title="The Transformation" subtitle="Drag to reveal the artistry — see the difference a master's touch makes." />

        <Reveal>
          <div
            ref={containerRef}
            className="relative w-full aspect-[16/10] overflow-hidden select-none cursor-ew-resize"
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseUp={onUp}
            onMouseLeave={onUp}
            onTouchStart={onDown}
            onTouchMove={onMove}
            onTouchEnd={onUp}
          >
            {/* After (full) */}
            <Image src={brand.images.after} alt="After makeup transformation" fittingType="fill" className="absolute inset-0 w-full h-full object-cover" />
            {/* Before (clipped) */}
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
              <div className="relative w-full h-full" style={{ width: containerRef.current?.clientWidth || "100%" }}>
                <Image src={brand.images.before} alt="Before makeup" fittingType="fill" className="absolute inset-0 w-full h-full object-cover" style={{ width: containerRef.current?.clientWidth || "100%" }} />
              </div>
            </div>

            {/* Labels */}
            <span className="absolute top-4 left-4 text-[10px] tracking-[0.25em] uppercase text-white bg-beauty-charcoal/50 backdrop-blur px-3 py-1.5">Before</span>
            <span className="absolute top-4 right-4 text-[10px] tracking-[0.25em] uppercase text-white bg-beauty-charcoal/50 backdrop-blur px-3 py-1.5">After</span>

            {/* Handle */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-beauty-gold" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border border-beauty-gold">
                <span className="text-beauty-gold text-xs">⟷</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
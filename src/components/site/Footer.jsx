import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { brand, services } from "@/config/brand";

export default function Footer() {
  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/#about" },
    { label: "Services", path: "/#services" },
    { label: "Portfolio", path: "/#portfolio" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/#contact" },
  ];

  return (
    <footer className="bg-beauty-charcoal text-white pt-20 pb-8 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
        {/* Brand */}
        <div>
          <span className="font-serif text-3xl">{brand.logoText}<span className="text-beauty-gold">.</span></span>
          <p className="mt-4 text-white/50 text-sm">{brand.tagline}</p>
          <p className="mt-4 text-white/40 text-sm italic font-serif text-lg max-w-xs">“{brand.quote}”</p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-xs tracking-[0.2em] uppercase text-beauty-gold mb-5">Quick Links</h4>
          <ul className="space-y-3">
            {quickLinks.map((l) => (
              <li key={l.label}>
                {l.path.startsWith("/#") ? (
                  <a href={l.path} className="text-white/60 hover:text-white text-sm transition-colors">{l.label}</a>
                ) : (
                  <Link to={l.path} className="text-white/60 hover:text-white text-sm transition-colors">{l.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs tracking-[0.2em] uppercase text-beauty-gold mb-5">Services</h4>
          <ul className="space-y-3">
            {services.slice(0, 5).map((s) => (
              <li key={s.name}><a href="#services" onClick={(e)=>{e.preventDefault();document.getElementById("services")?.scrollIntoView({behavior:"smooth"});}} className="text-white/60 hover:text-white text-sm transition-colors">{s.name}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs tracking-[0.2em] uppercase text-beauty-gold mb-5">Contact</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex items-center gap-3"><Phone size={14} className="text-beauty-gold" /> {brand.phone}</li>
            <li className="flex items-center gap-3"><Mail size={14} className="text-beauty-gold" /> {brand.email}</li>
            <li className="flex items-center gap-3"><MapPin size={14} className="text-beauty-gold" /> {brand.location}</li>
          </ul>
          <div className="flex gap-3 mt-6">
            <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-beauty-gold hover:border-beauty-gold transition-all" aria-label="Instagram"><Instagram size={14} /></a>
            <a href={brand.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-beauty-gold hover:border-beauty-gold transition-all" aria-label="Facebook"><Facebook size={14} /></a>
            <a href={brand.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-beauty-gold hover:border-beauty-gold transition-all" aria-label="YouTube"><Youtube size={14} /></a>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/40 text-xs tracking-wide">© 2026 {brand.name}. All Rights Reserved.</p>
        <p className="text-white/40 text-xs tracking-wide">Crafted with care for the art of beauty.</p>
      </div>
    </footer>
  );
}
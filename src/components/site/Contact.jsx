import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock, Instagram, Facebook, Youtube, Send, CheckCircle2 } from "lucide-react";
import { brand } from "@/config/brand";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { api } from "@/api";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.createContact(form);
      setSent(true);
    } catch (err) {
      setError(err.message || "Unable to send your message. Please try again.");
    }
  };

  const details = [
    { icon: Phone, label: "Phone", value: brand.phone, href: `tel:${brand.phone.replace(/\s/g, "")}` },
    { icon: MessageCircle, label: "WhatsApp", value: `+${brand.whatsapp}`, href: `https://wa.me/${brand.whatsapp}` },
    { icon: Mail, label: "Email", value: brand.email, href: `mailto:${brand.email}` },
    { icon: MapPin, label: "Location", value: brand.location },
    { icon: Clock, label: "Working Hours", value: brand.hours },
  ];

  const inputClass = "w-full bg-transparent border-b border-beauty-charcoal/15 py-3 px-0 text-beauty-charcoal placeholder:text-beauty-charcoal/40 focus:border-beauty-gold outline-none transition-colors text-sm";

  return (
    <section id="contact" className="py-24 md:py-40 px-6 lg:px-12 bg-beauty-ivory">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: details */}
        <div>
          <SectionHeading align="left" eyebrow="Contact" title="Let's Create Together" subtitle="Have a question or want to discuss a look? Reach out — we would love to hear from you." />

          <div className="mt-4 space-y-6">
            {details.map((d, i) => {
              const Inner = (
                <div className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-full border border-beauty-gold/40 flex items-center justify-center text-beauty-gold shrink-0 group-hover:bg-beauty-gold group-hover:text-white transition-colors duration-300">
                    <d.icon size={17} />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-beauty-charcoal/50">{d.label}</div>
                    <div className="mt-1 text-beauty-charcoal">{d.value}</div>
                  </div>
                </div>
              );
              return (
                <Reveal key={d.label} delay={i * 0.05}>
                  {d.href ? <a href={d.href} target={d.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{Inner}</a> : Inner}
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="flex gap-4 mt-10">
              <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-beauty-charcoal/15 flex items-center justify-center text-beauty-charcoal/70 hover:bg-beauty-charcoal hover:text-white hover:border-beauty-charcoal transition-all duration-300" aria-label="Instagram"><Instagram size={16} /></a>
              <a href={brand.facebook} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-beauty-charcoal/15 flex items-center justify-center text-beauty-charcoal/70 hover:bg-beauty-charcoal hover:text-white hover:border-beauty-charcoal transition-all duration-300" aria-label="Facebook"><Facebook size={16} /></a>
              <a href={brand.youtube} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-beauty-charcoal/15 flex items-center justify-center text-beauty-charcoal/70 hover:bg-beauty-charcoal hover:text-white hover:border-beauty-charcoal transition-all duration-300" aria-label="YouTube"><Youtube size={16} /></a>
            </div>
          </Reveal>
        </div>

        {/* Right: form */}
        <Reveal delay={0.1}>
          <div className="glass p-8 lg:p-10">
            {sent ? (
              <div className="flex flex-col items-center text-center py-12">
                <CheckCircle2 className="text-beauty-gold" size={44} />
                <h3 className="font-serif text-3xl mt-6 text-beauty-charcoal">Message Sent</h3>
                <p className="mt-3 text-beauty-charcoal/60 text-sm">Thank you for reaching out. We will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3 rounded-sm">{error}</p>}
                <div><label className="text-[10px] tracking-[0.2em] uppercase text-beauty-charcoal/50">Name</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Your name" /></div>
                <div><label className="text-[10px] tracking-[0.2em] uppercase text-beauty-charcoal/50">Email</label><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="you@email.com" /></div>
                <div><label className="text-[10px] tracking-[0.2em] uppercase text-beauty-charcoal/50">Message</label><textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass + " resize-none"} placeholder="How can we help?" /></div>
                <button type="submit" className="btn-primary w-full"><Send size={15} /> Send Message</button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
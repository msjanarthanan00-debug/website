import { useState } from "react";
import { MessageCircle, Send, CheckCircle2, CalendarCheck, Clock, ShieldCheck, Sparkles, ChevronRight } from "lucide-react";
import { brand } from "@/config/brand";
import Reveal from "./Reveal";
import { api } from "@/api";

const eventTypes = ["Bridal", "Reception", "Engagement", "Party", "HD Makeup", "Hair Styling", "Other"];
const styles = ["Natural", "Soft Glam", "Bold Glam", "Traditional", "Editorial"];

const steps = [
  { num: "01", title: "Share Your Details", desc: "Tell us about your event and vision." },
  { num: "02", title: "We Confirm & Consult", desc: "We review your request and reach out within 24 hours." },
  { num: "03", title: "You Glow On The Day", desc: "Relax while we craft your signature look." },
];

const assurances = [
  { icon: Clock, label: "Reply within 24 hours" },
  { icon: ShieldCheck, label: "No obligation consultation" },
  { icon: Sparkles, label: "Premium products & hygiene" },
];

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", date: "", eventType: "", location: "", style: "", people: "", message: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.createBooking(form);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Unable to submit your request. Please try again.");
    }
  };

  const whatsappLink = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
    `Hi ${brand.name}, I'd like to book an appointment.\nName: ${form.name || "-"}\nEvent: ${form.eventType || "-"}\nDate: ${form.date || "-"}\nLocation: ${form.location || "-"}`
  )}`;

  const inputClass =
    "w-full bg-white/5 border border-white/15 px-4 py-3 text-beauty-charcoal text-white placeholder:text-white/35 focus:border-beauty-gold focus:bg-white/10 outline-none transition-all text-sm rounded-sm";
  const labelClass = "text-[10px] tracking-[0.22em] uppercase text-white/50 mb-2 block";

  return (
    <section id="booking" className="py-24 md:py-40 px-6 lg:px-12 bg-beauty-charcoal text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 signature-line opacity-50" />
      <div className="max-w-[1240px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <span className="text-beauty-gold uppercase tracking-[0.25em] text-xs mb-5 block">Reserve Your Date</span>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05]">Book Your Appointment</h2>
            <p className="mt-6 text-white/60 leading-relaxed">
              Share the details of your event and we will craft a look made just for you. Every inquiry is reviewed personally — no automated replies, no pressure.
            </p>
          </Reveal>
        </div>

        {/* Process steps */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 mb-16">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.1}>
              <div className="text-center md:text-left border-t border-white/10 pt-6 relative">
                <span className="font-serif text-beauty-gold/40 text-5xl absolute -top-2 right-0 md:right-auto md:left-0">{s.num}</span>
                <div className="md:pl-20">
                  <h3 className="font-serif text-xl text-white">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left: info & assurances */}
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <Reveal>
              <h3 className="font-serif text-2xl md:text-3xl mb-6">Why Book With {brand.name}?</h3>
              <ul className="space-y-5">
                {assurances.map((a) => (
                  <li key={a.label} className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full border border-beauty-gold/30 flex items-center justify-center text-beauty-gold shrink-0">
                      <a.icon size={16} />
                    </span>
                    <span className="text-white/70 text-sm">{a.label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-white/50 text-sm mb-4">Prefer to talk directly?</p>
                <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-beauty-gold text-sm hover:gap-3 transition-all">
                  <MessageCircle size={18} /> Chat on WhatsApp <ChevronRight size={14} />
                </a>
                <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="block mt-3 text-white/60 text-sm hover:text-white transition-colors">{brand.phone}</a>
                <p className="mt-3 text-white/40 text-xs">{brand.hours}</p>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="glass-dark p-8 lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center text-center py-16">
                  <div className="w-16 h-16 rounded-full border border-beauty-gold/40 flex items-center justify-center mb-6">
                    <CheckCircle2 className="text-beauty-gold" size={32} />
                  </div>
                  <h3 className="font-serif text-3xl">Thank You, {form.name?.split(" ")[0] || "Beautiful"}!</h3>
                  <p className="mt-4 text-white/70 text-sm max-w-sm leading-relaxed">
                    Your appointment request has been received. We will personally review your details and reach out within 24 hours to confirm your date.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-primary !bg-beauty-gold flex-1">
                      <MessageCircle size={16} /> WhatsApp
                    </a>
                    <button onClick={() => setSubmitted(false)} className="btn-outline !border-white/25 !text-white flex-1">
                      New Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && <p className="text-red-300 text-sm bg-red-500/10 border border-red-400/20 px-4 py-3 rounded-sm">{error}</p>}\n\n                  <div className="flex items-center gap-2 text-beauty-gold text-xs tracking-[0.2em] uppercase pb-4 border-b border-white/10">
                    <CalendarCheck size={14} /> Appointment Details
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input required name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="Your name" />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input required name="phone" value={form.phone} onChange={handleChange} className={inputClass} placeholder="+91 ..." />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Email</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="you@email.com" />
                    </div>
                    <div>
                      <label className={labelClass}>Event Date</label>
                      <input type="date" name="date" value={form.date} onChange={handleChange} className={inputClass + " [color-scheme:dark]"} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Event Type</label>
                      <select name="eventType" value={form.eventType} onChange={handleChange} className={inputClass + " appearance-none"}>
                        <option value="" className="bg-beauty-charcoal">Select</option>
                        {eventTypes.map((t) => <option key={t} value={t} className="bg-beauty-charcoal">{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Location</label>
                      <input name="location" value={form.location} onChange={handleChange} className={inputClass} placeholder="City / venue" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Preferred Style</label>
                      <select name="style" value={form.style} onChange={handleChange} className={inputClass + " appearance-none"}>
                        <option value="" className="bg-beauty-charcoal">Select</option>
                        {styles.map((s) => <option key={s} value={s} className="bg-beauty-charcoal">{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Number of People</label>
                      <input type="number" min="1" name="people" value={form.people} onChange={handleChange} className={inputClass} placeholder="1" />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Tell Us About Your Vision</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={3} className={inputClass + " resize-none"} placeholder="Describe your dream look, outfit, or any special requests..." />
                  </div>

                  <button type="submit" className="btn-primary !bg-beauty-gold w-full group">
                    <Send size={15} /> Request Appointment
                    <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center text-white/35 text-xs">By submitting, you agree to be contacted regarding your inquiry.</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { brand, navLinks } from "@/config/brand";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const handleNav = (path) => {
    setOpen(false);
    if (path.startsWith("/#")) {
      const id = path.slice(2);
      if (location.pathname !== "/") {
        window.location.href = path;
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-[0_1px_30px_rgba(26,26,26,0.06)]" : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" aria-label={brand.name}>
          {brand.logo ? (
            <img src={brand.logo} alt={brand.name} className="h-9 w-auto" />
          ) : (
            <span className="font-serif text-2xl tracking-wide text-beauty-charcoal">
              {brand.logoText}
              <span className="text-beauty-gold">.</span>
            </span>
          )}
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) =>
            link.path.startsWith("/#") ? (
              <button
                key={link.label}
                onClick={() => handleNav(link.path)}
                className="text-xs tracking-[0.18em] uppercase text-beauty-charcoal/80 hover:text-beauty-gold transition-colors duration-300"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.path}
                className="text-xs tracking-[0.18em] uppercase text-beauty-charcoal/80 hover:text-beauty-gold transition-colors duration-300"
              >
                {link.label}
              </Link>
            )
          )}
          <a href="#booking" onClick={(e) => { e.preventDefault(); document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-primary !px-6 !py-3">
            Book Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-beauty-charcoal"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden glass border-t border-white/30"
          >
            <div className="px-6 py-8 flex flex-col gap-2">
              {navLinks.map((link, i) =>
                link.path.startsWith("/#") ? (
                  <button
                    key={link.label}
                    onClick={() => handleNav(link.path)}
                    className="text-left py-4 text-sm tracking-[0.18em] uppercase text-beauty-charcoal/80 hover:text-beauty-gold border-b border-beauty-charcoal/5"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="py-4 text-sm tracking-[0.18em] uppercase text-beauty-charcoal/80 hover:text-beauty-gold border-b border-beauty-charcoal/5"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <a href="#booking" onClick={(e) => { e.preventDefault(); setOpen(false); document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }); }}
                className="btn-primary mt-4 w-full">
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import BackToTop from "@/components/site/BackToTop";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import { brand } from "@/config/brand";
import { Image } from "@/components/ui/image";
import { api } from "@/api";

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function Blog() {
  const [active, setActive] = useState("All");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBlogPosts().then(setPosts).catch(console.error).finally(() => setLoading(false));
  }, []);

  const featured = posts[0];
  const categories = ["All", ...new Set(posts.map((p) => p.category))];
  const rest = active === "All" ? posts.slice(1) : posts.filter((p) => p.category === active);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="py-20 md:py-28 px-6 lg:px-12 bg-beauty-ivory text-center">
          <Reveal>
            <span className="text-beauty-gold uppercase tracking-[0.25em] text-xs mb-5 block">Journal</span>
            <h1 className="font-serif text-5xl md:text-7xl text-beauty-charcoal">The Beauty Journal</h1>
            <p className="mt-6 text-beauty-charcoal/60 max-w-xl mx-auto">Tips, trends, and stories from the chair — your guide to radiant, confident beauty.</p>
          </Reveal>
        </section>

        {/* Featured */}
        {loading ? <div className="py-20 text-center text-beauty-charcoal/50">Loading journal...</div> : featured && <section className="py-16 md:py-20 px-6 lg:px-12 bg-white">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal>
              <Link to={`/blog/${featured.slug}`} className="group block relative overflow-hidden">
                <Image src={featured.cover || brand.images.blogCover} alt={featured.title} fittingType="fill" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute top-5 left-5 text-[10px] tracking-[0.2em] uppercase text-white bg-beauty-gold px-3 py-1.5">Featured</span>
              </Link>
            </Reveal>
            <div>
              <Reveal delay={0.1}>
                <span className="text-beauty-gold text-xs tracking-[0.2em] uppercase">{featured.category}</span>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl text-beauty-charcoal leading-tight">{featured.title}</h2>
                <p className="mt-5 text-beauty-charcoal/60 leading-relaxed">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-5 text-xs text-beauty-charcoal/40">
                  <span className="flex items-center gap-2"><Calendar size={13} /> {formatDate(featured.date)}</span>
                  <span className="flex items-center gap-2"><Clock size={13} /> {featured.readTime}</span>
                </div>
                <Link to={`/blog/${featured.slug}`} className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-beauty-charcoal group hover:text-beauty-gold transition-colors">
                  Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>}

        {/* Categories */}
        <section className="py-12 px-6 lg:px-12 bg-white">
          <div className="max-w-[1400px] mx-auto flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-300 border ${
                  active === cat
                    ? "bg-beauty-charcoal text-white border-beauty-charcoal"
                    : "text-beauty-charcoal/70 border-beauty-charcoal/15 hover:border-beauty-gold hover:text-beauty-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className="pb-24 md:pb-32 px-6 lg:px-12 bg-white">
          <div className="max-w-[1400px] mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="relative overflow-hidden">
                    <Image src={post.cover || brand.images.blogCover} alt={post.title} fittingType="fill" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase text-white bg-beauty-charcoal/50 backdrop-blur px-3 py-1">{post.category}</span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl text-beauty-charcoal group-hover:text-beauty-gold transition-colors">{post.title}</h3>
                  <p className="mt-3 text-sm text-beauty-charcoal/60 leading-relaxed">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-beauty-charcoal/40">
                    <span className="flex items-center gap-2"><Calendar size={12} /> {formatDate(post.date)}</span>
                    <span className="flex items-center gap-2"><Clock size={12} /> {post.readTime}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 lg:px-12 bg-beauty-ivory text-center">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl text-beauty-charcoal">Ready for your moment?</h2>
            <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">Book Your Appointment</a>
          </Reveal>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
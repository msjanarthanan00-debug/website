import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Instagram, Facebook } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import BackToTop from "@/components/site/BackToTop";
import Reveal from "@/components/site/Reveal";
import { brand } from "@/config/brand";
import { Image } from "@/components/ui/image";
import { api } from "@/api";

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogArticle() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getBlogPost(slug), api.getBlogPosts()])
      .then(([item, all]) => {
        setPost(item);
        setRelated(all.filter((p) => p.slug !== slug).slice(0, 2));
      })
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading article...</div>;
  if (!post) return <Navigate to="/blog" replace />;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <article>
          <header className="py-16 md:py-24 px-6 lg:px-12 bg-beauty-ivory text-center">
            <Reveal>
              <span className="text-beauty-gold text-xs tracking-[0.2em] uppercase">{post.category}</span>
              <h1 className="mt-5 font-serif text-4xl md:text-6xl text-beauty-charcoal max-w-3xl mx-auto leading-tight">{post.title}</h1>
              <div className="mt-6 flex items-center justify-center gap-5 text-xs text-beauty-charcoal/40">
                <span>By {post.author}</span>
                <span className="flex items-center gap-2"><Calendar size={13} /> {formatDate(post.date)}</span>
                <span className="flex items-center gap-2"><Clock size={13} /> {post.readTime || post.read_time}</span>
              </div>
            </Reveal>
          </header>

          <div className="px-6 lg:px-12 bg-beauty-ivory">
            <div className="max-w-[1100px] mx-auto">
              <Reveal>
                <Image src={post.cover || brand.images.blogCover} alt={post.title} fittingType="fill" className="w-full aspect-[16/9] object-cover" />
              </Reveal>
            </div>
          </div>

          <div className="py-16 md:py-20 px-6 lg:px-12 bg-white">
            <div className="max-w-[760px] mx-auto">
              {post.content.map((para, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className={`text-beauty-charcoal/80 leading-[1.8] text-lg mb-6 ${i === 0 ? "first-letter:font-serif first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-beauty-gold" : ""}`}>
                    {para}
                  </p>
                </Reveal>
              ))}

              <div className="mt-12 pt-8 border-t border-beauty-charcoal/10 flex items-center gap-4">
                <span className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-beauty-charcoal/50"><Share2 size={14} /> Share</span>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-beauty-charcoal/15 flex items-center justify-center text-beauty-charcoal/60 hover:bg-beauty-charcoal hover:text-white transition-all" aria-label="Share on X"><ArrowRight size={14} /></a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-beauty-charcoal/15 flex items-center justify-center text-beauty-charcoal/60 hover:bg-beauty-charcoal hover:text-white transition-all" aria-label="Share on Facebook"><Facebook size={14} /></a>
                <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-beauty-charcoal/15 flex items-center justify-center text-beauty-charcoal/60 hover:bg-beauty-charcoal hover:text-white transition-all" aria-label="Instagram"><Instagram size={14} /></a>
              </div>

              <Link to="/blog" className="mt-10 inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-beauty-gold hover:gap-3 transition-all">
                <ArrowLeft size={14} /> Back to Journal
              </Link>
            </div>
          </div>
        </article>

        <section className="py-16 md:py-24 px-6 lg:px-12 bg-beauty-ivory">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-beauty-charcoal mb-10">Continue Reading</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {related.map((p) => (
                <Reveal key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="group block">
                    <div className="relative overflow-hidden">
                      <Image src={p.cover} alt={p.title} fittingType="fill" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
                      <span className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase text-white bg-beauty-charcoal/50 backdrop-blur px-3 py-1">{p.category}</span>
                    </div>
                    <h3 className="mt-5 font-serif text-2xl text-beauty-charcoal group-hover:text-beauty-gold transition-colors">{p.title}</h3>
                    <p className="mt-3 text-sm text-beauty-charcoal/60 leading-relaxed">{p.excerpt}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
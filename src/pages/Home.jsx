import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Services from "@/components/site/Services";
import Bridal from "@/components/site/Bridal";
import Portfolio from "@/components/site/Portfolio";
import BeforeAfter from "@/components/site/BeforeAfter";
import Packages from "@/components/site/Packages";
import Testimonials from "@/components/site/Testimonials";
import InstagramSection from "@/components/site/InstagramSection";
import Booking from "@/components/site/Booking";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import BackToTop from "@/components/site/BackToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Bridal />
        <Portfolio />
        <BeforeAfter />
        <Packages />
        <Testimonials />
        <InstagramSection />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
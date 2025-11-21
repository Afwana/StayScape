import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import HeroSection from "./components/HeroSection";
import ResortPricingCarousel from "./components/Resorts";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <Services />
      <ResortPricingCarousel />
      <Testimonials />
      <Gallery />
      <Footer />
    </div>
  );
}

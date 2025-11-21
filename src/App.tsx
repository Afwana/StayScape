import "./App.css";
import HeroSection from "./components/HeroSection";
import ResortPricingCarousel from "./components/Resorts";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

function App() {
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

export default App;

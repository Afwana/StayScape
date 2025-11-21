import Header from "./Header";
import background from "../assets/background.jpg";
import gridImage1 from "../assets/grid4.jpg";
import gridImage2 from "../assets/grid1.jpg";
import gridImage3 from "../assets/grid3.jpg";
import gridImage4 from "../assets/grid2.jpg";
import gridImage5 from "../assets/grid5.jpg";

const GridImages = [gridImage1, gridImage2, gridImage3, gridImage4, gridImage5];

export default function HeroSection() {
  return (
    <section
      className="bg-fixed bg-center bg-no-repeat bg-cover w-full min-h-screen"
      style={{
        backgroundImage: `url(${background})`,
      }}>
      <Header />
      <div className="flex px-10 lg:px-20">
        <div className="max-w-full mx-auto reative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Title section */}
            <div className="space-y-6 text-gray-900">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Where Your Perfect <br /> Stay Begins...
              </h1>
              <p className="text-xl mg:text-2xl text-gray-900 leading-relaxed font-medium">
                Your gateway to unforgettable stays and adventures, <br /> feel
                the taste of home get a calm wellness for your fresh minds
              </p>
            </div>
            {/* Image grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex md:flex-col gap-4 pt-20">
                {GridImages.slice(0, 2).map((image, index) => (
                  <div
                    key={index}
                    className="rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 border-4 border-white/20">
                    <img
                      src={image}
                      alt={`Connection ${index + 1}`}
                      className="w-[400px] h-[300px] object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex md:flex-col gap-4">
                {GridImages.slice(2, 4).map((image, index) => (
                  <div
                    key={index}
                    className="rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 border-4 border-white/20">
                    <img
                      src={image}
                      alt={`Connection ${index + 1}`}
                      className="w-[400px] h-[300px] object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex md:flex-col gap-4 my-auto">
                {GridImages.slice(4, 5).map((image, index) => (
                  <div
                    key={index}
                    className="rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 border-4 border-white/20">
                    <img
                      src={image}
                      alt={`Connection ${index + 1}`}
                      className="w-[400px] h-[300px] object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-full mx-auto flex items-center justify-center py-10 text-center text-white text-2xl font-semibold">
        <p className="bg-gray-900 p-3 leading-relaxed rounded-xl shadow-2xl">
          Discover. Relax. StayScape
        </p>
      </div>
    </section>
  );
}

import Image1 from "../assets/gallery/gallery1.jpeg";
import Image2 from "../assets/gallery/gallery2.jpeg";
import Image3 from "../assets/gallery/gallery3.jpeg";
import Image4 from "../assets/gallery/gallery4.jpeg";
import Image5 from "../assets/gallery/gallery5.jpeg";
import Image6 from "../assets/gallery/gallery6.jpeg";
import Image7 from "../assets/gallery/gallery7.jpeg";
import Image8 from "../assets/gallery/gallery8.jpeg";
import Image9 from "../assets/gallery/gallery9.jpeg";
import Image10 from "../assets/gallery/gallery10.jpeg";
import Image11 from "../assets/gallery/gallery11.jpeg";
import Image12 from "../assets/gallery/gallery12.jpeg";

const galleryImages = [
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
  Image10,
  Image11,
  Image12,
];

export default function Gallery() {
  return (
    <section className="bg-white p-5 lg:p-10">
      <div className="mx-auto max-w-full flex flex-col gap-5">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Take a Look Through Our Gallery
        </h1>
        <div className="relative">
          <div className="flex items-center gap-3 md:gap-5 lg:gap-7 overflow-x-auto pb-4 snap-x snap-mandatory">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="flex-none rounded-xl overflow-hidden shadow-2xl transform hover:scale-110 transition duration-500 border-4 border-gray-500 snap-center">
                <img
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-[250px] h-[350px] object-cover"
                />
              </div>
            ))}
          </div>
          <div className="absolute top-0 right-0 bottom-4 w-10 bg-linear-to-l from-white to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}

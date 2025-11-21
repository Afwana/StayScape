import { useState } from "react";
import Service1 from "../assets/service1.jpg";
import Service2 from "../assets/service2.jpg";
import Service3 from "../assets/service3.jpg";
import Service4 from "../assets/service4.jpg";
import Service5 from "../assets/service5.jpg";
import Service6 from "../assets/service6.jpg";

const servicesData = [
  {
    id: 1,
    title: "Book Escapes",
    description:
      "Enjoy a comfortable stay in our well-appointed rooms designed for relaxation. Choose from a range of room types featuring modern amenities, beautiful views, and premium comfort for a memorable getaway.",
    bgImage: Service1,
  },
  {
    id: 2,
    title: "Feel Home",
    description:
      "Experience delicious meals at our in-house restaurant offering a blend of local and international cuisines. From breakfast buffets to à la carte dinners, our chefs serve fresh and flavorful dishes for every taste.",
    bgImage: Service2,
  },
  {
    id: 3,
    title: "Make Mind",
    description:
      "Rejuvenate your body and mind with our relaxing spa therapies, massages, and wellness sessions. Unwind in a peaceful atmosphere designed to refresh and restore your energy.",
    bgImage: Service3,
  },
  {
    id: 4,
    title: "Sense Steps & forward",
    description:
      "Travel with ease using our professional assistance services. Whether it's airport pick-up/drop, guided tours, or local transportation, we ensure your journey is smooth and hassle-free.",
    bgImage: Service4,
  },
  {
    id: 5,
    title: "Not be Silly, Some Adventures",
    description:
      "Add excitement to your vacation with our selection of adventure and leisure activities. Enjoy indoor/outdoor games, trekking, cycling, campfires, and more — perfect for families, friends, and thrill-seekers.",
    bgImage: Service5,
  },
  {
    id: 6,
    title: "Light Up New",
    description:
      "Make your stay extra special with personalized experiences such as honeymoon setups, candle-light dinners, and customized celebration arrangements tailored to your occasion.",
    bgImage: Service6,
  },
];

export default function Services() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  return (
    <div className="p-5">
      <div className="bg-linear-to-br from-[#0a115754] to-[#C0EEF0] p-5 lg:p-8 rounded-xl shadow-lg">
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            You get more with our services
          </h1>
          <div className="grid max-w-full grid-cols-1 gap-x-8 gap-y-16 pt-3 sm:mt-3 sm:pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {servicesData?.map((service) => {
              const isHovered = hoveredId === service.id;
              return (
                <article
                  key={service.id}
                  style={{ backgroundImage: `url(${service?.bgImage})` }}
                  className="bg-no-repeat bg-center bg-cover rounded-lg p-5 relative overflow-hidden flex items-center justify-center shadow-lg transition-all duration-500 ease-in-out h-[250px]"
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}>
                  <div
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      isHovered ? "bg-black/70" : "bg-black/20"
                    }`}>
                    <h1 className="flex text-2xl items-center justify-center font-semibold text-gray-200 pt-5">
                      {service.title}
                    </h1>
                  </div>

                  <div
                    className={`relative z-10 p-6 flex flex-col h-full w-full transition-all duration-500 ease-in-out ${
                      isHovered
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}>
                    {/* <h1 className="flex text-2xl items-center justify-center font-semibold text-gray-200">
                      {service.title}
                    </h1> */}
                    <p className="text-base text-gray-400 text-justify mt-4">
                      {service?.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import BookingModal from "./BookingModal";

const resortData = [
  {
    id: 1,
    name: "Mountain Retreat",
    price: "$199",
    period: "/night",
    description:
      "Perfect for couples and solo travelers seeking peace in the mountains.",
    features: [
      "✓ Private balcony with mountain view",
      "✓ King size bed",
      "✓ Complimentary breakfast",
      "✓ Access to spa facilities",
      "✓ Free WiFi",
    ],
  },
  {
    id: 2,
    name: "Beach Paradise",
    price: "$299",
    period: "/night",
    description: "Luxury beachfront accommodation with premium amenities.",
    features: [
      "✓ Ocean view room",
      "✓ Private beach access",
      "✓ Infinity pool",
      "✓ Fine dining restaurant",
      "✓ Water sports equipment",
      "✓ 24/7 concierge",
    ],
  },
  {
    id: 3,
    name: "Forest Cabin",
    price: "$149",
    period: "/night",
    description: "Cozy cabin experience surrounded by nature and wildlife.",
    features: [
      "✓ Wood-fired hot tub",
      "✓ Hiking trails access",
      "✓ Fireplace",
      "✓ Kitchenette",
      "✓ Wildlife viewing",
    ],
  },
  {
    id: 4,
    name: "City Luxury",
    price: "$349",
    period: "/night",
    description: "Premium urban experience in the heart of the city.",
    features: [
      "✓ City center location",
      "✓ Rooftop bar",
      "✓ Fitness center",
      "✓ Business facilities",
      "✓ Valet parking",
      "✓ Room service",
    ],
  },
  {
    id: 5,
    name: "Desert Oasis",
    price: "$249",
    period: "/night",
    description: "Unique desert experience with modern comforts.",
    features: [
      "✓ Private pool",
      "✓ Stargazing deck",
      "✓ Desert tours",
      "✓ Luxury tent accommodation",
      "✓ Valet parking",
      "✓ Gourmet desert cuisine",
    ],
  },
  {
    id: 6,
    name: "Lake View Resort",
    price: "$279",
    period: "/night",
    description: "Serene lakeside retreat with water activities.",
    features: [
      "✓ Lakefront property",
      "✓ Boat rentals",
      "✓ Fishing equipment",
      "✓ Lakeside dining",
      "✓ Water sports",
      "✓ Sunset cruises",
    ],
  },
];

export default function ResortPricingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModelOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 3;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleBookingSuccess = (booking: any) => {
    alert(`Booking confirmed! Your booking ID is: ${booking.data._id}`);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= resortData.length
        ? 0
        : prevIndex + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0
        ? resortData.length - itemsPerPage
        : prevIndex - itemsPerPage
    );
  };

  const visibleResorts = resortData.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  // Fill with empty cards if needed to maintain layout
  while (visibleResorts.length < itemsPerPage) {
    visibleResorts.push();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 60000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Choose Your Perfect Stays
          </h1>
          <p className="text-xl text-gray-600">
            Discover our exclusive resort packages tailored for every type of
            traveler
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors z-10">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors z-10">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Resort Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {visibleResorts.map((resort, index) => {
              const isCenterCard = index === 1;
              return (
                <div
                  key={resort ? resort.id : `empty-${index}`}
                  className={`bg-[#0a1157] relative transition-all duration-500 rounded-xl ${
                    !resort ? "opacity-0" : ""
                  } ${
                    isCenterCard
                      ? "md:scale-110 z-10 transform -translate-y-2"
                      : "scale-95 opacity-90 hover:opacity-100"
                  }`}>
                  {resort && (
                    <>
                      {/* Header */}
                      <div className="p-5 border-b border-gray-900">
                        <h3 className="text-2xl font-bold text-gray-200 text-center mb-2">
                          {resort.name}
                        </h3>
                        <div className="text-center mb-4">
                          <span className="text-4xl font-bold text-gray-200">
                            {resort.price}
                          </span>
                          <span className="text-gray-100">{resort.period}</span>
                        </div>
                        <p className="text-gray-100 text-center text-sm">
                          {resort.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="p-8">
                        <ul className="space-y-4 mb-8">
                          {resort.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <svg
                                className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* CTA Button */}
                        <button
                          className="cursor-pointer w-full bg-[#C0EEF0] text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-cyan-500 transition-colors duration-200"
                          onClick={openModal}>
                          Book Now
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({
              length: Math.ceil(resortData.length / itemsPerPage),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerPage)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index * itemsPerPage
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 text-gray-600">
          <p>
            All packages include complimentary welcome drinks and access to
            resort amenities
          </p>
        </div>
      </div>
      <BookingModal
        isOpen={isModelOpen}
        onClose={closeModal}
        bookingSuccess={handleBookingSuccess}
      />
    </div>
  );
}

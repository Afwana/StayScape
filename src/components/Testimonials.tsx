import { useEffect, useState } from "react";
import logo from "../assets/logo/logo_icon.png";

const Reviews = [
  {
    id: 1,
    customer: "Shruthy Raman",
    customerImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    reviewTitle: "Perfect getaway!",
    review:
      "“Beautiful location, peaceful atmosphere, and super clean rooms. The staff made us feel at home. Highly recommend!”",
  },
  {
    id: 2,
    customer: "Nishad & Finu",
    customerImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    reviewTitle: "“Amazing service and food”",
    review:
      "“The dining experience was fantastic. Every meal was fresh and delicious, and the service was top-notch.”",
  },
  {
    id: 3,
    customer: "Maria Samson",
    customerImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    reviewTitle: "“Loved the spa!”",
    review:
      "“The spa session was incredibly relaxing. Exactly what I needed for a refreshing break. Will definitely come again.”",
  },
  {
    id: 4,
    customer: "Ashish Pretheep",
    customerImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    reviewTitle: "“Smooth booking & travel help”",
    review:
      "“Booking was easy and the travel assistance team arranged everything perfectly. Stress-free vacation!”",
  },
  {
    id: 5,
    customer: "Aslam Muhammed",
    customerImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    reviewTitle: "“Great activities for everyone”",
    review:
      "“From trekking to indoor games, we enjoyed every moment. Perfect resort for families and friends.”",
  },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === Reviews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? Reviews.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);
  return (
    <div className="overflow-hidden">
      <div className="relative w-full">
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-gray-900 rounded-full p-3 shadow-lg hover:bg-gray-700 transition-colors z-10">
          <svg
            className="w-5 h-5 text-white"
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
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-gray-900 rounded-full p-3 shadow-lg hover:bg-gray-700 transition-colors z-10">
          <svg
            className="w-5 h-5 text-white"
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
        <div className="relative isolate overflow-hidden bg-gray-900 p-5 lg:p-10 shadow-2xl">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-500),transparent)] opacity-10"></div>
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900 shadow-xl ring-1 shadow-indigo-500/5 ring-white/5 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
          <div className="w-full">
            {Reviews.map((item, index) => (
              <div
                key={item.id}
                className={`transition-all duration-500 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 block"
                    : "opacity-0 hidden"
                }`}>
                <div className="flex items-center gap-2 justify-center">
                  <img src={logo} alt="" className="h-12" />
                  <p className="text-gray-600 text-2xl font-bold">StayScape</p>
                </div>
                <div className="mt-10">
                  <div className="text-center text-xl sm:text-2xl font-bold text-white">
                    <p>{item.reviewTitle}</p>
                  </div>
                  <div className="text-center text-xl/8 font-semibold text-white sm:text-2xl/9">
                    <p>{item.review}</p>
                  </div>
                  <div className="mt-10">
                    <img
                      src={item.customerImage}
                      alt={`${item.customer}'s Profile`}
                      className="mx-auto size-10 rounded-full"
                    />
                    <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                      <div className="font-semibold text-white">
                        {item.customer}
                      </div>
                      <svg
                        viewBox="0 0 2 2"
                        width="3"
                        height="3"
                        aria-hidden="true"
                        className="fill-white">
                        <circle r="1" cx="1" cy="1" />
                      </svg>
                      <div className="text-gray-400">Customer</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
            {Reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

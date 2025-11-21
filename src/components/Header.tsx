import { useState } from "react";
import logo2 from "../assets/logo/logo2.png";
import BookingModal from "./BookingModal";

export default function Header() {
  const [isModelOpen, setIsModalOpen] = useState(false);

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
  return (
    <header className="">
      <nav
        aria-label="Global"
        className="flex max-w-full items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img src={logo2} alt="" className="h-20 w-auto" />
          </a>
        </div>

        <div className="flex flex-1 justify-end">
          <div className="bg-gray-900 rounded-lg p-5" onClick={openModal}>
            <div className="text-base font-semibold text-white">
              Book Now <span aria-hidden="true">&rarr;</span>
            </div>
          </div>
        </div>
      </nav>
      <BookingModal
        isOpen={isModelOpen}
        onClose={closeModal}
        bookingSuccess={handleBookingSuccess}
      />
    </header>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { createBooking } from "../services/bookingServices";

export default function BookingModal({
  isOpen,
  onClose,
  bookingSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  bookingSuccess?: (booking: any) => void;
}) {
  const [formData, setFormData] = useState({
    user: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
    },
    bookingDetails: {
      checkIn: "",
      checkOut: "",
      adults: 1,
      children: 0,
      roomType: "",
      specialRequests: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // Handle nested state updates
    if (name in formData.user) {
      setFormData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          [name]: value,
        },
      }));
    } else if (name in formData.bookingDetails) {
      setFormData((prev) => ({
        ...prev,
        bookingDetails: {
          ...prev.bookingDetails,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData.user.firstName.trim()) {
      setError("First name is required");
      return false;
    }

    if (!formData.user.lastName.trim()) {
      setError("Last name is required");
      return false;
    }

    if (!formData.user.email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!formData.user.phone.trim()) {
      setError("Phone number is required");
      return false;
    }

    if (!formData.user.address.trim()) {
      setError("Address is required");
      return false;
    }

    if (!formData.bookingDetails.checkIn) {
      setError("Check-in date is required");
      return false;
    }

    if (!formData.bookingDetails.checkOut) {
      setError("Check-out date is required");
      return false;
    }

    const checkIn = new Date(formData.bookingDetails.checkIn);
    const checkOut = new Date(formData.bookingDetails.checkOut);

    if (checkIn >= checkOut) {
      setError("Check-out date must be after check-in date");
      return false;
    }

    if (!formData.bookingDetails.roomType) {
      setError("Please select a room type");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const bookingData = {
        user: {
          firstName: formData.user.firstName,
          lastName: formData.user.lastName,
          email: formData.user.email,
          phone: formData.user.phone,
          address: formData.user.address,
        },
        bookingDetails: {
          checkIn: formData.bookingDetails.checkIn,
          checkOut: formData.bookingDetails.checkOut,
          adults: Number(formData.bookingDetails.adults),
          children: Number(formData.bookingDetails.children),
          roomType: formData.bookingDetails.roomType as
            | "standard"
            | "deluxe"
            | "suite"
            | "executive",
          specialRequests: formData.bookingDetails.specialRequests || "",
        },
      };

      const bookingApi = await createBooking(bookingData);
      if (bookingSuccess) {
        bookingSuccess(bookingApi);
      }
      resetForm();
      onClose();
    } catch (error) {
      console.error("Booking failed:", error);
      setError("Failed to create booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      user: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
      },
      bookingDetails: {
        checkIn: "",
        checkOut: "",
        adults: 1,
        children: 0,
        roomType: "",
        specialRequests: "",
      },
    });
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-full md:max-w-2xl lg:max-w-4xl w-full mx-auto p-6"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Book Your StayScape
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
            &times;
          </button>
        </div>
        {isLoading && (
          <div className="flex items-center justify-center my-10 text-black">
            Loading
          </div>
        )}
        {Error && (
          <div className="flex items-center justify-center my-10 text-red-500">
            {Error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="md:col-span-1 flex gap-2">
              <div>
                <label className="text-sm font-medium text-gray-800 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.user.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-800 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.user.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:col-span-1 flex gap-2">
              <div>
                <label className="text-sm font-medium text-gray-800 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.user.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-800 mb-1">
                  Email ID
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.user.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <div>
                <label className="text-sm font-medium text-gray-800 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.user.address}
                  onChange={handleInputChange}
                  rows={3}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:col-span-1 flex gap-2">
              <div>
                <label className="text-sm font-medium text-gray-800 mb-1">
                  Check In
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.bookingDetails.checkIn}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-800 mb-1">
                  Check Out
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.bookingDetails.checkOut}
                  onChange={handleInputChange}
                  min={
                    formData.bookingDetails.checkIn ||
                    new Date().toISOString().split("T")[0]
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:col-span-1 flex items-center gap-5">
              <div>
                <label className="text-sm font-medium text-gray-800 mb-1">
                  Adults
                </label>
                <input
                  type="number"
                  name="adults"
                  value={formData.bookingDetails.adults}
                  onChange={handleInputChange}
                  min={"1"}
                  max={"20"}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-800 mb-1">
                  Children
                </label>
                <input
                  type="number"
                  name="children"
                  value={formData.bookingDetails.children}
                  onChange={handleInputChange}
                  min={"0"}
                  max={"15"}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-800 mb-1">
                  Room Type
                </label>
                <select
                  name="roomType"
                  value={formData.bookingDetails.roomType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-transparent">
                  <option value="">Select Room Type</option>
                  <option value="standard">Standard Room</option>
                  <option value="deluxe">Deluxe Room</option>
                  <option value="suite">Suite</option>
                  <option value="executive">Executive Suite</option>
                </select>
              </div>
            </div>
            <div className="col-span-2">
              <div>
                <label className="text-sm font-medium text-gray-800 mb-1">
                  Special Requests
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.bookingDetails.specialRequests}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex w-full pt-2 justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

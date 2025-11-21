// types/booking.ts
export interface CreateBookingRequest {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
  bookingDetails: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    roomType: "standard" | "deluxe" | "suite" | "executive";
    specialRequests?: string;
  };
}

export interface BookingResponse {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
  bookingDetails: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    roomType: "standard" | "deluxe" | "suite" | "executive";
    specialRequests?: string;
  };
  status: "confirmed" | "pending" | "cancelled" | "completed";
  createdAt: string;
  updatedAt: string;
  cancellationReason?: string;
  cancelledAt?: string;
}

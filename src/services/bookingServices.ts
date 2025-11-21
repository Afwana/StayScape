import axios from "axios";
import type { CreateBookingRequest } from "../types/booking";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createBooking = async (bookingData: CreateBookingRequest) => {
  const response = await apiClient.post("/bookings", bookingData);
  return response.data;
};

export const getAllBookings = async () => {
  const response = await apiClient.get("/bookings");
  return response.data;
};

export const getBookingById = async (bookingId: string) => {
  const response = await apiClient.get(`/bookings/${bookingId}`);
  return response.data;
};

export const updateBookingStatus = async (
  bookingId: string,
  status: string
) => {
  const response = await apiClient.patch(`/bookings/${bookingId}/status`, {
    status,
  });
  return response.data;
};

export const deleteBooking = async (bookingId: string) => {
  const response = await apiClient.delete(`/bookings/${bookingId}`);
  return response.data;
};

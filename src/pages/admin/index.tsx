/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import logo2 from "../../assets/logo/logo2.png";
import {
  deleteBooking,
  getAllBookings,
  updateBookingStatus,
} from "../../services/bookingServices";
import type { Booking } from "../../types/booking";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { LuArrowUpDown } from "react-icons/lu";
import { TbArrowNarrowDown, TbArrowNarrowUp } from "react-icons/tb";
import { FaHome, FaTrashAlt } from "react-icons/fa";

interface SortConfig {
  key: string | null;
  direction: "asc" | "desc";
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const itemsPerPage = 10;

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllBookings();
      setBookings(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    try {
      setActionLoading(bookingId);
      await updateBookingStatus(bookingId, newStatus);
      // Refresh bookings after update
      await fetchBookings();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    try {
      setActionLoading(bookingId);
      await deleteBooking(bookingId);
      // Refresh bookings after deletion
      await fetchBookings();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete booking");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredAndSortedData = useMemo(() => {
    const filteredData = bookings.filter((booking) => {
      const matchesSearch =
        booking.user.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        booking.user.lastName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        booking.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking._id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    const getNestedValue = (obj: any, path: string): any => {
      return path.split(".").reduce((current, key) => current?.[key], obj);
    };

    // Sorting
    if (sortConfig.key) {
      const sortKey = sortConfig.key;
      filteredData.sort((a, b) => {
        let aValue, bValue;

        // Handle nested properties
        if (sortKey.includes(".")) {
          aValue = getNestedValue(a, sortKey);
          bValue = getNestedValue(b, sortKey);
        } else {
          aValue = (a as any)[sortKey];
          bValue = (b as any)[sortKey];
        }

        // Handle date comparisons
        if (
          sortKey.includes("checkIn") ||
          sortKey.includes("checkOut") ||
          sortKey.includes("createdAt")
        ) {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [bookings, sortConfig, searchTerm, statusFilter]);

  // Pagination
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  // Sort handler
  const handleSort = (key: string) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      confirmed: { color: "bg-green-100 text-green-800", label: "Confirmed" },
      cancelled: { color: "bg-red-100 text-red-800", label: "Cancelled" },
      completed: { color: "bg-blue-100 text-blue-800", label: "Completed" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span
        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Status dropdown component
  const StatusDropdown = ({ booking }: { booking: Booking }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const statusOptions = [
      { value: "pending", label: "Pending", color: "text-yellow-600" },
      { value: "confirmed", label: "Confirmed", color: "text-green-600" },
      { value: "cancelled", label: "Cancelled", color: "text-red-600" },
      { value: "completed", label: "Completed", color: "text-blue-600" },
    ];

    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          disabled={actionLoading === booking._id}
          className="flex items-center space-x-1 px-3 py-1 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50">
          <StatusBadge status={booking.status} />
          <span>
            <IoIosArrowDropdownCircle />
          </span>
        </button>

        {showDropdown && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowDropdown(false)}
            />
            <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20 flex flex-col">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    handleStatusUpdate(booking._id, option.value);
                    setShowDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    option.color
                  } ${booking.status === option.value ? "bg-gray-100" : ""}`}>
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format date with time
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Room type display
  const getRoomTypeDisplay = (roomType: string) => {
    const roomTypes: Record<string, string> = {
      standard: "Standard",
      deluxe: "Deluxe",
      suite: "Suite",
      executive: "Executive",
    };
    return roomTypes[roomType] || roomType;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && bookings.length === 0) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-red-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-red-800 font-medium">Error loading bookings</h3>
            <p className="text-red-700 text-sm">{error}</p>
            <button
              onClick={fetchBookings}
              className="mt-2 px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full">
      <header className="">
        <nav
          aria-label="Global"
          className="flex max-w-full items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">StayScape</span>
              <img src={logo2} alt="" className="h-20 w-auto" />
            </a>
          </div>

          <a href="/" className="flex flex-1 justify-end">
            <div className="bg-gray-900 rounded-lg p-3">
              <div className="text-base font-semibold text-white">
                <FaHome size={28} />
              </div>
            </div>
          </a>
        </nav>
      </header>
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Header with filters */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Bookings Management
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {filteredAndSortedData.length} booking(s) found
              </p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 w-full sm:w-64"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 w-full sm:w-auto">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>

              {/* Refresh Button */}
              <button
                onClick={fetchBookings}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-6 mt-4">
            <div className="flex items-center">
              <div className="shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  { key: "_id", label: "Booking ID" },
                  { key: "user.firstName", label: "Guest Name" },
                  { key: "user.email", label: "Email" },
                  { key: "bookingDetails.roomType", label: "Room Type" },
                  { key: "bookingDetails.checkIn", label: "Check-in" },
                  { key: "bookingDetails.checkOut", label: "Check-out" },
                  { key: "bookingDetails.adults", label: "Guests" },
                  { key: "status", label: "Status" },
                  { key: "createdAt", label: "Booked On" },
                  { key: "actions", label: "Actions" },
                ].map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() =>
                      column.key !== "actions" && handleSort(column.key)
                    }>
                    <div className="flex items-center gap-0.5">
                      <span>{column.label}</span>
                      {column.key !== "actions" && (
                        <span className="text-xs">
                          {sortConfig.key === column.key ? (
                            sortConfig.direction === "asc" ? (
                              <TbArrowNarrowUp />
                            ) : (
                              <TbArrowNarrowDown />
                            )
                          ) : (
                            <LuArrowUpDown />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-12 h-12 text-gray-400 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p>No bookings found</p>
                      {bookings.length > 0 && (
                        <p className="text-sm text-gray-400 mt-1">
                          Try adjusting your search or filters
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                currentData.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-900 font-medium">
                        {booking._id.slice(-8)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDateTime(booking.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.user.firstName} {booking.user.lastName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.user.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 capitalize">
                        {getRoomTypeDisplay(booking.bookingDetails.roomType)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(booking.bookingDetails.checkIn)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(booking.bookingDetails.checkOut)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.bookingDetails.adults} Adult(s)
                        {booking.bookingDetails.children > 0 &&
                          `, ${booking.bookingDetails.children} Child(ren)`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusDropdown booking={booking} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(booking.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDeleteBooking(booking._id)}
                        disabled={actionLoading === booking._id}
                        className="text-red-600 cursor-pointer hover:text-red-900 disabled:opacity-50">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="text-sm text-gray-700">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredAndSortedData.length
                )}{" "}
                of {filteredAndSortedData.length} entries
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                  First
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((current) => Math.max(1, current - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                  Previous
                </button>

                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 border text-sm rounded ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}>
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((current) =>
                      Math.min(totalPages, current + 1)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                  Next
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                  Last
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

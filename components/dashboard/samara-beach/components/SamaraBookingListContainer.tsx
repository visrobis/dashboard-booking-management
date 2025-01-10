"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getAllBookingsList } from "@/lib/action/SaramaAction";
import DeleteBooking from "./DeleteBooking";

// Define Booking type
type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  membersCount: number;
  belowTwoYearsCount: number;
  date: Date;
  createdAt: Date;
};

const SamaraBookingListContainer = () => {
  const [samaraBookingsList, setSamaraBookingsList] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchBookings = async (page: number) => {
    const skip = (page - 1) * pageSize;
    const data = await getAllBookingsList({ take: pageSize, skip });
    setSamaraBookingsList(data.bookings); // TypeScript now understands the type
    setTotalCount(data.totalCount);
  };

  useEffect(() => {
    fetchBookings(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 px-4 py-6">
      {/* Header Section */}
      <div className="w-full flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-700">Samara Bookings</h1>
        <Link
          className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600"
          href={"/dashboard/samara-beach/samara-booking-create-form"}
        >
          Create Booking
        </Link>
      </div>

      {/* Bookings Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                #
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Guest
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Children
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Created At
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {samaraBookingsList.map((booking, index) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm text-gray-700 border-b">
                  {(currentPage - 1) * pageSize + index + 1}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 border-b">
                  {booking.name}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 border-b">
                  {booking.email}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 border-b">
                  {booking.phone}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 border-b">
                  {booking.membersCount}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 border-b">
                  {booking.belowTwoYearsCount}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 border-b">
                  {new Date(booking.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 border-b flex justify-center gap-2">
                  <Link
                    href={`/dashboard/samara-beach/samara-booking-edit-form/${booking.id}`}
                    className="px-3 py-1 flex justify-center items-center bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <DeleteBooking id={booking.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-3 mt-4">
        <button
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SamaraBookingListContainer;

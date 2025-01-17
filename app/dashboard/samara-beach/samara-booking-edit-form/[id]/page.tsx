import React from "react";
import { notFound } from "next/navigation";
import { getBookingById } from "@/lib/action/SaramaAction";
import SamaraBookingEditForm from "@/components/dashboard/forms/SaramaBookingEditForm";

interface Props {
  params: { id: string };
}

const SamaraBookingEditFormPage = async ({ params }: Props) => {
  const id = params.id;

  // Fetch the booking data by ID
  const booking = await getBookingById(id);

  if (!booking) {
    notFound(); // Handle 404 if booking not found
  }

  // Format the booking date
  const formattedBooking = {
    ...booking,
    date: booking.date.toISOString().split("T")[0], // Format the date
  };

  return (
    <div>
      <SamaraBookingEditForm booking={formattedBooking} />
    </div>
  );
};

export default SamaraBookingEditFormPage;

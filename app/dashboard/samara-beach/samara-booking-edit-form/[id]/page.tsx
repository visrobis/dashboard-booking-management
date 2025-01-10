"use server";
import SamaraBookingEditForm from "@/components/dashboard/forms/SaramaBookingEditForm";
import { getBookingById } from "@/lib/action/SaramaAction";
import { notFound } from "next/navigation";
import React from "react";

const SamaraBookingEditFormPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const id = params.id;
  const booking = await getBookingById(id);

  if (!booking) {
    notFound();
  }

  // Convert date fields to string in 'YYYY-MM-DD' format
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

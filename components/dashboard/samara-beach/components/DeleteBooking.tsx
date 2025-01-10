"use client";
import { deleteBookingById } from "@/lib/action/SaramaAction";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

interface DeleteBookingProps {
  id: string;
}

const DeleteBooking = ({ id }: { id: string }) => {
  const handleDeleteBooking = deleteBookingById.bind(null, id);

  return (
    <form action={handleDeleteBooking}>
      <button className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 ml-2">
        Delete
      </button>
    </form>
  );
};

export default DeleteBooking;

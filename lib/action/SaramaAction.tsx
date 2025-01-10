"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

// Define the schema for the Samara booking form data
const SamaraBookingSchema = z.object({
  name: z.string().min(6),
  email: z.string().min(6),
  phone: z.string().min(11),
  membersCount: z.number(),
  belowTwoYearsCount: z.number(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

// Create Booking
export const saveSamaraBooking = async (prevState: any, formData: FormData) => {
  // Convert formData to an object and parse numerical fields
  const data = Object.fromEntries(formData.entries());

  const parsedData = {
    ...data,
    membersCount: Number(data.membersCount), // Convert to number
    belowTwoYearsCount: Number(data.belowTwoYearsCount), // Convert to number
  };

  // Validate the parsed data
  const validatedFields = SamaraBookingSchema.safeParse(parsedData);

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.samaraBooking.create({
      data: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        phone: validatedFields.data.phone,
        membersCount: validatedFields.data.membersCount,
        belowTwoYearsCount: validatedFields.data.belowTwoYearsCount,
        date: new Date(validatedFields.data.date), // Convert to Date object
      },
    });
  } catch (error) {
    return {
      message: "Failed to submit booking. Please try again.",
    };
  }

  revalidatePath("/dashboard/samara-beach/samara-booking-list");
  redirect("/dashboard/samara-beach/samara-booking-list");
};

// Get Booking List
export const getAllBookingsList = async ({ take = 10, skip = 0 }) => {
  try {
    const [bookings, totalCount] = await Promise.all([
      prisma.samaraBooking.findMany({
        take,
        skip,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          membersCount: true,
          belowTwoYearsCount: true,
          date: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.samaraBooking.count(), // Get the total count of records
    ]);

    return {
      bookings,
      totalCount,
    };
  } catch (error) {
    throw new Error("Could not find booking list");
  }
};

// Get Booking
export const getBookingById = async (id: string) => {
  try {
    const booking = await prisma.samaraBooking.findUnique({
      where: {
        id, // Ensure this matches your Prisma schema's `id` field
      },
    });
    return booking;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw new Error("Failed to fetch booking.");
  }
};

// Edit Booking
export const editBooking = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  // Convert formData to an object and parse numerical fields
  const data = Object.fromEntries(formData.entries());

  const parsedData = {
    ...data,
    membersCount: Number(data.membersCount), // Convert to number
    belowTwoYearsCount: Number(data.belowTwoYearsCount), // Convert to number
  };

  // Validate the parsed data
  const validatedFields = SamaraBookingSchema.safeParse(parsedData);

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.samaraBooking.update({
      where: {
        id: id,
      },
      data: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        phone: validatedFields.data.phone,
        membersCount: validatedFields.data.membersCount,
        belowTwoYearsCount: validatedFields.data.belowTwoYearsCount,
        date: new Date(validatedFields.data.date), // Convert to Date object
      },
    });
  } catch (error) {
    return {
      message: "Failed to update booking. Please try again.",
    };
  }

  revalidatePath("/dashboard/samara-beach/samara-booking-list");
  redirect("/dashboard/samara-beach/samara-booking-list");
};

// Delete Booking List
export const deleteBookingById = async (id: string) => {
  try {
    await prisma.samaraBooking.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error("Failed to delete booking with ID " + id);
  }
  revalidatePath("/dashboard/samara-beach/samara-booking-list");
  redirect("/dashboard/samara-beach/samara-booking-list");
};

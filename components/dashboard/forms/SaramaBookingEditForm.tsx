"use client";

import { editBooking } from "@/lib/action/SaramaAction";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  id: string;
  name: string;
  email: string;
  phone: string;
  membersCount: number;
  belowTwoYearsCount: number;
  date: string;
}

const SamaraBookingEditForm = ({ booking }: { booking: IFormInput }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: booking,
  });

  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const onSubmit = async (data: IFormInput) => {
    setSubmissionError(null);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    const result = await editBooking(booking.id, {}, formData);

    if (result?.Error) {
      Object.entries(result.Error).forEach(([field, messages]) => {
        setError(field as keyof IFormInput, {
          type: "server",
          message: (messages as string[])[0],
        });
      });
    } else if (result?.message) {
      setSubmissionError(result.message);
    } else {
      console.log("Booking updated successfully!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Edit Booking
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name Field */}
        <div>
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            id="phone"
            type="text"
            {...register("phone", { required: "Phone number is required" })}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Members Count */}
        <div>
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="membersCount"
          >
            Members
          </label>
          <input
            id="membersCount"
            type="number"
            {...register("membersCount", {
              required: "Members count is required",
              valueAsNumber: true,
            })}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.membersCount && (
            <p className="text-red-500 text-xs mt-1">
              {errors.membersCount.message}
            </p>
          )}
        </div>

        {/* Below Two Years Count */}
        <div>
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="belowTwoYearsCount"
          >
            Members (Below 2 Years)
          </label>
          <input
            id="belowTwoYearsCount"
            type="number"
            {...register("belowTwoYearsCount", {
              required: "This field is required",
              valueAsNumber: true,
            })}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.belowTwoYearsCount && (
            <p className="text-red-500 text-xs mt-1">
              {errors.belowTwoYearsCount.message}
            </p>
          )}
        </div>

        {/* Date Field */}
        <div>
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="date"
          >
            Booking Date
          </label>
          <input
            id="date"
            type="date"
            {...register("date", { required: "Date is required" })}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
          )}
        </div>

        {/* Submission Error */}
        {submissionError && (
          <p className="text-red-500 text-sm mt-2">{submissionError}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SamaraBookingEditForm;

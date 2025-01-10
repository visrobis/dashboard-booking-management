"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { saveSamaraBooking } from "@/lib/action/SaramaAction";

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  membersCount: number;
  belowTwoYearsCount: number;
  date: string;
}

const SamaraBookingCreateForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormInput>();

  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const onSubmit = async (data: IFormInput) => {
    setSubmissionError(null);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    const result = await saveSamaraBooking({}, formData);

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
      console.log("Booking submitted successfully!");
      // Add success handling here
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Create Samara Booking
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
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
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            id="phone"
            type="text"
            {...register("phone", { required: "Phone number is required" })}
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Members Count */}
        <div>
          <label
            htmlFor="membersCount"
            className="block text-sm font-medium text-gray-700"
          >
            Members Count
          </label>
          <input
            id="membersCount"
            type="number"
            {...register("membersCount", {
              required: "Members count is required",
              valueAsNumber: true,
            })}
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            htmlFor="belowTwoYearsCount"
            className="block text-sm font-medium text-gray-700"
          >
            Below 2 Years Count
          </label>
          <input
            id="belowTwoYearsCount"
            type="number"
            {...register("belowTwoYearsCount", {
              required: "This field is required",
              valueAsNumber: true,
            })}
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            {...register("date", { required: "Date is required" })}
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
          )}
        </div>

        {/* Submission Error */}
        {submissionError && (
          <p className="text-red-500 text-sm mt-3">{submissionError}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default SamaraBookingCreateForm;

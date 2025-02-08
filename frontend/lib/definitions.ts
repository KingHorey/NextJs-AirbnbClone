import { Amethysta } from "next/font/google";
import { z } from "zod";

export const destinationSchema = z.object({
  destination: z.string().optional(),
});

export const checkInSchema = z.object({
  checkIn: z.date(),
});

export const checkOutSchema = z.object({
  checkOut: z.date(),
});

const searchSchemaWithDate = z.object({
  ...destinationSchema.shape,
  date: z.string().optional(),
  who: z.enum(["children", "adults", "infants", "pets"]).optional(),
});

const searchSchemaWithCheckIn = z.object({
  destination: z.string().optional(),
  date: z.date().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  who: z.enum(["children", "adults", "infants", "pets"]).optional(),
});

export const searchSchema = z.union([
  searchSchemaWithCheckIn,
  searchSchemaWithDate,
]);

export const authSchema = z.object({
  // country_code: z.string(),
  // phone_number: z.string().refine((v) => /^\d{10,15}$/.test(v), {
  //   message: "Phone number must be numeric and between 10 to 15 digits.",
  // }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export const filterSchema = z.object({
  rooms: z.number().optional(),
  guests: z.number().optional(),
  bedrooms: z.number().optional(),
  beds: z.number().optional(),
  price: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
  }),
  rating: z.number().optional(),
  type: z.enum(["entire", "private", "shared"]).optional(),
  amenities: z.array(z.string()).optional(),
  location: z.string().optional(),
  booking_type: z.enum(["instant", "request"]).optional(),
});

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
  country_code: z.string(),
  phone_number: z.string().refine((v) => /^\d{10,15}$/.test(v), {
    message: "Phone number must be numeric and between 10 to 15 digits.",
  }),
});

import { z } from "zod";

export const destinationSchema = z.object({
  destination: z.string(),
});

export const checkInSchema = z.object({
  checkIn: z.date(),
});

export const checkOutSchema = z.object({
  checkOut: z.date(),
});

const searchSchemaWithDate = z.object({
  ...destinationSchema.shape,
  date: z.date(),
  who: z.enum(["children", "adults", "infants", "pets"]),
});

const searchSchemaWithCheckIn = z.object({
  destination: z.string(),
  date: z.date(),
  checkIn: z.date(),
  checkOut: z.date(),
  who: z.enum(["children", "adults", "infants", "pets"]),
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

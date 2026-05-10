import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Valid email required"),
  phone: z.string().max(40).optional(),
  city: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  image: z.string().url("Profile image must be a valid URL").max(500).optional(),
  password: z.string().min(8, "At least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const profileUpdateSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  city: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  image: z
    .string()
    .max(500)
    .optional()
    .refine((s) => s === undefined || s === "" || /^https?:\/\/.+/i.test(s), "Profile image must be a valid http(s) URL"),
  baseCurrency: z.string().length(3).optional(),
});

export const createTripSchema = z.object({
  title: z.string().min(1).max(200),
  destination: z.string().min(1).max(200),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  travelerType: z.string().max(50).optional(),
  budgetTotal: z.number().int().positive().optional().nullable(),
  coverImage: z
    .union([z.string().max(500), z.literal("")])
    .transform((v) => (v === "" ? undefined : v))
    .optional()
    .refine((s) => s === undefined || /^https?:\/\/.+/i.test(s), "Cover image must be a valid http(s) URL"),
  currency: z.string().length(3).optional(),
});

export const itineraryDayInput = z.object({
  dayIndex: z.number().int().min(0),
  date: z.string(),
  title: z.string().optional().nullable(),
  activities: z.array(
    z.object({
      time: z.string(),
      title: z.string(),
      type: z.string(),
      duration: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
      costCents: z.number().int().optional().nullable(),
      completed: z.boolean().optional(),
      sortOrder: z.number().int().optional(),
    }),
  ),
});

export const itineraryUpdateSchema = z.object({
  days: z.array(itineraryDayInput),
});

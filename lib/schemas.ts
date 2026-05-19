import { z } from "zod";

/* Nigeria-aware phone. Accepts 0XXXXXXXXXX, 234XXXXXXXXXX, +234XXXXXXXXXX
   (spaces tolerated by stripping before the regex test). Shared by the
   contact, checkout, and booking forms. Client-side constraint only —
   the raw value is still what gets POSTed to the backend / Flutterwave. */
export const phoneSchema = z
  .string()
  .trim()
  .refine((v) => /^(\+?234|0)\d{10}$/.test(v.replace(/[\s-]/g, "")), {
    message: "Enter a valid Nigerian phone number, e.g. 0801 234 5678.",
  });

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: phoneSchema,
  message: z.string().trim().min(5, "Please include a brief message."),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
});

export const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits."),
});

export const signInSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});
export type SignInInput = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});
export type SignUpInput = z.infer<typeof signUpSchema>;

export const bookingSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  phone: phoneSchema,
  testType: z.string().min(1, "Please select a test type."),
  preferredDate: z
    .string()
    .min(1, "Please choose a preferred date.")
    .refine(
      (v) => {
        const d = new Date(v);
        if (Number.isNaN(d.getTime())) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return d >= today;
      },
      { message: "Pick today or a future date." },
    ),
});
export type BookingInput = z.infer<typeof bookingSchema>;

export const customerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: phoneSchema,
});
export type CustomerInput = z.infer<typeof customerSchema>;

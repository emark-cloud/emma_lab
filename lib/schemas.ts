import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a valid phone number."),
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

export const customerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a valid phone number."),
});
export type CustomerInput = z.infer<typeof customerSchema>;

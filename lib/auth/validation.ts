import { z } from "zod/v4";

export const emailSchema = z.string().trim().toLowerCase().email().max(320);

export const passwordSchema = z.string().min(12).max(128);

export const loginSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

export const staffAccountSchema = z.object({
  email: emailSchema,
  displayName: z.string().trim().min(2).max(160),
  password: passwordSchema,
  role: z.enum(["admin", "marketing"]),
});

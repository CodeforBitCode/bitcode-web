import { z } from "zod/v4";
import { learningPathTitles } from "@/data/site";

const normalizedText = (minimum: number, maximum: number) =>
  z
    .string()
    .trim()
    .min(minimum)
    .max(maximum)
    .transform((value) => value.replace(/\s+/g, " "));

export const enquirySubmissionSchema = z
  .object({
    name: normalizedText(2, 100),
    email: z.string().trim().toLowerCase().email().max(320),
    phone: z
      .string()
      .trim()
      .regex(/^[+0-9 ()-]{8,18}$/)
      .transform((value) => value.replace(/\s+/g, " ")),
    studentAgeOrClass: normalizedText(1, 80),
    learningPathInterest: z.enum(learningPathTitles),
    message: normalizedText(10, 1500),
    website: z.string().max(0).optional(),
  })
  .strict()
  .transform((submission) => ({
    name: submission.name,
    email: submission.email,
    phone: submission.phone,
    studentAgeOrClass: submission.studentAgeOrClass,
    learningPathInterest: submission.learningPathInterest,
    message: submission.message,
  }));

export type EnquirySubmission = z.infer<typeof enquirySubmissionSchema>;

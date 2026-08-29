import { z } from "zod/v4";
import { learningPathTitles } from "@/data/site";
import { enquiryStatuses } from "./status";

const optionalQueryText = z.preprocess(
  (value) => (value === "" || value === null ? undefined : value),
  z.string().trim().max(100).optional(),
);

export const enquiryListQuerySchema = z.object({
  q: optionalQueryText,
  status: z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.enum(enquiryStatuses).optional(),
  ),
  learningPath: z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.enum(learningPathTitles).optional(),
  ),
  page: z.coerce.number().int().min(1).max(10_000).default(1),
});

export const enquiryIdSchema = z.string().uuid();

export const enquiryStatusUpdateSchema = z
  .object({ status: z.enum(enquiryStatuses) })
  .strict();

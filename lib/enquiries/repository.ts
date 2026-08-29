import { getDb } from "@/lib/db";
import { enquiries } from "@/lib/db/schema";
import type { EnquirySubmission } from "./validation";

export type CreatedEnquiry = {
  id: string;
  createdAt: Date;
};

export type SaveEnquiry = (
  submission: EnquirySubmission,
) => Promise<CreatedEnquiry>;

export const saveEnquiry: SaveEnquiry = async (submission) => {
  const [created] = await getDb()
    .insert(enquiries)
    .values({
      ...submission,
      source: "website",
      status: "new",
    })
    .returning({ id: enquiries.id, createdAt: enquiries.createdAt });

  if (!created) throw new Error("The enquiry was not created.");
  return created;
};

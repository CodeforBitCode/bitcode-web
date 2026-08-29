import { describe, expect, it, vi } from "vitest";
import { learningPathTitles } from "@/data/site";
import { DatabaseConfigurationError } from "@/lib/db";
import { handleEnquiryPost } from "./handler";

const validSubmission = {
  name: "Sample Learner",
  email: "LEARNER@EXAMPLE.COM",
  phone: "+91 98765 43210",
  studentAgeOrClass: "Class 9",
  learningPathInterest: learningPathTitles[0],
  message: "I would like help choosing a course.",
  website: "",
};

function jsonRequest(body: unknown, contentType = "application/json") {
  return new Request("http://localhost/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": contentType },
    body: JSON.stringify(body),
  });
}

describe("enquiry Route Handler", () => {
  it("persists a valid normalized enquiry", async () => {
    const persist = vi.fn().mockResolvedValue({
      id: "5be20a4c-1331-4182-a387-4e8771fb1cb4",
      createdAt: new Date("2026-08-29T08:00:00.000Z"),
    });

    const response = await handleEnquiryPost(
      jsonRequest(validSubmission),
      persist,
    );

    expect(response.status).toBe(201);
    expect(persist).toHaveBeenCalledWith(
      expect.objectContaining({ email: "learner@example.com" }),
    );
    await expect(response.json()).resolves.toEqual({
      success: true,
      enquiry: {
        id: "5be20a4c-1331-4182-a387-4e8771fb1cb4",
        createdAt: "2026-08-29T08:00:00.000Z",
      },
    });
  });

  it("rejects unsupported media types and invalid submissions", async () => {
    const persist = vi.fn();
    const unsupported = await handleEnquiryPost(
      jsonRequest(validSubmission, "text/plain"),
      persist,
    );
    const invalid = await handleEnquiryPost(
      jsonRequest({ ...validSubmission, email: "invalid" }),
      persist,
    );

    expect(unsupported.status).toBe(415);
    expect(invalid.status).toBe(422);
    expect(persist).not.toHaveBeenCalled();
  });

  it("rejects oversized requests", async () => {
    const response = await handleEnquiryPost(
      jsonRequest({ ...validSubmission, message: "x".repeat(17 * 1024) }),
      vi.fn(),
    );

    expect(response.status).toBe(413);
  });

  it("returns a safe fallback response when the database is unavailable", async () => {
    const response = await handleEnquiryPost(
      jsonRequest(validSubmission),
      vi.fn().mockRejectedValue(new DatabaseConfigurationError()),
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      success: false,
      code: "ENQUIRY_UNAVAILABLE",
    });
  });
});

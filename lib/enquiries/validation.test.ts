import { describe, expect, it } from "vitest";
import { learningPathTitles } from "@/data/site";
import { enquirySubmissionSchema } from "./validation";

const validSubmission = {
  name: "  Sample   Learner  ",
  email: "  LEARNER@EXAMPLE.COM ",
  phone: "+91 98765 43210",
  studentAgeOrClass: "  Class   9 ",
  learningPathInterest: learningPathTitles[0],
  message: "  I would like   help choosing a course. ",
  website: "",
};

describe("enquiry submission validation", () => {
  it("normalizes accepted fields and removes the honeypot", () => {
    expect(enquirySubmissionSchema.parse(validSubmission)).toEqual({
      name: "Sample Learner",
      email: "learner@example.com",
      phone: "+91 98765 43210",
      studentAgeOrClass: "Class 9",
      learningPathInterest: learningPathTitles[0],
      message: "I would like help choosing a course.",
    });
  });

  it("rejects unknown learning paths and bot-filled honeypots", () => {
    expect(
      enquirySubmissionSchema.safeParse({
        ...validSubmission,
        learningPathInterest: "Unknown course",
      }).success,
    ).toBe(false);
    expect(
      enquirySubmissionSchema.safeParse({
        ...validSubmission,
        website: "https://spam.example",
      }).success,
    ).toBe(false);
  });

  it("rejects malformed contact details", () => {
    expect(
      enquirySubmissionSchema.safeParse({
        ...validSubmission,
        email: "not-an-email",
        phone: "123",
      }).success,
    ).toBe(false);
  });
});

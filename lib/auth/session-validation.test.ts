import { describe, expect, it } from "vitest";
import { getPageAccessDecision, validateStoredSession, type StoredSession } from "./session-validation";

const activeSession: StoredSession = {
  tokenHash: "a".repeat(64),
  userId: "user-1",
  email: "staff@example.com",
  displayName: "Staff User",
  userStatus: "active",
  expiresAt: new Date("2026-08-29T12:00:00.000Z"),
  roles: ["marketing"],
};

describe("session validation and page access", () => {
  it("rejects expired and role-less sessions", () => {
    expect(
      validateStoredSession(activeSession, new Date("2026-08-29T12:00:00.000Z")),
    ).toBeNull();
    expect(
      validateStoredSession(
        { ...activeSession, roles: ["unknown"] },
        new Date("2026-08-29T11:00:00.000Z"),
      ),
    ).toBeNull();
  });

  it("redirects unauthenticated access and enforces role permissions", () => {
    const session = validateStoredSession(
      activeSession,
      new Date("2026-08-29T11:00:00.000Z"),
    );
    expect(getPageAccessDecision(null, "admin:access")).toBe("login");
    expect(getPageAccessDecision(session, "enquiries:manage")).toBe("allow");
    expect(getPageAccessDecision(session, "users:manage")).toBe("forbidden");
  });
});

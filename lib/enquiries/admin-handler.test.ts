import { describe, expect, it, vi } from "vitest";
import type { ApiAuthorization } from "@/lib/auth/api-authorization";
import { handleAdminEnquiryList, handleAdminEnquiryStatusUpdate } from "./admin-handler";

const authorized: ApiAuthorization = {
  kind: "authorized",
  session: {
    tokenHash: "a".repeat(64),
    userId: "user-1",
    email: "staff@example.com",
    displayName: "Staff User",
    userStatus: "active",
    expiresAt: new Date("2026-08-29T22:00:00.000Z"),
    roles: ["marketing"],
  },
};

describe("admin enquiry handlers", () => {
  it("rejects unauthenticated and unauthorized listing", async () => {
    const list = vi.fn();
    const unauthenticated = await handleAdminEnquiryList(
      new Request("https://bitcode.example/api/admin/enquiries"),
      vi.fn().mockResolvedValue({ kind: "unauthenticated" }),
      list,
    );
    const forbidden = await handleAdminEnquiryList(
      new Request("https://bitcode.example/api/admin/enquiries"),
      vi.fn().mockResolvedValue({ kind: "forbidden" }),
      list,
    );
    expect(unauthenticated.status).toBe(401);
    expect(forbidden.status).toBe(403);
    expect(list).not.toHaveBeenCalled();
  });

  it("passes validated search, filters, and pagination to the listing query", async () => {
    const list = vi.fn().mockResolvedValue({
      items: [],
      page: 3,
      pageSize: 20,
      total: 41,
      totalPages: 3,
    });
    const response = await handleAdminEnquiryList(
      new Request(
        "https://bitcode.example/api/admin/enquiries?q=learner&status=new&learningPath=Coding%20for%20Absolute%20Beginners&page=3",
      ),
      vi.fn().mockResolvedValue(authorized),
      list,
    );
    expect(response.status).toBe(200);
    expect(list).toHaveBeenCalledWith({
      q: "learner",
      status: "new",
      learningPath: "Coding for Absolute Beginners",
      page: 3,
    });
  });

  it("persists a valid status update", async () => {
    const update = vi.fn().mockResolvedValue({
      id: "5be20a4c-1331-4182-a387-4e8771fb1cb4",
      status: "converted",
      updatedAt: new Date("2026-08-29T12:00:00.000Z"),
    });
    const response = await handleAdminEnquiryStatusUpdate(
      new Request(
        "https://bitcode.example/api/admin/enquiries/5be20a4c-1331-4182-a387-4e8771fb1cb4/status",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Origin: "https://bitcode.example" },
          body: JSON.stringify({ status: "converted" }),
        },
      ),
      "5be20a4c-1331-4182-a387-4e8771fb1cb4",
      vi.fn().mockResolvedValue(authorized),
      update,
    );
    expect(response.status).toBe(200);
    expect(update).toHaveBeenCalledWith(
      "5be20a4c-1331-4182-a387-4e8771fb1cb4",
      "converted",
    );
  });

  it("rejects invalid or over-broad status mutations", async () => {
    const update = vi.fn();
    const response = await handleAdminEnquiryStatusUpdate(
      new Request(
        "https://bitcode.example/api/admin/enquiries/5be20a4c-1331-4182-a387-4e8771fb1cb4/status",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Origin: "https://bitcode.example" },
          body: JSON.stringify({ status: "deleted", name: "Changed" }),
        },
      ),
      "5be20a4c-1331-4182-a387-4e8771fb1cb4",
      vi.fn().mockResolvedValue(authorized),
      update,
    );
    expect(response.status).toBe(422);
    expect(update).not.toHaveBeenCalled();
  });
});

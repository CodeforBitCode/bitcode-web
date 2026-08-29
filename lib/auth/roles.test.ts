import { describe, expect, it } from "vitest";
import { hasPermission, permissions } from "./roles";

describe("role permissions", () => {
  it("gives admins every declared permission", () => {
    for (const permission of permissions) {
      expect(hasPermission(["admin"], permission)).toBe(true);
    }
  });

  it("does not give students administrative access", () => {
    expect(hasPermission(["student"], "enquiries:manage")).toBe(false);
    expect(hasPermission(["student"], "users:manage")).toBe(false);
  });
});

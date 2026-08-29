import { describe, expect, it, vi } from "vitest";
import { handleLoginPost } from "./login-handler";

function request(body: unknown, origin = "https://bitcode.example") {
  return new Request("https://bitcode.example/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify(body),
  });
}

describe("admin login handler", () => {
  it("sets an HttpOnly session cookie after successful login", async () => {
    const authenticate = vi.fn().mockResolvedValue({
      ok: true,
      token: "session-token",
      expiresAt: new Date("2026-08-29T22:00:00.000Z"),
    });
    const response = await handleLoginPost(
      request({ email: "STAFF@EXAMPLE.COM", password: "long secure password" }),
      authenticate,
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("set-cookie")).toContain("HttpOnly");
    expect(response.headers.get("set-cookie")).toContain("SameSite=Lax");
    expect(authenticate).toHaveBeenCalledWith(
      expect.objectContaining({ email: "staff@example.com" }),
      expect.anything(),
      expect.any(Date),
    );
  });

  it("returns one generic response for failed credentials", async () => {
    const response = await handleLoginPost(
      request({ email: "staff@example.com", password: "wrong password value" }),
      vi.fn().mockResolvedValue({ ok: false }),
    );
    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toMatchObject({
      code: "INVALID_CREDENTIALS",
    });
  });

  it("rejects cross-origin login requests", async () => {
    const authenticate = vi.fn();
    const response = await handleLoginPost(
      request(
        { email: "staff@example.com", password: "long secure password" },
        "https://attacker.example",
      ),
      authenticate,
    );
    expect(response.status).toBe(403);
    expect(authenticate).not.toHaveBeenCalled();
  });
});

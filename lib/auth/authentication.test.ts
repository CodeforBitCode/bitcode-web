import { describe, expect, it, vi } from "vitest";
import { authenticateCredentials, type AuthenticationRepository } from "./authentication";
import { hashPassword } from "./password";

function repository(overrides: Partial<AuthenticationRepository> = {}) {
  return {
    findCredentialByEmail: vi.fn(),
    resetLoginFailures: vi.fn(),
    recordLoginFailure: vi.fn(),
    createSession: vi.fn(),
    ...overrides,
  } satisfies AuthenticationRepository;
}

describe("credential authentication", () => {
  it("creates a hashed, expiring session for a valid password", async () => {
    const passwordHash = await hashPassword("correct horse battery staple");
    const store = repository({
      findCredentialByEmail: vi.fn().mockResolvedValue({
        userId: "user-1",
        status: "active",
        passwordHash,
        failedLoginAttempts: 0,
        lockedUntil: null,
      }),
    });
    const now = new Date("2026-08-29T10:00:00.000Z");

    const result = await authenticateCredentials(
      { email: "staff@example.com", password: "correct horse battery staple" },
      store,
      now,
    );

    expect(result.ok).toBe(true);
    expect(store.resetLoginFailures).toHaveBeenCalledWith("user-1", now);
    expect(store.createSession).toHaveBeenCalledWith(
      "user-1",
      expect.stringMatching(/^[a-f0-9]{64}$/),
      new Date("2026-08-29T22:00:00.000Z"),
      now,
    );
    if (result.ok) {
      expect(result.token).not.toMatch(/^[a-f0-9]{64}$/);
    }
  });

  it("rejects a bad password and records the failure", async () => {
    const passwordHash = await hashPassword("correct horse battery staple");
    const store = repository({
      findCredentialByEmail: vi.fn().mockResolvedValue({
        userId: "user-1",
        status: "active",
        passwordHash,
        failedLoginAttempts: 1,
        lockedUntil: null,
      }),
    });
    const now = new Date("2026-08-29T10:00:00.000Z");

    await expect(
      authenticateCredentials(
        { email: "staff@example.com", password: "incorrect password here" },
        store,
        now,
      ),
    ).resolves.toEqual({ ok: false });
    expect(store.recordLoginFailure).toHaveBeenCalledWith(
      "user-1",
      new Date("2026-08-29T10:15:00.000Z"),
      now,
    );
    expect(store.createSession).not.toHaveBeenCalled();
  });
});

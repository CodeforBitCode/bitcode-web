import {
  consumePasswordVerificationTime,
  verifyPassword,
} from "./password";
import { createSessionToken, hashSessionToken } from "./tokens";

export const sessionDurationMs = 12 * 60 * 60 * 1000;
export const maxFailedLoginAttempts = 5;
export const accountLockDurationMs = 15 * 60 * 1000;

export type CredentialAccount = {
  userId: string;
  status: "active" | "inactive";
  passwordHash: string;
  failedLoginAttempts: number;
  lockedUntil: Date | null;
};

export type AuthenticationRepository = {
  findCredentialByEmail(email: string): Promise<CredentialAccount | null>;
  resetLoginFailures(userId: string, now: Date): Promise<void>;
  recordLoginFailure(
    userId: string,
    lockExpiresAt: Date,
    now: Date,
  ): Promise<void>;
  createSession(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
    now: Date,
  ): Promise<void>;
};

type Credentials = { email: string; password: string };

export async function authenticateCredentials(
  credentials: Credentials,
  repository: AuthenticationRepository,
  now = new Date(),
) {
  const account = await repository.findCredentialByEmail(credentials.email);

  if (!account) {
    await consumePasswordVerificationTime(credentials.password);
    return { ok: false as const };
  }

  if (account.status !== "active") {
    await consumePasswordVerificationTime(credentials.password);
    return { ok: false as const };
  }

  if (account.lockedUntil && account.lockedUntil > now) {
    await consumePasswordVerificationTime(credentials.password);
    return { ok: false as const };
  }

  if (account.lockedUntil && account.lockedUntil <= now) {
    await repository.resetLoginFailures(account.userId, now);
  }

  const passwordIsValid = await verifyPassword(
    credentials.password,
    account.passwordHash,
  );

  if (!passwordIsValid) {
    const lockExpiresAt = new Date(now.getTime() + accountLockDurationMs);
    await repository.recordLoginFailure(
      account.userId,
      lockExpiresAt,
      now,
    );
    return { ok: false as const };
  }

  await repository.resetLoginFailures(account.userId, now);
  const token = createSessionToken();
  const expiresAt = new Date(now.getTime() + sessionDurationMs);
  await repository.createSession(
    account.userId,
    hashSessionToken(token),
    expiresAt,
    now,
  );

  return { ok: true as const, token, expiresAt };
}

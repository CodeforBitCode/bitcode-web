import { eq, lt, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import {
  authSessions,
  userCredentials,
  userRoles,
  users,
} from "@/lib/db/schema";
import {
  maxFailedLoginAttempts,
  type AuthenticationRepository,
} from "./authentication";
import type { StoredSession } from "./session-validation";

export const authenticationRepository: AuthenticationRepository = {
  async findCredentialByEmail(email) {
    const [account] = await getDb()
      .select({
        userId: users.id,
        status: users.status,
        passwordHash: userCredentials.passwordHash,
        failedLoginAttempts: userCredentials.failedLoginAttempts,
        lockedUntil: userCredentials.lockedUntil,
      })
      .from(users)
      .innerJoin(userCredentials, eq(userCredentials.userId, users.id))
      .where(sql`lower(${users.email}) = ${email}`)
      .limit(1);
    return account ?? null;
  },

  async resetLoginFailures(userId, now) {
    await getDb()
      .update(userCredentials)
      .set({ failedLoginAttempts: 0, lockedUntil: null, updatedAt: now })
      .where(eq(userCredentials.userId, userId));
  },

  async recordLoginFailure(userId, lockExpiresAt, now) {
    await getDb()
      .update(userCredentials)
      .set({
        failedLoginAttempts: sql`${userCredentials.failedLoginAttempts} + 1`,
        lockedUntil: sql`case when ${userCredentials.failedLoginAttempts} + 1 >= ${maxFailedLoginAttempts} then ${lockExpiresAt} else ${userCredentials.lockedUntil} end`,
        updatedAt: now,
      })
      .where(eq(userCredentials.userId, userId));
  },

  async createSession(userId, tokenHash, expiresAt, now) {
    await getDb().insert(authSessions).values({
      userId,
      tokenHash,
      expiresAt,
      createdAt: now,
      lastSeenAt: now,
    });
  },
};

export type SessionRepository = {
  findSessionByTokenHash(tokenHash: string): Promise<StoredSession | null>;
  deleteSessionByTokenHash(tokenHash: string): Promise<void>;
  deleteExpiredSessions(now: Date): Promise<void>;
};

export const sessionRepository: SessionRepository = {
  async findSessionByTokenHash(tokenHash) {
    const [record] = await getDb()
      .select({
        tokenHash: authSessions.tokenHash,
        userId: users.id,
        email: users.email,
        displayName: users.displayName,
        userStatus: users.status,
        expiresAt: authSessions.expiresAt,
      })
      .from(authSessions)
      .innerJoin(users, eq(users.id, authSessions.userId))
      .where(eq(authSessions.tokenHash, tokenHash))
      .limit(1);

    if (!record) return null;
    const roles = await getDb()
      .select({ role: userRoles.role })
      .from(userRoles)
      .where(eq(userRoles.userId, record.userId));
    return { ...record, roles: roles.map(({ role }) => role) };
  },

  async deleteSessionByTokenHash(tokenHash) {
    await getDb()
      .delete(authSessions)
      .where(eq(authSessions.tokenHash, tokenHash));
  },

  async deleteExpiredSessions(now) {
    await getDb().delete(authSessions).where(lt(authSessions.expiresAt, now));
  },
};

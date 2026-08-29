import { createInterface } from "node:readline/promises";
import { randomUUID } from "node:crypto";
import { stdin, stdout } from "node:process";
import { sql } from "drizzle-orm";
import { config } from "dotenv";
import { getDb } from "@/lib/db";
import { userCredentials, userRoles, users } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";
import { staffAccountSchema } from "@/lib/auth/validation";

config({ path: ".env.local", quiet: true });
config({ quiet: true });

async function readHidden(prompt: string) {
  if (!stdin.isTTY || !stdin.setRawMode) {
    throw new Error("Admin creation requires an interactive terminal.");
  }

  stdout.write(prompt);
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding("utf8");

  return new Promise<string>((resolve, reject) => {
    let value = "";
    const cleanup = () => {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.removeListener("data", onData);
      stdout.write("\n");
    };
    const onData = (input: string) => {
      for (const character of input) {
        if (character === "\u0003") {
          cleanup();
          reject(new Error("Admin creation cancelled."));
          return;
        }
        if (character === "\r" || character === "\n") {
          cleanup();
          resolve(value);
          return;
        }
        if (character === "\u007f" || character === "\b") {
          value = value.slice(0, -1);
        } else if (character >= " ") {
          value += character;
        }
      }
    };
    stdin.on("data", onData);
  });
}

async function main() {
  const prompt = createInterface({ input: stdin, output: stdout });
  const email = await prompt.question("Staff email: ");
  const displayName = await prompt.question("Display name: ");
  const roleInput = await prompt.question("Role (admin/marketing) [admin]: ");
  prompt.close();

  const password = await readHidden("Password (minimum 12 characters): ");
  const confirmation = await readHidden("Confirm password: ");
  if (password !== confirmation) throw new Error("Passwords do not match.");

  const account = staffAccountSchema.parse({
    email,
    displayName,
    password,
    role: roleInput.trim() || "admin",
  });
  const passwordHash = await hashPassword(account.password);
  const database = getDb();

  const [existing] = await database
    .select({ id: users.id })
    .from(users)
    .where(sql`lower(${users.email}) = ${account.email}`)
    .limit(1);
  if (existing) throw new Error("A user with that email already exists.");

  const now = new Date();
  const userId = randomUUID();
  await database.batch([
    database.insert(users).values({
      id: userId,
      email: account.email,
      displayName: account.displayName,
      emailVerifiedAt: now,
      status: "active",
      updatedAt: now,
    }),
    database.insert(userCredentials).values({
      userId,
      passwordHash,
      updatedAt: now,
    }),
    database.insert(userRoles).values({ userId, role: account.role }),
  ]);

  stdout.write("Staff account created successfully.\n");
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : "Admin creation failed.";
  stdout.write(`${message}\n`);
  process.exitCode = 1;
});

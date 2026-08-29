import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";

config({ path: ".env.local", quiet: true });
config({ quiet: true });

async function main() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to run migrations.");
  }

  const db = drizzle(neon(databaseUrl));
  await migrate(db, { migrationsFolder: "./drizzle" });

  console.log("Migrations applied successfully.");
}

main().catch((error: unknown) => {
  const databaseUrl = process.env.DATABASE_URL;
  const message = error instanceof Error ? error.message : "Unknown migration error";
  const safeMessage = databaseUrl ? message.replaceAll(databaseUrl, "[REDACTED]") : message;

  console.error(`Migration failed: ${safeMessage}`);
  process.exitCode = 1;
});

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export class DatabaseConfigurationError extends Error {
  constructor() {
    super("DATABASE_URL is not configured.");
    this.name = "DatabaseConfigurationError";
  }
}

function createDatabase(connectionString: string) {
  return drizzle({ client: neon(connectionString), schema });
}

let database: ReturnType<typeof createDatabase> | undefined;

export function getDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new DatabaseConfigurationError();

  database ??= createDatabase(connectionString);
  return database;
}

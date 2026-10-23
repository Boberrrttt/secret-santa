import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let database: NeonQueryFunction<false, false> | undefined;

export function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set.");
  }
  database ??= neon(databaseUrl);
  return database;
}

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL!;

export const client = postgres(databaseUrl, {prepare: false});
export const db = drizzle(client);
import { Pool } from "pg";
// import { drizzle } from "drizzle-orm/node-postgres";

// Schemas
// import * as schema from "./schemas";

if (!process.env.CONNECTION_STRING) {
  throw new Error("Missing 'CONNECTION_STRING' env var");
}

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

// export const db = drizzle(pool, { schema });

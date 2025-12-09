import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./drizzle/schemas",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.CONNECTION_STRING!,
  },
  verbose: true,
  strict: true,
} satisfies Config;

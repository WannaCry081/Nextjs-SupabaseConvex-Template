import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./data/schemas",
  out: "./data/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.CONNECTION_STRING!,
  },
  verbose: true,
  strict: true,
} satisfies Config;

import type { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      type: "customJwt",
      issuer: process.env.SUPABASE_JWT_ISSUER!,
      applicationID: "authenticated",
      jwks: process.env.SUPABASE_JWT_ISSUER! + "/.well-known/jwks.json",
      algorithm: "RS256",
    },
  ],
} satisfies AuthConfig;

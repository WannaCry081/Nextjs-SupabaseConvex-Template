"use client";

import { useCallback, useMemo, PropsWithChildren } from "react";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { useSupabaseAuth } from "./supabase-auth-provider";

type UseAuthResult = {
  isLoading: boolean;
  isAuthenticated: boolean;
  fetchAccessToken: (opts: {
    forceRefreshToken: boolean;
  }) => Promise<string | null>;
};

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const useAuthFromSupabase = (): UseAuthResult => {
  const { session, isLoading } = useSupabaseAuth();

  const fetchAccessToken = useCallback(
    async () => session?.access_token ?? null,
    [session]
  );

  return useMemo(
    () => ({
      isLoading,
      isAuthenticated: !!session,
      fetchAccessToken,
    }),
    [isLoading, session, fetchAccessToken]
  );
};

export const ConvexSupabaseProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConvexProviderWithAuth client={convex} useAuth={useAuthFromSupabase}>
      {children}
    </ConvexProviderWithAuth>
  );
};

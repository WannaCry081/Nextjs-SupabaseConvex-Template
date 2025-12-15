import { useCallback, useMemo } from "react";

// Hooks
import { useSupabaseAuthContext } from "./useSupabaseAuthContext";

type UseSupabaseAuthReturn = {
  isLoading: boolean;
  isAuthenticated: boolean;
  fetchAccessToken: (opts: {
    forceRefreshToken: boolean;
  }) => Promise<string | null>;
};

export const useSupabaseAuth = (): UseSupabaseAuthReturn => {
  const { session, isLoading } = useSupabaseAuthContext();

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

"use client";

import {
  useCallback,
  useMemo,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";

import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  const [{ queryClient, convexQueryClient }] = useState(() => {
    const convexQueryClient = new ConvexQueryClient(convex);
    const tanstackQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          queryKeyHashFn: convexQueryClient.hashFn(),
          queryFn: convexQueryClient.queryFn(),
        },
      },
    });

    convexQueryClient.connect(tanstackQueryClient);

    return { queryClient: tanstackQueryClient, convexQueryClient };
  });

  useEffect(() => {
    return () => {
      convexQueryClient.unsubscribe?.();
      queryClient.clear();
    };
  }, [convexQueryClient, queryClient]);

  return (
    <ConvexProviderWithAuth client={convex} useAuth={useAuthFromSupabase}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ConvexProviderWithAuth>
  );
};

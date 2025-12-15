"use client";

import { PropsWithChildren } from "react";
import { ConvexProviderWithAuth } from "convex/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Hooks
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

// Services
import { convex, getConvexQueryClient } from "@/services/convex-query-client";

export const ConvexSupabaseProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getConvexQueryClient();

  return (
    <ConvexProviderWithAuth client={convex} useAuth={useSupabaseAuth}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ConvexProviderWithAuth>
  );
};

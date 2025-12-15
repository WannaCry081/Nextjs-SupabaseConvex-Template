import { createContext, useContext } from "react";

// Types
import type { Session } from "@supabase/supabase-js";

type SupabaseAuthContextReturn = {
  session: Session | null;
  isLoading: boolean;
};

export const SupabaseAuthContext = createContext<SupabaseAuthContextReturn | undefined>(undefined);

export const useSupabaseAuthContext = () => {
  const ctx = useContext(SupabaseAuthContext);
  if (!ctx) {
    throw new Error("'useSupabaseSession' must be used inside 'SupabaseAuthProvider'");
  }
  return ctx;
};

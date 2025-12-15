"use client";

import { useEffect, useState, PropsWithChildren } from "react";

// Context
import { SupabaseAuthContext } from "@/hooks/useSupabaseAuthContext";

// Types
import type { Session } from "@supabase/supabase-js";

// Utils
import { getSupabaseClient } from "@/lib/supabase/client";

export const SupabaseAuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = getSupabaseClient();

  useEffect(() => {
    const abort = new AbortController();

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (abort.signal.aborted) return;

        setSession(data.session ?? null);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!abort.signal.aborted) setSession(newSession);
    });

    return () => {
      abort.abort();
      subscription.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <SupabaseAuthContext.Provider value={{ session, isLoading }}>
      {children}
    </SupabaseAuthContext.Provider>
  );
};

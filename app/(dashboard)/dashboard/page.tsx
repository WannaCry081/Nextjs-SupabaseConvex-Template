"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Page() {
  const supabase = getSupabaseClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) {
        setUser(data.user);
      }
    };
    loadUser();
  }, [supabase]);

  return (
    <div>
      <h1>Hello world</h1>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/");
        }}
      >
        Logout
      </button>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

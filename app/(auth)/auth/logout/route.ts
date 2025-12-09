import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { getSupabaseServer } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await getSupabaseServer();

  await supabase.auth.signOut();
  revalidatePath("/", "layout");

  return NextResponse.redirect(
    new URL(
      "/auth/login",
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    )
  );
}

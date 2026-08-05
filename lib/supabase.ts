import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | undefined;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Faltan las variables públicas de Supabase en Vercel.");
  }

  client = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "erp-rodriguez-auth-v1",
    },
  });

  return client;
}

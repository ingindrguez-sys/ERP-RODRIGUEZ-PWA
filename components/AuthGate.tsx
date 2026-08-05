"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabase();

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session && pathname !== "/login") router.replace("/login");
      if (data.session && pathname === "/login") router.replace("/dashboard");
      setReady(true);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && pathname !== "/login") router.replace("/login");
      if (session && pathname === "/login") router.replace("/dashboard");
    });

    return () => data.subscription.unsubscribe();
  }, [pathname, router]);

  if (!ready) {
    return <div className="screen-message">Cargando ERP Rodríguez…</div>;
  }

  return children;
}

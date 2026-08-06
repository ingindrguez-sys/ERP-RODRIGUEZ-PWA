"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

export default function AuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const [startupError, setStartupError] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let active = true;

    try {
      const supabase = getSupabase();

      supabase.auth.getSession().then(({ data, error }) => {
        if (!active) return;

        if (error) {
          setStartupError(error.message);
          setReady(true);
          return;
        }

        if (!data.session && pathname !== "/login") {
          router.replace("/login");
        } else if (data.session && pathname === "/login") {
          router.replace("/dashboard");
        }

        setReady(true);
      });

      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!active) return;

        if (!session && pathname !== "/login") {
          router.replace("/login");
        } else if (session && pathname === "/login") {
          router.replace("/dashboard");
        }
      });

      return () => {
        active = false;
        data.subscription.unsubscribe();
      };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No fue posible iniciar la conexión con Supabase.";
      setStartupError(message);
      setReady(true);
    }
  }, [pathname, router]);

  if (!ready) {
    return <div className="screen-message">Cargando ERP Rodríguez…</div>;
  }

  if (startupError) {
    return (
      <div className="login-wrap">
        <div className="login-card">
          <img src="/logo-gcr.jpg" alt="Grupo Comercial Rodríguez" />
          <h1>ERP Rodríguez</h1>
          <p>No fue posible iniciar la conexión.</p>
          <div className="error">{startupError}</div>
          <p>
            Revisa las variables de Supabase en Vercel y vuelve a desplegar.
          </p>
        </div>
      </div>
    );
  }

  return children;
}

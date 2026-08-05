"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

const links = [
  ["/dashboard", "Centro de control", "⌂"],
  ["/ventas", "Ventas", "$"],
  ["/clientes", "Clientes", "♟"],
  ["/productos", "Productos", "▣"],
  ["/gastos", "Gastos", "−"],
  ["/inventario", "Inventario", "≡"],
  ["/configuracion", "Configuración", "⚙"],
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/login") return children;

  async function signOut() {
    await getSupabase().auth.signOut();
    router.replace("/login");
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <img src="/logo-gcr.jpg" alt="Grupo Comercial Rodríguez" className="side-logo" />
        <h1>ERP Rodríguez</h1>
        <p>Sistema de Ventas</p>

        <nav>
          {links.map(([href, label, icon]) => (
            <Link key={href} className={pathname === href ? "active" : ""} href={href}>
              <span>{icon}</span>{label}
            </Link>
          ))}
        </nav>

        <button className="ghost" onClick={signOut}>Cerrar sesión</button>
      </aside>

      <main className="main">{children}</main>

      <nav className="bottom-nav">
        {links.slice(0, 5).map(([href, label, icon]) => (
          <Link key={href} className={pathname === href ? "active" : ""} href={href}>
            <b>{icon}</b>
            <small>{label.split(" ")[0]}</small>
          </Link>
        ))}
      </nav>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { getSupabase } from "@/lib/supabase";

export default function Configuracion() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    getSupabase()
      .auth
      .getUser()
      .then(({ data }) => setEmail(data.user?.email || ""));
  }, []);

  return (
    <>
      <PageTitle
        title="Configuración"
        subtitle="Identidad y conexión del sistema"
      />

      <section className="settings-grid">
        <article>
          <h3>Cuenta activa</h3>
          <p>{email}</p>
          <small>
            La sesión se conserva y se renueva automáticamente mediante Supabase Auth.
          </small>
        </article>

        <article>
          <h3>Zona horaria</h3>
          <p>America/Mexico_City</p>
          <small>
            Ventas y gastos se capturan con la fecha local de México.
          </small>
        </article>

        <article>
          <h3>Aplicación instalable</h3>
          <p>ERP Rodríguez PWA</p>
          <small>
            En iPhone: Safari → Compartir → Agregar a pantalla de inicio.
          </small>
        </article>

        <article>
          <h3>Base de datos</h3>
          <p>Supabase</p>
          <small>
            Utiliza las mismas tablas y registros del ERP actual.
          </small>
        </article>
      </section>
    </>
  );
}

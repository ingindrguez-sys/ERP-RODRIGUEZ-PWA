"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await getSupabase().auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("No fue posible iniciar sesión. Revisa tu correo y contraseña.");
    } else {
      router.replace("/dashboard");
    }
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={submit}>
        <img src="/logo-gcr.jpg" alt="Grupo Comercial Rodríguez" />
        <h1>ERP Rodríguez</h1>
        <p>Centro de Control Empresarial</p>

        <label>
          Correo electrónico
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        {error && <div className="error">{error}</div>}

        <button disabled={loading}>
          {loading ? "Entrando…" : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}

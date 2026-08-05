"use client";

import { FormEvent, useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import DataTable from "@/components/DataTable";
import { getSupabase } from "@/lib/supabase";

export default function Clientes() {
  const [rows, setRows] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("La Piedad, Michoacán");
  const [message, setMessage] = useState("");

  async function load() {
    const { data } = await getSupabase()
      .from("clients")
      .select("*")
      .order("business_name");

    setRows(data || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function save(event: FormEvent) {
    event.preventDefault();
    setMessage("");

    const { error } = await getSupabase().from("clients").insert({
      business_name: name.trim(),
      phone: phone.trim(),
      city: city.trim(),
      client_type: "Tienda",
      payment_terms: "Contado",
      active: true,
    });

    if (error) {
      setMessage(`No se guardó: ${error.message}`);
    } else {
      setName("");
      setPhone("");
      setMessage("Cliente guardado correctamente.");
      load();
    }
  }

  return (
    <>
      <PageTitle
        title="Clientes"
        subtitle={`${rows.length} clientes registrados`}
      />

      <form className="panel-form" onSubmit={save}>
        <h3>Alta rápida</h3>

        <div className="form-grid">
          <label>
            Negocio o cliente
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <label>
            Teléfono
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </label>

          <label>
            Ciudad
            <input
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </label>
        </div>

        <button>Guardar cliente</button>
        {message && <div className="notice">{message}</div>}
      </form>

      <DataTable
        rows={rows}
        columns={[
          { key: "business_name", label: "Cliente" },
          { key: "contact_name", label: "Contacto" },
          { key: "phone", label: "Teléfono" },
          { key: "city", label: "Ciudad" },
          { key: "client_type", label: "Tipo" },
          { key: "payment_terms", label: "Pago" },
        ]}
      />
    </>
  );
}

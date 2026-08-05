"use client";

import { FormEvent, useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import DataTable from "@/components/DataTable";
import { getSupabase } from "@/lib/supabase";
import { localDate, money } from "@/lib/format";

const categories = [
  "Carne y materia prima",
  "Condimentos e ingredientes",
  "Empaque y etiquetas",
  "Gas y energía",
  "Transporte y combustible",
  "Mantenimiento",
  "Mano de obra",
  "Publicidad y degustaciones",
  "Servicios",
  "Otros",
];

export default function Gastos() {
  const [rows, setRows] = useState<any[]>([]);
  const [date, setDate] = useState(localDate());
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  async function load() {
    const { data } = await getSupabase()
      .from("expenses")
      .select("*")
      .order("expense_date", { ascending: false })
      .limit(200);

    setRows(data || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function save(event: FormEvent) {
    event.preventDefault();
    setMessage("");

    const { error } = await getSupabase().from("expenses").insert({
      expense_date: date,
      category,
      description: description.trim(),
      amount: Number(amount),
      payment_method: "Efectivo",
    });

    if (error) {
      setMessage(`No se guardó: ${error.message}`);
    } else {
      setDescription("");
      setAmount("");
      setMessage("Gasto guardado correctamente.");
      load();
    }
  }

  return (
    <>
      <PageTitle title="Gastos" subtitle="Operación de Embutidos Rodríguez" />

      <form className="panel-form" onSubmit={save}>
        <h3>Registrar gasto</h3>

        <div className="form-grid">
          <label>
            Fecha
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>

          <label>
            Categoría
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>

          <label>
            Concepto
            <input
              required
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>

          <label>
            Importe
            <input
              required
              min="0.01"
              step="0.01"
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </label>
        </div>

        <button>Guardar gasto</button>
        {message && <div className="notice">{message}</div>}
      </form>

      <DataTable
        rows={rows}
        columns={[
          { key: "expense_date", label: "Fecha" },
          { key: "category", label: "Categoría" },
          { key: "description", label: "Concepto" },
          { key: "supplier", label: "Proveedor" },
          { key: "amount", label: "Importe", render: (value) => money(value) },
          { key: "payment_method", label: "Forma de pago" },
        ]}
      />
    </>
  );
}

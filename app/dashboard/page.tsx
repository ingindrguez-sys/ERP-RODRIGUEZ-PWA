"use client";

import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { getSupabase } from "@/lib/supabase";
import { localDate, monthStart, money, number } from "@/lib/format";

type Metrics = {
  sales: number;
  kilos: number;
  profit: number;
  expenses: number;
  receivable: number;
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const supabase = getSupabase();

      const [
        { data: sales, error: salesError },
        { data: expenses, error: expenseError },
      ] = await Promise.all([
        supabase
          .from("sales_summary")
          .select("*")
          .gte("sale_date", monthStart())
          .lte("sale_date", localDate()),
        supabase
          .from("expenses")
          .select("amount")
          .gte("expense_date", monthStart())
          .lte("expense_date", localDate()),
      ]);

      if (salesError || expenseError) {
        setError("No fue posible cargar todos los indicadores.");
      }

      const rows = sales || [];

      setMetrics({
        sales: rows.reduce((sum, row) => sum + Number(row.total || 0), 0),
        kilos: rows.reduce((sum, row) => sum + Number(row.total_kg || 0), 0),
        profit: rows.reduce((sum, row) => sum + Number(row.profit || 0), 0),
        expenses: (expenses || []).reduce(
          (sum, row) => sum + Number(row.amount || 0),
          0
        ),
        receivable: rows.reduce(
          (sum, row) =>
            sum +
            Math.max(
              Number(row.total || 0) - Number(row.paid_amount || 0),
              0
            ),
          0
        ),
      });
    })();
  }, []);

  return (
    <>
      <PageTitle
        title="Centro de Control"
        subtitle={`Mes en curso · ${localDate()}`}
      />

      {error && <div className="notice warning">{error}</div>}

      {!metrics ? (
        <div className="empty-card">Cargando indicadores…</div>
      ) : (
        <section className="metrics">
          <article><span>Ventas del mes</span><strong>{money(metrics.sales)}</strong></article>
          <article><span>Kilos vendidos</span><strong>{number(metrics.kilos)} kg</strong></article>
          <article><span>Utilidad bruta</span><strong>{money(metrics.profit)}</strong></article>
          <article><span>Gastos registrados</span><strong>{money(metrics.expenses)}</strong></article>
          <article><span>Resultado estimado</span><strong>{money(metrics.profit - metrics.expenses)}</strong></article>
          <article><span>Por cobrar</span><strong>{money(metrics.receivable)}</strong></article>
        </section>
      )}

      <section className="welcome">
        <img src="/logo-embutidos.jpg" alt="Embutidos Rodríguez" />
        <div>
          <h3>ERP Rodríguez PWA v1.1</h3>
          <p>
            Esta aplicación utiliza la misma base actual de Supabase.
            Streamlit puede permanecer activo como respaldo.
          </p>
        </div>
      </section>
    </>
  );
}

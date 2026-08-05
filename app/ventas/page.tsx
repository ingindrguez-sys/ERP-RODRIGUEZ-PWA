"use client";

import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import DataTable from "@/components/DataTable";
import { getSupabase } from "@/lib/supabase";
import { money, number } from "@/lib/format";

export default function Ventas() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSupabase()
      .from("sales_summary")
      .select("*")
      .order("sale_date", { ascending: false })
      .limit(150)
      .then(({ data }) => {
        setRows(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <PageTitle title="Ventas" subtitle="Últimos 150 registros" />
      {loading ? (
        <div className="empty-card">Cargando ventas…</div>
      ) : (
        <DataTable
          rows={rows}
          columns={[
            { key: "folio", label: "Folio" },
            { key: "sale_date", label: "Fecha" },
            { key: "client_name", label: "Cliente" },
            { key: "total_kg", label: "Kg", render: (value) => number(value, 3) },
            { key: "total", label: "Total", render: (value) => money(value) },
            { key: "profit", label: "Utilidad", render: (value) => money(value) },
            { key: "payment_status", label: "Estatus" },
          ]}
        />
      )}
    </>
  );
}

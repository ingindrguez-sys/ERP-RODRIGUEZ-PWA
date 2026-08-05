"use client";

import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import DataTable from "@/components/DataTable";
import { getSupabase } from "@/lib/supabase";
import { number } from "@/lib/format";

export default function Inventario() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    getSupabase()
      .from("products")
      .select("*")
      .order("stock_kg", { ascending: true })
      .then(({ data }) => setRows(data || []));
  }, []);

  return (
    <>
      <PageTitle
        title="Inventario"
        subtitle="Existencias de producto terminado"
      />

      <DataTable
        rows={rows}
        columns={[
          { key: "name", label: "Producto" },
          { key: "presentation", label: "Presentación" },
          { key: "stock_kg", label: "Existencia", render: (value) => `${number(value, 3)} kg` },
          { key: "min_stock_kg", label: "Mínimo", render: (value) => `${number(value, 3)} kg` },
          { key: "active", label: "Estado", render: (value) => value ? "Activo" : "Inactivo" },
        ]}
      />
    </>
  );
}

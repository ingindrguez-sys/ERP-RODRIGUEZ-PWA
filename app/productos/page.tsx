"use client";

import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import DataTable from "@/components/DataTable";
import { getSupabase } from "@/lib/supabase";
import { money, number } from "@/lib/format";

export default function Productos() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    getSupabase()
      .from("products")
      .select("*")
      .order("name")
      .then(({ data }) => setRows(data || []));
  }, []);

  return (
    <>
      <PageTitle title="Productos" subtitle="Precios, costos e inventario" />

      <DataTable
        rows={rows}
        columns={[
          { key: "name", label: "Producto" },
          { key: "presentation", label: "Presentación" },
          { key: "stock_kg", label: "Existencia", render: (value) => `${number(value, 3)} kg` },
          { key: "min_stock_kg", label: "Mínimo", render: (value) => `${number(value, 3)} kg` },
          { key: "cost_per_kg", label: "Costo/kg", render: (value) => money(value) },
          { key: "public_price_per_kg", label: "Público/kg", render: (value) => money(value) },
          { key: "wholesale_price_per_kg", label: "Mayoreo/kg", render: (value) => money(value) },
        ]}
      />
    </>
  );
}

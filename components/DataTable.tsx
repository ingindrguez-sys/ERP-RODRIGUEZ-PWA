"use client";

export type Column = {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
};

export default function DataTable({
  rows,
  columns,
}: {
  rows: any[];
  columns: Column[];
}) {
  if (!rows.length) {
    return <div className="empty-card">No hay información registrada.</div>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || index}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render
                    ? column.render(row[column.key], row)
                    : String(row[column.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

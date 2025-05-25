import React, { useState } from "react";

// Define column type
export type Column<T> = {
  key: string;
  header: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  hidden?: boolean;
};

// Props type
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  className?: string;
}

export function DataTable<T>({ data, columns, pageSize = 5, className = "" }: DataTableProps<T>) {
  const visibleColumns = columns.filter((col) => !col.hidden);

  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;

    const sortCol = columns.find((c) => c.key === sortKey);
    if (!sortCol || !sortCol.accessor) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortCol.accessor!];
      const bVal = b[sortCol.accessor!];

      if (aVal === bVal) return 0;
      return (aVal! > bVal! ? 1 : -1) * (sortAsc ? 1 : -1);
    });
  }, [data, sortKey, sortAsc, columns]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  return (
    <div className={`overflow-x-auto rounded-xl shadow ${className}`}>
      <table className="min-w-full table-auto text-sm text-left border border-gray-200">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            {visibleColumns.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sortable && handleSort(col.key)}
                className={`px-4 py-3 font-semibold cursor-${col.sortable ? "pointer" : "default"} ${getAlignment(col.align)}`}
              >
                {col.header}
                {col.sortable && sortKey === col.key && (
                  <span className="ml-1">{sortAsc ? "\u25B2" : "\u25BC"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {visibleColumns.map((col) => (
                <td key={col.key} className={`px-4 py-3 ${getAlignment(col.align)}`}>
                  {col.render ? col.render(row) : String(row[col.accessor as keyof T] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center p-4 text-sm text-gray-600">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function getAlignment(align?: "left" | "center" | "right") {
  switch (align) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "text-left";
  }
}

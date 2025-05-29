import React, { useState } from 'react';

// Define column type
export type Column<T> = {
  key: string;
  header: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  hidden?: boolean;
};

// Props type
interface DataTableProps<T> {
  title?: string;
  data: T[];
  columns: Column<T>[];
  className?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export function DataTable<T>({
  title = 'Data table',
  data,
  columns,
  className = '',
  pagination,
  onPageChange,
  onLimitChange,
}: DataTableProps<T>) {
  const visibleColumns = columns.filter((col) => !col.hidden);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  return (
    <div
      className={`overflow-x-auto rounded-xl shadow-md bg-white ${className}`}
    >
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <div>
          <label htmlFor="limit" className="mr-2 text-sm text-gray-600">
            Show:
          </label>
          <select
            id="limit"
            value={pagination?.itemsPerPage}
            onChange={(e) => onLimitChange?.(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>

      <table className="min-w-full table-auto text-sm border-t border-gray-200">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wide">
          <tr>
            <th className="px-4 py-3 font-medium w-10 text-left">No</th>
            {visibleColumns.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sortable && handleSort(col.key)}
                className={`${col.key === 'action' ? 'w-72 ' : ''} px-4 py-3 font-medium whitespace-nowrap cursor-${col.sortable ? 'pointer' : 'default'} ${getAlignment(col.align)} transition-colors hover:bg-gray-200`}
              >
                {col.header}
                {col.sortable && sortKey === col.key && (
                  <span className="ml-1">{sortAsc ? '▲' : '▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => {
            const startNumber =
              ((pagination?.currentPage || 1) - 1) *
              (pagination?.itemsPerPage || 10);
            return (
              <tr key={rowIndex} className="hover:bg-blue-50 transition-colors">
                <td className="px-4 py-3 text-gray-700">
                  {startNumber + rowIndex + 1}
                </td>
                {visibleColumns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-gray-600 ${getAlignment(col.align)}`}
                  >
                    {col.render
                      ? col.render(row)
                      : String(row[col.accessor as keyof T] ?? '-')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center p-4 text-sm text-gray-600 bg-gray-50 border-t border-gray-200 gap-4">
        <span>
          Showing{' '}
          {((pagination?.currentPage || 1) - 1) *
            (pagination?.itemsPerPage || 10) +
            1}{' '}
          to{' '}
          {Math.min(
            (pagination?.currentPage || 1) * (pagination?.itemsPerPage || 10),
            pagination?.totalItems || 0
          )}{' '}
          of {pagination?.totalItems || 0} entries
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => onPageChange?.((pagination?.currentPage || 1) - 1)}
            disabled={pagination?.currentPage === 1}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange?.((pagination?.currentPage || 1) + 1)}
            disabled={
              (pagination?.currentPage || 0) >= (pagination?.totalPages || 0)
            }
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function getAlignment(align?: 'left' | 'center' | 'right') {
  switch (align) {
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return 'text-left';
  }
}

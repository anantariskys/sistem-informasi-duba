import React, { useState } from 'react';
import clsx from 'clsx';

interface Option {
  label: string;
  value: string | number;
}

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options: Option[];
  width?: 'w-full' | 'w-fit';
  searchable?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  error,
  helperText,
  required = false,
  options,
  className,
  id,
  width = 'w-full',
  searchable = false,
  value,
  onChange,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {searchable && (
        <input
          type="text"
          placeholder="Cari..."
          className="block w-full px-3 py-1.5 mb-1 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}

      <select
        id={id}
        value={value}
        onChange={onChange}
        className={clsx(
          'block w-full px-4 py-2 border rounded-lg shadow-sm text-base text-gray-900 focus:outline-none focus:ring-1 transition-colors duration-200',
          error
            ? 'border-error-300 focus:border-error-500 focus:ring-error-500'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
          width,
          className
        )}
        {...props}
      >
        <option value="" disabled hidden>
          -- Pilih opsi --
        </option>
        {filteredOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {helperText && !error && (
        <p className="text-gray-500 text-xs mt-1">{helperText}</p>
      )}
    </div>
  );
};

export default Dropdown;

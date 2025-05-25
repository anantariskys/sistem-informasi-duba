import React, { InputHTMLAttributes, useState } from "react";
import clsx from "clsx";
import { HiEye, HiEyeOff } from "react-icons/hi";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  width?: "w-full" | "w-fit";
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className,
  id,
  required = false,
  type,
  width = "w-full",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

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
      <div className="relative">
        <input
          id={id}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className={clsx(
            "block px-4 py-2 border rounded-lg shadow-sm text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors duration-200",
            error
              ? "border-error-300 focus:border-error-500 focus:ring-error-500"
              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
            type === "password" && "pr-12",
            width,
            className,
          )}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={togglePassword}
          >
            {showPassword ? (
              <HiEye className="w-5 h-5 text-gray-500" />
            ) : (
              <HiEyeOff className="w-5 h-5 text-gray-500" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {helperText && !error && (
        <p className="text-gray-500 text-xs mt-1">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
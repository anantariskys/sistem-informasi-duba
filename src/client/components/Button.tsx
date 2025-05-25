import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "success"
    | "grayOutline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  width?: "w-full" | "w-fit";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  width = "w-full",
  ...props
}) => {
  const baseStyles =
    "relative flex justify-center items-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "text-white bg-primary hover:bg-primary/90 focus:ring-indigo-500 border border-primary",
    secondary:
      "text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500 border border-gray-300",
    danger:
      "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 border border-transparent",
    warning:
      "text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 border border-transparent",
    success:
      "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500 border border-transparent",
    grayOutline: "text-gray-700   focus:ring-gray-500 border border-gray-300",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-sm",
    lg: "px-5 py-4 text-base",
  };

  return (
    <button
      className={clsx(
        width,
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
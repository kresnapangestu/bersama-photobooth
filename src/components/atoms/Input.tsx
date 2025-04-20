// components/atoms/Input.tsx
import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  maxInput?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, maxInput, ...props }, ref) => {
    return (
      <div className={`${className} flex flex-col gap-1`}>
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <input
          ref={ref}
          className={clsx(
            "w-full px-4 py-2 rounded-xl border border-primary hover:ring-primaryHover focus:outline-none focus:ring-2 focus:ring-primaryActive transition",
            error ? "border-red-500" : "border-gray-300",
            className
          )}
          maxLength={maxInput}
          {...props}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

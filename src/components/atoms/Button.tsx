import React from "react";
import { Colors } from "@/constants/colors";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Button = ({ onClick, children, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 rounded-lg cursor-pointer font-medium transition ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : `bg-primary hover:bg-primaryHover`
      }`}
    >
      {children}
    </button>
  );
};

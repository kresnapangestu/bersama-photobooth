import React from "react";
import { Colors } from "@/constants/colors";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: string;
}

export const Button = ({
  onClick,
  children,
  disabled,
  className,
  type = "Primary",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} px-6 py-2 rounded-lg cursor-pointer font-medium transition ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : type !== "Secondary"
          ? `bg-primary hover:bg-primaryHover`
          : `bg-transparent border-2 border-[#AE8DFF] text-[#AE8DFF] hover:bg-primaryHover hover:text-black hover:border-primary`
      } `}
    >
      {children}
    </button>
  );
};

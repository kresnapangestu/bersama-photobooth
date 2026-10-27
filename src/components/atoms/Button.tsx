import type { ButtonHTMLAttributes, ComponentProps } from "react";
import Link from "next/link";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary";

interface VariantProps {
  variant?: ButtonVariant;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-primary hover:bg-primaryHover",
  secondary:
    "bg-transparent border-2 border-accentStrong text-accentStrong hover:bg-primaryHover hover:text-black hover:border-primary",
};

const buttonStyles = (variant: ButtonVariant, disabled?: boolean) =>
  clsx(
    "inline-block px-6 py-2 rounded-lg font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryDarker",
    disabled ? "bg-gray-400 cursor-not-allowed" : ["cursor-pointer", VARIANT_STYLES[variant]]
  );

type ButtonProps = VariantProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  variant = "primary",
  type = "button",
  className,
  disabled,
  ...props
}: ButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    className={clsx(buttonStyles(variant, disabled), className)}
    {...props}
  />
);

type ButtonLinkProps = VariantProps & ComponentProps<typeof Link>;

/** Navigation styled as a button. Use this instead of nesting <Button> in <Link>, which is invalid HTML. */
export const ButtonLink = ({
  variant = "primary",
  className,
  ...props
}: ButtonLinkProps) => (
  <Link className={clsx(buttonStyles(variant), className)} {...props} />
);

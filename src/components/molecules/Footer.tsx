import clsx from "clsx";
import { COPYRIGHT_NOTICE } from "@/constants/site";

export const Footer = ({ className }: { className?: string }) => (
  <footer className={clsx("relative z-10 text-xs", className)}>
    <p>{COPYRIGHT_NOTICE}</p>
  </footer>
);

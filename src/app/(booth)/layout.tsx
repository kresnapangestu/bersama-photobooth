import type { ReactNode } from "react";
import { PhotoSessionProvider } from "@/context/PhotoSessionContext";

// Shared by every step of the booth flow so photos survive client-side navigation.
export default function BoothLayout({ children }: { children: ReactNode }) {
  return <PhotoSessionProvider>{children}</PhotoSessionProvider>;
}

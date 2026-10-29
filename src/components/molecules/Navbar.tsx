import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

/** Overlays the top of the page; layouts reserve its height with pt-(--nav-h). */
export const Navbar = () => (
  <header className="absolute inset-x-0 top-0 z-30 flex h-(--nav-h) items-center justify-between gap-3 px-gutter">
    <Link href={ROUTES.home} className="shrink-0">
      <Image
        src={SITE.logo}
        width={150}
        height={23}
        alt={SITE.name}
        priority
        className="h-auto w-[clamp(5rem,10vw,9.375rem)]"
      />
    </Link>
    <nav aria-label="Main">
      <ul className="flex gap-3 rounded-full bg-white px-4 py-1.5 text-sm shadow-sm max-[22rem]:gap-2 max-[22rem]:px-3 max-[22rem]:text-xs sm:gap-5 sm:px-8 sm:text-base">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="rounded transition-colors hover:text-primaryHover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryDarker active:text-primaryActive"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

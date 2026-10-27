import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

export const Navbar = () => (
  <header className="fixed top-0 left-0 z-30 flex w-full max-w-screen items-center justify-between overflow-hidden rounded-lg px-[70px] py-[30px]">
    <Link href={ROUTES.home}>
      <Image src={SITE.logo} width={150} height={23} alt={SITE.name} priority />
    </Link>
    <nav aria-label="Main">
      <ul className="flex gap-[20px] rounded-full bg-white px-10 py-[5px]">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="hover:text-primaryHover active:text-primaryActive"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

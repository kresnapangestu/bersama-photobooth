import Image from "next/image";

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 overflow-hidden w-full max-w-screen rounded-lg flex justify-between  z-30 px-[70px] py-[30px] items-center">
      <a href={`/`}>
        <Image
          src={"/images/logo-bersama.png"}
          width={150}
          height={18}
          alt="logo"
        />
      </a>
      <div className="bg-white rounded-full flex gap-[20px] px-10 py-[5px]">
        <a
          className="cursor-pointer hover:text-primaryHover active:text-primaryActive"
          href={`/`}
        >
          Home
        </a>
        <a
          className="cursor-pointer hover:text-primaryHover active:text-primaryActive"
          href={`/about`}
        >
          About
        </a>
        <a
          className="cursor-pointer hover:text-primaryHover active:text-primaryActive"
          href={`/privacy-policy`}
        >
          Privacy
        </a>
      </div>
    </div>
  );
};

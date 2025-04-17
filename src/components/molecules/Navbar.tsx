import Image from "next/image";

export const Navbar = () => {
  return (
    <div className="overflow-hidden w-full max-w-screen rounded-lg flex justify-between absolute z-30 px-[70px] py-[30px] items-center">
      <Image
        src={"/images/logo-bersama.png"}
        width={150}
        height={18}
        alt="logo"
      ></Image>
      <div className="bg-white rounded-full flex gap-[20px] px-10 py-[5px]">
        <a className="cursor-pointer hover:text-primaryHover active:text-primaryActive">
          Home
        </a>
        <a className="text-primaryDisabled">Privacy</a>
        <a className="text-primaryDisabled">Contact</a>
      </div>
    </div>
  );
};

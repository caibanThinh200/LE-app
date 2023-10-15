"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface IHeaderProps {}

const MENU_ITEMS = [
  {
    label: "Học Tài Năng",
    href: "",
  },
];

const Header: React.FC<IHeaderProps> = (props) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="">
      <div className="container mx-auto py-3">
        <div className="flex justify-between items-center">
          {pathname === "/" ? (
            <div className="flex gap-[20px] py-3 items-center">
              <Link href={"/"}>
                <Image
                  src={"/images/logo.png"}
                  alt="logo"
                  width={50}
                  height={50}
                />
              </Link>
              <nav className="flex gap-8">
                {MENU_ITEMS.map((item, index) => (
                  <Link
                    className="flex items-center gap-3 font-bold"
                    key={index}
                    href={item.href}
                  >
                    {item.label}
                    {/* {item.isPremium && (
                    <Image
                      src={"/svg/sparkle.svg"}
                      alt="sparkle"
                      width={20}
                      height={20}
                    />
                  )} */}
                  </Link>
                ))}
              </nav>
            </div>
          ) : (
            <div
              onClick={() => router.back()}
              className="flex gap-2 items-center cursor-pointer"
            >
              <Image
                alt="Back"
                width={44}
                height={44}
                src={"/svg/arrow-back.svg"}
              />
              <p className="text-independence font-bold">Trở về</p>
            </div>
          )}
          <div>
            {/* <button className="py-2.5 px-5 border border-primary-green text-primary-green rounded-full hover:bg-primary-green hover:text-white transition-all duration-300">
              Đăng nhập
            </button> */}
            <button className="rounded-2xl border-2 text-independence  font-bold border-independence px-8 py-3 flex gap-2 items-center">
              Tải trên điện thoại
              <Image
                src={"/svg/mobile-icon.svg"}
                width={24}
                height={24}
                alt="mobile"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

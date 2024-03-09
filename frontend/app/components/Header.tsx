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
    <div>
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
            <Link href={pathname === "/register" ? "/login" : "/register"}>
              <button className="group rounded-full border-2 text-independence hover:border-primary-green transition-all hover:bg-primary-gradient hover:bg-clip-text hover:text-transparent  font-bold border-independence px-8 py-3 flex gap-2 items-center">
                {/* Tải trên điện thoại */}
                {pathname === "/register" ? "Đăng nhập" : "Đăng ký tài khoản"}
                {/* <Image
                src={"/svg/mobile-icon.svg"}
                width={24}
                height={24}
                alt="mobile"
              /> */}
                {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  className="group-hover:fill-primary-green"
                  opacity="0.2"
                  d="M18 3.75V20.25C18 20.6478 17.842 21.0294 17.5607 21.3107C17.2794 21.592 16.8978 21.75 16.5 21.75H7.5C7.10218 21.75 6.72064 21.592 6.43934 21.3107C6.15804 21.0294 6 20.6478 6 20.25V3.75C6 3.35218 6.15804 2.97064 6.43934 2.68934C6.72064 2.40804 7.10218 2.25 7.5 2.25H16.5C16.8978 2.25 17.2794 2.40804 17.5607 2.68934C17.842 2.97064 18 3.35218 18 3.75Z"
                  fill="#374151"
                />
                <path
                  className="group-hover:fill-primary-green"
                  d="M16.5 1.5H7.5C6.90326 1.5 6.33097 1.73705 5.90901 2.15901C5.48705 2.58097 5.25 3.15326 5.25 3.75V20.25C5.25 20.8467 5.48705 21.419 5.90901 21.841C6.33097 22.2629 6.90326 22.5 7.5 22.5H16.5C17.0967 22.5 17.669 22.2629 18.091 21.841C18.513 21.419 18.75 20.8467 18.75 20.25V3.75C18.75 3.15326 18.513 2.58097 18.091 2.15901C17.669 1.73705 17.0967 1.5 16.5 1.5ZM17.25 20.25C17.25 20.4489 17.171 20.6397 17.0303 20.7803C16.8897 20.921 16.6989 21 16.5 21H7.5C7.30109 21 7.11032 20.921 6.96967 20.7803C6.82902 20.6397 6.75 20.4489 6.75 20.25V3.75C6.75 3.55109 6.82902 3.36032 6.96967 3.21967C7.11032 3.07902 7.30109 3 7.5 3H16.5C16.6989 3 16.8897 3.07902 17.0303 3.21967C17.171 3.36032 17.25 3.55109 17.25 3.75V20.25ZM15.75 5.25C15.75 5.44891 15.671 5.63968 15.5303 5.78033C15.3897 5.92098 15.1989 6 15 6H9C8.80109 6 8.61032 5.92098 8.46967 5.78033C8.32902 5.63968 8.25 5.44891 8.25 5.25C8.25 5.05109 8.32902 4.86032 8.46967 4.71967C8.61032 4.57902 8.80109 4.5 9 4.5H15C15.1989 4.5 15.3897 4.57902 15.5303 4.71967C15.671 4.86032 15.75 5.05109 15.75 5.25Z"
                  fill="#374151"
                />
              </svg> */}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

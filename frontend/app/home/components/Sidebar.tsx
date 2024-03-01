"use client";

import Button from "@/app/components/Button";
import RsIcon from "@/app/components/Icon";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

interface ISidebarProps {}

const variants = {
  open: { scale: 1 },
  closed: { scale: 0 },
};

const MENU_ITEMS = [
  {
    title: "Bài học",
    slug: "/home",
    icon: "book",
  },
  {
    title: "Trò chơi",
    slug: "/home/game",
    icon: "game-control",
  },
  {
    title: "Bạn bè",
    slug: "/home/friend",
    icon: "group-user",
  },
  {
    title: "Hồ sơ",
    slug: "/home/profile",
    icon: "profile",
  },
  // {
  //   title: "Đăng xuất",
  //   slug: "/home/profile",
  //   icon: "profile",
  // },
];

const Sidebar: React.FC<ISidebarProps> = (props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = useCallback(() => {
    Cookies.remove("auth_token");
    router.replace("/");
  }, []);

  return (
    <div className="bg-ghost-white p-6 h-auto flex-2 border-r border-bright-gray min-h-[inherit]">
      <div className="flex flex-col justify-between h-full items-center">
        <div className="flex flex-col gap-8 items-center px-3">
          <Link className="flex gap-2 items-center" href={"/home"}>
            <Image src={"/images/logo.png"} alt="logo" width={50} height={50} />
            <p className="font-bold">Học tài năng</p>
          </Link>
          <div className="flex flex-col gap-4">
            {MENU_ITEMS.map((item, index) => (
              <Link
                key={index}
                href={item.slug}
                className={twMerge("relative")}
              >
                {" "}
                <motion.div
                  animate={pathname === item.slug ? "open" : "closed"}
                  variants={variants}
                  className="absolute border border-primary-green bg-gradient-to-b from-white to-nyanz inset-0 rounded-full"
                ></motion.div>
                <div className="flex items-center relative z-10 py-3 px-6 gap-3 rounded-full">
                  <div>
                    {/* <Image
                        src={item.icon}
                        alt={item.title}
                        height={24}
                        width={24}
                      /> */}
                    <RsIcon
                      type={item.icon}
                      fill={pathname !== item.slug && "#4B5563"}
                    />
                  </div>
                  <p
                    className={twMerge(
                      "text-independence font-bold",
                      pathname === item.slug && "text-primary-green"
                    )}
                  >
                    {item.title}
                  </p>
                </div>
              </Link>
            ))}
            {/* <button
              onClick={handleLogout}
              className="py-3 px-6 gap-3 flex items-center"
            >
              <RsIcon type={"logout"} className="text-independence" />
              <p className="text-independence font-bold">Đăng xuất</p>
            </button> */}
          </div>
        </div>
        <div>
          <Button
            style={{
              background:
                "linear-gradient(180deg, #FFD66D -33.33%, #EF6416 112.5%)",
            }}
            type="primary"
            className="px-6 py-3 flex gap-3 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M23.25 12C23.2508 11.1387 23.0397 10.2904 22.6352 9.52997C22.2308 8.76952 21.6455 8.12025 20.9309 7.63942C20.2163 7.15858 19.3944 6.86094 18.5376 6.77274C17.6808 6.68454 16.8155 6.80849 16.0179 7.13367C15.2204 7.45884 14.5151 7.97525 13.9642 8.63736C13.4133 9.29947 13.0338 10.0869 12.8591 10.9303C12.6844 11.7738 12.7199 12.6472 12.9625 13.4736C13.205 14.3001 13.6472 15.0542 14.25 15.6694V21C14.2499 21.1279 14.2825 21.2537 14.3448 21.3655C14.407 21.4772 14.4968 21.5712 14.6056 21.6384C14.7144 21.7057 14.8386 21.744 14.9663 21.7498C15.0941 21.7555 15.2212 21.7285 15.3356 21.6712L18 20.3381L20.6644 21.6712C20.7788 21.7285 20.9059 21.7555 21.0337 21.7498C21.1615 21.744 21.2856 21.7057 21.3944 21.6384C21.5032 21.5712 21.593 21.4772 21.6552 21.3655C21.7175 21.2537 21.7501 21.1279 21.75 21V15.6694C22.7119 14.6903 23.2506 13.3725 23.25 12ZM18 8.25C18.7417 8.25 19.4667 8.46993 20.0834 8.88199C20.7001 9.29404 21.1807 9.87971 21.4646 10.5649C21.7484 11.2502 21.8226 12.0042 21.678 12.7316C21.5333 13.459 21.1761 14.1272 20.6517 14.6517C20.1272 15.1761 19.459 15.5333 18.7316 15.6779C18.0042 15.8226 17.2502 15.7484 16.5649 15.4645C15.8797 15.1807 15.294 14.7001 14.882 14.0834C14.4699 13.4667 14.25 12.7417 14.25 12C14.25 11.0054 14.6451 10.0516 15.3484 9.34835C16.0516 8.64509 17.0054 8.25 18 8.25ZM18.3356 18.8287C18.2314 18.7766 18.1165 18.7495 18 18.7495C17.8835 18.7495 17.7686 18.7766 17.6644 18.8287L15.75 19.7869V16.7428C16.4531 17.0767 17.2217 17.25 18 17.25C18.7783 17.25 19.5469 17.0767 20.25 16.7428V19.7869L18.3356 18.8287ZM12.75 18C12.75 18.1989 12.671 18.3897 12.5303 18.5303C12.3897 18.671 12.1989 18.75 12 18.75H3.75C3.35218 18.75 2.97064 18.592 2.68934 18.3107C2.40804 18.0294 2.25 17.6478 2.25 17.25V5.25C2.25 4.85218 2.40804 4.47064 2.68934 4.18934C2.97064 3.90804 3.35218 3.75 3.75 3.75H20.25C20.6478 3.75 21.0294 3.90804 21.3107 4.18934C21.592 4.47064 21.75 4.85218 21.75 5.25C21.75 5.44891 21.671 5.63968 21.5303 5.78033C21.3897 5.92098 21.1989 6 21 6C20.8011 6 20.6103 5.92098 20.4697 5.78033C20.329 5.63968 20.25 5.44891 20.25 5.25H3.75V17.25H12C12.1989 17.25 12.3897 17.329 12.5303 17.4697C12.671 17.6103 12.75 17.8011 12.75 18ZM11.25 12.75C11.25 12.9489 11.171 13.1397 11.0303 13.2803C10.8897 13.421 10.6989 13.5 10.5 13.5H6.75C6.55109 13.5 6.36032 13.421 6.21967 13.2803C6.07902 13.1397 6 12.9489 6 12.75C6 12.5511 6.07902 12.3603 6.21967 12.2197C6.36032 12.079 6.55109 12 6.75 12H10.5C10.6989 12 10.8897 12.079 11.0303 12.2197C11.171 12.3603 11.25 12.5511 11.25 12.75ZM11.25 9.75C11.25 9.94891 11.171 10.1397 11.0303 10.2803C10.8897 10.421 10.6989 10.5 10.5 10.5H6.75C6.55109 10.5 6.36032 10.421 6.21967 10.2803C6.07902 10.1397 6 9.94891 6 9.75C6 9.55109 6.07902 9.36032 6.21967 9.21967C6.36032 9.07902 6.55109 9 6.75 9H10.5C10.6989 9 10.8897 9.07902 11.0303 9.21967C11.171 9.36032 11.25 9.55109 11.25 9.75Z"
                fill="#F9FAFB"
              />
            </svg>
            Nâng cấp pro
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

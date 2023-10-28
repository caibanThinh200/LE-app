"use client";

import Button from "@/app/components/Button";
import RsIcon from "@/app/components/Icon";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface ISidebarProps {}

const MENU_ITEMS = [
  {
    title: "Bài học",
    slug: "/home",
    icon: <RsIcon type="book" />,
  }, 
  {
    title: "Trò chơi",
    slug: "/home/game",
    icon: <RsIcon type="game-control" />,
  },
  {
    title: "Bạn bè",
    slug: "/home/friend",
    icon: <RsIcon type="group-user" />,
  },
  {
    title: "Hồ sơ",
    slug: "/home/profile",
    icon: <RsIcon type="profile" />,
  },
];

const Sidebar: React.FC<ISidebarProps> = (props) => {
  const pathname = usePathname();

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
                href={item.slug}
                key={index}
                className={twMerge(
                  "py-3 px-6 gap-3 flex items-center rounded-full",
                  pathname === item.slug &&
                    "border border-primary-green bg-gradient-to-b from-white to-nyanza"
                )}
              >
                <div>
                  {/* <Image
                    src={item.icon}
                    alt={item.title}
                    height={24}
                    width={24}
                  /> */}
                  {item.icon}
                </div>
                <p
                  className={twMerge(
                    "text-independence font-bold",
                    pathname === item.slug && "text-primary-green"
                  )}
                >
                  {item.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Button
            style={{
              background:
                "linear-gradient(180deg, #FFDF6D -33.33%, #BC5216 112.5%)",
            }}
            type="primary"
            className="px-6 py-3 flex gap-3 items-center"
          >
            Nâng cấp mới
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

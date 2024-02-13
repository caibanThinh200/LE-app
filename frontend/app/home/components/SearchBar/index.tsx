"use client";

import Button from "@/app/components/Button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface ISearchBarProps {
  sideWidget?: React.ReactNode;
}

const SearchBar: React.FC<ISearchBarProps> = (props) => {
  return (
    <div className="flex gap-3 w-full justify-between">
      <div
        className={twMerge(
          "flex gap-3",
          props.sideWidget ? "w-9/12" : "w-full"
        )}
      >
        <div className="border border-bright-gray bg-ghost-white py-2.5 px-4 rounded-full flex gap-2 flex-1">
          <div>
            <Image
              src={"/svg/search-bar.svg"}
              alt="Search"
              width={24}
              height={24}
            />
          </div>
          <div className="w-full">
            <input
              placeholder="Tìm kiếm bài học, trò chơi, bạn bè,..."
              className="outline-none bg-inherit w-full"
            />
          </div>
        </div>
        <div className="rounded-2xl border border-bright-gray bg-ghost-white p-2.5 flex justify-center items-center flex-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15.75 21C15.75 21.1989 15.671 21.3897 15.5303 21.5303C15.3897 21.671 15.1989 21.75 15 21.75H9.00001C8.80109 21.75 8.61033 21.671 8.46968 21.5303C8.32902 21.3897 8.25001 21.1989 8.25001 21C8.25001 20.8011 8.32902 20.6103 8.46968 20.4697C8.61033 20.329 8.80109 20.25 9.00001 20.25H15C15.1989 20.25 15.3897 20.329 15.5303 20.4697C15.671 20.6103 15.75 20.8011 15.75 21ZM20.7984 18C20.6683 18.2292 20.4794 18.4196 20.2511 18.5514C20.0229 18.6833 19.7636 18.7518 19.5 18.75H4.50001C4.23632 18.7496 3.97739 18.6798 3.74931 18.5475C3.52123 18.4151 3.33206 18.225 3.20086 17.9963C3.06967 17.7676 3.00109 17.5083 3.00204 17.2446C3.00299 16.9809 3.07342 16.7222 3.20626 16.4944C3.72657 15.5981 4.50001 13.0631 4.50001 9.75C4.50001 7.76088 5.29018 5.85322 6.6967 4.4467C8.10323 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75C19.5 13.0622 20.2744 15.5981 20.7947 16.4944C20.9288 16.7225 20.9998 16.9822 21.0003 17.2468C21.0008 17.5114 20.9308 17.7714 20.7975 18H20.7984ZM19.5 17.25C18.7753 16.0059 18 13.1297 18 9.75C18 8.1587 17.3679 6.63258 16.2426 5.50736C15.1174 4.38214 13.5913 3.75 12 3.75C10.4087 3.75 8.88258 4.38214 7.75736 5.50736C6.63215 6.63258 6.00001 8.1587 6.00001 9.75C6.00001 13.1306 5.22376 16.0069 4.50001 17.25H19.5Z"
              fill="#374151"
            />
          </svg>
        </div>
      </div>
      {props.sideWidget && props.sideWidget}
    </div>
  );
};

export default SearchBar;

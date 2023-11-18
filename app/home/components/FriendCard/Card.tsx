'use client'

import RsIcon from "@/app/components/Icon";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";

interface ISingleFriendCardProps {}

const SingleFriendCard: React.FC<ISingleFriendCardProps> = (props) => {
  return (
    <div className="p-6 rounded-xl border border-bright-gray bg-white">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div>
            <Image
              src={"/images/avatar.png"}
              width={44}
              height={44}
              alt="test"
            />
          </div>
          <div>
            <p className="text-sm">Trần Ngọc Thế Vinh </p>
            <p className="text-primary-green text-xs flex gap-2 items-center">
              <div className="w-[8px] h-[8px] bg-primary-green rounded-full"></div>
              <span>Hoạt động</span>
            </p>
          </div>
        </div>
        <div>
          <Popover className="relative w-full">
            {({ open }) => (
              <>
                <Popover.Button>
                  <RsIcon className="cursor-pointer" type="setting-dot" />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute left-0 z-10 mt-3 w-[200px] px-4 sm:px-0 lg:max-w-3xl">
                    <div className="overflow-hidden rounded-xl shadow-xl ring-1 ring-black/5 bg-white">
                        <div className="p-3 flex gap-2 cursor-pointer hover:bg-anti-flash-white transition-all items-center border-bright-gray border-b">
                            <RsIcon type="sword" />
                            Thách đấu
                        </div>
                        <div className="p-3 flex gap-2 cursor-pointer hover:bg-anti-flash-white transition-all items-center">
                            <RsIcon type="remove-user" />
                            Xóa bạn
                        </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-[6px]">
        <div className="flex justify-between items-baseline self-stretch">
          <div className="text-auro-metal-saurus text-sm">Số điện thoại</div>
          <div className="flex gap-2 items-center">
            <p className="text-charcoal">0858543232</p>
            <RsIcon className="cursor-pointer" type="copy" />
          </div>
        </div>
        <div className="flex justify-between items-baseline self-stretch">
          <div className="text-auro-metal-saurus text-sm">Lớp</div>
          <div className="flex gap-2 items-center">
            <p className="text-charcoal">12</p>
          </div>
        </div>
        <div className="flex justify-between items-baseline self-stretch">
          <div className="text-auro-metal-saurus text-sm">Hạng</div>
          <div className="flex gap-2 items-center">
            <p className="text-charcoal">32 thế giới</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFriendCard;

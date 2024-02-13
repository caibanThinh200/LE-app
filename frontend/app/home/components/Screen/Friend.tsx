"use client";

import Button from "@/app/components/Button";
import FriendCard from "../FriendCard";
import SearchBar from "../SearchBar";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import RsIcon from "@/app/components/Icon";
import Image from "next/image";

interface IFriendScreenProps {}

const FriendScreen: React.FC<IFriendScreenProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 overflow-auto h-screen scroll-hover">
      <div className="flex flex-col gap-6">
        <SearchBar
          sideWidget={
            <div>
              <Button onClick={() => setIsModalOpen(true)} type="primary">
                Thêm bạn mới
              </Button>
            </div>
          }
        />
        <FriendCard />
        <Transition appear show={isModalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsModalOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto ">
              <div className="flex min-h-full items-center justify-center p-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full min-h-[385px] max-w-[520px] overflow-hidden rounded-xl bg-white transition-all flex flex-col justify-between">
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-xl p-4 font-bold leading-6 text-charcoal flex justify-between items-center border-b border-bright-gray"
                      >
                        Thêm bạn mới
                        <RsIcon
                          type="close"
                          className="cursor-pointer"
                          onClick={() => setIsModalOpen(false)}
                        />
                      </Dialog.Title>
                      <div className="px-4 py-6">
                        <p className="text-charcoal text-sm font-medium">
                          Tìm kiếm bạn mới
                        </p>
                        <div className="border-2 mt-2 border-bright-gray rounded-full px-4 py-2.5 flex gap-2 items-center">
                          <RsIcon type="glass" className="cursor-pointer" />
                          <input
                            placeholder="Nhập tên, số điện thoại để tìm kiếm"
                            className="bg-inherit border-none outline-none w-full"
                          />
                        </div>
                        <div className="flex flex-col gap-6 mt-6">
                          <div className=" flex justify-between">
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
                                <p className="font-bold text-sm">
                                  Thịnh Nguyễn
                                </p>
                                <p className="text-xs">888888843132</p>
                              </div>
                            </div>
                            <div>
                              <Button
                                type="secondary"
                                className="border-auro-metal-saurus flex items-center gap-2 py-2 px-6"
                              >
                                <RsIcon type="plus" /> Thêm
                              </Button>
                            </div>
                          </div>
                          <div className=" flex justify-between">
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
                                <p className="font-bold text-sm">
                                  Thịnh Nguyễn
                                </p>
                                <p className="text-xs">888888843132</p>
                              </div>
                            </div>
                            <div>
                              <Button
                                type="secondary"
                                className="border-auro-metal-saurus flex items-center gap-2 py-2 px-6"
                              >
                                <RsIcon type="plus" /> Thêm
                              </Button>
                            </div>
                          </div>
                          <div className=" flex justify-between">
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
                                <p className="font-bold text-sm">
                                  Thịnh Nguyễn
                                </p>
                                <p className="text-xs">888888843132</p>
                              </div>
                            </div>
                            <div>
                              <Button
                                type="secondary"
                                className="border-auro-metal-saurus flex items-center gap-2 py-2 px-6"
                              >
                                <RsIcon type="minus" /> Bỏ thêm
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-bright-gray flex justify-end">
                      <div className="flex gap-3">
                        <Button
                          onClick={() => setIsModalOpen(false)}
                          className="border border-auro-metal-saurus"
                          type="secondary"
                        >
                          Hủy
                        </Button>
                        <Button
                          onClick={() => setIsModalOpen(false)}
                          type="primary"
                        >
                          Xác nhận
                        </Button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default FriendScreen;

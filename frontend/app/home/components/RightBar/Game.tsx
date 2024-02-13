"use client";

import RsIcon from "@/app/components/Icon";
import { IRightBarProps } from ".";
import { Tab } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { useCallback } from "react";

const GameRightBar: React.FC<IRightBarProps> = (props) => {
  const renderPositions = useCallback((index: number) => {
    if (index === 0) {
      return (
        <div className="flex gap-2 items-center">
          <RsIcon type="medal-1" />
          <p className="text-yellow-600">Không có đối thủ</p>
        </div>
      );
    }
    if (index > 0 && index < 4) {
      return (
        <div className="flex gap-2 items-center">
          <RsIcon type={`medal-${index + 1}`} />
          <p className="text-independence">Hạng {index + 1}</p>
        </div>
      );
    } else {
      return (
        <div className="flex gap-2 items-center">
          <p className="text-independence">Hạng {index + 1}</p>
        </div>
      );
    }
  }, []);

  return (
    <div className="flex-2 w-3/12 border-l border-bright-gray h-screen bg-white p-6 overflow-auto scroll-hover">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <div>
            <RsIcon type="double-user" />
          </div>
          <p className="font-bold">Bảng xếp hạng</p>
        </div>
        <div>
          <div>
            <Tab.Group>
              <Tab.List
                className={
                  "flex justify-between p-1 gap-2 bg-[#e5e7eb] rounded-xl"
                }
              >
                <Tab
                  className={({ selected }) =>
                    twMerge(
                      "w-full rounded-xl px-2 py-3",
                      selected
                        ? "bg-primary-gradient text-white"
                        : "text-[#6B7280]"
                    )
                  }
                >
                  <p>Mới nhất</p>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    twMerge(
                      "w-full rounded-xl px-2 py-3",
                      selected
                        ? "bg-primary-gradient text-white"
                        : "text-[#6B7280]"
                    )
                  }
                >
                  <p>Lần trước</p>
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel className={"pt-5 flex flex-col gap-6"}>
                  <div className="p-3 rounded-xl border border-dandelion text-center flex flex-col gap-3">
                    <div>
                      <p className="font-bold text-[14px]">Thế Vinh (tôi)</p>
                      <p className="text-[12px]">
                        Hạng <span className="font-bold">5</span> thế giới
                      </p>
                    </div>
                  </div>
                  {Array(5)
                    .fill("")
                    .map((_, index) => (
                      <div
                        key={index}
                        className="p-3 bg-anti-flash-white border border-bright-gray rounded-xl"
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                              <p className="text-white font-bold  p-[6px] rounded-full bg-primary-green">
                                TV
                              </p>
                              <div>
                                <p className="text-[14px]">Thế Vinh</p>
                                <p className="text-primary-green text-[12px] flex gap-2 items-center">
                                  <div className="bg-primary-green h-[8px] w-[8px] rounded-full"></div>
                                  Hoạt động
                                </p>
                              </div>
                            </div>
                            <div>
                              <div className="bg-white p-2.5 border border-bright-gray rounded-xl">
                                <RsIcon type="sword" />
                              </div>
                            </div>
                          </div>
                          <div>{renderPositions(index)}</div>
                        </div>
                      </div>
                    ))}
                </Tab.Panel>
                <Tab.Panel>Content 2</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRightBar;

"use client";

import { Tab } from "@headlessui/react";
import { ChartOptions } from "chart.js";
import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { twMerge } from "tailwind-merge";

interface IRightBarProps {}

const RightBar: React.FC<IRightBarProps> = (props) => {
  const totalPoint = {
    labels: ["Accuracy"],
    datasets: [
      {
        data: [70, 100 - 70],
        backgroundColor: ["#2AB032", "#EEEEEE"],
      },
    ],
    options: {
      aspectRatio: 1,
      plugins: {
        datalabels: {
          display: true,
          backgroundColor: "#ccc",
          borderRadius: 3,
          font: {
            color: "red",
            weight: "bold",
          },
        },
        doughnutlabel: {
          labels: [
            {
              text: "72%",
              font: {
                size: 32,
                weight: "bold",
              },
            },
          ],
        },
      },
    },
  };

  const options: ChartOptions<"doughnut"> = useMemo(
    () => ({
      cutout: "70%", // Adjust the size of the donut hole
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          enabled: true,
        },
      },
    }),
    []
  );

  return (
    <div className="flex-2 w-3/12">
      <div
        style={{
          background: "rgba(249, 250, 251, 0.60)",
        }}
        className="flex-2 p-4 rounded-xl h-full overflow-auto scroll-hover"
      >
        <p className="text-[20px] font-bold">Lịch sử điểm</p>
        <div className="rounded-xl bg-anti-flash-white p-4 border border-light-silver mt-4 flex gap-6 flex-col">
          <Tab.Group>
            <Tab.List
              className={
                "flex justify-between p-1 gap-2 bg-[#e5e7eb] rounded-xl"
              }
            >
              <Tab
                className={({ selected }) =>
                  twMerge(
                    "w-full rounded-xl px-6 py-3",
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
                    "w-full rounded-xl px-6 py-3",
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
              <Tab.Panel>
                <div className="relative">
                  <p className="text-[28px] text-independence absolute font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    72%
                  </p>
                  <Doughnut
                    className="scale-75"
                    data={totalPoint}
                    options={options}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 justify-between items-center">
                    <div className="w-full">🎯 Chính xác</div>
                    <div className="relative  w-full flex justify-end">
                      <p className="text-[12px] text-independence absolute font-bold top-1/2 right-[8px] -translate-y-1/2">
                        72%
                      </p>
                      <Doughnut
                        className="w-full !h-[44px]"
                        data={totalPoint}
                        options={options}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 justify-between items-center">
                    <div className="w-full">🗣️ Lưu loát</div>
                    <div className="relative  w-full flex justify-end">
                      <p className="text-[12px] text-independence absolute font-bold top-1/2 right-[8px] -translate-y-1/2">
                        72%
                      </p>
                      <Doughnut
                        className="w-full !h-[44px]"
                        data={totalPoint}
                        options={options}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 justify-between items-center">
                    <div className="w-full">💬 Hoàn thiện</div>
                    <div className="relative  w-full flex justify-end">
                      <p className="text-[12px] text-independence absolute font-bold top-1/2 right-[8px] -translate-y-1/2">
                        72%
                      </p>
                      <Doughnut
                        className="w-full !h-[44px]"
                        data={totalPoint}
                        options={options}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 justify-between items-center">
                    <div className="w-full">🏊 Vần điệu</div>
                    <div className="relative  w-full flex justify-end">
                      <p className="text-[12px] text-independence absolute font-bold top-1/2 right-[8px] -translate-y-1/2">
                        72%
                      </p>
                      <Doughnut
                        className="w-full !h-[44px]"
                        data={totalPoint}
                        options={options}
                      />
                    </div>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>Content 2</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default RightBar;

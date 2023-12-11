"use client";

import RsIcon from "@/app/components/Icon";
import { ChartOptions } from "chart.js";
import Image from "next/image";
import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Pronouce } from "./Video";

interface ILeftBarProps {
  listPronouce: Pronouce[];
}

const LeftBar: React.FC<ILeftBarProps> = (props) => {
  const totalPoint = (point: number) => ({
    labels: ["Accuracy"],
    datasets: [
      {
        data: [point, 100 - point],
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
  });

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
    <div
      style={{
        background: "rgba(249, 250, 251, 0.60)",
      }}
      className="p-4 rounded-xl h-full overflow-auto transition-all scroll-hover"
    >
      <div className="flex flex-col gap-4">
        {(props.listPronouce || []).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl py-2 px-3 border border-bright-gray flex gap-2 items-center justify-between"
          >
            <div>
              <div>
                <p className="font-light text-auro-metal-saurus text-xs">
                  Mẫu:{" "}
                  <span className="text-independence font-medium">
                    {_.paragraph}
                  </span>
                </p>
              </div>
              <div>
                <p className="font-light text-auro-metal-saurus text-xs">
                  Của bạn:{" "}
                  <span className="text-primary-green font-medium">
                    {_.pronouceParagraph}
                  </span>
                </p>
              </div>
            </div>
            <div className="relative">
              <p className="text-[8px] text-independence absolute font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {_.score?.average}%
              </p>
              <Doughnut
                className="!h-[50px]"
                data={totalPoint(_.score?.average as number)}
                options={options}
              />
            </div>
            {/* <div>
              <RsIcon type="arrow-clock-wise" />
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftBar;

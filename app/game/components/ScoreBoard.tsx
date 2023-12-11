"use client";

import RsIcon from "@/app/components/Icon";
import { ChartOptions } from "chart.js";
import Image from "next/image";
import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { IResult } from "../flash-card/page";
import { twMerge } from "tailwind-merge";

interface IScoreBoardProps {
  result: IResult[];
}

const ScoreBoard: React.FC<IScoreBoardProps> = (props) => {
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
    <div className="p-4 bg-white rounded-xl h-full overflow-auto transition-all scroll-hover">
      <div className="flex flex-col gap-4">
        <h4 className="text-independence font-bold">Hoàn thành</h4>
        <div className="flex flex-col gap-4">
          {(props.result || []).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl py-2 px-3 border border-bright-gray flex gap-2 items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="w-[44px] h-[44px] rounded-2xl p-[2px] drop-shado">
                  <Image
                    className="rounded-2xl w-full h-full object-cover"
                    src={_.thumbnail}
                    alt={_.keyword}
                    height={44}
                    width={44}
                  />
                </div>
                <div>
                  <div>
                    <p className="font-light text-auro-metal-saurus text-xs">
                      Mẫu:{" "}
                      <span className="text-independence font-medium">
                        {_.keyword}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="font-light text-auro-metal-saurus text-xs">
                      Của bạn:{" "}
                      <span className="text-primary-green font-medium">
                        {_.voice}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <p
                  className={twMerge(
                    _.result ? "text-primary-green" : "text-red-600"
                  )}
                >
                  {_.result ? "Chính xác" : "Chưa chính xác"}
                </p>
              </div>
              {/* <div>
              <RsIcon type="arrow-clock-wise" />
            </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;

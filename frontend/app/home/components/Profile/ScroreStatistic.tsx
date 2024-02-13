"use client";

import { ChartOptions } from "chart.js";
import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";

interface IScoreStatisticProps {}

const ScoreStatistic: React.FC<IScoreStatisticProps> = (props) => {
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
    <div className="p-6 bg-white drop-shadow-lg rounded-xl h-fit">
      <div className="flex gap-2 justify-between">
        <div className="flex items-center gap-6">
          <p className="text-independence font-bold text-lg">Tổng điểm</p>
          <div>
            <Doughnut
              className="!h-[150px] !w-[150px]"
              data={totalPoint}
              options={options}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-xl bg-anti-flash-white p-3 flex gap-2 items-center justify-between">
            <div className="w-full">🎯 Chính xác</div>
            <div className="w-auto">
              <Doughnut
                className="!w-[44px] !h-[44px]"
                data={totalPoint}
                options={options}
              />
            </div>
          </div>
          <div className="rounded-xl bg-anti-flash-white p-3 flex gap-2 items-center justify-between">
            <div className="w-full">🗣️ Lưu loát</div>
            <div className="w-auto">
              <Doughnut
                className="!w-[44px] !h-[44px]"
                data={totalPoint}
                options={options}
              />
            </div>
          </div>
          <div className="rounded-xl bg-anti-flash-white p-3 flex gap-2 items-center justify-between">
            <div className="w-full">💬 Hoàn thiện</div>
            <div className="w-auto">
              <Doughnut
                className="!w-[44px] !h-[44px]"
                data={totalPoint}
                options={options}
              />
            </div>
          </div>
          <div className="rounded-xl bg-anti-flash-white p-3 flex gap-2 items-center justify-between">
            <div className="w-full">🏊 Vần điệu</div>
            <div className="w-auto">
              <Doughnut
                className="!w-[44px] !h-[44px]"
                data={totalPoint}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreStatistic;

"use client";

import Image from "next/image";
import Button from "../Button";
import Lottie from "lottie-react";
import * as animation from "../../../public/lottie/animation.json";
import { twMerge } from "tailwind-merge";

interface IHomeScreenProps {}

const HomeScreen: React.FC<IHomeScreenProps> = (props) => {
  return (
    <div className="h-[90%]">
      <div
        className={twMerge(
          "smart-edu-block flex flex-col justify-between",
          "!pt-0 h-full min-h-[85vh]"
        )}
      >
        <div className="px-5 flex gap-5 justify-center">
          <div className="flex flex-col gap-8 justify-center">
            <div>
              <h2 className="bg-clip-text text-transparent bg-primary-gradient font-bold leading-[72px]">
                Học Tiếng Anh không khó
              </h2>
              <h3 className="text-independence font-bold">
                Hãy để Học Tài Năng giúp bạn
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              <Button
                href="/onboard"
                className="w-full hover:bg-primary-hover-gradient transition-all duration-300"
                type="primary"
              >
                Bắt đầu ngay
              </Button>
              <Button
                href="/login"
                className="w-full hover:bg-primary-gradient bg-clip-text hover:text-transparent"
                type="secondary"
              >
                Đã có tài khoản
              </Button>
            </div>
          </div>
          <div>
            <Lottie
              animationData={animation}
              className="flex justify-center items-center"
              loop={true}
            />
            {/* <Image
              alt="Banner"
              width={550}
              height={450}
              src={"/lottie/hero-banner.lottie"}
            /> */}
          </div>
        </div>
        <div className="flex mt-auto gap-8 justify-center items-center">
          <div>Được đăng tin bởi</div>
          <div>
            <Image
              src={"/images/zing-news.png"}
              alt="zing new"
              className="h-[24px] w-auto object-contain"
              width={200}
              height={24}
            />
          </div>
          <div>
            <Image
              src={"/images/vtv.png"}
              alt="zing new"
              className="h-[24px] w-auto object-contain"
              width={200}
              height={60}
            />
          </div>
          <div>
            <Image
              src={"/images/thanh-nien.png"}
              alt="zing new"
              className="h-[24px] w-auto object-contain"
              width={200}
              height={60}
            />
          </div>
          <div>
            <Image
              src={"/images/kenh-14.png"}
              alt="zing new"
              className="h-[24px] w-auto object-contain"
              width={200}
              height={60}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

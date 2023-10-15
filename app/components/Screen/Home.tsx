"use client";

import Image from "next/image";
import Button from "../Button";
import Lottie from "lottie-react";
import * as animation from "../../../public/lottie/animation.json";

interface IHomeScreenProps {}

const HomeScreen: React.FC<IHomeScreenProps> = (props) => {
  return (
    <div className="bg-gradient-to-b from-white to-nyanza h-screen">
      <div className="smart-edu-block">
        <div className="px-5 flex gap-5">
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
              <Button className="w-full" type="primary">
                Bắt đầu ngay
              </Button>
              <Button href="/login" className="w-full" type="secondary">
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
      </div>
    </div>
  );
};

export default HomeScreen;

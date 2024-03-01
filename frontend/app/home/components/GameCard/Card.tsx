"use client";

import Button from "@/app/components/Button";
import RsIcon from "@/app/components/Icon";
import Image from "next/image";
import Link from "next/link";

interface ICardProps {
  title: string;
  url: string;
  thumb: string;
  inProgress?: boolean;
}

const Card: React.FC<ICardProps> = (props) => {
  return (
    <div className="rounded-xl overflow-hidden drop-shadow-lg">
      <div className="h-[240px] w-full">
        <Image
          className="h-full w-full object-cover"
          alt="thumb"
          width={430}
          height={240}
          src={props.thumb}
        />
      </div>
      <div className="py-3 px-6 bg-white">
        <div className="flex justify-between items-center gap-6">
          <div className="w-1/2">
            <p className="font-bold text-independence">{props.title}</p>
            {props.inProgress ? (
              <p className="text-[#FFD66D]">Game sắp ra mắt</p>
            ) : (
              <p className="flex gap-2 items-center text-independence">
                <RsIcon type="group-user" />
                <span>Đã có 100 người đã chơi</span>
              </p>
            )}
          </div>
          <div className="w-1/2">
            <Link href={props.url}>
              <Button className="px-6 w-full" type="primary">
                Chơi ngay
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

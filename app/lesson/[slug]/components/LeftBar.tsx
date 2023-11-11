import RsIcon from "@/app/components/Icon";
import Image from "next/image";

interface ILeftBarProps {}

const LeftBar: React.FC<ILeftBarProps> = (props) => {
  return (
    <div
      style={{
        background: "rgba(249, 250, 251, 0.60)",
      }}
      className="flex-2 p-4 rounded-xl h-full overflow-auto"
    >
      <div className="flex flex-col gap-6">
        <div className="rounded-xl text-white p-6 bg-gradient-green-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                className="w-[78px] h-[44px] rounded-lg"
                src={"/images/Rectangle 4.png"}
                alt="lesson image"
                height={44}
                width={78}
              />
              <p className="font-bold">Bài 1</p>
            </div>
            <div className="flex gap-1 items-center">
              <RsIcon type="clock" />
              <p className="text-ghost-white">32 phút</p>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-[14px]">Các phát âm chuẩn như người bản địa</p>
          </div>
        </div>
        <div className="rounded-xl p-6 bg-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                className="w-[78px] h-[44px] rounded-lg"
                src={"/images/Rectangle 4.png"}
                alt="lesson image"
                height={44}
                width={78}
              />
              <p className="font-bold">Bài 2</p>
            </div>
            <div className="flex gap-1 items-center">
              <RsIcon type="clock" fill="#9CA3AF" />
              <p className="text-cadget-grey">32 phút</p>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-[14px]">Các phát âm chuẩn như người bản địa</p>
          </div>
        </div>
        <div className="rounded-xl p-6 bg-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                className="w-[78px] h-[44px] rounded-lg"
                src={"/images/Rectangle 4.png"}
                alt="lesson image"
                height={44}
                width={78}
              />
              <p className="font-bold">Bài 2</p>
            </div>
            <div className="flex gap-1 items-center">
              <RsIcon type="clock" fill="#9CA3AF" />
              <p className="text-cadget-grey">32 phút</p>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-[14px]">Các phát âm chuẩn như người bản địa</p>
          </div>
        </div>
        <div className="rounded-xl p-6 bg-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                className="w-[78px] h-[44px] rounded-lg"
                src={"/images/Rectangle 4.png"}
                alt="lesson image"
                height={44}
                width={78}
              />
              <p className="font-bold">Bài 2</p>
            </div>
            <div className="flex gap-1 items-center">
              <RsIcon type="clock" fill="#9CA3AF" />
              <p className="text-cadget-grey">32 phút</p>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-[14px]">Các phát âm chuẩn như người bản địa</p>
          </div>
        </div>
        <div className="rounded-xl p-6 bg-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                className="w-[78px] h-[44px] rounded-lg"
                src={"/images/Rectangle 4.png"}
                alt="lesson image"
                height={44}
                width={78}
              />
              <p className="font-bold">Bài 2</p>
            </div>
            <div className="flex gap-1 items-center">
              <RsIcon type="clock" fill="#9CA3AF" />
              <p className="text-cadget-grey">32 phút</p>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-[14px]">Các phát âm chuẩn như người bản địa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;

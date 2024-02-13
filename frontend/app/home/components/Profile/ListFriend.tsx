import RsIcon from "@/app/components/Icon";
import Image from "next/image";

interface IListFriendProps {}

const ListFriend: React.FC<IListFriendProps> = (props) => {
  return (
    <div className="p-6 bg-white drop-shadow-lg rounded-xl h-full overflow-y-auto scroll-hover">
      <div>
        <p className="font-bold text-independence">
          Danh sách bạn bè{" "}
          <span className="text-primary-green text-lg">(32)</span>
        </p>
      </div>
      {Array(10)
        .fill("")
        .map((_, index) => (
          <div key={index} className="flex flex-col gap-2 mt-3">
            <div className="bg-anti-flash-white p-2 flex justify-between rounded-xl">
              <div className="flex gap-2 items-center">
                <div>
                  <Image
                    src={"/images/avatar-2.png"}
                    alt="avatar"
                    width={32}
                    height={32}
                  />
                </div>
                <div>
                  <p className="text-independence text-sm font-bold">
                    Thịnh Nguyễn
                  </p>
                  <p className="text-independence text-xs">888888843132</p>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="flex gap-2 items-center">
                  <RsIcon type="medal-2" />
                  Hạng 2
                </div>
                <div>
                  <RsIcon type="setting-dot" />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListFriend;

import Button from "@/app/components/Button";
import RsIcon from "@/app/components/Icon";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Dispatch, Fragment, SetStateAction } from "react";

interface IAvatarUploadProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AvatarUpload: React.FC<IAvatarUploadProps> = ({
  modalOpen,
  setModalOpen,
}) => {
  return (
    <Transition appear show={modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setModalOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full min-h-[385px] max-w-[520px] overflow-hidden rounded-xl bg-white transition-all flex flex-col justify-between">
                <div>
                  <Dialog.Title
                    as="h3"
                    className="text-xl p-4 font-bold leading-6 text-charcoal flex justify-between items-center border-b border-bright-gray"
                  >
                    Thay đổi avatar
                    <RsIcon
                      type="close"
                      className="cursor-pointer"
                      onClick={() => setModalOpen(false)}
                    />
                  </Dialog.Title>
                </div>
                <div className="py-10 px-4 flex flex-col gap-4">
                  <div className="flex justify-center items-center gap-4">
                    <div>
                      <Image
                        className="w-[100px] h-[100px] object-cover rounded-full"
                        src={"/images/avatar-2.png"}
                        alt="Avatar"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div>
                      <Button
                        type="primary"
                        className="bg-independence flex items-center gap-2"
                      >
                        <RsIcon stroke={"#fff"} fill={"#fff"} type="plus" />
                        <span className="font-bold text-white">Tải ảnh</span>
                      </Button>
                    </div>
                  </div>
                  <p className="text-independence font-bold">Ảnh gợi ý</p>
                  <div className="grid grid-cols-5 gap-2">
                    {Array(15)
                      .fill("")
                      .map((_, index) => (
                        <div key={index} className="cursor-pointer">
                          <Image
                            src={`/images/avatar-${index + 2}.png`}
                            alt="avatar option"
                            width={91}
                            height={91}
                            className="w-[91px] h-[91px] rounded-full"
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="p-4 border-t border-bright-gray flex justify-end">
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setModalOpen(false)}
                      className="border border-auro-metal-saurus"
                      type="secondary"
                    >
                      Hủy
                    </Button>
                    <Button onClick={() => setModalOpen(false)} type="primary">
                      Lưu thay đổi
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AvatarUpload;

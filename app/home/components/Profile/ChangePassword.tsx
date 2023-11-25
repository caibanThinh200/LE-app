import Button from "@/app/components/Button";
import RsIcon from "@/app/components/Icon";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Dispatch, Fragment, SetStateAction } from "react";

interface IChangePassWordFormProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ChangePasswordForm: React.FC<IChangePassWordFormProps> = ({
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
                    Đổi mật khẩu
                    <RsIcon
                      type="close"
                      className="cursor-pointer"
                      onClick={() => setModalOpen(false)}
                    />
                  </Dialog.Title>
                  <div className="px-4 py-6 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <p className="text-charcoal text-sm font-medium">
                        Mật khẩu cũ
                      </p>
                      <div className="border-2 mt-2 border-bright-gray rounded-full px-4 py-2.5 flex gap-2 items-center">
                        {/* <RsIcon type="glass" className="cursor-pointer" /> */}
                        <input
                          type="password"
                          placeholder="Nhập mật khẩu cũ"
                          className="bg-inherit border-none outline-none w-full"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-charcoal text-sm font-medium">
                        Mật khẩu mới
                      </p>
                      <div className="border-2 mt-2 border-bright-gray rounded-full px-4 py-2.5 flex gap-2 items-center">
                        {/* <RsIcon type="glass" className="cursor-pointer" /> */}
                        <input
                          type="password"
                          placeholder="Nhập mật khẩu mới"
                          className="bg-inherit border-none outline-none w-full"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-charcoal text-sm font-medium">
                        Xác nhận mật khẩu mới
                      </p>
                      <div className="border-2 mt-2 border-bright-gray rounded-full px-4 py-2.5 flex gap-2 items-center">
                        {/* <RsIcon type="glass" className="cursor-pointer" /> */}
                        <input
                          type="password"
                          placeholder="Xác nhận lại mật khẩu mới"
                          className="bg-inherit border-none outline-none w-full"
                        />
                      </div>
                    </div>
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
                      Xác nhận
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

export default ChangePasswordForm;

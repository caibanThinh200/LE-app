import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import RsIcon from "../../Icon";
import Button from "../../Button";
import Link from "next/link";
import { IUserDto } from "@/app/interface/modules/user";
import { IStudentDto } from "@/app/interface/modules/student";

interface IRegisterSuccessProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userInfo: IStudentDto;
}

const RegisterSuccess: React.FC<IRegisterSuccessProps> = (props) => {
  const [registeredUser, setRegisteredUser] = useState<IStudentDto>({});

  useEffect(() => {
    if (props?.userInfo?._id) {
      setRegisteredUser(props?.userInfo);
    }
  }, [props]);

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => props.setOpen(false)}
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
              <Dialog.Panel className="w-full max-w-[520px] overflow-hidden rounded-xl bg-white transition-all flex flex-col justify-between">
                <div className="px-4 py-6 flex gap-6 flex-col items-center">
                  <div className="p-2 bg-[#EDF8F0] rounded-full">
                    <RsIcon type="success-check" />
                  </div>
                  <p className="text-xl font-bold text-independence text-center">
                    Chúc mừng{" "}
                    <span className="text-primary-green">
                      {registeredUser.info?.name}
                    </span>{" "}
                    đã đăng ký thành công tài khoản.
                  </p>
                </div>
                <div className="p-4 border border-t">
                  <Button href="/home" className="w-full" type="primary">
                    Vào trang chủ
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RegisterSuccess;

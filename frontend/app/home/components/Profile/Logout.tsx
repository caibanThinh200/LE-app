import Button from "@/app/components/Button";
import RsIcon from "@/app/components/Icon";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Dispatch, Fragment, SetStateAction, useCallback } from "react";

interface ILogoutFormProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const LogoutForm: React.FC<ILogoutFormProps> = ({
  modalOpen,
  setModalOpen,
}) => {
  const router = useRouter();

  const handleLogout = useCallback(() => {
    Cookies.remove("auth_token");
    router.replace("/");
  }, []);

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
              <Dialog.Panel className="w-full max-w-[520px] overflow-hidden rounded-xl bg-white transition-all flex flex-col justify-between">
                <div className="py-6 px-4 flex flex-col gap-6 items-center">
                  <div className="p-3 bg-[#F05252]/10 w-fit rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="44"
                      height="45"
                      viewBox="0 0 44 45"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M22 42.5C33.0455 42.5 42 33.5455 42 22.5C42 11.4545 33.0455 2.5 22 2.5C10.9545 2.5 2 11.4545 2 22.5C2 33.5455 10.9545 42.5 22 42.5ZM13.4418 31.0582C13.101 30.7172 12.9095 30.2548 12.9095 29.7727C12.9095 29.2906 13.101 28.8282 13.4418 28.4873L19.4291 22.5L13.4418 16.5127C13.1106 16.1698 12.9274 15.7105 12.9315 15.2338C12.9356 14.7571 13.1269 14.3011 13.464 13.964C13.8011 13.6269 14.2571 13.4356 14.7338 13.4315C15.2105 13.4274 15.6698 13.6106 16.0127 13.9418L22 19.9291L27.9873 13.9418C28.155 13.7682 28.3556 13.6297 28.5774 13.5344C28.7993 13.4391 29.0379 13.3889 29.2793 13.3868C29.5207 13.3847 29.7601 13.4307 29.9836 13.5221C30.207 13.6136 30.41 13.7486 30.5807 13.9193C30.7514 14.09 30.8864 14.293 30.9779 14.5164C31.0693 14.7399 31.1153 14.9793 31.1132 15.2207C31.1111 15.4621 31.0609 15.7007 30.9656 15.9226C30.8703 16.1444 30.7318 16.345 30.5582 16.5127L24.5709 22.5L30.5582 28.4873C30.8894 28.8302 31.0726 29.2895 31.0685 29.7662C31.0644 30.2429 30.8731 30.6989 30.536 31.036C30.1989 31.3731 29.7429 31.5644 29.2662 31.5685C28.7895 31.5726 28.3302 31.3894 27.9873 31.0582L22 25.0709L16.0127 31.0582C15.6718 31.399 15.2094 31.5905 14.7273 31.5905C14.2452 31.5905 13.7828 31.399 13.4418 31.0582Z"
                        fill="#F05252"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-independence text-center w-7/12 mx-auto">
                      Bạn có chắc muốn đăng xuất ra khỏi ứng dụng
                    </p>
                  </div>
                </div>
                <div className="p-4 flex w-full">
                  <div className="flex gap-3 w-full">
                    <Button
                      onClick={() => setModalOpen(false)}
                      className="border border-auro-metal-saurus w-1/2"
                      type="secondary"
                    >
                      Hủy
                    </Button>
                    <Button
                      className="bg-[#F05252] w-1/2"
                      onClick={handleLogout}
                      type="primary"
                    >
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

export default LogoutForm;

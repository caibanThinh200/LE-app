"use client";

import Button from "@/app/components/Button";
import RsIcon from "@/app/components/Icon";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import ChangePasswordForm from "./ChangePassword";
import EditProfileForm from "./EditProfile";
import LogoutForm from "./Logout";
import AvatarUpload from "./Avatar";

interface IPersonalInfoProps {}

const PersonalInfo: React.FC<IPersonalInfoProps> = (props) => {
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [avatarUploadModal, setAvatarUploadModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  return (
    <div className="p-6 bg-white flex-col flex justify-between drop-shadow-lg rounded-xl h-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 items-center">
          <div className="relative">
            <Image
              src={"/images/avatar-2.png"}
              alt="avatar"
              width={100}
              height={100}
              className="w-[100px] h-[100px] rounded-full"
            />
            <div
              onClick={() => setAvatarUploadModal(true)}
              className="absolute  bottom-0 right-0 z-10 bg-white p-2 shadow-lg rounded-full cursor-pointer"
            >
              <RsIcon type="camera" className="" />
            </div>
          </div>
          <div>
            <p className="text-independence font-bold text-xl text-center">
              Thế Vinh
            </p>
            <p className="flex gap-2 items-center">
              <RsIcon type="medal-1" />
              <span className="text-yellow-600">Không có đối thủ</span>
            </p>
          </div>
          <p>Lớp 12</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="p-3 bg-anti-flash-white flex justify-between rounded-xl">
            <p className="text-auro-metal-saurus">Số điện thoại</p>
            <div className="flex gap-2">
              0858543232
              <RsIcon className="cursor-pointer" type="copy" />
              <RsIcon
                className="cursor-pointer"
                type="edit-pencil"
                onClick={() => setEditProfileModal(true)}
              />
            </div>
          </div>
          <div className="p-3 bg-anti-flash-white flex justify-between rounded-xl">
            <p className="text-auro-metal-saurus">Mật khẩu</p>
            <div className="flex gap-2">
              *************
              <RsIcon
                onClick={() => setChangePasswordModal(true)}
                className="cursor-pointer"
                type="edit-pencil"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="text-center cursor-pointer"
        onClick={() => setLogoutModal(true)}
      >
        <p className="text-independence font-bold text-sm flex gap-2 items-center justify-center">
          Thoát ứng dụng
          <RsIcon type="exit" />
        </p>
      </div>
      <ChangePasswordForm
        modalOpen={changePasswordModal}
        setModalOpen={setChangePasswordModal}
      />
      <EditProfileForm
        modalOpen={editProfileModal}
        setModalOpen={setEditProfileModal}
      />
      <AvatarUpload
        modalOpen={avatarUploadModal}
        setModalOpen={setAvatarUploadModal}
      />
      <LogoutForm modalOpen={logoutModal} setModalOpen={setLogoutModal} />
    </div>
  );
};

export default PersonalInfo;

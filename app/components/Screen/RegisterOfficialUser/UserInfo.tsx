"use client";

import { Dispatch, SetStateAction, useCallback } from "react";
import { FieldValues, UseFormReturn, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import Button from "../../Button";
import axios from "axios";

interface IUserInfoProps {
  form: UseFormReturn<FieldValues, any, undefined>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  userInfo: object;
  setRegisterInfo: (params: object) => void;
}

const UserInfo: React.FC<IUserInfoProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = useCallback(
    (values: FieldValues) => {
      // axios.post("/api/sms").then(() => {
      //   props.setRegisterInfo({
      //     ...values,
      //   });
      // });
      props.setRegisterInfo({
        ...values,
      });
      props.setCurrentStep(1);
    },
    [props]
  );

  return (
    <div>
      <div className="smart-edu-block">
        <div className="text-center">
          <h3 className="text-independence font-bold">Đăng ký</h3>
        </div>
        <div className="mt-8">
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="flex flex-col gap-6 max-w-[440px] mx-auto"
          >
            <div className="flex flex-col gap-2">
              <label className="text-independence">Tên</label>
              <input
                className={twMerge(
                  "py-2.5 px-4 border-2 rounded-full w-full border-plantinum outline-none",
                  errors["fulNname"] && "border-carmine-pink bg-linen"
                )}
                // error={
                //   errors["fulNname"] && {
                //     type: "required",
                //     message: errors["fulNname"]?.message as string,
                //   }
                // }
                placeholder="Nhập tên của bạn"
                {...register("fulNname", {
                  required: "Vui lòng nhập họ tên của bạn",
                })}
              />
              {/* <Input
            // type="phoneNumber"
            placeholder="Số điện thoại / tên đăng nhập"
            {...register("fulNname", {
              required: "Số điện thoại hoặc tên đăng nhập không hợp lệ",
            })}
          /> */}
              {errors["fulNname"]?.message && (
                <p className="mt-2 text-carmine-pink">
                  {errors["fulNname"]?.message as string}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-independence">Số điện thoại</label>
              {/* <Input
            type="phoneNumber"
            placeholder="Nhập mật khẩu"
            name="phone_or_username"
          /> */}
              <input
                className={twMerge(
                  "py-2.5 px-4 border-2 rounded-full w-full border-plantinum outline-none",
                  errors["phone_or_username"] && "border-carmine-pink bg-linen"
                )}
                // error={
                //   errors["phone_or_username"] && {
                //     type: "required",
                //     message: errors["phone_or_username"]?.message as string,
                //   }
                // }
                placeholder="Nhập số điện thoại"
                {...register("phoneNumber", {
                  required: "Vui lòng nhập số điện thoại",
                  pattern: {
                    value: /[0-9]/,
                    message: "Số điện thoại không hợp lệ",
                  },
                })}
              />
              {errors["phoneNumber"]?.message && (
                <p className="mt-2 text-carmine-pink">
                  {errors["phoneNumber"]?.message as string}
                </p>
              )}
            </div>
            <div>
              <Button className="w-full" type="primary">
                Tiếp tục
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

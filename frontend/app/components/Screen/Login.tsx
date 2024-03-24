"use client";

import Image from "next/image";
import Button from "../Button";
import Input from "../Input";
import { FieldValues, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import AuthQuery from "@/app/client/queries/auth";
import { useMutation } from "react-query";
import { IUserDto } from "@/app/interface/modules/user";
import AuthService from "@/app/client/api/auth";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

interface ILoginScreenProps {}

const LoginScreen: React.FC<ILoginScreenProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (body: IUserDto) => AuthService.login(body),
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (mutation.error) {
      if ((mutation.error as AxiosError)?.response?.status === 400) {
        toast.error("Tên người dùng hoặc mật khẩu không hợp lệ");
        setLoading(false);
      }
    }
    if (mutation.data?.access_token) {
      Cookies.set("auth_token", mutation.data?.access_token);
      Cookies.remove("draft");
      setLoading(false);
      router.push("/home");
    }
  }, [mutation]);

  const formSubmit = useCallback(
    (values: FieldValues) => {
      setLoading(true);
      mutation.mutate({
        username: values.username,
        password: values.password,
      });
    },
    [router]
  );

  return (
    <div>
      <div className="smart-edu-block">
        <div className="text-center">
          <h3 className="text-independence font-bold">Đăng nhập</h3>
        </div>
        <div className="mt-8">
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="flex flex-col gap-6 max-w-[440px] mx-auto"
          >
            <div className="flex flex-col gap-2">
              <label className="text-independence">
                Nhập số điện thoại / tên đăng nhập
              </label>
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
                placeholder="Số điện thoại / tên đăng nhập"
                {...register("username", {
                  required: "Số điện thoại hoặc tên đăng nhập không hợp lệ",
                })}
              />
              {/* <Input
                // type="password"
                placeholder="Số điện thoại / tên đăng nhập"
                {...register("phone_or_username", {
                  required: "Số điện thoại hoặc tên đăng nhập không hợp lệ",
                })}
              /> */}
              {errors["phone_or_username"]?.message && (
                <p className="mt-2 text-carmine-pink">
                  {errors["phone_or_username"]?.message as string}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-independence">Mật khẩu</label>
              {/* <Input
                type="password"
                placeholder="Nhập mật khẩu"
                name="phone_or_username"
              /> */}
              <Input
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
                type="password"
                placeholder="Nhập mật khẩu"
                {...register("password", {
                  required: "Vui lòng nhập mật khẩu",
                })}
              />
              {errors["password"]?.message && (
                <p className="mt-2 text-carmine-pink">
                  {errors["password"]?.message as string}
                </p>
              )}
            </div>
            <div>
              <Button loading={loading} className="w-full" type="primary">
                Đăng nhập
              </Button>
            </div>
            <div className="before:flex-1 before:content-[''] before:p-[1px] before:bg-bright-gray before:m-2 after:flex-1 after:content-[''] after:p-[1px] after:bg-bright-gray after:m-2 text-bright-gray font-bold flex items-center">
              <p className="text-cadget-grey">OR</p>
            </div>
            <div className="flex gap-3">
              <div className="w-1/2">
                <Button
                  type="secondary"
                  className="w-full group flex gap-2 hover:text-primary-green items-center justify-center text-[#1194F5]"
                >
                  {/* <Image
                    src={"/svg/facebook-primary.svg"}
                    width={32}
                    height={32}
                    alt="Facebook"
                  /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="32"
                    viewBox="0 0 33 32"
                    fill="none"
                  >
                    <circle
                      className="group-hover:fill-primary-green"
                      cx="16.5"
                      cy="16"
                      r="14"
                      fill="url(#paint0_linear_41_3001)"
                    />
                    <path
                      d="M21.7137 20.2816L22.3356 16.3301H18.4452V13.767C18.4452 12.6857 18.9877 11.6311 20.7302 11.6311H22.5V8.26699C22.5 8.26699 20.8945 8 19.3603 8C16.1548 8 14.0617 9.89294 14.0617 13.3184V16.3301H10.5V20.2816H14.0617V29.8345C14.7767 29.944 15.5082 30 16.2534 30C16.9986 30 17.7302 29.944 18.4452 29.8345V20.2816H21.7137Z"
                      fill="white"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_41_3001"
                        x1="16.5"
                        y1="2"
                        x2="16.5"
                        y2="29.917"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#18ACFE" />
                        <stop offset="1" stop-color="#0163E0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  Facebook
                </Button>
              </div>
              <div className="w-1/2">
                <Button
                  type="secondary"
                  className="w-full group flex gap-2 items-center justify-center text-[#34A853]"
                >
                  {/* <Image
                    src={"/svg/google.svg"}
                    width={32}
                    height={32}
                    alt="Google"
                  /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      className="group-hover:fill-primary-green"
                      d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1443 21.8798 21.2395 23.1864L21.2128 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z"
                      fill="#4285F4"
                    />
                    <path
                      className="group-hover:fill-primary-green"
                      d="M16.2862 30C20.1433 30 23.3814 28.7555 25.7465 26.6089L21.2386 23.1865C20.0322 24.011 18.4132 24.5866 16.2862 24.5866C12.5085 24.5866 9.30219 22.1444 8.15923 18.7688L7.9917 18.7827L3.58202 22.1272L3.52435 22.2843C5.87353 26.8577 10.6989 30 16.2862 30Z"
                      fill="#34A853"
                    />
                    <path
                      className="group-hover:fill-primary-green"
                      d="M8.16007 18.7688C7.85848 17.8977 7.68395 16.9643 7.68395 15.9999C7.68395 15.0354 7.85849 14.1021 8.1442 13.231L8.13621 13.0455L3.67126 9.64734L3.52518 9.71544C2.55696 11.6132 2.0014 13.7444 2.0014 15.9999C2.0014 18.2555 2.55696 20.3865 3.52518 22.2843L8.16007 18.7688Z"
                      fill="#FBBC05"
                    />
                    <path
                      className="group-hover:fill-primary-green"
                      d="M16.2863 7.4133C18.9688 7.4133 20.7783 8.54885 21.8101 9.4978L25.8418 5.64C23.3657 3.38445 20.1434 2 16.2863 2C10.699 2 5.87354 5.1422 3.52435 9.71549L8.14339 13.2311C9.30223 9.85555 12.5086 7.4133 16.2863 7.4133Z"
                      fill="#EB4335"
                    />
                  </svg>
                  Google
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

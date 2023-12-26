import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { FieldValues, UseFormReturn, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import Button from "../../Button";
import Input from "../../Input";
import RegisterSuccess from "./RegisterSuccess";

interface IPasswordProps {
  form: UseFormReturn<FieldValues, any, undefined>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  userInfo: object;
  setRegisterInfo: (params: object) => void;
}

const Password: React.FC<IPasswordProps> = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);

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
      setIsSuccess(true);
      // props.setCurrentStep();
    },
    [props]
  );

  return (
    <div>
      <div className="smart-edu-block">
        <div className="text-center">
          <h3 className="text-independence font-bold">Tạo mật khẩu</h3>
        </div>
        <div className="mt-8">
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="flex flex-col gap-6 max-w-[440px] mx-auto"
          >
            <div className="flex flex-col gap-2">
              <label className="text-independence">Tạo mật khẩu</label>
              <Input
                className={twMerge(
                  "py-2.5 px-4 border-2 rounded-full w-full border-plantinum outline-none",
                  errors["password"] && "border-carmine-pink bg-linen"
                )}
                // error={
                //   errors["fulNname"] && {
                //     type: "required",
                //     message: errors["fulNname"]?.message as string,
                //   }
                // }
                type="password"
                placeholder="Nhập mật khẩu mới"
                {...register("password", {
                  required: "Vui lòng nhập mật khẩu",
                })}
              />
              {/* <Input
        // type="phoneNumber"
        placeholder="Số điện thoại / tên đăng nhập"
        {...register("fulNname", {
          required: "Số điện thoại hoặc tên đăng nhập không hợp lệ",
        })}
      /> */}
              {errors["password"]?.message && (
                <p className="mt-2 text-carmine-pink">
                  {errors["password"]?.message as string}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-independence">Xác nhận lại mật khẩu</label>

              <Input
                type="password"
                className={twMerge(
                  "py-2.5 px-4 border-2 rounded-full w-full border-plantinum outline-none",
                  errors["rePassword"] && "border-carmine-pink bg-linen"
                )}
                placeholder="Xác nhận mật khẩu"
                {...register("rePassword", {
                  required: "Vui lòng xác nhận mật khẩu",
                  validate: (val: string) => {
                    if (watch("password") != val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
              />
              {errors["rePassword"]?.message && (
                <p className="mt-2 text-carmine-pink">
                  {errors["rePassword"]?.message as string}
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
      <RegisterSuccess isOpen={isSuccess} setOpen={setIsSuccess} />
    </div>
  );
};

export default Password;

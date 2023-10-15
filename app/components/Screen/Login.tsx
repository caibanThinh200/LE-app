import Image from "next/image";
import Button from "../Button";
import Input from "../Input";

interface ILoginScreenProps {}

const LoginScreen: React.FC<ILoginScreenProps> = (props) => {
  return (
    <div className="h-screen bg-gradient-to-b from-white to-nyanza">
      <div className="smart-edu-block">
        <div className="text-center">
          <h3 className="text-independence font-bold">Đăng nhập</h3>
        </div>
        <div className="mt-8">
          <form className="flex flex-col gap-6 max-w-[440px] mx-auto">
            <div className="flex flex-col gap-2">
              <label className="text-independence">
                Nhập số điện thoại / tên đăng nhập
              </label>
              <Input
                placeholder="Số điện thoại / tên đăng nhập"
                name="phone_or_username"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-independence">Mật khẩu</label>
              <Input placeholder="Nhập mật khẩu" name="phone_or_username" />
            </div>
            <div>
              <Button className="w-full" type="primary">
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
                  className="w-full flex gap-2 items-center justify-center text-[#1194F5]"
                >
                  <Image
                    src={"/svg/facebook-primary.svg"}
                    width={32}
                    height={32}
                    alt="Facebook"
                  />
                  Facebook
                </Button>
              </div>
              <div className="w-1/2">
                <Button
                  type="secondary"
                  className="w-full flex gap-2 items-center justify-center text-[#34A853]"
                >
                  <Image
                    src={"/svg/google.svg"}
                    width={32}
                    height={32}
                    alt="Google"
                  />
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

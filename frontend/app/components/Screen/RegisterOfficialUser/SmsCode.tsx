import {
  Dispatch,
  FormEvent,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import Input from "../../Input";
import Button from "../../Button";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import moment from "moment";
import { secondsToHms } from "@/app/util/function";
import { usePathname, useRouter } from "next/navigation";

interface ISmsCodeProps {
  form: UseFormReturn<FieldValues, any, undefined>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  userInfo: any;
  setRegisterInfo: (params: object) => void;
}

const SmsCode: React.FC<ISmsCodeProps> = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isInValidCode, setIsValidCode] = useState(false);
  const [verifyCode, setVerifyCode] = useState<Array<number | string>>([]);
  const [countdownTime, setCountdownTime] = useState<number>(60);
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);

  const countdownSmsCode = () => {
    if (countdownTime > 0) {
      setCountdownTime(countdownTime - 1);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      countdownSmsCode();
    }, 1000);
    return () => clearTimeout(timer);
  });

  const handleInputCode = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let currentCode = [...verifyCode];
    if (isNaN(parseInt(e.target.value))) {
      currentCode[index] = "";
      return;
    } else {
      currentCode[index] = e.target.value;
    }
    if (index > 0 && !inputRef.current[index - 1]?.value) {
      inputRef.current[index - 1]?.focus();
    }
    if (index < inputRef.current.length && !!e.target.value) {
      inputRef.current[index + 1]?.focus();
    }
    setVerifyCode(currentCode);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "ArrowRight") {
      inputRef.current[index + 1]?.focus();
    }
    if (e.key === "ArrowLeft") {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handleSubmitCode = () => {
    if (verifyCode.filter((code) => !!code).length < 6) {
      setIsValidCode(true);
    } else {
      axios
        .post("/api/sms/verify", {
          code: verifyCode.join(""),
          phone: props?.userInfo?.phoneNumber,
        })
        .then((res) => {
          if (res.status === 200) {
            setIsValidCode(false);
            router.push(`${pathname}?step=${3}`);
          }
        })
        .catch((e) => {
          setIsValidCode(true);
        });
    }
  };

  return (
    <div>
      <div className="smart-edu-block !w-[500px]">
        <div className="text-center">
          <h3 className="text-independence font-bold">Nhập mã</h3>
        </div>
        <div className="mt-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col gap-4 items-center">
              <p>
                Nhập mã gồm 6 chữ số gởi tới số{" "}
                <span className="text-primary-green">
                  {props.userInfo?.phoneNumber}
                </span>
              </p>
              <div className="flex gap-4 mt-2">
                {Array(6)
                  .fill("")
                  .map((_, index) => (
                    <Input
                      ref={(ref) => {
                        inputRef.current[index] = ref;
                      }}
                      onKeyUp={(e) => handleKeyUp(e, index)}
                      value={verifyCode[index] || ""}
                      onChange={(e) => handleInputCode(e, index)}
                      type="number"
                      className={twMerge(
                        "w-[44px] h-[44px] border border-bright-gray rounded-xl py-2.5 px-4",
                        isInValidCode && "border-carmine-pink bg-linen"
                      )}
                      key={index}
                    />
                  ))}
              </div>
              {isInValidCode && (
                <p className="text-carmine-pink">Mã không chính xác</p>
              )}
            </div>
            <div>
              <p className="text-[#6B7280]">
                Gởi lại mã sau {secondsToHms(countdownTime)}
              </p>
            </div>
            <div className="w-full">
              <Button
                onClick={handleSubmitCode}
                className="w-full"
                type="primary"
              >
                Tiếp tục
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmsCode;

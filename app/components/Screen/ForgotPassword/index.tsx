"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import UserInfo from "./PhoneNumber";
import SmsCode from "./SmsCode";
import Password from "./Password";

interface IForgotPasswordProps {}

const ForgotPassword: React.FC<IForgotPasswordProps> = (props) => {
  const form = useForm();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [registerInfo, setRegisterInfo] = useState({});

  const handleUpdateInfo = useCallback(
    (params: object) => {
      return setRegisterInfo({ ...registerInfo, ...params });
    },
    [registerInfo]
  );

  const steps = useMemo(
    () => [
      <UserInfo
        key={1}
        userInfo={registerInfo}
        form={form}
        setCurrentStep={setCurrentStep}
        setRegisterInfo={handleUpdateInfo}
      />,
      <SmsCode
        key={2}
        userInfo={registerInfo}
        form={form}
        setCurrentStep={setCurrentStep}
        setRegisterInfo={setRegisterInfo}
      />,
      <Password
        userInfo={registerInfo}
        key={3}
        form={form}
        setCurrentStep={setCurrentStep}
        setRegisterInfo={setRegisterInfo}
      />,
    ],
    [form, handleUpdateInfo, registerInfo]
  );

  return (
    <div>
      <div>{steps[currentStep]}</div>
    </div>
  );
};

export default ForgotPassword;

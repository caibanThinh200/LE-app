"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import UserInfo from "./UserInfo";
import SmsCode from "./SmsCode";
import Password from "./Password";

interface IRegisterOfficialUserProps {}

const RegisterOfficialUser: React.FC<IRegisterOfficialUserProps> = (props) => {
  const form = useForm();
  const router = useRouter();
  const params = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [registerInfo, setRegisterInfo] = useState({});

  const handleUpdateInfo = useCallback(
    (params: object) => {
      return setRegisterInfo({ ...registerInfo, ...params });
    },
    [registerInfo]
  );

  useEffect(() => {
    const step = params.get("step") as string | number;
    if (step && !isNaN(step as number)) {
      setCurrentStep((step as number) - 1);
    } else {
      setCurrentStep(0);
    }
  }, [params]);

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

export default RegisterOfficialUser;

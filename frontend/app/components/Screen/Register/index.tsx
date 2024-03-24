"use client";

import { useCallback, useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

interface IRegisterScreenProps {}

const RegisterScreen: React.FC<IRegisterScreenProps> = (props) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [cookies, setCookie] = useCookies(["draft"]);

  const handleUpdateUserInfo = useCallback(
    (params: any) => {
      setUserInfo({ ...userInfo, ...params });
      if (params?.class) {
        setCookie("draft", { ...userInfo, ...params });
        router.push("/home");
      }
    },
    [userInfo]
  );

  const steps = [
    <StepOne
      setCurrentStep={setCurrentStep}
      onUpdate={handleUpdateUserInfo}
      key={1}
    />,
    <StepTwo
      key={2}
      userInfo={userInfo}
      setCurrentStep={setCurrentStep}
      onUpdate={handleUpdateUserInfo}
    />,
  ];

  return steps[currentStep];
};

export default RegisterScreen;

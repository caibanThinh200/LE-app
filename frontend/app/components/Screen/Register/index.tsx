"use client";

import { useCallback, useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

interface IRegisterScreenProps {}

const RegisterScreen: React.FC<IRegisterScreenProps> = (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInfo, setUserInfo] = useState({});

  const handleUpdateUserInfo = useCallback(
    (params: any) => {
      setUserInfo({ ...userInfo, ...params });
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

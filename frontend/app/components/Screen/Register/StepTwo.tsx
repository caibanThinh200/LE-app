"use client";

import Image from "next/image";
import Button from "../../Button";
import Input from "../../Input";
import React, {
  Dispatch,
  SetStateAction,
  use,
  useCallback,
  useState,
} from "react";
import { useRouter } from "next/navigation";

interface IRegisterstepTwoProps {
  userInfo: any;
  onUpdate: (e: any) => void;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

const StepTwo: React.FC<IRegisterstepTwoProps> = (props) => {
  const router = useRouter();

  const handleSelectClass = useCallback(
    (grade: number) => {
      return props.onUpdate({ class: grade });
    },
    [router]
  );

  return (
    <div className="smart-edu-block h-[80%]">
      <div className="flex flex-col h-full justify-center mx-auto gap-10 max-w-[440px]">
        <h3 className="font-bold text-center">
          Chào{" "}
          <span className="text-primary-green">{props?.userInfo?.name}</span>,
          hiện tại bạn đang học ...
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Button
              onClick={() => handleSelectClass(1)}
              className="hover:text-primary-green w-full bg-ghost-white text-independence drop-shadow-md rounded-xl"
              type="primary"
            >
              👦🏻 Cấp 1
            </Button>
          </div>
          <div>
            <Button
              onClick={() => handleSelectClass(2)}
              className="hover:text-primary-green w-full bg-ghost-white text-independence drop-shadow-md rounded-xl"
              type="primary"
            >
              🧑🏻‍🦰 Cấp 2
            </Button>
          </div>
          <div>
            <Button
              onClick={() => handleSelectClass(3)}
              className="hover:text-primary-green w-full bg-ghost-white text-independence drop-shadow-md rounded-xl"
              type="primary"
            >
              👩🏻‍💼 Cấp 3
            </Button>
          </div>
          <div>
            <Button
              onClick={() => handleSelectClass(4)}
              className="hover:text-primary-green w-full bg-ghost-white text-independence drop-shadow-md rounded-xl"
              type="primary"
            >
              👨‍👩‍👧‍👦 Khác
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;

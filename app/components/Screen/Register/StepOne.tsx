"use client";

import Image from "next/image";
import Button from "../../Button";
import Input from "../../Input";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

interface IRegisterstepOneProps {
  onUpdate: (e: any) => void;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

const StepOne: React.FC<IRegisterstepOneProps> = (props) => {
  const [name, setName] = useState<string>("");
  const [submited, setSubmited] = useState(false)
  const [required, setRequired] = useState(false);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      return props.onUpdate({ name: e.target.value });
    },
    [props]
  );

  useEffect(() => {
    setRequired(submited && !name)
  }, [name, submited])

  const handleSubmit = useCallback(() => {
    setSubmited(true)
    if (!name) {
      setRequired(true)
      return;
    }
    props.setCurrentStep(1);
  }, [name, props]);

  return (
    <div className="smart-edu-block h-[80%]">
      <div className="flex flex-col h-full justify-center mx-auto gap-10 max-w-[440px]">
        <h3 className="font-bold text-center">
          👋 Xin chào, chúng tôi có thể gọi bạn là ...
        </h3>
        <div className="flex flex-col gap-5">
          <Input error={required ? {type: "required", message: "Vui lòng nhập tên của bạn"} : undefined} onChange={handleInput} placeholder="Nhập tên của bạn" />
          <Button
            onClick={handleSubmit}
            type="primary"
            className="justify-center flex gap-3"
          >
            <span>Tiếp tục</span>
            <Image
              src={"/svg/arrow-right-2.svg"}
              alt="Arrow"
              height={24}
              width={24}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepOne;

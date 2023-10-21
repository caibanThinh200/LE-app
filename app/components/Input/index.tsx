"use client";

import Image from "next/image";
import React, { HTMLProps, forwardRef, useCallback, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

interface IValidateType {
  required?: boolean | string;
}
interface IInputProps extends HTMLProps<HTMLInputElement> {
  validate?: IValidateType;
  error?: {
    type: string;
    message: string;
  } | null;
}

const Input: React.FC<IInputProps> = (props) => {
  const [value, setValue] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      return props.onChange && props.onChange(e);
    },
    [props]
  );

  return props.type === "password" ? (
    <div
      className={twMerge(
        "py-2.5 px-4 bg-white border-2 rounded-full border-plantinum flex gap-2",
        props.className
      )}
    >
      <input
        {...props}
        type={!!passwordVisible ? "text" : "password"}
        className="w-full outline-none"
      />
      <Image
        onClick={() => setPasswordVisible(!passwordVisible)}
        className="cursor-pointer"
        src="/svg/eye.svg"
        alt="Eye"
        width={20}
        height={20}
      />
    </div>
  ) : (
    <div>
      <input
        className={twMerge(
          "py-2.5 px-4 border-2 rounded-full w-full border-plantinum outline-none",
          props.className,
          props.error && "border-carmine-pink bg-linen"
        )}
        {...props}
      />
      {props.error?.message && (
        <p className="mt-2 text-carmine-pink">{props.error?.message}</p>
      )}
    </div>
  );
};

export default Input;

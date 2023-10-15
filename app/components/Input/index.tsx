import { HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

interface IInputProps extends HTMLProps<HTMLInputElement> {}

const Input: React.FC<IInputProps> = (props) => {
  return (
    <input
      className={twMerge(
        "py-2.5 px-4 rounded-lg border-2 border-plantinum",
        props.className
      )}
      {...props}
    />
  );
};

export default Input;

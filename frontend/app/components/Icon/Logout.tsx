import { HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

interface ILogoutProps extends HTMLProps<HTMLSpanElement> {}

const Logout: React.FC<ILogoutProps> = (props) => {
  return (
    <i
      {...props}
      className={twMerge(
        "fa-solid fa-arrow-right-from-bracket",
        props.className
      )}
    ></i>
  );
};

export default Logout;

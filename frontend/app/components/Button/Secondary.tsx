import { twMerge } from "tailwind-merge";
import { IButtonProps } from ".";

const SecondaryButton: React.FC<IButtonProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={twMerge(
        "py-3 px-8 rounded-full border border-primary-green text-independence bg-anti-flash-white font-bold",
        props.className
      )}
      type={props.buttonType}
    >
      {props.children}
    </button>
  );
};

export default SecondaryButton;

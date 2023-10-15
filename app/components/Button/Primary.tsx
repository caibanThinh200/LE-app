import { twMerge } from "tailwind-merge";
import { IButtonProps } from ".";

const PrimaryButton: React.FC<IButtonProps> = (props) => {
  return (
    <button
      //   {...props}
      onClick={props.onClick}
      className={twMerge(
        "py-3 px-8 bg-primary-gradient font-bold rounded-xl text-white primary-gradient",
        props.className
      )}
    >
      {props.children}
    </button>
  );
};

export default PrimaryButton;

import { twMerge } from "tailwind-merge";
import { IButtonProps } from ".";

const PrimaryButton: React.FC<IButtonProps> = (props) => {
  return (
    <button
      //   {...props}
      onClick={props.onClick}
      style={props.style}
      className={twMerge(
        "py-3 px-8 bg-primary-gradient font-bold rounded-full text-white primary-gradient hover:bg-primary-hover-gradient",
        props.className
      )}
      type={props.buttonType}
    >
      {props.children}
    </button>
  );
};

export default PrimaryButton;

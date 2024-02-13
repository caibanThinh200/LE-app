"use client";

import { HTMLProps, MouseEvent, useCallback, useMemo } from "react";
import PrimaryButton from "./Primary";
import SecondaryButton from "./Secondary";
import { useRouter } from "next/navigation";

export interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  type: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
  href?: string;
  buttonType?: "submit" | "reset" | "button"
  //   onClick?: (e: React.ChangeEvent<HTMLButtonElement>) => void;
}

interface IButtonTypes {
  [x: string]: React.FC<IButtonProps>;
}

const Button: React.FC<IButtonProps> = (props) => {
  const router = useRouter();

  const buttonTypes: IButtonTypes = useMemo(
    () => ({
      primary: PrimaryButton,
      secondary: SecondaryButton,
    }),
    []
  );

  const ButtonComponent = useMemo(
    () => buttonTypes[props.type || "primary"] || null,
    [props.type, buttonTypes]
  );

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement, MouseEvent> | any) => {
      if (props.href) {
        router.push(props.href);
      } else {
        return props.onClick && props.onClick(e as any);
      }
    },
    [router, props]
  );

  return <ButtonComponent {...props} onClick={handleClick} />;
};

export default Button;

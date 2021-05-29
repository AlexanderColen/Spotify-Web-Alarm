import React, { MouseEvent } from "react";

interface IButtonProps {
  action: (e: MouseEvent<HTMLButtonElement>) => void;
  text: string;
  disabled?: boolean;
  styleClass: string;
}

const Button: React.FC<IButtonProps> = (props: IButtonProps) => {
  return (
    <button
      className={props.styleClass}
      onClick={props.action}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export default Button;

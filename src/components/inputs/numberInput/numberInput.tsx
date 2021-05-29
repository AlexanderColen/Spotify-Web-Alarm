import React, { InputHTMLAttributes } from "react";
import "./numberInput.scss";

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const NumberInput: React.FC<NumberInputProps> = ({ name, label, ...rest }) => {
  return (
    <div className="number-input">
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} {...rest}></input>
    </div>
  );
};

export default NumberInput;

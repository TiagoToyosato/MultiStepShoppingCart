import React from "react";
import type { ButtonProps } from "../types";

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "custom",
  disabled = false,
  className = "",
  fullWidth = false,
}) => {
  const baseStyle = "px-4 py-2 rounded font-semibold transition text-center";

  const typeStyle = {
    next: "ml-auto bg-blue-600 text-white hover:bg-blue-700",
    previous: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    submit: "bg-green-600 text-white hover:bg-green-700",
    custom: "",
  };

  const disabledStyle = "bg-gray-400 text-white cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyle}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? disabledStyle : typeStyle[type]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;

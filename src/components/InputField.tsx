import React from "react";
import type { InputProps } from "../types";

const InputField: React.FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  error = false,
  errorMessage = "",
  type = "text",
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1 font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2
          ${
            error
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
      />
      {error && <p className="text-sm text-red-600 mt-1">{errorMessage}</p>}
    </div>
  );
};

export default InputField;

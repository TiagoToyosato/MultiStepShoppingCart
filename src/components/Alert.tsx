import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { AlertProps } from "../types";

const Alert: React.FC<AlertProps> = ({
  isOpen,
  title,
  message,
  onClose,
  icon,
  iconColor,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center">
        <FontAwesomeIcon icon={icon} className={`text-4xl mb-4 ${iconColor}`} />
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Alert;

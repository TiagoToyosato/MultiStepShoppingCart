import React, { useEffect, useState, useCallback } from "react";
import type { CustomerData, Action } from "../types";

interface Step2Props {
  customer: CustomerData;
  dispatch: React.Dispatch<Action>;
  onValidation: (valid: boolean) => void;
}

const Step2_CustomerInfo: React.FC<Step2Props> = ({
  customer,
  dispatch,
  onValidation,
}) => {
  const [formData, setFormData] = useState<CustomerData>(customer);
  const [errors, setErrors] = useState({
    name: false,
    address: false,
    phone: false,
  });

  const validateForm = useCallback(() => {
    const newErrors = {
      name: formData.name.trim() === "",
      address: formData.address.trim() === "",
      phone: formData.phone.trim() === "",
    };

    setErrors(newErrors);
    const isValid = !newErrors.name && !newErrors.address && !newErrors.phone;

    if (isValid) {
      dispatch({ type: "SET_CUSTOMER", payload: formData });
    }

    onValidation(isValid);
  }, [formData, dispatch, onValidation]);

  useEffect(() => {
    validateForm();
  }, [formData, validateForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 
            ${
              errors.name
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">Campo obrigatório</p>
        )}
      </div>

      <div>
        <label
          htmlFor="address"
          className="block mb-1 font-medium text-gray-700"
        >
          Morada
        </label>
        <input
          type="text"
          name="address"
          id="address"
          value={formData.address}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 
            ${
              errors.address
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
        />
        {errors.address && (
          <p className="text-sm text-red-600 mt-1">Campo obrigatório</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block mb-1 font-medium text-gray-700">
          Telemóvel
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 
            ${
              errors.phone
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
        />
        {errors.phone && (
          <p className="text-sm text-red-600 mt-1">Campo obrigatório</p>
        )}
      </div>
    </div>
  );
};

export default Step2_CustomerInfo;

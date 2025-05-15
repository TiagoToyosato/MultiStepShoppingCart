import React, { useEffect, useState, useCallback } from "react";
import InputField from "./InputField";

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
        <InputField
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          errorMessage="Campo obrigatório"
        />
      </div>

      <div>
        <InputField
          label="Morada"
          name="address"
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
          errorMessage="Campo obrigatório"
        />
      </div>

      <div>
        <InputField
          label="Telemóvel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          errorMessage="Campo obrigatório"
        />
      </div>
    </div>
  );
};

export default Step2_CustomerInfo;

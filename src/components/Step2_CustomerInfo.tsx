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
    validateForm(); // validar ao montar
  }, [validateForm]);

  useEffect(() => {
    validateForm(); // validar ao alterar campos
  }, [formData, validateForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h3>Dados do Cliente</h3>

      <div style={{ marginBottom: "10px" }}>
        <label>Nome:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <small style={{ color: "red" }}>Campo obrigatório</small>
        )}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Morada:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && (
          <small style={{ color: "red" }}>Campo obrigatório</small>
        )}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Telemóvel:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && (
          <small style={{ color: "red" }}>Campo obrigatório</small>
        )}
      </div>
    </div>
  );
};

export default Step2_CustomerInfo;

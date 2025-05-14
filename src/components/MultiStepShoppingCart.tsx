import React, { useReducer, useState } from "react";
import type { FormState, Action } from "../types";
import Step1_ProductSelection from "./Step1_ProductSelection";
import Step2_CustomerInfo from "./Step2_CustomerInfo";
import Step3_Summary from "./Step3_Summary";

const initialState: FormState = {
  step: 1,
  selectedProducts: [],
  customer: {
    name: "",
    address: "",
    phone: "",
  },
};

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREV_STEP":
      return { ...state, step: state.step - 1 };
    case "SET_CUSTOMER":
      return { ...state, customer: action.payload };
    case "ADD_PRODUCT":
      if (state.selectedProducts.find((p) => p.id === action.payload.id))
        return state;
      return {
        ...state,
        selectedProducts: [...state.selectedProducts, action.payload],
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        selectedProducts: state.selectedProducts.filter(
          (p) => p.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

const MultiStepForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isStep2Valid, setIsStep2Valid] = useState(false);

  const handleNext = () => {
    if (state.step === 1 && state.selectedProducts.length === 0) {
      alert("Selecione pelo menos um produto antes de continuar.");
      return;
    }

    if (state.step === 2) {
      if (isStep2Valid) {
        dispatch({ type: "NEXT_STEP" });
      } else {
        alert("Preencha todos os campos obrigatórios.");
      }
      return;
    }

    dispatch({ type: "NEXT_STEP" });
  };

  const handlePrevious = () => {
    dispatch({ type: "PREV_STEP" });
  };

  const handleSubmit = () => {
    // Aqui você poderia enviar para uma API real
    console.log("Dados enviados:", state);
    alert("Pedido enviado com sucesso!");
  };

  return (
    <div className="multistep-form">
      <h2>Passo {state.step} de 3</h2>

      {state.step === 1 && (
        <Step1_ProductSelection
          selectedProducts={state.selectedProducts}
          dispatch={dispatch}
        />
      )}

      {state.step === 2 && (
        <Step2_CustomerInfo
          customer={state.customer}
          dispatch={dispatch}
          onValidation={setIsStep2Valid}
        />
      )}

      {state.step === 3 && (
        <Step3_Summary
          customer={state.customer}
          products={state.selectedProducts}
        />
      )}

      {/* Botões de navegação */}
      <div style={{ marginTop: "20px" }}>
        {state.step > 1 && (
          <button onClick={handlePrevious} style={{ marginRight: "10px" }}>
            Anterior
          </button>
        )}
        {state.step < 3 && <button onClick={handleNext}>Seguinte</button>}
        {state.step === 3 && <button onClick={handleSubmit}>Submeter</button>}
      </div>
    </div>
  );
};

export default MultiStepForm;

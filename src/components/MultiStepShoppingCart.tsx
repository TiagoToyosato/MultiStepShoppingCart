import React, { useReducer, useState } from "react";
import Step1_ProductSelection from "./Step1_ProductSelection";
import Step2_CustomerInfo from "./Step2_CustomerInfo";
import Step3_Summary from "./Step3_Summary";
import StepProgress from "./StepProgress";
import type { FormState, Action } from "../types";

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
    console.log("Dados enviados:", state);
    alert("Pedido enviado com sucesso!");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow-md rounded-xl">
      <StepProgress
        currentStep={state.step}
        steps={["Produtos", "Cliente", "Resumo"]}
      />

      {/* Conteúdo dos steps */}
      <div className="mb-6">
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
      </div>

      {/* Botões de navegação */}
      <div className="flex justify-between">
        {state.step > 1 && (
          <button
            onClick={handlePrevious}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Anterior
          </button>
        )}

        {state.step < 3 && (
          <button
            onClick={handleNext}
            className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Seguinte
          </button>
        )}

        {state.step === 3 && (
          <button
            onClick={handleSubmit}
            className="ml-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Submeter
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;

import React, { useReducer, useState } from "react";
import Step1_ProductSelection from "./Step1_ProductSelection";
import Step2_CustomerInfo from "./Step2_CustomerInfo";
import Step3_Summary from "./Step3_Summary";
import StepProgress from "./StepProgress";
import Alert from "./Alert";
import Button from "./Button";
import type { FormState, Action } from "../types";
import {
  faCheckCircle,
  faExclamationTriangle,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

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
  const [alertOpen, setAlertOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [icon, setIcon] = useState(faExclamationTriangle);
  const [iconColor, seticonColor] = useState("");

  const showAlert = (
    title: string,
    message: string,
    icon: IconDefinition,
    iconColor: string
  ) => {
    setTitle(title);
    setAlertMessage(message);
    seticonColor(iconColor);
    setIcon(icon);
    setAlertOpen(true);
  };

  const handleNext = () => {
    if (state.step === 1 && state.selectedProducts.length === 0) {
      showAlert(
        "Aviso",
        "Selecione pelo menos um produto antes de continuar!",
        faExclamationTriangle,
        "text-yellow-500"
      );
      return;
    }

    if (state.step === 2) {
      if (isStep2Valid) {
        dispatch({ type: "NEXT_STEP" });
      } else {
        showAlert(
          "Aviso",
          "Preencha todos os campos obrigatórios!",
          faExclamationTriangle,
          "text-yellow-500"
        );
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
    showAlert(
      "Sucesso",
      "Seu pedido foi enviado!",
      faCheckCircle,
      "text-green-500"
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow-md rounded-xl">
      <StepProgress
        currentStep={state.step}
        steps={["Produtos", "Cliente", "Resumo"]}
      />

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

      <div className="flex justify-between">
        {state.step > 1 && (
          <Button onClick={handlePrevious} type="previous">
            Anterior
          </Button>
        )}

        {state.step < 3 && (
          <Button onClick={handleNext} type="next">
            Seguinte
          </Button>
        )}

        {state.step === 3 && (
          <Button onClick={handleSubmit} type="submit">
            Submeter
          </Button>
        )}
      </div>

      <Alert
        isOpen={alertOpen}
        title={title}
        message={alertMessage}
        iconColor={iconColor}
        icon={icon}
        onClose={() => setAlertOpen(false)}
      />
    </div>
  );
};

export default MultiStepForm;

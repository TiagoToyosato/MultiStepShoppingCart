import React, { useReducer, useState } from "react";
import Step1_ProductSelection from "../steps/Step1_ProductSelection";
import Step2_CustomerInfo from "../steps/Step2_CustomerInfo";
import Step3_Summary from "../steps/Step3_Summary";
import StepProgress from "./StepProgress";
import Alert from "./Alert";
import Button from "./Button";
import {
  customerFormReducer,
  initialState,
} from "../reducers/customerFormReducer";
import {
  faCheckCircle,
  faExclamationTriangle,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

const MultiStepForm: React.FC = () => {
  const [state, dispatch] = useReducer(customerFormReducer, initialState);
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
    setTimeout(() => {
      dispatch({ type: "RESET" });
    }, 1000); // tempo para o usuário ver o modal
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow-md rounded-xl">
      <p className="text-center text-sm text-gray-500 mb-4">
        Produtos selecionados: {state.selectedProducts.length}
      </p>

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

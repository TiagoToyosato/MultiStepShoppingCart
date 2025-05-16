import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// Estado global do formulário multistep
export interface FormState {
    step: number;
    selectedProducts: Product[];
    customer: CustomerData;
    orderDelivered: boolean;
}

// Representa um produto retornado pela API
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
}
  
  // Dados inseridos pelo usuário no formulário
export interface CustomerData {
    name: string;
    address: string;
    phone: string;
}

// Ações que o reducer pode executar
export type Action =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_CUSTOMER'; payload: CustomerData }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'REMOVE_PRODUCT'; payload: number }
  | { type: 'RESET' };

export interface StepProgressProps {
      currentStep: number;
      steps: string[];
}
    
// Propriedades do Input
export interface InputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    errorMessage?: string;
    type?: string;
    placeholder?: string;
    className?: string;
}

// Propriedades do modal de alerta
export interface AlertProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  type?: "success" | "warning";
  icon: IconDefinition;
  iconColor: string;
}

// Propriedades do botão
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "next" | "previous" | "submit" | "custom";
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}
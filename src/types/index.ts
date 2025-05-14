// Estado global do formulário multistep
export interface FormState {
    step: number;
    selectedProducts: Product[];
    customer: CustomerData;
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
  | { type: 'REMOVE_PRODUCT'; payload: number }; // ID do produto
import type { FormState, Action } from '../types';

export const initialState: FormState = {
  step: 1,
  selectedProducts: [],
  customer: {
    name: '',
    address: '',
    phone: '',
  },
};

export function customerFormReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 };
    case 'PREV_STEP':
      return { ...state, step: state.step - 1 };
    case 'SET_CUSTOMER':
      return { ...state, customer: action.payload };
    case 'ADD_PRODUCT':
      if (state.selectedProducts.find(p => p.id === action.payload.id)) return state;
      return { ...state, selectedProducts: [...state.selectedProducts, action.payload] };
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        selectedProducts: state.selectedProducts.filter(p => p.id !== action.payload),
          };
          case 'RESET':
            return initialState;
          
    default:
      return state;
  }
}

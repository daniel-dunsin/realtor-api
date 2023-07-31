import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IHandlersSlice } from '../../interfaces/store.interface';

const initialState: IHandlersSlice = {
  confirmationModal: {
    text: '',
    subtitle: '',
    isOpen: false,
    confirm: () => {},
  },
};

const handlersSlice = createSlice({
  name: 'handlersSlice',
  initialState,
  reducers: {
    openConfirmationModal: (
      state: IHandlersSlice,
      action: PayloadAction<{
        text: string;
        subtitle?: string;
        confirm(): void;
      }>
    ) => {
      state.confirmationModal.isOpen = true;
      state.confirmationModal.text = action.payload.text;
      state.confirmationModal.subtitle = action.payload.subtitle || '';
      state.confirmationModal.confirm = action.payload.confirm;
    },
    closeConfirmationModal: (state: IHandlersSlice) => {
      state.confirmationModal.isOpen = false;
      state.confirmationModal.text = '';
      state.confirmationModal.subtitle = '';
      state.confirmationModal.confirm = () => {};
    },
  },
});

export const handlersReducer = handlersSlice.reducer;
export const { openConfirmationModal, closeConfirmationModal } =
  handlersSlice.actions;

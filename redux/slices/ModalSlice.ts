"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: ModalState;
};

type ModalState = {
  isOpen: boolean;
  modalName: string;
};

const initialState = {
  value: {
    isOpen: false,
    modalName: "",
  } as ModalState,
} as InitialState;

export const modal = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    onOpen: (state, action) => {
      return {
        value: {
          isOpen: true,
          modalName: action.payload,
        },
      };
    },
    onClose: () => {
      return {
        value: {
          isOpen: false,
          modalName: initialState.value.modalName,
        },
      };
    },
  },
});

export const { onClose, onOpen } = modal.actions;
export default modal.reducer;

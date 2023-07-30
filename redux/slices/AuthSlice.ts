"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  id: string;
  authenticated: boolean;
};

const initialState = {
  value: {
    id: "",
    authenticated: false,
  } as AuthState,
} as InitialState;

export const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logIn: (state, action) => {
      return {
        value: {
          id: action.payload,
          authenticated: true,
        },
      };
    },
    logOut: () => {
      return initialState;
    },
  },
});

export const { logIn, logOut } = AuthSlice.actions;
export default AuthSlice.reducer;

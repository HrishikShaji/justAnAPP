"use client";

import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./slices/apiSlice";

export function APIiProvider({ children }: { children: React.ReactNode }) {
  return <ApiProvider api={apiSlice}>{children}</ApiProvider>;
}

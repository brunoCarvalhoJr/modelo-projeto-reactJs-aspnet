import { createContext } from "react";

export const initialState = {
  map: null,
};

export const Context = createContext(initialState);

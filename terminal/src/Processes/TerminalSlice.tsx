import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IServices, ITerminal } from "./types";

const initialState: ITerminal = {
  ticket_number: 0,
  language: "",
  juraServices: [],
  physicServices: [],
};

export const terminalSlice = createSlice({
  name: "terminal",
  initialState,
  reducers: {
    setJuraServices(state, action: PayloadAction<IServices[]>) {
      state.juraServices = action.payload;
    },
    setPhysicServices(state, action: PayloadAction<IServices[]>) {
      state.physicServices = action.payload;
    },
    setTicketNumber(state, action: PayloadAction<number>) {
      state.ticket_number = action.payload;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
  },
});

export default terminalSlice.reducer;

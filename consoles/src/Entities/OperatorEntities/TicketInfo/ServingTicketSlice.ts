import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICurrentTicket, ServingTicket } from "./types";

const initialState: ServingTicket = {
  servingTicket: {
    id: 0,
    service: {
      name: "",
    },
    ticket_number: "",
  },
};

export const servingTicketSlice = createSlice({
  name: "servingTicketSlice",
  initialState,
  reducers: {
    setServingTicket(state, action: PayloadAction<ICurrentTicket>) {
      state.servingTicket = action.payload;
    },
  },
});

export default servingTicketSlice.reducer;

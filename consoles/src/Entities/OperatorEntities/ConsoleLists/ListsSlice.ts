import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITicketWait, Queues } from "./types";

const initialState: Queues = {
  tickets: [],
  ticketsInWaitingList: [],
};

export const listsSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    setWaitingTickets(state, action: PayloadAction<ITicketWait[]>) {
      state.tickets = action.payload;
    },
    setTicketsInWaitingList(
      state,
      action: PayloadAction<ITicketWait[]>
    ) {
      state.ticketsInWaitingList = action.payload;
    },
  },
});

export default listsSlice.reducer;

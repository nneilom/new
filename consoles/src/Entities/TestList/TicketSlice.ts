import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITicket, TicketState } from "./types";

const initialState: TicketState = {
  // TikcetState - типизация объекта
  ticketsInServe: [],
  ticketsInQueue: [],
  isLoading: false,
  error: "",
};

// классический сценарий обработки данных

// ticketsInServe - массив с объектами, объекты содержат данные о талоне(данные талоны обслуживаются в данный момент)

// ticketsInQueue - массив с объектами, объекты содержат данные о талоне(данные талоны не обслуживаются в данный момент)

// isLoading - флажок, который предотвращает загрузку страницы до тех пор, пока не прогрузятся данные с сервера

// error - ошибка, которая высветится на экране, в случае неудачного запроса

export const ticketSlice = createSlice({
  name: "tickets", // просто название слайса, как я понял, ни на что пока что не влияет, но быть должен
  initialState, // объект который мы объявли выше, базовые состояния
  reducers: {
    // редюсеры - грубо говоря фунцкии, в привычном useReducer можно было увидеть switch-case
    fetchingTickets(state) {
      state.isLoading = true;
    },
    ticketsInServeSuccess(state, action: PayloadAction<ITicket[]>) {
      state.isLoading = false;
      state.error = "";
      state.ticketsInServe = action.payload;
    },
    ticketsInQueueSuccess(state, action: PayloadAction<ITicket[]>) {
      state.isLoading = false;
      state.error = "";
      state.ticketsInQueue = action.payload;
    },
    fetchingTicketsError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default ticketSlice.reducer;

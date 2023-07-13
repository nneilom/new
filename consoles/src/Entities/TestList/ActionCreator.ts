import axios from "axios";
import { AppDispatch } from "../../Shared/store/rootStore";
import { ITicket } from "./types";
import { ticketSlice } from "./TicketSlice";
import { baseAPI } from "../../Shared/store/api/baseURL";

export const fetchTicketsInServe = () => async (dispatch: AppDispatch) => {
  try {
    // при начале запроса используем функцию с флажком(isLoading), чтобы данные страница не прогружалась до тех пор, пока запрос не вернет результат
    dispatch(ticketSlice.actions.fetchingTickets());
    const response = await axios.get<ITicket[]>(
      `${baseAPI}/talon/queueoperators/`
    );
    console.log(response.data);
    // при успешном запросе, закидываем response в ticketsInServe
    dispatch(ticketSlice.actions.ticketsInServeSuccess(response.data));
  } catch (error: any) {
    // при неудачном запросе закидываем причину ошибки в error стейт, которая потом образится на экране пользователя
    dispatch(
      ticketSlice.actions.fetchingTicketsError("looks like there is no tickets")
    );
  }
};

export const fetchTicketsInQueue = () => async (dispatch: AppDispatch) => {
  try {
    // при начале запроса используем функцию с флажком(isLoading), чтобы данные страница не прогружалась до тех пор, пока запрос не вернет результат
    dispatch(ticketSlice.actions.fetchingTickets());
    const response = await axios.get<ITicket[]>(`${baseAPI}/talon/queue/`);
    // при успешном запросе, закидываем response в ticketsInQueu

    dispatch(ticketSlice.actions.ticketsInQueueSuccess(response.data));
  } catch (error: any) {
    // при неудачном запросе закидываем причину ошибки в error стейт, которая потом образится на экране пользователя
    dispatch(
      ticketSlice.actions.fetchingTicketsError("looks like there is no tickets")
    );
  }
};

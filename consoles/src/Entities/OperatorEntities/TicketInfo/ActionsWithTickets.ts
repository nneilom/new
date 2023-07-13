import axios from "axios";
import { servingTicketSlice } from "./ServingTicketSlice";
import { fetchTicketsInWaitingList } from "../ConsoleLists/FetchLists";
import { operatorListSlice } from "./OperatorListSlice";
import { AppDispatch } from "../../../Shared/store/rootStore";
import { baseAPI } from "../../../Shared/store/api/baseURL";

//! Функция для принятия определенного талона с очереди(не берет автоматом следующий талон, а тот талон, который был выбран, кликнут)

export const takeTicket =
  (ticket_id: number) => async (dispatch: AppDispatch) => {
    try {
      const item: any = localStorage.getItem("responseData");
      const tokens = JSON.parse(item);
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };

      const response = await axios.post(
        `${baseAPI}/queue/call_ticket/${ticket_id}/`,
        {},
        config
      );

      dispatch(fetchTicketsInWaitingList());
      dispatch(getTicketData());

      console.log(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

export const takeNextTicket = () => async (dispatch: AppDispatch) => {
  try {
    const item: any = localStorage.getItem("responseData");
    const tokens = JSON.parse(item);
    const access = tokens.access;

    const Authorization = `Bearer ${access}`;
    const config = {
      headers: {
        Authorization,
      },
    };

    const response = await axios.post(
      `${baseAPI}/queue/call_operator/`,
      {},
      config
    );

    dispatch(fetchTicketsInWaitingList());
    dispatch(getTicketData());

    console.log(response.data);
  } catch (error: any) {
    console.log(error);
  }
};

export const completeTicket = () => async (dispatch: AppDispatch) => {
  try {
    const item: any = localStorage.getItem("responseData");
    const tokens = JSON.parse(item);

    const Authorization = `Bearer ${tokens.access}`;
    const config = {
      headers: {
        Authorization,
      },
    };
    const response = await axios.post(
      `${baseAPI}/queue/tickets/complete/`,
      {},
      config
    );
    dispatch(getTicketData());

    console.log(response.data);
  } catch (error: any) {
    console.log(error.message);
  }
};

export const cancelTicket = () => async (dispatch: AppDispatch) => {
  try {
    const item: any = localStorage.getItem("responseData");
    const tokens = JSON.parse(item);

    const Authorization = `Bearer ${tokens.access}`;
    const config = {
      headers: {
        Authorization,
      },
    };
    const response = await axios.post(
      `${baseAPI}/queue/tickets/move_implied/`,
      {},
      config
    );
    dispatch(getTicketData());

    console.log(response.data);
  } catch (error: any) {
    console.log(error.message);
  }
};
export const ticketToEndOfQueue =
  () => async (dispatch: AppDispatch) => {
    try {
      const item: any = localStorage.getItem("responseData");
      const tokens = JSON.parse(item);

      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const response = await axios.post(
        `${baseAPI}/queue/ticket/move_to_end/`,
        {},
        config
      );
      dispatch(getTicketData());

      console.log(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

export const recallTicket = async () => {
  try {
    const item: any = localStorage.getItem("responseData");
    const tokens = JSON.parse(item);

    const Authorization = `Bearer ${tokens.access}`;
    const config = {
      headers: {
        Authorization,
      },
    };
    const response = await axios.post(
      `${baseAPI}/queue/recall_ticket/`,
      {},
      config
    );
    console.log(response.data);
  } catch (error: any) {
    console.log(error.message);
  }
};

export const ticketToWaitingList =
  () => async (dispatch: AppDispatch) => {
    try {
      const item: any = localStorage.getItem("responseData");
      const tokens = JSON.parse(item);

      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const response = await axios.post(
        `${baseAPI}/queue/defer_ticket/`,
        {},
        config
      );
      dispatch(getTicketData());

      console.log(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

export const operatorsListInBranch =
  () => async (dispatch: AppDispatch) => {
    try {
      const item: any = localStorage.getItem("responseData");
      const tokens = JSON.parse(item);

      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const response = await axios.get(
        `${baseAPI}/queue/operators/status_branch/`,
        config
      );

      console.log(response.data);

      dispatch(
        operatorListSlice.actions.setOperatorList(response.data)
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };

export const ticketToAnotherOperator =
  (
    ticket: number,
    operator: number,
    is_available: boolean,
    ticket_status: string
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const item: any = localStorage.getItem("responseData");
      const tokens = JSON.parse(item);

      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };

      const transfer = new FormData();

      transfer.append("operator_id", operator.toString());
      transfer.append("ticket_id", ticket.toString());

      if (!is_available) return;
      if (ticket_status !== "Available") return;

      const response = await axios.post(
        `${baseAPI}/queue/transfer-ticket/`,
        transfer,
        config
      );

      dispatch(getTicketData());
      console.log(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

export const getTicketData = () => async (dispatch: AppDispatch) => {
  try {
    const item: any = localStorage.getItem("responseData");
    const tokens = JSON.parse(item);

    const Authorization = `Bearer ${tokens.access}`;
    const config = {
      headers: {
        Authorization,
      },
    };
    const response = await axios.get(
      `${baseAPI}/queue/tickets/called_authorization/`,
      config
    );
    dispatch(
      servingTicketSlice.actions.setServingTicket(response.data[0])
    );
  } catch (error: any) {
    console.log(error.message);
  }
};

export const setVipPriority =
  (ticket_id: number, priority: string) =>
  async (dispatch: AppDispatch) => {
    try {
      if (priority.toLowerCase() === "standard") {
        const item: any = localStorage.getItem("responseData");
        const tokens = JSON.parse(item);

        const Authorization = `Bearer ${tokens.access}`;
        const config = {
          headers: {
            Authorization,
          },
        };
        const is_veteran = new FormData();
        const bool = true;
        is_veteran.append("is_veteran", bool.toString());

        const response = await axios.post(
          `${baseAPI}/queue/tickets/${ticket_id}/set_veteran_priority/`,
          is_veteran,
          config
        );
        dispatch(fetchTicketsInWaitingList());

        console.log(response.data);
      } else {
        const item: any = localStorage.getItem("responseData");
        const tokens = JSON.parse(item);

        const Authorization = `Bearer ${tokens.access}`;
        const config = {
          headers: {
            Authorization,
          },
        };
        const is_veteran = new FormData();
        const bool = false;
        is_veteran.append("is_veteran", bool.toString());

        const response = await axios.post(
          `${baseAPI}/queue/tickets/${ticket_id}/set_veteran_priority/`,
          is_veteran,
          config
        );
        dispatch(fetchTicketsInWaitingList());

        console.log(response.data);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

import axios from "axios";
import { listsSlice } from "./ListsSlice";
import { AppDispatch } from "../../../Shared/store/rootStore";
import { baseAPI } from "../../../Shared/store/api/baseURL";

export const getOperatorsList = async (setOperatorID: any) => {
  const response = await axios.get(
    "https://34.28.165.38/ru/operators/operator_list/"
  );

  const item: any = localStorage.getItem("responseData");
  const tokens = JSON.parse(item);

  const myUser = response.data.operators.filter(
    (oper: any) => oper.user.email === tokens?.user.email
  );

  const myID = myUser[0].id;
  // const myBranchID = myUser[0].branch_id;

  setOperatorID(myID);
  // setBranch(myBranchID);
};

export const fetchWebSocketList =
  (operatorID: number) => (dispatch: AppDispatch) => {
    if (operatorID === 0) return;
    const ws = new WebSocket(
      `wss://34.28.165.38/ws/tickets/${operatorID}/`
    );
    ws.onopen = () => {
      // Подписка на обновления талонов
      ws.send(
        JSON.stringify({
          action: "list",
          operator_id: operatorID,
          request_id: new Date().getTime(),
        })
      );
    };

    ws.onmessage = function (event) {
      const data: any = JSON.parse(event.data);

      if (data.action === "list" || data.type === "ticket.update") {
        dispatch(listsSlice.actions.setWaitingTickets(data?.data));
      }
    };
  };

export const fetchTicketsInWaitingList =
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
        `${baseAPI}/queue/tickets/postponed/`,
        config
      );
      console.log(response.data);
      dispatch(
        listsSlice.actions.setTicketsInWaitingList(response.data)
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };

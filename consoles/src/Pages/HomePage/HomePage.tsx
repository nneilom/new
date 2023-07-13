import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [operatorID, setOperatorID] = useState<number>(0);
  const [branch, setBranch] = useState<number>(0);
  const [data, setData] = useState<object[]>([]);

  const getOperators = async () => {
    const response = await axios.get(
      "https://34.28.165.38/ru/operators/operator_list/"
    );

    const item: any = localStorage.getItem("responseData");
    const tokens = JSON.parse(item);

    const myUser = response.data.operators.filter(
      (oper: any) => oper.user.email === tokens?.user.email
    );

    const myID = myUser[0].id;
    const myBranchID = myUser[0].branch_id;

    setOperatorID(myID);
    setBranch(myBranchID);
  };

  useEffect(() => {
    getOperators();
  }, []);

  useEffect(() => {
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
      const data = JSON.parse(event.data);

      if (data.action === "list" || data.type === "ticket.update") {
        setData(data?.data);
      }
    };
  }, [operatorID]);

  const ticketsFromMyBranch = () => {
    const filted = data?.filter(
      (obj: any) => obj.branch_id === branch
    );
    return filted;
  };

  // const isWaiting = () => {
  //   const isWaitingTickets = ticketsFromMyBranch()?.filter(
  //     (obj: any) => {
  //       obj.status === "waiting";
  //     }
  //   );
  //   console.log(isWaitingTickets)
  //   return isWaitingTickets;
  // };

  return (
    <div className="ticket-list">
      {ticketsFromMyBranch()?.map((ticket: any) => (
        <div key={ticket.id}>{ticket.ticket_number}</div>
      ))}
    </div>
  );
};

export default HomePage;

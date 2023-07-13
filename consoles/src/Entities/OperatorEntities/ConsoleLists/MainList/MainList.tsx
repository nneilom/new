import { useEffect, useState } from "react";
import "./MainList.scss";
import {
  setVipPriority,
  takeTicket,
} from "../../TicketInfo/ActionsWithTickets";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../Shared/store/hooks";
import { fetchWebSocketList, getOperatorsList } from "../FetchLists";
const MainList = () => {
  const dispatch = useAppDispatch();
  const [operatorID, setOperatorID] = useState<number>(0);
  const { tickets } = useAppSelector((state) => state.listsReducer);

  useEffect(() => {
    getOperatorsList(setOperatorID);
  }, []);

  useEffect(() => {
    dispatch(fetchWebSocketList(operatorID));
  }, [operatorID]);

  return (
    <div className="mainLists">
      <div className="mainLists__header">
        <span>№</span>
        <span>Талон</span>
        <span>Услуга</span>
        <span>Статус</span>
        <span>Время ожидания</span>
        <span>Принять</span>
      </div>
      <div className="mainLists__tickets_wrapper">
        {tickets?.map((ticket: any, index: any) => (
          <div
            key={ticket.id}
            className={
              index % 2
                ? "mainLists__item_even"
                : "mainLists__item_odd"
            }
          >
            <span>{index + 1}</span>
            <span>{ticket.ticket_number}</span>
            <span className="item__service">
              {ticket.service_title}
            </span>
            {ticket.priority.toLowerCase() === "priority" ? (
              <div>
                <div className="item__status-priority"></div>
              </div>
            ) : ticket.priority.toLowerCase() === "vip" ? (
              <div>
                <div
                  onClick={() =>
                    dispatch(
                      setVipPriority(ticket.id, ticket.priority)
                    )
                  }
                  className="item__status-vip"
                ></div>
              </div>
            ) : (
              <div>
                <div
                  onClick={() =>
                    dispatch(
                      setVipPriority(ticket.id, ticket.priority)
                    )
                  }
                  className="item__status-standard"
                ></div>
              </div>
            )}

            <div>
              <div className="item__time-long">25 мин.</div>
            </div>

            <button onClick={() => dispatch(takeTicket(ticket.id))}>
              Принять
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainList;

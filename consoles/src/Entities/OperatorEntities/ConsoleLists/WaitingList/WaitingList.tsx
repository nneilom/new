import { useEffect } from "react";
import "./WaitingList.scss";
import { fetchTicketsInWaitingList } from "../FetchLists";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../Shared/store/hooks";
import { takeTicket } from "../../TicketInfo/ActionsWithTickets";

const WaitingList = () => {
  const dispatch = useAppDispatch();
  const { ticketsInWaitingList } = useAppSelector(
    (state) => state.listsReducer
  );

  useEffect(() => {
    dispatch(fetchTicketsInWaitingList());
  }, []);
  return (
    <div className="waitingList">
      <div className="waitingList__header">
        <span>№</span>
        <span>Талон</span>
        <span>Услуга</span>
        <span>Статус</span>
        <span>Время ожидания</span>
        <span>Принять</span>
      </div>
      <div className="waitingList__tickets_wrapper">
        {ticketsInWaitingList.map((ticket: any, index: any) => (
          <div
            key={ticket.id}
            className={
              index % 2
                ? "waitingList__item_even"
                : "waitingList__item_odd"
            }
          >
            <span>{index + 1}</span>
            <span>{ticket.ticket_number}</span>
            <span className="item__service">
              {ticket.service.name}
            </span>
            {ticket.status ? (
              <div>
                <div className="item__status-true"></div>
              </div>
            ) : (
              <div>
                <div className="item__status-false"></div>
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

export default WaitingList;

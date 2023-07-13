import { useEffect, useState } from "react";
import {
  cancelTicket,
  completeTicket,
  getTicketData,
  recallTicket,
  takeNextTicket,
  ticketToEndOfQueue,
  ticketToWaitingList,
} from "./ActionsWithTickets";
import "./TicketInfo.scss";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../Shared/store/hooks";
import DropList from "../../../Shared/UI/DropList/DropList";

const TicketInfo = () => {
  const [dropList, setDropList] = useState<boolean>(false);
  const [min, setMin] = useState<number>(0);
  const [sec, setSec] = useState<number>(0);

  const dispatch = useAppDispatch();

  const { servingTicket } = useAppSelector(
    (state) => state.servingTicketReducer
  );

  const { operatorList } = useAppSelector(
    (state) => state.operatorListReducer
  );

  useEffect(() => {
    dispatch(getTicketData());
  }, []);

  return (
    <div className="ticketInfo">
      <div className="ticketInfo__header">
        {servingTicket?.ticket_number ? (
          <>
            <div className="ticketInfo__ticketNumber">
              <h4>Текущий талон: {servingTicket?.ticket_number}</h4>
            </div>
            <div className="ticketInfo__service">
              Услуга: <span>{servingTicket?.service.name}</span>
            </div>
          </>
        ) : (
          <div className="ticketInfo__warning">
            Вы не обслуживаете талон
          </div>
        )}
        <div className="ticketInfo__time_header">
          <span>Время</span>
          <div className="ticketInfo__time">
            <div className="serving__time">
              Обслуживание:
              <div>
                {min}:{sec}
              </div>
            </div>
            <div className="serving__time-standard">
              Норма:
              <div>5:00</div>
            </div>
          </div>
        </div>
      </div>

      <div className="ticketInfo__client_actions">
        <div className="client__callTicket_action">
          <span>Вызов Посетителей</span>
          <button onClick={() => dispatch(takeNextTicket())}>
            Следующий талон
          </button>
        </div>
        <div className="client__actionsWithTicket">
          <span>Действие с вызванным посетителем</span>
          <div className="client__actionsWithTicket_wrapper">
            <button
              className="toTheEndOfList__action"
              onClick={() => dispatch(ticketToEndOfQueue())}
            >
              Перенести в конец очереди
            </button>
            <div className="transferToAnotherOperator__action">
              <button onClick={() => setDropList(!dropList)}>
                Перевести
              </button>
              {dropList ? (
                <DropList operatorList={operatorList} />
              ) : null}
            </div>
            <button onClick={recallTicket}>Объявить повторно</button>
            <button
              className="toTheWaitingList__action"
              onClick={() => dispatch(ticketToWaitingList())}
            >
              Отправить в лист ожидания
            </button>
            <button
              className="impliedTicket__action"
              onClick={() => dispatch(cancelTicket())}
            >
              Отклонить талон
            </button>
            <button
              className="completeTicket__action"
              onClick={() => dispatch(completeTicket())}
            >
              Завершить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketInfo;

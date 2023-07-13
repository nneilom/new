import { useEffect, useState } from "react";
import "./TicketsHistory.scss";
import {
  useGetOperatorsListQuery,
  useGetTicketsForMutation,
} from "../../RegistratorQuery";
import { BsSearch } from "react-icons/bs";
import Calendar from "../../../../Shared/UI/Calendar/Calendar";
import { useAppSelector } from "../../../../Shared/store/hooks";

const TicketsHistory = () => {
  const [getTicketsFor, { data: tickets }] =
    useGetTicketsForMutation();
  const { data: operators } = useGetOperatorsListQuery("");
  const { currentDate } = useAppSelector(
    (state) => state.dateReducer
  );

  const [calendar, setCalendar] = useState<boolean>(false);
  const [selectedOperator, setSelectedOperator] =
    useState<string>("");

  const getTickets = () => {
    const date = new FormData();
    date.append(
      "date",
      `${currentDate.year}-${currentDate.month}-${currentDate.day}`
    );
    getTicketsFor(date);
  };

  useEffect(() => {
    getTickets();
  }, [currentDate]);

  return (
    <div className="ticketsHistory">
      <div className="ticketsHistory__list">
        <div className="ticketHistory__header">
          <h2>Список талонов</h2>
          <div className="ticketHistory__calendar">
            <div className="ticketHistory__date">
              Выберите дату:{" "}
              <div onClick={() => setCalendar(!calendar)}>
                {currentDate.year}-{currentDate.month}-
                {currentDate.day}
              </div>
            </div>
            <div className="ticketHistory__calendar__wrapper">
              {calendar ? <Calendar /> : null}
            </div>
          </div>
          <div className="ticketHistory__search">
            <div className="search__wrapper">
              <input type="text" placeholder="Поиск" />
              <BsSearch />
            </div>
          </div>
        </div>
        <div className="ticketsHistory__list_headers">
          <div>
            <span>№</span>
            <span>Талон</span>
          </div>
          <span>Услуга</span>
          <span>Статус</span>
        </div>
        <div></div>
        <div className="ticketHistory__list_wrapper">
          {tickets ? (
            tickets?.map((ticket: any, index: any) => (
              <div
                key={ticket.id}
                className={
                  index % 2
                    ? "ticketsHistory__item_even"
                    : "ticketsHistory__item_odd"
                }
              >
                <div className="ticket__indexNumber">
                  <span className="ticket__index">{index + 1}</span>
                  <span className="ticket__number">
                    {ticket.ticket_info}
                  </span>
                </div>
                <span className="ticket__service">
                  {ticket.service}
                </span>
                {ticket.status === "served" ? (
                  <button className="ticket__served">Завершён</button>
                ) : (
                  <button className="ticket__implied">Неявка</button>
                )}
              </div>
            ))
          ) : (
            <div className="ticketHistory__list_warning">
              Нет обслуженных талонов на этот день
            </div>
          )}
        </div>
      </div>
      {/* {[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]} */}
      <div className="ticketsHistory__operatorsList">
        <div>
          <div className="ticketHistory__header">
            <h2>Список операторов</h2>
          </div>
          <div className="ticketsHistory__operatorsList_headers">
            <div>
              <span>№</span>
              <span>ФИО</span>
            </div>
            <div>
              <span>Номер окна</span>
              <span>Талон</span>
            </div>
          </div>
          {operators?.operators.map((operator: any, index: any) => (
            <div
              onClick={() => {
                {
                  selectedOperator === operator.id
                    ? setSelectedOperator("")
                    : setSelectedOperator(operator.id);
                }

                console.log(selectedOperator);
              }}
              key={operator.id}
              className={
                index % 2
                  ? `ticketsHistory__item_even-op`
                  : `ticketsHistory__item_odd-op`
              }
              style={
                operator.id === selectedOperator
                  ? { backgroundColor: "#C6C6FF" }
                  : {}
              }
            >
              <div className="ticket__indexNumber">
                <span className="ticket__index">{index + 1}</span>
                <span className="ticket__number">
                  {operator?.user.first_name}{" "}
                  {operator?.user.last_name[0]}
                </span>
              </div>
              <div className="ticket__indexNumber">
                <span className="ticket__service">
                  {operator?.user.window_number}
                </span>
                <span className="ticket__number">1</span>
              </div>
            </div>
          ))}
        </div>

        <div className="operators__actions">
          <button
            className={
              selectedOperator
                ? "implied_enabled"
                : "implied_disabled"
            }
          >
            Отклонить талон
          </button>
          <button
            className={
              selectedOperator
                ? "complete_enabled"
                : "complete_disabled"
            }
          >
            Завершить
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketsHistory;

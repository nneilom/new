import { useGetReservedTicketsListQuery } from "../../RegistratorQuery";
import "./ReservedTicketsList.scss";
import TextField from "@mui/material/TextField";

const ReservedTicketsList = () => {
  const { data: tickets } = useGetReservedTicketsListQuery("");
  return (
    <div className="reservedTickets">
      <div className="reservedTickets__list">
        <div className="reservedTickets__header">
          <h2>Предварительная запись</h2>
        </div>
        <div className="reservedTickets__list_headers">
          <div>
            <span>№</span>
            <span>Ключ</span>
          </div>
          <span>Услуга</span>
          <span>Время</span>
        </div>
        {tickets?.map((ticket: any, index: any) => (
          <div
            key={ticket.id}
            className={
              index % 2
                ? "reservedTickets__item_even"
                : "reservedTickets__item_odd"
            }
          >
            <div className="register__indexNumber">
              <span>{index + 1}</span>
              <span className="register__code">
                {ticket.activation_code}
              </span>
            </div>
            <span className="register__service">
              {ticket.service}
            </span>
            <button className="register__served">
              {ticket.service_time}
            </button>
          </div>
        ))}
      </div>
      {/* {[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]} */}
      <div>
        <div className="reservedTickets__selected-register">
          {tickets?.map((ticket: any) => (
            <div
              className="selected-register_wrapper"
              key={ticket.id}
            >
              <div className="reservedTickets__header">
                <h2>Запись на {ticket.service_time}</h2>
              </div>
              <div className="reservedTickets__selected-register_headers">
                <span>
                  Ключ:
                  <b>{ticket.activation_code}</b>
                </span>
                <span>
                  Услуга: <b>{ticket.service}</b>
                </span>
                <span>
                  Время: <b>{ticket.service_time}</b>
                </span>
              </div>
              <div className="inputs">
                <TextField
                  style={{ width: "100%", margin: "10px 0" }}
                  label="additional info"
                />
                <TextField
                  style={{ width: "100%", margin: "10px 0" }}
                  label="additional info"
                />
              </div>
            </div>
          ))}

          <div className="register__edit">
            <button className="">Редактировать</button>
          </div>
        </div>
        <div className="register__create">
          <button>Создать Запись</button>
        </div>
      </div>
    </div>
  );
};

export default ReservedTicketsList;

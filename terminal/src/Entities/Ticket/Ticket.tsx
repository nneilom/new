import { useAppSelector } from "../../Shared/hooks";
import "./Ticket.scss";
import { AiOutlineArrowDown } from "react-icons/ai";

const Ticket = () => {
  const { ticket_number } = useAppSelector(
    (state) => state.terminalReducer
  );
  return (
    <div className="ticket">
      <h4>Ваш номер:</h4>
      <h2>{ticket_number}</h2>
      <AiOutlineArrowDown className="ticket__arrow" />
    </div>
  );
};

export default Ticket;

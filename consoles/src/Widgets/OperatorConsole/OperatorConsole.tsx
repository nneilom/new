import { Outlet } from "react-router";
import "./OperatorConsole.scss";
import TicketInfo from "../../Entities/OperatorEntities/TicketInfo/TicketInfo";
import OperatorNavbar from "../../Entities/OperatorEntities/OperatorNavbar/OperatorNavbar";

const OperatorConsole = () => {
  return (
    <div className="operatorConsole">
      <OperatorNavbar />
      <div className="operatorConsole__wrapper">
        <Outlet />
        <TicketInfo />
      </div>
    </div>
  );
};

export default OperatorConsole;

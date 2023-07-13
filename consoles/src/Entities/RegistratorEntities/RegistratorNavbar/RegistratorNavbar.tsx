import { useState, useEffect } from "react";
import "./RegistratorNavbar.scss";
import { BsPeople } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router";

const OperatorNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [reservedTickets, setReservedTickets] = useState<string>("");
  const [ticketsHistory, setTicketsHistory] = useState<string>("");
  const [employees, setEmployees] = useState<string>("");

  const onList = () => {
    if (location.pathname === "/registrator-page/reserved-tickets") {
      setTicketsHistory("");
      setEmployees("");
      setReservedTickets("registratorNavbar__onList");
    } else if (location.pathname === "/registrator-page/tickets-history") {
      setEmployees("");
      setReservedTickets("");
      setTicketsHistory("registratorNavbar__onList");
    } else if (location.pathname === "/registrator-page/employees-list") {
      setReservedTickets("");
      setTicketsHistory("");
      setEmployees("registratorNavbar__onList");
    } else {
      return null;
    }
  };

  useEffect(() => {
    onList();
  }, [location.pathname]);

  return (
    <div className="registratorNavbar">
      <div className="registratorNavbar__lists">
        <button
          className={ticketsHistory}
          onClick={() => navigate("tickets-history")}
        >
          <CiViewList />
          Талоны
        </button>
        <button
          className={reservedTickets}
          onClick={() => navigate("reserved-tickets")}
        >
          <BsPeople />
          Предварительная запись
        </button>
        <button
          className={employees}
          onClick={() => navigate("employees-list")}
        >
          <CiViewList />
          Сотрудники
        </button>
      </div>
    </div>
  );
};

export default OperatorNavbar;

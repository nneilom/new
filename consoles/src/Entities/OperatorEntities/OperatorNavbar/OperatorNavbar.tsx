import { useState, useEffect } from "react";
import "./OperatorNavbar.scss";
import { BsPeople } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router";
import { useAppSelector } from "../../../Shared/store/hooks";

const OperatorNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mainList, setMainList] = useState<string>("");
  const [waitList, setWaitList] = useState<string>("");

  const { tickets } = useAppSelector((state) => state.listsReducer);

  const onList = () => {
    if (location.pathname === "/operator-page/main-list") {
      setWaitList("");
      setMainList("operatorNavbar__onList");
    } else if (location.pathname === "/operator-page/waiting-list") {
      setMainList("");
      setWaitList("operatorNavbar__onList");
    } else {
      return null;
    }
  };

  const getStardardTickets = () => {
    const standards = tickets.filter(
      (ticket: any) => ticket.priority === "STANDARD"
    );
    return standards.length;
  };

  const getPriorityTickets = () => {
    const standards = tickets.filter(
      (ticket: any) => ticket.priority === "PRIORITY"
    );
    return standards.length;
  };

  useEffect(() => {
    onList();
  }, [location.pathname]);

  return (
    <div className="operatorNavbar">
      <div className="operatorNavbar__lists">
        <button
          className={mainList}
          onClick={() => navigate("main-list")}
        >
          <BsPeople />
          Основная очередь
        </button>
        <button
          className={waitList}
          onClick={() => navigate("waiting-list")}
        >
          <CiViewList />
          Лист ожидания
        </button>
      </div>
      <div className="operatorNavbar__ticket_counter">
        <div className="tickets__priority">
          <div></div>
          <h5>Приоритеный: {getPriorityTickets()}</h5>
        </div>
        <div className="tickets__standard">
          <div></div>
          <h5>В очереди: {getStardardTickets()}</h5>
        </div>
        <div className="tickets__common">
          <h5>Всего: {tickets.length}</h5>
        </div>
      </div>
    </div>
  );
};

export default OperatorNavbar;

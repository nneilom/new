import logo from "../../Shared/assets/rsk-logo.svg";
import Ticket from "../../Entities/Ticket/Ticket";
import "./ShowTicketPage.scss";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const ShowTicketPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate("/"), 5000);
  }, []);
  return (
    <div className="showTicketPage">
      <div className="showTicketPage__header">
        <img src={logo} alt="logo" />
      </div>
      <div className="showTicketPage__wrapper">
        <h2>Возьмите ваш талон</h2>
        <Ticket />
        <h3>Ждите вызова на табло</h3>
      </div>
    </div>
  );
};

export default ShowTicketPage;

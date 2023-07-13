import logo from "../Shared/assets/rsk-logo.svg";
import classes from "./monitorStyles.module.scss";

import { useEffect, useState } from "react";
import CurrentTime from "../Entities/CurrentTime";
import BannerComponent from "../Entities/BannerComponent";
import CurrentDate from "../Entities/CurrentData";

const App = () => {
  const [parsedTickets, setParsedTickets] = useState([]);

  useEffect(() => {
    const tickets = localStorage.getItem("ticketsCalledFromQueue");
    const parsedTickets = tickets ? JSON.parse(tickets) : [];
    setParsedTickets(parsedTickets);
  }, []);

  useEffect(() => {
    const handleStorageChange = (event: any) => {
      if (event.key === "ticketsCalledFromQueue") {
        const tickets = event.newValue;
        const parsedTickets = tickets ? JSON.parse(tickets) : [];
        setParsedTickets(parsedTickets);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  useEffect(() => {
    console.log(parsedTickets);
  }, [parsedTickets]);

  const showTickets = () => {
    {
      return (
        parsedTickets &&
        parsedTickets.map(
          (
            ticket: {
              id: number;
              ticket_number: string;
              operator?: { window_number: string };
            },
            index: number
          ) => (
            <div
              key={ticket.id}
              className={`${classes.queueColumn} ${
                index % 2 === 0
                  ? classes.whiteBackground
                  : classes.grayBackground
              }`}
            >
              <div className={classes.client}>
                <div>{ticket.ticket_number}</div>
              </div>
              <div className={classes.window}>
                <div>{ticket.operator?.window_number}</div>
              </div>
            </div>
          )
        )
      );
    }
  };
  return (
    <div className={classes.monitorContainer}>
      <div className={classes.header}>
        <img src={logo} alt="" />
        <div className={classes.dataContainer}>
          <span>
            <CurrentTime />
          </span>
          <span>
            <CurrentDate />
          </span>
        </div>
      </div>
      <div className={classes.body}>
        <div className={classes.queue}>
          <div className={classes.queueBox}>
            <div className={classes.textQueue}>
              <span>Клиент</span>
              <span>Окно</span>
            </div>
            {showTickets()}
          </div>
        </div>
        <div className={classes.bannerContainer}>
          <BannerComponent />
        </div>
      </div>
    </div>
  );
};

export default App;

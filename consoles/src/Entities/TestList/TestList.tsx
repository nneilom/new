import {
  ChangeEvent,
  ChangeEventHandler,
  EventHandler,
  useEffect,
} from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../Shared/store/hooks";
import {
  fetchTicketsInQueue,
  fetchTicketsInServe,
} from "./ActionCreator";
import "./TestList.scss";
import { useState } from "react";
import axios from "axios";

const TestList = () => {
  // типизированный диспач, который помогает взаимодействовать реакту и редаксу
  // const dispatch = useAppDispatch();

  //достали состояния из initialState в TicketSlice.ts

  //isLoading - флаг, который не прогружает страницу до тех пор, пока не придет ответ с сервера

  // ticketsInServe - талоны в обслуживании

  // ticketsInServe - талоны в очереди, не обслуживаются на данный момент

  // error - в случае ошибки, на экране высвятится какая-нибудь надпись

  // const { isLoading, ticketsInServe, ticketsInQueue, error } =
  //   useAppSelector((state: any) => state.ticketReducer);

  // закинули функции в useEffect, чтобы фунции отработали один раз при переходе на страницу, функции должны стянуть талоны с бд

  // useEffect(() => {
  //   dispatch(fetchTicketsInServe());
  //   dispatch(fetchTicketsInQueue());
  // }, []);

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [conf, setConf] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [userLog, setUserLog] = useState<string>("");
  const [passLog, setPassLog] = useState<string>("");

  const register = async () => {
    let newClient = new FormData();
    newClient.append("first_name", name);
    newClient.append("last_name", lastName);
    newClient.append("birth_year", birth);
    newClient.append("email", email);
    newClient.append("password", pass);
    newClient.append("password_confirm", conf);
    newClient.append("username", username);

    const response = await axios.post(
      "http://34.28.165.38/ru/client/register/",
      newClient
    );
    console.log(response);
  };

  const loginFunc = async () => {
    let login = new FormData();
    login.append("username", userLog);
    login.append("password", passLog);

    const response = await axios.post(
      "http://34.28.165.38/ru/client/login/",
      login
    );
    console.log(response);
  };

  return (
    <div>
      {/* {isLoading && <p>loading...</p>}
      {error && <p>{error}</p>}
      {ticketsInServe.map((ticket: any) => (
        <p key={ticket.id}>{ticket.number}</p>
      ))}
      {ticketsInQueue.map((ticket: any) => (
        <b key={ticket.id}>{ticket.id}</b>
      ))} */}
      <div className="testDiv">
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          type="text"
          placeholder="name"
        />
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLastName(e.target.value)
          }
          type="text"
          placeholder="last name"
        />
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBirth(e.target.value)
          }
          type="text"
          placeholder="date of birth"
        />
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          type="text"
          placeholder="email"
        />
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPass(e.target.value)
          }
          type="text"
          placeholder="pass"
        />
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConf(e.target.value)
          }
          type="text"
          placeholder="confirm"
        />
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          type="text"
          placeholder="username"
        />
        <button onClick={register}>Register</button>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserLog(e.target.value)
          }
          type="text"
          placeholder="username"
        />
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassLog(e.target.value)
          }
          type="text"
          placeholder="password"
        />
        <button onClick={loginFunc}>log in</button>
      </div>
    </div>
  );
};

export default TestList;

import "./PreEntryPage.scss";
import logo from "../../Shared/assets/rsk-logo.svg";
import { LuDelete } from "react-icons/lu";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const PreEntryPage = () => {
  const keyboard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const [code, setCode] = useState<string>("");
  const navigate = useNavigate();

  const setDigit = (digit: string) => {
    setCode(code.length < 4 ? code.concat(digit) : code);
  };

  const deleteDigit = () => {
    setCode(code.substring(0, code.length - 1));
  };

  const getTicket = async () => {
    let ticket = new FormData();
    ticket.append("activation_code", code);
    ticket.append("service_id", 1);

    const response = await axios.post(
      "http://34.28.165.38/ru/queue/queue/generate_ticket_priority/",
      ticket
    );
    console.log(response);
  };

  return (
    <div className="preEntry">
      <div className="preEntry__header">
        <img src={logo} alt="logo" />
      </div>
      <div className="preEntry__wrapper">
        <h2>Введите активационный код</h2>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCode(e.target.value)
          }
          defaultValue={code}
          type="text"
        />
        <div className="keyboard">
          <div className="keyboard__wrapper">
            {keyboard.map((key) => (
              <div
                onClick={() => setDigit(String(key))}
                key={key}
                className="key"
              >
                {key}
              </div>
            ))}
            <LuDelete onClick={deleteDigit} className="delete__key" />
          </div>
        </div>
        <div className="preEntry__pointers">
          <span onClick={() => navigate("/")}>
            <AiOutlineArrowLeft />
            Назад
          </span>
          <span onClick={getTicket}>
            Далее
            <AiOutlineArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PreEntryPage;

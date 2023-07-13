import "./LockScreenPage.scss";
import { useState } from "react";
import { baseAPI } from "../../Shared/api/baseURL";
import { useNavigate } from "react-router";
import axios from "axios";

const LockScreenPage = () => {
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const identifyTerminal = async () => {
    const pass = new FormData();
    pass.append("terminal_id", password);
    const response = await axios.post(
      `${baseAPI}/equipment/terminals_info/`,
      pass
    );
    localStorage.setItem("key", JSON.stringify(response.data));
  };

  return (
    <div className="lockScreen">
      <h1>Введите пароль</h1>
      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <button
        onClick={() => {
          identifyTerminal();
          navigate("/");
        }}
      >
        Разблокировать терминал
      </button>
    </div>
  );
};

export default LockScreenPage;

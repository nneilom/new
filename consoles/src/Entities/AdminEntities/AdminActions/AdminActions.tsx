import { useState, useEffect } from "react";
import "./AdminActions.scss";
import { BsPeople } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router";

const AdminAction = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [addOperator, setAddOperator] = useState<string>("");
  const [registrators, setRegistrators] = useState<string>("");
  const [createQueue, setCreateQueue] = useState<string>("");

  const onList = () => {
    if (location.pathname === "/admin-page/add-operator") {
      setAddOperator("");
      setRegistrators("");
      setCreateQueue("adminActionBottom__onList");
    } else if (location.pathname === "/admin-page/registrator-list") {
      setAddOperator("");
      setCreateQueue("");
      setRegistrators("adminActionBottom__onList");
    } else if (location.pathname === "/admin-page/operator-list") {
      setAddOperator("");
      setRegistrators("");
      setCreateQueue("adminActionBottom__onList");
    } else if (location.pathname === "/admin-page/add-employ") {
      setAddOperator("");
      setRegistrators("");
      setCreateQueue("adminActionBottom__onList");
    } else {
      return null;
    }
  };

  useEffect(() => {
    onList();
  }, [location.pathname]);

  return (
    <div className="adminActionBottom">
      <div className="adminActionBottom_lists">
        <button
          className={addOperator}
          onClick={() => navigate("add-registrator")}
        >
          <BsPeople />
          Добавить Регистратора
        </button>
        <button
          className={registrators}
          onClick={() => navigate("add-operator")}
        >
          <BsPeople />
          Добавить Оператора
        </button>
        <button
          className={createQueue}
          onClick={() => navigate("create-queue")}
        >
          <CiViewList />
          Добавить очередь
        </button>
        <button className={createQueue} onClick={() => navigate("add-employ")}>
          <CiViewList />
          Добавить сотрудника
        </button>
      </div>
    </div>
  );
};

export default AdminAction;

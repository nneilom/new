import { useState, useEffect } from "react";
import "./AdminNavbar.scss";

import { CiViewList } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [registrators, setRegistrators] = useState<string>("");
  const [operators, setOperators] = useState<string>("");

  const onList = () => {
    if (location.pathname === "/admin-page/registrator-list") {
      setOperators("");
      setRegistrators("radminNavbar__onList");
    } else if (location.pathname === "/admin-page/operator-list") {
      setRegistrators("");
      setOperators("adminNavbar__onList");
    } else {
      return null;
    }
  };

  useEffect(() => {
    onList();
  }, [location.pathname]);

  return (
    <div className="adminNavbar">
      <div className="adminNavbar__lists">
        <button
          className={registrators}
          onClick={() => navigate("operator-list")}
        >
          <CiViewList />
          Список операторов
        </button>
        <button
          className={operators}
          onClick={() => navigate("registrator-list")}
        >
          <CiViewList />
          Список регистраторов
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;

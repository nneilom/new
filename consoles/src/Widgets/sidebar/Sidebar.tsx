import "./Sidebar.scss";
import { BsPeople, BsHouse } from "react-icons/bs";
import { MdOutlineEventNote } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { AppDispatch } from "../../Shared/store/rootStore";
import { useDispatch } from "react-redux";
import { logOut } from "../../Entities/Auth/ActionAuthCreator";

const Sidebar = () => {
  const storage: any = localStorage.getItem("responseData");
  const parsed = JSON.parse(storage);
  const user = parsed.user;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const [profile, setProfile] = useState<string>("");
  const [console, setConsole] = useState<string>("");
  const [admin, setAdmin] = useState<string>("");
  const [chat, setChat] = useState<string>("");
  const [form, setForm] = useState<string>("");

  const onPage = () => {
    if (pathname === "/") {
      setConsole("");
      setChat("");
      setForm("");
      setAdmin("");
      setProfile("isActive");
    } else if (pathname === "/operator-page") {
      setChat("");
      setForm("");
      setAdmin("");
      setProfile("");
      setConsole("isActive");
    } else if (pathname === "/forms") {
      setConsole("");
      setChat("");
      setAdmin("");
      setProfile("");
      setForm("isActive");
    } else if (pathname === "/chat") {
      setConsole("");
      setForm("");
      setAdmin("");
      setProfile("");
      setChat("isActive");
    } else if (pathname === "/admin-page") {
      setConsole("");
      setChat("");
      setForm("");
      setProfile("");
      setAdmin("isActive");
    }
  };

  useEffect(() => {
    onPage();
  }, [pathname]);

  return (
    <div className="sidebar">
      <div className="sidebar__wrapper">
        <div className="sidebar__icons_top">
          <div
            className={`${profile} nonActive`}
            onClick={() => {
              navigate("/");
            }}
          >
            <BsHouse />
          </div>
          <div
            className={`${console} nonActive`}
            onClick={() => {
              {
                user.access_level === "operator"
                  ? navigate("/operator-page")
                  : user.access_level === "registrar"
                  ? navigate("/operator-page")
                  : user.access_level === "administrator"
                  ? navigate("/operator-page")
                  : null;
              }
            }}
          >
            <BsPeople />
          </div>
          <div
            className={`${form} nonActive`}
            onClick={() => {
              navigate("/forms");
            }}
          >
            <MdOutlineEventNote />
          </div>
          <div
            className={`${chat} nonActive`} 
            onClick={() => {
              navigate("/chat");
            }}
          >
            <IoChatbubblesOutline />
          </div>
          {user.access_level === "administrator" ? (
            <div
              className={`${admin} nonActive`}
              onClick={() => {
                navigate("/employees");
              }}
            >
              <AiOutlineUserAdd />
            </div>
          ) : null}
        </div>
        <div
          className="sidebar__icons_bottom"
          onClick={() => {
            dispatch(logOut());
            navigate("/auth-page");
          }}
        >
          <FiLogOut />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

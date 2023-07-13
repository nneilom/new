import { Outlet } from "react-router";
import RegistratorNavbar from "../../Entities/RegistratorEntities/RegistratorNavbar/RegistratorNavbar";
import "./RegistratorConsole.scss";

const RegistratorConsole = () => {
  return (
    <div className="registratorConsole">
      <RegistratorNavbar />
      <Outlet />
    </div>
  );
};

export default RegistratorConsole;

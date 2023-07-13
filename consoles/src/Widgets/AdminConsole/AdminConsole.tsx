import { Outlet } from "react-router";
import AdminActions from "../../Entities/AdminEntities/AdminActions/AdminActions";
import AdminNavbar from "../../Entities/AdminEntities/AdminNavbar/AdminNavbar";
import "./AdminConsole.scss";

const AdminConsole = () => {
  return (
    <div className="adminConsole">
      <AdminNavbar />
      <div className="adminConsole__wrapper">
        <AdminActions />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminConsole;

import { Outlet } from "react-router";
import "./EmployeesPage.scss";

const EmployeesPage = () => {
  return (
    <div className="employeesPage">
      <Outlet />
    </div>
  );
};

export default EmployeesPage;

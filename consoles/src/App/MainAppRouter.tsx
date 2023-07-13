import { Routes, Route, Navigate, useLocation } from "react-router";
import HomePage from "../Pages/HomePage/HomePage";
import AdminPage from "../Pages/AdminPage/AdminPage";
import RegistratorPage from "../Pages/RegistratorPage/RegistratorPage";
import OperatorPage from "../Pages/OperatorPage/OperatorPage";
import AuthPage from "../Pages/AuthPage/AuthPage";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import ResetPassword from "../Pages/AuthPage/ResetPassword";
import TestList from "../Entities/TestList/TestList";
import ChangePasswordPage from "../Pages/AuthPage/ChangePasswordPage";
import EmployeesPage from "../Pages/EmployeesPage/EmployeesPage";
import EmployList from "../Widgets/EmployList/EmployeesList";
import RegisterPage from "../Pages/AuthPage/RegisterPage";
import MainAppLayout from "./MainAppLayout";
import WaitingList from "../Entities/OperatorEntities/ConsoleLists/WaitingList/WaitingList";
import TicketsHistory from "../Entities/RegistratorEntities/RegistratorLists/TicketsHistory/TicketsHistory";
import EmployeesList from "../Entities/RegistratorEntities/RegistratorLists/EmployeesList/EmployeesList";
import ReservedTicketsList from "../Entities/RegistratorEntities/RegistratorLists/ReservedTicketsList/ReservedTicketsList";
import MainList from "../Entities/OperatorEntities/ConsoleLists/MainList/MainList";
import EditEmploy from "../Shared/component/EditEmploy/EditEmploy";
import OperatorList from "../Entities/AdminEntities/AdminLists/operatorList/OperatorList";
import AddOperator from "../Entities/AdminEntities/Add/AddOperator";
import AddRegistrator from "../Entities/AdminEntities/Add/AddRegistrator";
import RegistratorList from "../Entities/AdminEntities/AdminLists/registratorList/RegistratorLists";
import CreateQueue from "../Entities/AdminEntities/Add/CreateQueue";
import AddEmploy from "../Entities/AdminEntities/Add/AddEmploy";
import OperatorEdit from "../Entities/AdminEntities/EditEmploys/OperatorEdit";

const MainAppRouter = () => {
  const storage: any = localStorage.getItem("responseData");

  return (
    <>
      <Routes>
        {/* //! layout with navbar, sidebar and other pages as outlet */}
        {storage === null ? (
          <Route
            index
            element={<Navigate to={"/auth-page"} replace />}
          />
        ) : (
          <Route element={<MainAppLayout />}>
            <Route path="/" element={<HomePage />} />
            {/* //! user pages */}
            <Route path="/admin-page" element={<AdminPage />}>
              {/* <Route index element={<Navigate to="" />} /> */}
              <Route
                path="operator-list"
                element={<OperatorList />}
              />
              <Route
                path="registrator-list"
                element={<RegistratorList />}
              />
              <Route path="add-operator" element={<AddOperator />} />
              <Route
                path="add-registrator"
                element={<AddRegistrator />}
              />
              <Route path="create-queue" element={<CreateQueue />} />
              <Route path="add-employ" element={<AddEmploy />} />
              <Route
                path="operator-list/edit-operator"
                element={<OperatorEdit />}
              />
            </Route>
            <Route
              path="/registrator-page"
              element={<RegistratorPage />}
            >
              <Route
                index
                element={<Navigate to="reserved-tickets" />}
              />
              <Route
                path="reserved-tickets"
                element={<ReservedTicketsList />}
              />
              <Route
                path="employees-list"
                element={<EmployeesList />}
              />
              <Route
                path="tickets-history"
                element={<TicketsHistory />}
              />
            </Route>
            <Route path="/operator-page/*" element={<OperatorPage />}>
              <Route
                index
                element={<Navigate to="main-list" replace />}
              />
              <Route path="main-list" element={<MainList />} />
              <Route path="waiting-list" element={<WaitingList />} />
            </Route>
            <Route path="/employees/*" element={<EmployeesPage />}>
              {/* //! admin page nested pages */}
              <Route index element={<Navigate to="list" replace />} />
              <Route path="list" element={<EmployList />} />
              <Route path="list/add-employ" element={<AddEmploy />} />
              <Route
                path="list/edit-employ"
                element={<EditEmploy />}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        )}
        {/* //! auth pages outside of MainAppLayout, so Sidebar component wasnt there with auth pages */}
        <Route path="/auth-page" element={<AuthPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/test-list" element={<TestList />} />
        <Route
          path="/change-password"
          element={<ChangePasswordPage />}
        />
        <Route />
      </Routes>
    </>
  );
};

export default MainAppRouter;

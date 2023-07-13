import { Navigate, Route, Routes } from "react-router";
import EntitiesPage from "../Processes/Entities/EntitiesPage";
import PreEntryPage from "../Processes/Pre-Entry/PreEntryPage";
import ShowTicketPage from "../Processes/ShowTicketPage/ShowTicketPage";
import LockScreenPage from "../Pages/LockScreenPage/LockScreenPage";
import ServicesJuraPage from "../Processes/ServicesJuraPage/ServicesJuraPage";
import ServicesPhysicPage from "../Processes/ServicesPhysicPage/ServicesPhycisPage";

const AppRouter = () => {
  const storage = localStorage.getItem("key");
  return (
    <Routes>
      {storage === null ? (
        <Route index element={<Navigate to={"lock"} replace />} />
      ) : (
        <>
          <Route path="/" element={<EntitiesPage />} />
          <Route path="/pre-entry-page" element={<PreEntryPage />} />
          <Route
            path="/services-jura-page"
            element={<ServicesJuraPage />}
          />
          <Route
            path="/services-physic-page"
            element={<ServicesPhysicPage />}
          />

          <Route
            path="/show-ticket-page"
            element={<ShowTicketPage />}
          />
        </>
      )}
      <Route path="/lock" element={<LockScreenPage />} />
    </Routes>
  );
};

export default AppRouter;

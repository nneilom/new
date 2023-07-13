import { Routes, Route } from "react-router";
import AuthPage from "../Auth/AuthPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="auth-page" element={<AuthPage />} />
    </Routes>
  );
};

export default AppRouter;

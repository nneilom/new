import { BrowserRouter } from "react-router-dom";
import MainAppRouter from "./MainAppRouter";
import "./MainApp.scss";
import { Provider } from "react-redux";
import { setupStore } from "../Shared/store/rootStore";
import { useEffect } from "react";
import refreshToken from "../Entities/Auth/ActionAuthCreator";
import { useAppDispatch } from "../Shared/store/hooks";

const store = setupStore();

const MainAppEntry = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const refreshTokenInterval = setInterval(async () => {
      await refreshToken(dispatch);
    }, 60000); // Refresh token every 1 minute

    return () => {
      clearInterval(refreshTokenInterval); // Clear the interval on component unmount
    };
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainAppRouter />
      </BrowserRouter>
    </Provider>
  );
};

export default MainAppEntry;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globalStyles.scss";
import { setupStore } from "../Shared/store/rootStore";
import { Provider } from "react-redux";
import MainAppEntry from "./MainAppEntry";

const store = setupStore();
createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <MainAppEntry />
    </Provider>
  </StrictMode>
);

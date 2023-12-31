import { combineReducers, configureStore } from "@reduxjs/toolkit";
import terminalReducer from "../Processes/TerminalSlice";
const rootReducers = combineReducers({
  terminalReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducers,
  });
};

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

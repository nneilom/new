import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import ticketReducer from "../../Entities/TestList/TicketSlice";
import authReducer from "../../Entities/Auth/AuthSlice";
import listsReducer from "../../Entities/OperatorEntities/ConsoleLists/ListsSlice";
import employRegisterSlice from "../../Entities/AdminEntities/action/EmployAction/EmploySlice";
import servingTicketReducer from "../../Entities/OperatorEntities/TicketInfo/ServingTicketSlice";
import operatorListReducer from "../../Entities/OperatorEntities/TicketInfo/OperatorListSlice";
import { registratorApi } from "../../Entities/RegistratorEntities/RegistratorQuery";
import dateReducer from "../../Entities/RegistratorEntities/RegistratorLists/TicketsHistory/DateSlice";
import adminSlice from "../../Entities/AdminEntities/action/addOperatorSlice";
import addRegistratorSlice from "../../Entities/AdminEntities/action/addRegistrator/addRegistratorSlice";
import createQueueSlice from "../../Entities/AdminEntities/action/createQueue/createQueueSlice";

const rootReducers = combineReducers({
  ticketReducer,
  authReducer,
  listsReducer,
  employRegisterSlice,
  servingTicketReducer,
  operatorListReducer,
  [registratorApi.reducerPath]: registratorApi.reducer,
  adminSlice,
  dateReducer,
  addRegistratorSlice,
  createQueueSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(registratorApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import axios from "axios";
import { terminalSlice } from "./TerminalSlice";
import { AppDispatch } from "../App/rootStore";
import { baseAPI } from "../Shared/api/baseURL";
import { IServices } from "./types";

export const generateTicketInTerminal =
  (service_id: any) => async (dispatch: AppDispatch) => {
    try {
      let service = new FormData();
      const storage: any = localStorage.getItem("key");
      const parsedStorage = JSON.parse(storage);
      const config = {
        headers: {
          xterminalid: parsedStorage.id,
        },
      };
      service.append("service_id", service_id);
      const response = await axios.post(
        `${baseAPI}/registrator/generate-ticket/`,
        service,
        config
      );
      dispatch(
        terminalSlice.actions.setTicketNumber(
          response.data.ticket_number
        )
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };

export const getJuraServices =
  () => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get<IServices[]>(
        `${baseAPI}/service/services_corporate/`
      );
      console.log(response.data);
      dispatch(terminalSlice.actions.setJuraServices(response.data));
    } catch (error) {
      console.log(error);
    }
  };

export const getPhysicServices =
  () => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get<IServices[]>(
        `${baseAPI}/service/services_individual/`
      );
      console.log(response.data);
      dispatch(
        terminalSlice.actions.setPhysicServices(response.data)
      );
    } catch (error) {
      console.log(error);
    }
  };

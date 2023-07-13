import { IEmployGetInAdminPage } from "../type";
import { AppDispatch } from "../../../../Shared/store/rootStore";
import { baseAPI } from "../../../../Shared/store/api/baseURL";

import configAxios from "../../../../config/configAxios";

import { IRegisterList, IRegistrator } from "./type";
import { addRegistratorSlice } from "./addRegistratorSlice";

export const getEmployListAll = () => async (dispatch: AppDispatch) => {
  try {
    const response = await configAxios.get<IEmployGetInAdminPage>(
      `${baseAPI}/account/users/`
    );
    console.log(response.data);
    dispatch(
      addRegistratorSlice.actions.getEmployAllListAndSave(response.data)
    );
  } catch (error: any) {
    dispatch(addRegistratorSlice.actions.getEmployrAllError(error));
  }
};

export const getRegistratorList = () => async (dispatch: AppDispatch) => {
  try {
    const response = await configAxios.get<IRegisterList>(
      `${baseAPI}/registrator/registrators/`
    );
    // console.log(response.data.map((operators) => operators.operators));
    console.log("registrator", response.data.registrators);
    const registrator = response.data.registrators;

    dispatch(addRegistratorSlice.actions.getRegistratorList(registrator));
  } catch (error) {
    dispatch(
      addRegistratorSlice.actions.fetchingRegistratorError(
        "looks like there is no branchs"
      )
    );
  }
};

export const getBranchsAll = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(addRegistratorSlice.actions.fetchingRegistrator());
    const response = await configAxios.get(`${baseAPI}/branch/branches/`);
    console.log(response.data);
    dispatch(addRegistratorSlice.actions.getBranchsSuccess(response.data));
  } catch (error) {
    dispatch(
      addRegistratorSlice.actions.fetchingRegistratorError(
        "looks like there is no branchs"
      )
    );
  }
};

export const fecthCreateRegistrator =
  (registrator: IRegistrator) => async () => {
    try {
      const response = await configAxios.post(
        `${baseAPI}/registrator/create_registrator_admin/`,
        registrator
      );
      console.log("post register", response.data);
      // Обработка успешного ответа, если необходимо
    } catch (error) {
      console.error("Ошибка при отправке POST-запроса", error);
      // Обработка ошибки
    }
  };

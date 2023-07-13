import axios from "axios";
import { IEmployGetInAdminPage, IOperator, IOperatorList } from "./type";
import { AppDispatch } from "../../../Shared/store/rootStore";
import { baseAPI } from "../../../Shared/store/api/baseURL";
import configAxios from "../../../config/configAxios";
import { adminSlice } from "./addOperatorSlice";

export const getEmployList = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get<IEmployGetInAdminPage>(
      `${baseAPI}/account/users/`
    );
    // console.log(response.data);
    dispatch(adminSlice.actions.getEmploListAndSave(response.data));
  } catch (error: any) {
    dispatch(adminSlice.actions.getEmployError(error));
  }
};

export const getOperatorList = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get<IOperatorList>(
      `${baseAPI}/account/users/`
    );
    const operators = response.data;
    // console.log("operators", operators);

    dispatch(adminSlice.actions.getOperatorList(operators));
  } catch (error) {
    dispatch(
      adminSlice.actions.fetchingOperatorError("looks like there is no branchs")
    );
  }
};

export const getBranchs = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(adminSlice.actions.fetchingOperator());
    const response = await axios.get(`${baseAPI}/branch/branches/`);
    console.log(response.data);
    dispatch(adminSlice.actions.getBranchsSuccess(response.data));
  } catch (error) {
    dispatch(
      adminSlice.actions.fetchingOperatorError("looks like there is no branchs")
    );
  }
};

export const fecthCreateOperator = (operator: IOperator) => async () => {
  try {
    const response = await configAxios.post(
      `${baseAPI}/operators/create/`,
      operator
    );
    console.log("post operator", response.data);
    // Обработка успешного ответа, если необходимо
  } catch (error) {
    console.error("Ошибка при отправке POST-запроса", error);
    // Обработка ошибки
  }
};

export const removeOperator = async (selectedId: number) => {
  try {
    const response = await configAxios.delete(
      `${baseAPI}/operators/${selectedId}/delete/`
    );
    console.log("post operator", response.data);
    // Обработка успешного ответа, если необходимо
  } catch (error) {
    console.error("Ошибка при отправке POST-запроса", error);
    // Обработка ошибки
  }
};

// export const editOperator = async (employList) => {
//   try {
//     const response = await configAxios.put(
//       `${baseAPI}/account/editing/`,
//       employList
//     );
//     // Handle the response as needed
//   } catch (error) {
//     console.log("editing: ", error);
//   }
// };

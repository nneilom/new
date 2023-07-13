import { AppDispatch } from "../../../../Shared/store/rootStore";
import { ICreateQueue } from "./type";
import { createQueueSlice } from "./createQueueSlice";
import { baseAPI } from "../../../../Shared/store/api/baseURL";
import configAxios from "../../../../config/configAxios";

export const adminCreateQueue = (queue: ICreateQueue) => async () => {
  try {
    const response = await configAxios.post(`${baseAPI}/queue/queues/`, queue);
    console.log("post queue", response);
    // Обработка успешного ответа, если необходимо
  } catch (error) {
    console.error("Ошибка при отправке POST-запроса", error);
    // Обработка ошибки
  }
};

export const getBranchsAdmin = () => async (dispatch: AppDispatch) => {
  try {
    const response = await configAxios.get(`${baseAPI}/branch/branches/`);
    console.log(response.data);
    dispatch(createQueueSlice.actions.getBranchsSuccess(response.data));
  } catch (error) {
    dispatch(
      createQueueSlice.actions.fetchingCreateQueueError(
        "looks like there is no branchs"
      )
    );
  }
};

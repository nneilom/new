import axios from "axios";
import { baseAPI } from "../../../../Shared/store/api/baseURL";
import { AppDispatch, RootState } from "../../../../Shared/store/rootStore";
import { employRegisterSlice } from "./EmploySlice";
import { IRegisterEmploy } from "./type";

export const fetchRegisterForEmploy =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const registerData: IRegisterEmploy =
        getState().employRegisterSlice.registerEmployRequest[
          getState().employRegisterSlice.registerEmployRequest.length - 1
        ];
      dispatch(
        employRegisterSlice.actions.fetchingEmployRegister(registerData)
      );
      const formData = new FormData();
      formData.append("password", registerData.password);
      formData.append("password_confirm", registerData.password_confirm);
      formData.append("last_name", registerData.last_name);
      formData.append("first_name", registerData.first_name);
      formData.append("email", registerData.email);
      console.log(formData);

      const response = await axios.post<IRegisterEmploy[]>(
        `${baseAPI}/account/register/`,
        formData
      );
      console.log(response.data);
      dispatch(
        employRegisterSlice.actions.registerIsSuccessForEmploy(response.data)
      );
    } catch (error: any) {
      dispatch(employRegisterSlice.actions.fetchingEmployRegisterError(error));
    }
  };

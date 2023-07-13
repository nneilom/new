import { baseAPI } from "../../Shared/store/api/baseURL";
import axios from "axios";
import { AppDispatch, RootState } from "../../Shared/store/rootStore";
import { authSlice } from "./AuthSlice";
import {
  IAfterResetMakeNewPassword,
  IChangePassword,
  ILogin,
  IRegister,
  IResetPassword,
} from "./type";
import configAxios from "../../config/configAxios";

export const fetchAuthLogIn =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const loginData: ILogin =
        getState().authReducer.loginRequest[
          getState().authReducer.loginRequest.length - 1
        ];
      dispatch(authSlice.actions.fetchingAuth(loginData));

      const formData = new FormData();
      formData.append("email", loginData.email);
      formData.append("password", loginData.password);
      // console.log(formData);

      const response = await axios.post<ILogin[]>(
        `${baseAPI}/account/login/`,
        formData
      );

      const responseData = response.data;
      console.log(response);
      console.log(responseData);

      localStorage.setItem("responseData", JSON.stringify(responseData));
      dispatch(authSlice.actions.logInIsSuccess(response.data));
    } catch (error: any) {
      dispatch(authSlice.actions.fetchingAuthError(error));
    }
  };

// добить дизайн и выводить ошибки

export const fetchAuthRegister =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const registerData: IRegister =
        getState().authReducer.registerRequest[
          getState().authReducer.registerRequest.length - 1
        ];
      dispatch(authSlice.actions.fetchingRegister(registerData));
      const formData = new FormData();
      formData.append("password", registerData.password);
      formData.append("password_confirm", registerData.password_confirm);
      formData.append("last_name", registerData.last_name);
      formData.append("first_name", registerData.first_name);
      formData.append("email", registerData.email);
      console.log(formData);

      const response = await axios.post<IRegister[]>(
        `${baseAPI}/account/register/`,
        formData
      );
      console.log(response.data);
      console.log(response.data);
      dispatch(authSlice.actions.registerIsSuccess(response.data));
    } catch (error: any) {
      dispatch(authSlice.actions.fetchingRegisterError(error));
    }
  };

export const resetPasswordEmail =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const resetPasswordState = getState().authReducer.resetPassword;
      if (!resetPasswordState) {
        throw new Error("Email is not defined for password reset.");
      }
      const { email } = resetPasswordState;
      const response = await axios.post<IResetPassword>(
        `${baseAPI}/account/forgot_password/`,
        { email: email }
      );
      // Здесь вы можете обрабатывать ответ от сервера, если необходимо
      console.log("Response:", response);
    } catch (error) {
      // Обработка ошибок при запросе на сервер
      console.log("Error:", error);
    }
  };

export const afterResetCreateNewPassword =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const createPassword: IAfterResetMakeNewPassword =
        getState().authReducer.resetAndNewPassword[
          getState().authReducer.resetAndNewPassword.length - 1
        ];
      dispatch(authSlice.actions.createNewPassword(createPassword));
      const formData = new FormData();
      formData.append("code", createPassword.code);
      formData.append("password", createPassword.password);
      formData.append("password_confirm", createPassword.password_confirm);
      console.log(formData);
      const response = await axios.post<IAfterResetMakeNewPassword[]>(
        `${baseAPI}/account/forgot_password_complete/`,
        formData
      );
      console.log(response.data);
      console.log(createPassword);

      dispatch(authSlice.actions.createNewPasswordIsSuccess(response.data));
    } catch (error: any) {
      dispatch(authSlice.actions.createNewPasswordError(error));
    }
  };

export const fetchChangePassword =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const changePassword: IChangePassword =
        getState().authReducer.changePassword[
          getState().authReducer.changePassword.length - 1
        ];
      dispatch(authSlice.actions.changePassword(changePassword));
      const formData = new FormData();
      formData.append("old_password", changePassword.old_password);
      formData.append("new_password", changePassword.new_password);
      formData.append(
        "new_password_confirm",
        changePassword.new_password_confirm
      );

      const response = await configAxios.post<IChangePassword[]>(
        `${baseAPI}/account/change_password/`,
        formData
      );
      // console.log(response.data);
      dispatch(authSlice.actions.changePasswordIsSuccess(response.data));
    } catch (error: any) {
      dispatch(authSlice.actions.changePasswordError(error));
    }
  };

export const logOut =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await configAxios.post(`${baseAPI}/account/logout/`);
      console.log(res);
      localStorage.removeItem("responseData");
      dispatch(authSlice.actions.logOut());
    } catch (error) {
      console.log(error);
    }
  };

// const refreshToken = async (dispatch: AppDispatch) => {
//   axios.interceptors.response.use(
//     async function (response) {
//       if (response.status === 401) {
//         try {
//           const tokens = JSON.parse(localStorage.getItem("responseData")!);
//           const refreshResponse = await configAxios.post(
//             `${baseAPI}/account/refresh/`,
//             {
//               refresh: tokens.refresh,
//               title: "Refresh token",
//             }
//           );
//           localStorage.setItem(
//             "tokens",
//             JSON.stringify({
//               access: refreshResponse.data.access,
//               refresh: tokens.refresh,
//             })
//           );
//           // console.log("Обновленный токен:", refreshResponse.data.access);
//           return axios.request(response.config);
//         } catch (error) {
//           console.log(error);
//           dispatch(logOut());
//         }
//       }
//       return response;
//     },
//     function (error) {
//       return Promise.reject(error);
//     }
//   );
// };

// export default refreshToken;

const refreshToken = async (dispatch: AppDispatch) => {
  axios.interceptors.response.use(
    async function (response) {
      if (response.status === 401) {
        try {
          const tokens = JSON.parse(localStorage.getItem("tokens")!);
          const refreshResponse = await configAxios.post(
            `${baseAPI}/account/refresh/`,
            {
              refresh_token: tokens.refresh,
              title: "Refresh token",
            }
          );
          localStorage.setItem(
            "tokens",
            JSON.stringify({
              access: refreshResponse.data.access,
              refresh: tokens.refresh,
            })
          );
          // console.log("Обновленный токен:", refreshResponse.data.access);
          return axios.request(response.config);
        } catch (error) {
          console.log(error);
          dispatch(logOut());
        }
      }
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};

export default refreshToken;

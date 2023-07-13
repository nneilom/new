import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IAfterResetMakeNewPassword,
  IChangePassword,
  ILogin,
  IRegister,
  IResetPassword,
} from "./type";

interface AuthState {
  loginRequest: ILogin[];
  registerRequest: IRegister[];
  resetAndNewPassword: IAfterResetMakeNewPassword[];
  changePassword: IChangePassword[];
  isLoading: boolean;
  success: boolean;
  error: string;
  resetPassword: IResetPassword | null;
}

const initialAuthState: AuthState = {
  loginRequest: [],
  registerRequest: [],
  resetAndNewPassword: [],
  changePassword: [],
  isLoading: false,
  success: false,
  error: "",
  resetPassword: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    //! login password
    setInputsLogIn(state, action: PayloadAction<ILogin>) {
      state.loginRequest = [...state.loginRequest, action.payload];
      state.error = "";
      // console.log("Updated loginRequest:", state.loginRequest);
    },
    logInIsSuccess(state, action: PayloadAction<ILogin[]>) {
      state.isLoading = false;
      state.error = "";
      state.success = true;
      state.loginRequest = action.payload;
    },
    fetchingAuth(state, action: PayloadAction<ILogin>) {
      state.isLoading = true;
      state.loginRequest = [action.payload];
    },
    fetchingAuthError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    //! register password
    setInputsRegister(state, action: PayloadAction<IRegister>) {
      state.registerRequest = [...state.registerRequest, action.payload];
      state.error = "";
      // console.log("Updated registerRequest:", state.registerRequest);
    },
    fetchingRegister(state, action: PayloadAction<IRegister>) {
      state.isLoading = true;
      state.registerRequest = [action.payload];
    },
    registerIsSuccess(state, action: PayloadAction<IRegister[]>) {
      state.isLoading = false;
      state.error = "";
      state.registerRequest = action.payload;
      // console.log("Updated registerRequest:", state.registerRequest);
    },
    fetchingRegisterError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    //! reset password
    setResetPasswordEmail(state, action: PayloadAction<string>) {
      state.resetPassword = { email: action.payload };
      state.error = "";
    },
    resetPasswordEmail(state, action: PayloadAction<IResetPassword>) {
      state.resetPassword = action.payload;
    },
    setMakeNewPassword(
      state,
      action: PayloadAction<IAfterResetMakeNewPassword>
    ) {
      state.resetAndNewPassword = [
        ...state.resetAndNewPassword,
        action.payload,
      ];
      state.error = ""; // Clear the error when setting new password
    },
    createNewPassword(
      state,
      action: PayloadAction<IAfterResetMakeNewPassword>
    ) {
      state.isLoading = true;
      state.resetAndNewPassword = [action.payload];
    },
    createNewPasswordIsSuccess(
      state,
      action: PayloadAction<IAfterResetMakeNewPassword[]>
    ) {
      state.isLoading = false;
      state.error = "";
      state.resetAndNewPassword = action.payload;
    },
    createNewPasswordError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    //! change password
    setChangePassword(state, action: PayloadAction<IChangePassword>) {
      state.changePassword = [...state.changePassword, action.payload];
      state.error = ""; // Clear the error when setting new password
    },
    changePassword(state, action: PayloadAction<IChangePassword>) {
      state.isLoading = true;
      state.changePassword = [action.payload];
    },
    changePasswordIsSuccess(state, action: PayloadAction<IChangePassword[]>) {
      state.isLoading = false;
      state.error = "";
      state.changePassword = action.payload;
    },
    changePasswordError(state, action: PayloadAction<boolean>) {
      state.isLoading = false;
    },
    logOut(state) {
      state.success = false;
      state.error = "";
    },
    checkAuth(state, action: PayloadAction<ILogin[]>) {
      state.loginRequest = action.payload;
    },
  },
});

export default authSlice.reducer;

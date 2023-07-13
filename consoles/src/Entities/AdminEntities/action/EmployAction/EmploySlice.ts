import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRegisterEmploy } from "./type";

interface EmployRegister {
  registerEmployRequest: IRegisterEmploy[];
  isLoading: boolean;
  success: boolean;
  error: string;
}

const initialEmployRegisterState: EmployRegister = {
  registerEmployRequest: [],
  isLoading: false,
  success: false,
  error: "",
};

export const employRegisterSlice = createSlice({
  name: "employ register",
  initialState: initialEmployRegisterState,
  reducers: {
    //! register
    setInputsEmployRegister(state, action: PayloadAction<IRegisterEmploy>) {
      state.registerEmployRequest = [
        ...state.registerEmployRequest,
        action.payload,
      ];
      state.error = "";
      // console.log("Updated registerRequest:", state.registerRequest);
    },
    fetchingEmployRegister(state, action: PayloadAction<IRegisterEmploy>) {
      state.isLoading = true;
      state.registerEmployRequest = [action.payload];
    },
    registerIsSuccessForEmploy(
      state,
      action: PayloadAction<IRegisterEmploy[]>
    ) {
      state.isLoading = false;
      state.error = "";
      state.registerEmployRequest = action.payload;
      // console.log("Updated registerRequest:", state.registerRequest);
    },
    fetchingEmployRegisterError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default employRegisterSlice.reducer;

import {
  IEmployAllGetInAdminPage,
  IRegisterList,
  ITicketForGetIdBranch,
} from "./type";
import { IRegister } from "../../../Auth/type";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface adminForRegistrator {
  employList: IEmployAllGetInAdminPage[];
  registratorAccses: IRegister[];
  branchsID: ITicketForGetIdBranch[];
  registeratorList: IRegisterList[];
  isLoading: boolean;
  success: boolean;
  error: string;
  selectedValueBranch: string | null;
  selectedValueUser: string | null;
}

const initialState: adminForRegistrator = {
  employList: [],
  registratorAccses: [],
  branchsID: [],
  registeratorList: [],
  isLoading: false,
  success: false,
  error: "",
  selectedValueBranch: null,
  selectedValueUser: null,
};

export const addRegistratorSlice = createSlice({
  name: "for registrator",
  initialState,
  reducers: {
    getEmployAllListAndSave(
      state,
      action: PayloadAction<IEmployAllGetInAdminPage>
    ) {
      state.isLoading = true;
      state.employList = [action.payload];
    },
    getEmployrAllError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getRegistratorList(state, action: PayloadAction<IRegisterList>) {
      state.isLoading = true;
      state.registeratorList = [action.payload];
    },
    fetchingRegistrator(state) {
      state.isLoading = true;
    },
    getBranchsSuccess(state, action: PayloadAction<ITicketForGetIdBranch[]>) {
      state.isLoading = false;
      state.branchsID = action.payload;
      state.error = "";
    },
    createRegistratorSuccess(state, action: PayloadAction<IRegister[]>) {
      state.isLoading = false;
      state.registratorAccses = action.payload;
      state.error = "";
    },
    fetchingRegistratorError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    selectedValueBranchIdoforRole(state, action: PayloadAction<string | null>) {
      state.selectedValueBranch = action.payload;
    },
    selectedValueQueueIdForRole(state, action: PayloadAction<string | null>) {
      state.selectedValueUser = action.payload;
    },
  },
});

export default addRegistratorSlice.reducer;

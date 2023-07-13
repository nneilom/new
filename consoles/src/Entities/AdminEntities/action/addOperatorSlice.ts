import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IEmployGetInAdminPage,
  IOperator,
  IOperatorList,
  ITicketForGetIdBranch,
} from "./type";

interface GetEmployList {
  employList: IEmployGetInAdminPage[];
  operatorAccses: IOperator[];
  branchsID: ITicketForGetIdBranch[];
  operatorList: IOperatorList[];
  isLoading: boolean;
  success: boolean;
  error: string;
  selectedValueBranch: string | null;
  selectedValueUser: string | null;
  selectedOperatorId: number;
}

const initialEmployGetState: GetEmployList = {
  employList: [],
  operatorAccses: [],
  branchsID: [],
  operatorList: [],
  isLoading: false,
  success: false,
  error: "",
  selectedValueBranch: null,
  selectedValueUser: null,
  selectedOperatorId: 0,
};

export const adminSlice = createSlice({
  name: "employ list for admin page",
  initialState: initialEmployGetState,
  reducers: {
    getEmploListAndSave(state, action: PayloadAction<IEmployGetInAdminPage>) {
      state.isLoading = true;
      state.employList = [action.payload];
    },
    getEmployError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getOperatorList(state, action: PayloadAction<IOperatorList>) {
      state.isLoading = true;
      state.operatorList = [action.payload];
    },
    fetchingOperator(state) {
      state.isLoading = true;
    },
    getBranchsSuccess(state, action: PayloadAction<ITicketForGetIdBranch[]>) {
      state.isLoading = false;
      state.branchsID = action.payload;
      state.error = "";
    },
    createOperatorSuccess(state, action: PayloadAction<IOperator[]>) {
      state.isLoading = false;
      state.operatorAccses = action.payload;
      state.error = "";
    },
    fetchingOperatorError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    selectedValueBranchIdoforRole(state, action: PayloadAction<string | null>) {
      state.selectedValueBranch = action.payload;
    },
    selectedValueQueueIdForRole(state, action: PayloadAction<string | null>) {
      state.selectedValueUser = action.payload;
    },
    selectedIdOfoperators(state, action: PayloadAction<number>) {
      state.selectedOperatorId = action.payload;
    },
    setInputsOperatorChanges(
      state,
      action: PayloadAction<IEmployGetInAdminPage>
    ) {
      state.employList = [...state.employList, action.payload];
      state.error = "";
      // console.log("Updated loginRequest:", state.loginRequest);
    },
  },
});

export default adminSlice.reducer;

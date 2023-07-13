import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICreateQueue } from "./type";
import { ITicketForGetIdBranch } from "../type";

interface AdminCreateQueue {
  queueCreate: ICreateQueue[];
  branchsID: ITicketForGetIdBranch[];
  isLoading: boolean;
  success: boolean;
  error: string;
  selectedValueBranch: string | null;
}

const initialState: AdminCreateQueue = {
  queueCreate: [],
  branchsID: [],
  isLoading: false,
  success: false,
  error: "",
  selectedValueBranch: null,
};

export const createQueueSlice = createSlice({
  name: "create queue",
  initialState,
  reducers: {
    setInputsCreateQueue(state, action: PayloadAction<ICreateQueue>) {
      state.queueCreate = [...state.queueCreate, action.payload];
      state.error = "";
      // console.log("Updated loginRequest:", state.loginRequest);
    },
    createQueueSuccess(state, action: PayloadAction<ICreateQueue[]>) {
      state.isLoading = false;
      state.error = "";
      state.success = true;
      state.queueCreate = action.payload;
    },
    getBranchsSuccess(state, action: PayloadAction<ITicketForGetIdBranch[]>) {
      state.isLoading = false;
      state.branchsID = action.payload;
      state.error = "";
    },
    crateQueue(state, action: PayloadAction<ICreateQueue[]>) {
      state.isLoading = false;
      state.queueCreate = action.payload;
      state.error = "";
    },
    fetchingCreateQueueError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    selectedValueBranchAdmin(state, action: PayloadAction<string | null>) {
      state.selectedValueBranch = action.payload;
    },
  },
});

export default createQueueSlice.reducer;

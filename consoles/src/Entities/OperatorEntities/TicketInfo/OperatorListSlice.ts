import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IOperator, OperatorList } from "./types";

export const initialState: OperatorList = {
  operatorList: [],
};

export const operatorListSlice = createSlice({
  name: "operatorList",
  initialState,
  reducers: {
    setOperatorList(state, action: PayloadAction<IOperator[]>) {
      state.operatorList = action.payload;
    },
  },
});

export default operatorListSlice.reducer;

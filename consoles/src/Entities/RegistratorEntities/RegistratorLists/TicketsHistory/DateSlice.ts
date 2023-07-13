import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDate } from "./types";
import { ICurrentDate } from "../../../../Shared/UI/Calendar/types";

const date = new Date();

const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear().toString();

const initialState: IDate = {
  currentDate: {
    day: day < 10 ? `0${day}` : String(day),
    month: month < 10 ? `0${month}` : String(month),
    year,
  },
};

export const dateSlice = createSlice({
  name: "dateSlice",
  initialState,
  reducers: {
    setCurrentDate(state, action: PayloadAction<ICurrentDate>) {
      state.currentDate = action.payload;
    },
  },
});

export default dateSlice.reducer;

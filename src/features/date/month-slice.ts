import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MonthState {
  value: { name: string; label: string; key: number; count: number }[];
  selectedValue: number;
}

const initialState: MonthState = {
  value: [
    {
      name: "January",
      label: "Jan",
      key: 1,
      count: 31,
    },
    {
      name: "February",
      label: "Feb",
      key: 2,
      count: 28,
    },
    {
      name: "March",
      label: "Mar",
      key: 3,
      count: 31,
    },
    {
      name: "April",
      label: "April",
      key: 4,
      count: 30,
    },
    {
      name: "May",
      label: "May",
      key: 5,
      count: 31,
    },
    {
      name: "June",
      label: "Jun",
      key: 6,
      count: 30,
    },
    {
      name: "July",
      label: "July",
      key: 7,
      count: 31,
    },
    {
      name: "August",
      label: "Aug",
      key: 8,
      count: 31,
    },
    {
      name: "September",
      label: "Sep",
      key: 9,
      count: 30,
    },
    {
      name: "October",
      label: "Oct",
      key: 10,
      count: 31,
    },
    {
      name: "November",
      label: "Nov",
      key: 11,
      count: 30,
    },
    {
      name: "December",
      label: "Dec",
      key: 12,
      count: 31,
    },
  ],
  selectedValue: new Date().getMonth(),
};

const monthSlice = createSlice({
  name: "month",
  initialState,
  reducers: {
    changeMonth(state, action: PayloadAction<number>) {
      state.selectedValue = action.payload;
    },
  },
});

export const { changeMonth } = monthSlice.actions;
export default monthSlice.reducer;

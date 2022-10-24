import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeekState {
  value: { key: string; value: string }[];
}

const initialState: WeekState = {
  value: [
    {
      key: "mon",
      value: "monday",
    },
    {
      key: "tues",
      value: "tuesday",
    },
    {
      key: "wed",
      value: "wednesday",
    },
    {
      key: "thu",
      value: "thursday",
    },
    {
      key: "fri",
      value: "friday",
    },
    {
      key: "sat",
      value: "saturday",
    },
    {
      key: "sun",
      value: "sunday",
    },
  ],
};

const weeksSlice = createSlice({
  name: "weeks",
  initialState,
  reducers: {},
});

export default weeksSlice.reducer;

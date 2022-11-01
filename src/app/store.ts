import { configureStore } from "@reduxjs/toolkit";
import yearReducer from "../features/date/years-slice";
import monthReducer from "../features/date/month-slice";
import weekReducer from "../features/date/weeks-slice";

export const store = configureStore({
  reducer: {
    year: yearReducer,
    month: monthReducer,
    week: weekReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

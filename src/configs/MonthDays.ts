import { Day } from "../../types";

const generateDates = (): Day[] => {
  let dates: Day[] = [];
  for (let i = 1; i < 29; i++) {
    let date: Day = { day: i };
    dates.push(date);
  }
  return dates;
};

export const monthDates: Day[] = generateDates();
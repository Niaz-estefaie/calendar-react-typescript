import React, { useState, MouseEvent, useEffect } from "react";
import { Weekday, Day } from "../../types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeMonth } from "../features/date/month-slice";
import { changeYear } from "../features/date/years-slice";

export const Calendar: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const weekdays = useAppSelector((state) => state.week.value);
  const years = useAppSelector((state) => state.year.value);
  const months = useAppSelector((state) => state.month.value);
  const selectedYear = useAppSelector((state) => state.year.selectedValue);
  const selectedMonth = useAppSelector((state) => state.month.selectedValue);

  const [selectedDate, setSelectedDate] = useState<number | null>(
    new Date().getDate()
  );
  const [stringWeekDay, setStringWeekDay] = useState<string | null>(
    new Date().toLocaleString("default", { weekday: "long" }).toLowerCase()
  );

  const [currentMonth, setCurrentMonth] = useState<
    { label: string; name: string; key: number; count: number } | undefined
  >(months.find((month) => month.key === selectedMonth));

  const onDateChange = (e: MouseEvent<HTMLElement>) => {
    const dateValue = e.currentTarget.getAttribute("value")?.split("-")[0];
    const monthValue = e.currentTarget.getAttribute("value")?.split("-")[1];
    setSelectedDate(parseInt(dateValue ? dateValue : ""));
    dispatch(changeMonth(parseInt(monthValue ? monthValue : "")));
  };

  const onMonthChange = (month: number) => {
    if (month <= 12 && month >= 1) {
      dispatch(changeMonth(month));
    } else if (month > 12) {
      dispatch(changeMonth(1));
      dispatch(changeYear(selectedYear + 1));
    } else if (month < 1) {
      dispatch(changeMonth(12));
      dispatch(changeYear(selectedYear - 1));
    }
  };

  const generateDates = (date: number, month: number) => {
    for (let i = 0; i < 7; i++) {
      return (
        <button
          className={`date ${
            date === selectedDate &&
            month === (selectedMonth ? selectedMonth : 0)
              ? "selected"
              : ""
          }`}
          onClick={onDateChange}
          value={`${date}-${month}`}
        >
          {date}
        </button>
      );
    }
  };

  const generateRange = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const generateWeeks = (dateCount: number) => {
    const dates = generateRange(1, dateCount);

    let daysInWeek = 7;
    let tempArray = [];
    for (let i = 0; i < dates.length; i += daysInWeek) {
      tempArray.push(dates.slice(i, i + daysInWeek));
    }
    return tempArray;
  };

  return (
    <div className="calendar-container">
      {months.map((month) => {
        if (month.key === selectedMonth) {
          return (
            <div key={month.key}>
              <div className="date-picker-container">
                <button onClick={() => onMonthChange(selectedMonth - 1)}>
                  previous
                </button>
                <div className="date-container">
                  <div>{selectedYear}</div>
                  <div>
                    <span>{month.label} </span>
                  </div>
                </div>
                <button onClick={() => onMonthChange(selectedMonth + 1)}>
                  next
                </button>
              </div>
              <div className="weekdays-container">
                {weekdays.map((day, index) => (
                  <div className="weekday" key={index}>
                    {day.value.charAt(0).toUpperCase()}
                    {day.value.slice(1)}
                  </div>
                ))}
              </div>
              <div className="calendar">
                {generateWeeks(month.count).map((week, index) => (
                  <div className="week" key={index}>
                    {week.map((day, i) => (
                      <span key={i}>{generateDates(day, month.key)}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

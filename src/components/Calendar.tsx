import React, { useState, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeMonth } from "../features/date/month-slice";
import { changeYear } from "../features/date/years-slice";

export const Calendar: React.FC<{}> = () => {
  const dispatch = useAppDispatch();

  const weekdays = useAppSelector((state) => state.week.value);
  const years = useAppSelector((state) => state.year.value);
  const months = useAppSelector((state) => state.month.value);
  const selectedYear: { key: number; isLeap: boolean } = useAppSelector(
    (state) => state.year.selectedValue
  );
  const selectedMonth: number = useAppSelector(
    (state) => state.month.selectedValue
  );

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
    const index = years.findIndex((year) => year.key === selectedYear.key);
    let currentYear = {
      key: selectedYear.key,
      isLeap: selectedYear.isLeap,
    };

    if (month <= 12 && month >= 1) {
      dispatch(changeMonth(month));
    } else if (month > 12) {
      dispatch(changeMonth(1));
      currentYear.key += 1;
      currentYear.isLeap = years[index + 1].isLeap;
      dispatch(changeYear(currentYear));
    } else if (month < 1) {
      dispatch(changeMonth(12));
      currentYear.key -= 1;
      currentYear.isLeap = years[index - 1].isLeap;
      dispatch(changeYear(currentYear));
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

    let dayCount = 7;
    let daysInWeek = [];
    for (let i = 0; i < dates.length; i += dayCount) {
      daysInWeek.push(dates.slice(i, i + dayCount));
    }
    return daysInWeek;
  };

  const onYearChange = (e: MouseEvent<HTMLElement>) => {
    dispatch(changeYear(e.currentTarget.value));
  };

  const generatedYears = () => (
    <select name="years" value={selectedYear.key} onChange={() => onYearChange}>
      {years.map((year, index) => (
        <option key={index} value={year.key}>
          {year.key}
        </option>
      ))}
    </select>
  );

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
                  <div>{generatedYears()}</div>
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
                {generateWeeks(
                  selectedYear.isLeap && selectedMonth === 2
                    ? month.count + 1
                    : month.count
                ).map((week, index) => (
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

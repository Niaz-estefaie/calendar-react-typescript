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
  const [selectedDate, setSelectedDate] = useState<number>(
    new Date().getDate()
  );
  const [stringWeekDay, setStringWeekDay] = useState<string>(
    new Date().toLocaleString("default", { weekday: "long" }).toLowerCase()
  );
  const [currentMonth, setCurrentMonth] = useState<
    { label: string; name: string; key: number; count: number } | undefined
  >(months.find((month) => month.key === selectedMonth));

  const generateRange = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const generateDates = (date: number, month: number) => {
    if (!!date) {
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
    }
  };

  const generateWeeks = (dateCount: number) => {
    const dates = generateRange(1, dateCount);

    configDayOfWeek(
      getDayOfWeek(selectedYear.key, selectedMonth, dates[0]),
      dates
    );

    return dates.map((item) => ({
      date: item,
      name: getDayOfWeek(selectedYear.key, selectedMonth, item),
    }));
  };

  const generatedYears = () => (
    <select
      name="years"
      value={selectedYear.key}
      onChange={(e) => onYearChange(e)}
    >
      {years.map((year, index) => (
        <option key={index} value={year.key}>
          {year.key}
        </option>
      ))}
    </select>
  );

  const getDayOfWeek = (year: number, month: number, day: number) => {
    return new Date(year, month, day)
      .toLocaleString("default", {
        weekday: "long",
      })
      .toLowerCase();
  };

  const onYearChange = (e: MouseEvent<HTMLElement>) => {
    dispatch(
      changeYear({
        key: parseInt(e.currentTarget.value),
        isLeap: selectedYear.isLeap,
      })
    );
  };

  const onDateChange = (e: MouseEvent<HTMLElement>) => {
    const dateValue = e.currentTarget.getAttribute("value")?.split("-")[0];
    const monthValue = e.currentTarget.getAttribute("value")?.split("-")[1];
    setSelectedDate(parseInt(dateValue ? dateValue : ""));
    dispatch(changeMonth(parseInt(monthValue ? monthValue : "")));
  };

  const onMonthChange = (month: number) => {
    const index = years.findIndex((year) => year.key === selectedYear.key);

    let currentYear: {
      key: number;
      isLeap: boolean;
    } = {
      key: selectedYear.key,
      isLeap: selectedYear.isLeap,
    };

    if (month <= 12 && month >= 1) {
      dispatch(changeMonth(month));
      dispatch(changeYear(currentYear));
    } else if (month > 12) {
      currentYear.key += 1;
      currentYear.isLeap = years[index + 1].isLeap;
      dispatch(changeMonth(1));
      dispatch(changeYear(currentYear));
    } else if (month < 1) {
      currentYear.key -= 1;
      currentYear.isLeap = years[index - 1].isLeap;
      dispatch(changeMonth(12));
      dispatch(changeYear(currentYear));
    }
  };

  const configDayOfWeek = (day: string, array: number[]) => {
    switch (day) {
      case "tuesday":
        array.unshift(0);
        break;
      case "wednesday":
        array.unshift(0, 0);
        break;
      case "thursday":
        array.unshift(0, 0, 0);
        break;
      case "friday":
        array.unshift(0, 0, 0, 0);
        break;
      case "saturday":
        array.unshift(0, 0, 0, 0, 0);
        break;
      case "sunday":
        array.unshift(0, 0, 0, 0, 0, 0);
        break;
    }
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
                  <div className={`weekday ${day.value}`} key={index}>
                    {day.value.charAt(0).toUpperCase()}
                    {day.value.slice(1)}
                  </div>
                ))}
              </div>
              <div className="divided-calendar">
                {generateWeeks(
                  selectedYear.isLeap && selectedMonth === 2
                    ? month.count + 1
                    : month.count
                ).map((week, index) => (
                  <div className={`individual-date ${week.name}`} key={index}>
                    {generateDates(week.date, month.key)}
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

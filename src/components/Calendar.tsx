import React, { useState, MouseEvent } from "react";
import { Weekday, Day } from "../../types";
import { Weekdays } from "../configs/WeekDays";
import { monthDates } from "../configs/MonthDays";
import { years } from "../configs/Years";

export const Calendar: React.FC<{}> = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(
    new Date().getDate()
  );
  const [selectedYear, setSelectedYear] = useState<number | null>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    new Date().getMonth()
  );

  const onDateChange = (e: MouseEvent<HTMLElement>) => {
    const buttonValue = e.currentTarget.getAttribute("value");
    setSelectedDate(parseInt(buttonValue ? buttonValue : ""));
  };

  const onMonthChange = (month: number) => {
    setSelectedMonth(month);
  };

  const onYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const generateDates = (date: number) => {
    for (let i = 0; i < 7; i++) {
      return (
        <button
          className={`date ${date === selectedDate ? "selected" : ""}`}
          onClick={onDateChange}
          value={date}
        >
          {date}
        </button>
      );
    }
  };

  const generateWeeks = (dates: Day[]) => {
    let daysInWeek = 7;
    let tempArray = [];
    for (let i = 0; i < dates.length; i += daysInWeek) {
      tempArray.push(dates.slice(i, i + daysInWeek));
    }
    return tempArray;
  };

  return (
    <div className="calendar-container">
      <div className="date-picker-container">
        <span>May 21th</span>
      </div>
      <div className="weekdays-container">
        {Weekdays.map((day) => (
          <div className="weekday" key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className="calendar">
        {generateWeeks(monthDates).map((week, index) => (
          <div className="week" key={index}>
            {week.map((day, i) => (
              <span key={i}>{generateDates(day.day)}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

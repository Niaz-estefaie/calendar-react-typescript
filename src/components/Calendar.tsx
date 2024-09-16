import React, { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeMonth } from "../features/date/month-slice";
import { changeYear } from "../features/date/years-slice";
import { RootState, WeekDayName } from "../interfaces/calendarTypes";
import '../styles/calendar.css';

export const Calendar: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isMobileOrTablet, setIsMobileOrTablet] = useState<boolean>(false);

  const weekdays = useAppSelector((state: RootState) => state.week.value);
  const years = useAppSelector((state: RootState) => state.year.value);
  const months = useAppSelector((state: RootState) => state.month.value);
  const selectedYear = useAppSelector((state: RootState) => state.year.selectedValue);
  const selectedMonth = useAppSelector((state: RootState) => state.month.selectedValue);
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateRange = (start: number, end: number): number[] =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const generateDates = (date: number, month: number) => {
    return date ? (
      <button
        className={`date ${date === selectedDate && month === selectedMonth ? "selected" : ""
          }`}
        onClick={onDateChange}
        value={`${date}-${month}`}
      >
        {date}
      </button>
    ) : null;
  };

  const generateWeeks = (dateCount: number) => {
    const dates = generateRange(1, dateCount);
    configDayOfWeek(getDayOfWeek(selectedYear.key, selectedMonth, dates[0]), dates);
    return dates.map((item) => ({
      date: item,
      name: getDayOfWeek(selectedYear.key, selectedMonth, item),
    }));
  };

  const generatedYears = () => (
    <select name="years" value={selectedYear.key} onChange={onYearChange}>
      {years.map((year, index) => (
        <option key={index} value={year.key}>
          {year.key}
        </option>
      ))}
    </select>
  );

  const getDayOfWeek = (year: number, month: number, day: number): string =>
    new Date(year, month - 1, day)
      .toLocaleString("default", { weekday: "long" })
      .toLowerCase();

  const onYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newYear = years.find((year) => year.key === parseInt(e.target.value));
    if (newYear) {
      dispatch(changeYear(newYear));
    }
  };

  const onDateChange = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.getAttribute("value");
    if (value) {
      const [dateValue, monthValue] = value.split("-");
      setSelectedDate(parseInt(dateValue, 10));
      dispatch(changeMonth(parseInt(monthValue, 10)));
    }
  };

  const onMonthChange = (month: number) => {
    const index = years.findIndex((year) => year.key === selectedYear.key);
    let currentYear = { key: selectedYear.key, isLeap: selectedYear.isLeap };

    if (month >= 1 && month <= 12) {
      dispatch(changeMonth(month));
      dispatch(changeYear(currentYear));
    } else if (month > 12) {
      currentYear = years[index + 1];
      dispatch(changeMonth(1));
      dispatch(changeYear(currentYear));
    } else if (month < 1) {
      currentYear = years[index - 1];
      dispatch(changeMonth(12));
      dispatch(changeYear(currentYear));
    }
  };

  const configDayOfWeek = (day: string, array: number[]) => {
    const unshifts: any = {
      tuesday: 1,
      wednesday: 2,
      thursday: 3,
      friday: 4,
      saturday: 5,
      sunday: 6,
    };
    array.unshift(...Array(unshifts[day] || 0).fill(0));
  };

  return (
    <div className="calendar-container">
      {months.map(
        (month) =>
          month.key === selectedMonth && (
            <div key={month.key}>
              <div className="date-picker-container">
                <button onClick={() => onMonthChange(selectedMonth - 1)}>Previous</button>
                <div className="date-container">
                  {generatedYears()}
                  <span>{month.name}</span>
                </div>
                <button onClick={() => onMonthChange(selectedMonth + 1)}>Next</button>
              </div>
              <div className="weekdays-container">
                {weekdays.map((day, index) => (
                  <div className={`weekday ${day.value}`} key={index}>
                    {(isMobileOrTablet ? day.key : day.value).charAt(0).toUpperCase()}
                    {(isMobileOrTablet ? day.key : day.value).slice(1)}
                  </div>
                ))}
              </div>
              <div className="divided-calendar">
                {generateWeeks(
                  selectedYear.isLeap && selectedMonth === 2 ? month.count + 1 : month.count
                ).map((week, index) => (
                  <div className={`individual-date ${week.name}`} key={index}>
                    {generateDates(week.date, month.key)}
                  </div>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
};

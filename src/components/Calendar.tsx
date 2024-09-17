import React, { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeMonth } from "../features/date/month-slice";
import { changeYear } from "../features/date/years-slice";
import { RootState, WeekDayName } from "../interfaces/calendarTypes";
import '../styles/calendar.css';
// import EventList from './EventList';
// import EventForm from './EventForm';

export const Calendar: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isMobileOrTablet, setIsMobileOrTablet] = useState<boolean>(false);
  const weekdays = useAppSelector((state: RootState) => state.week.value);
  const years = useAppSelector((state: RootState) => state.year.value);
  const months = useAppSelector((state: RootState) => state.month.value);
  const selectedYear = useAppSelector((state: RootState) => state.year.selectedValue);
  const selectedMonth = useAppSelector((state: RootState) => state.month.selectedValue);
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());

  const [events, setEvents] = useState<{ date: string; title: string }[]>([
    { date: "2024-09-16", title: "Meeting with Team" },
    { date: "2024-09-16", title: "Team up" },
    { date: "2024-09-18", title: "Project Deadline" },
    { date: "2024-09-20", title: "Doctor's Appointment" },
  ]);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);

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
    const eventForDay = events.filter(
      (event) =>
        event.date === `${selectedYear.key}-${String(month).padStart(2, "0")}-${String(date).padStart(2, "0")}`
    );

    console.log(eventForDay);

    return date ? (
      <div className="date-container">
        <button
          className={`date ${date === selectedDate && month === selectedMonth ? "selected" : ""}`}
          onClick={onDateChange}
          value={`${date}-${month}`}
        >
          {date}
        </button>
        <ul>
          {eventForDay.map(event => {
            return (
              <li className="event">
                <span>{event.title}</span>
              </li>
            )
          })}
        </ul>
      </div>
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

  const addEvent = (title: string, date: string) => {
    const newEvent = { id: Date.now(), title, date };
    setEvents([...events, newEvent]);
  };

  const editEvent = (id: number) => {
    const event = events.find(event => event.id === id);
    if (event) setEditingEvent(event);
  };

  const updateEvent = (title: string, date: string) => {
    setEvents(events.map(event =>
      event.id === editingEvent?.id ? { ...event, title, date } : event
    ));
    setEditingEvent(null);
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const renderWeekday = (day: { key: string; value: string }, index: number) => {
    const dayName = isMobileOrTablet ? day.key : day.value;
    return (
      <div className={`weekday ${day.value}`} key={index}>
        {dayName.charAt(0).toUpperCase() + dayName.slice(1)}
      </div>
    );
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
                {weekdays.map((day, index) => renderWeekday(day, index))}
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

      {/* {editingEvent ? (
        <EventForm
          initialTitle={editingEvent.title}
          initialDate={editingEvent.date}
          onSave={updateEvent}
        />
      ) : (
        <EventForm onSave={addEvent} />
      )} */}
    </div>
  );
};

export default Calendar;

export interface DaysToPrepend {
  [day: string]: number;
}

export interface WeekState {
  value: { key: string; value: string }[];
}

export interface MonthState {
  value: { name: string; label: string; key: number; count: number }[];
  selectedValue: number;
}

export interface YearState {
  value: { key: number; isLeap: boolean }[];
  selectedValue: { key: number; isLeap: boolean };
}

export interface Weekday {
  key: string;
  value: string;
}

export interface Year {
  key: number;
  isLeap: boolean;
}

export interface Month {
  key: number;
  name: string;
  count: number;
}

export interface RootState {
  week: {
    value: Weekday[];
  };
  year: {
    value: Year[];
    selectedValue: Year;
  };
  month: {
    value: Month[];
    selectedValue: number;
  };
}

export interface WeekDayName {
  day: number | string;
  tuesday: number | string,
  wednesday: number | string,
  thursday: number | string,
  friday: number | string,
  saturday: number | string,
  sunday: number | string,
}
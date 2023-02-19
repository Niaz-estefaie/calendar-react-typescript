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

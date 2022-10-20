const generateYears = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const currentYear: number = new Date().getFullYear();
const start: number = currentYear - 100;
const end: number = currentYear + 100;

const isLeapYear = (year: number) => {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  }
  return false;
};

const convertYearsToObject: {}[] = generateYears(start, end).map((item) => {
  return {
    key: item,
    isLeap: isLeapYear(item),
    selected: false,
  };
});

export const years: {}[] = convertYearsToObject;

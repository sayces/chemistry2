export interface MonthCalendar {
  id: string;
  month: number;
  year: number;
}

export const createMonthCalendar = (year: number, month: number): MonthCalendar => ({
  id: `${year}-${month}`,
  year,
  month,
});

export const getNextMonth = (cal: MonthCalendar): MonthCalendar => {
  const nextMonth = cal.month + 1;
  const year = nextMonth > 11 ? cal.year + 1 : cal.year;
  const month = nextMonth > 11 ? 0 : nextMonth;

  return createMonthCalendar(year, month);
};

export const getPreviousMonth = (cal: MonthCalendar): MonthCalendar => {
  const prevMonth = cal.month - 1;
  const year = prevMonth < 0 ? cal.year - 1 : cal.year;
  const month = prevMonth < 0 ? 11 : prevMonth;

  return createMonthCalendar(year, month);
};

export const getInitialMonths = (date = new Date()): MonthCalendar[] => {
  const current = createMonthCalendar(date.getFullYear(), date.getMonth());
  const next = getNextMonth(current);

  return [current, next];
};
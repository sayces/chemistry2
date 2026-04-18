import { useState, useCallback } from "react";
import {
  MonthCalendar,
  getInitialMonths,
  getNextMonth,
  getPreviousMonth,
} from "../lib/month";

interface UseCalendarMonthsReturn {
  calendars: MonthCalendar[];
  addPreviousMonth: () => void;
  addNextMonth: () => void;
}

export const useCalendarMonths = (): UseCalendarMonthsReturn => {
  const [calendars, setCalendars] = useState<MonthCalendar[]>(
    getInitialMonths
  );

  const addPreviousMonth = useCallback(() => {
    setCalendars((prev) => [getPreviousMonth(prev[0]), ...prev]);
  }, []);

  const addNextMonth = useCallback(() => {
    setCalendars((prev) => [...prev, getNextMonth(prev[prev.length - 1])]);
  }, []);

  return {
    calendars,
    addPreviousMonth,
    addNextMonth,
  };
};
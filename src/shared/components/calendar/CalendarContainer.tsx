'use client';

import { useState, useCallback, useEffect } from "react";
import { Calendar } from "@/shared/shadcn/ui/calendar";
import Container from "../container/Container";
import styles from './Calendar.module.scss';
import { ru } from "date-fns/locale";

interface MonthCalendar {
  id: string;
  month: number;
  year: number;
  selectedDate: Date | undefined;
}

const CalendarContainer = () => {
  const [calendars, setCalendars] = useState<MonthCalendar[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    setCalendars([
      {
        id: `${currentYear}-${currentMonth}`,
        month: currentMonth,
        year: currentYear,
        selectedDate: now,
      },
      {
        id: `${currentYear}-${currentMonth + 1}`,
        month: currentMonth + 1 > 11 ? 0 : currentMonth + 1,
        year: currentMonth + 1 > 11 ? currentYear + 1 : currentYear,
        selectedDate: undefined,
      },
    ]);
  }, []);

  const addPreviousMonths = useCallback(() => {
    setCalendars(prev => {
      const firstCalendar = prev[0];
      const prevMonth = firstCalendar.month - 1;
      const prevYear = prevMonth < 0 ? firstCalendar.year - 1 : firstCalendar.year;
      const adjustedMonth = prevMonth < 0 ? 11 : prevMonth;

      const newCalendar: MonthCalendar = {
        id: `${prevYear}-${adjustedMonth}`,
        month: adjustedMonth,
        year: prevYear,
        selectedDate: undefined,
      };

      return [newCalendar, ...prev];
    });
  }, []);

  const addNextMonths = useCallback(() => {
    setCalendars(prev => {
      const lastCalendar = prev[prev.length - 1];
      const nextMonth = lastCalendar.month + 1;
      const nextYear = nextMonth > 11 ? lastCalendar.year + 1 : lastCalendar.year;
      const adjustedMonth = nextMonth > 11 ? 0 : nextMonth;

      const newCalendar: MonthCalendar = {
        id: `${nextYear}-${adjustedMonth}`,
        month: adjustedMonth,
        year: nextYear,
        selectedDate: undefined,
      };

      return [...prev, newCalendar];
    });
  }, []);

  const handleDateSelect = (id: string, date: Date | undefined) => {
    setCalendars(prev =>
      prev.map(cal =>
        cal.id === id ? { ...cal, selectedDate: date } : cal
      )
    );
  };

  if (!mounted || calendars.length === 0) {
    return (
      <Container variant="default">
        <div className={styles.calendarsWrapper}>
          <div style={{ height: '20rem' }} />
        </div>
      </Container>
    );
  }

  return (
    <Container variant="default">
      <div className={styles.calendarsWrapper}>
        <button
          type="button"
          className={styles.navButton}
          onClick={addPreviousMonths}
        >
          ← Предыдущие месяца
        </button>

        <div className={styles.monthCalendars}>
          {calendars.map(cal => (
            <div key={cal.id} className={styles.calendar}>
              <Calendar
                mode="single"
                selected={cal.selectedDate}
                onSelect={(date) => handleDateSelect(cal.id, date)}
                defaultMonth={new Date(cal.year, cal.month)}
                captionLayout="label"
                locale={ru}
                className="w-full backdrop-blur-xs bg-transparent relative"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className={styles.navButton}
          onClick={addNextMonths}
        >
          Следующие месяца →
        </button>
      </div>
    </Container>
  );
};

export default CalendarContainer;

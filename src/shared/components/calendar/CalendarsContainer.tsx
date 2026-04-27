"use client";

import React, { useRef, useEffect } from "react";
import { Calendar } from "@/shared/shadcn/ui/calendar";
import styles from "./CalendarsContainer.module.scss";
import { ru } from "date-fns/locale";
import { useCalendarMonths, formatMonthCaptionRu } from "@/entities/calendar";
import { useCalendarStore } from "@/entities/store/calendarStore/useCalendarStore";

interface CalendarsProps {
  selectedDate?: Date | null;
  onSelect?: (date: Date | undefined) => void;
  onMonthChange?: (direction: "prev" | "next") => void;
  onDatePositionChange?: (
    position: { anchorX: number; anchorY: number } | null,
  ) => void;
  children?: React.ReactNode;
}

const CalendarsContainer = ({
  selectedDate,
  onSelect,
  onMonthChange,
  onDatePositionChange,
  children,
}: CalendarsProps) => {
  const { calendars, addPreviousMonth, addNextMonth } = useCalendarMonths();
  

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedDate || !wrapperRef.current) {
      onDatePositionChange?.(null);
      return;
    }

    const selectedCalendar = calendars.find(
      (cal) =>
        cal.year === selectedDate.getFullYear() &&
        cal.month === selectedDate.getMonth(),
    );
    if (!selectedCalendar) {
      onDatePositionChange?.(null);
      return;
    }

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const calendarContainer = wrapperRef.current.querySelector(
      `[data-calendar-id="${selectedCalendar.id}"]`,
    ) as HTMLElement;
    if (!calendarContainer) {
      onDatePositionChange?.(null);
      return;
    }

    const calendarRect = calendarContainer.getBoundingClientRect();
    const anchorY = calendarRect.top - wrapperRect.top;

    const selectedCell = calendarContainer.querySelector(
      '[data-selected="true"]',
    ) as HTMLElement;
    let anchorX: number;
    if (selectedCell) {
      const cellRect = selectedCell.getBoundingClientRect();
      anchorX = cellRect.right - wrapperRect.left;
    } else {
      anchorX = calendarRect.right - wrapperRect.left;
    }

    onDatePositionChange?.({ anchorX, anchorY });
  }, [selectedDate, calendars]);

  return (
    <div className={styles.calendarsWrapper}>
      <button
        type="button"
        className={styles.navButton}
        onClick={() => {
          onMonthChange?.("prev");
          addPreviousMonth();
        }}
        aria-label="Предыдущие месяца"
      >
        ← Предыдущие месяца
      </button>

      <div className={styles.monthCalendars}>
        {calendars.map((cal) => {
          return (
            <div
              key={cal.id}
              className={styles.calendarItem}
              data-calendar-id={cal.id}
            >
              <div className={styles.calendar}>
                <Calendar
                  mode="single"
                  selected={selectedDate || undefined}
                  onSelect={onSelect}
                  month={new Date(cal.year, cal.month)}
                  locale={ru}
                  showOutsideDays={false}
                  className="w-full"
                  formatters={{
                    formatCaption: formatMonthCaptionRu,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className={styles.navButton}
        onClick={() => {
          onMonthChange?.("next");
          addNextMonth();
        }}
        aria-label="Следующие месяца"
      >
        Следующие месяца →
      </button>
      {children}
    </div>
  );
};

export default CalendarsContainer;

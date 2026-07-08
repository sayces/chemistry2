"use client";

import { Calendar } from "@/shared/shadcn/ui/calendar";
import styles from "./CalendarsContainer.module.scss";
import { ru } from "date-fns/locale";
import { useCalendarMonths, formatMonthCaptionRu } from "@/entities/calendar";
import { useCalendarStore } from "@/entities/store/calendarStore/useCalendarStore";
import { useAnchor } from "./utils/useAnchor";
import { useEffect } from "react";

interface CalendarsProps {
  onMonthChange?: (direction: "prev" | "next") => void;
  children?: React.ReactNode;
  choosenCellCoordinates?: {};
}

const CalendarsContainer = ({ onMonthChange, children }: CalendarsProps) => {
  const { calendars, addPreviousMonth, addNextMonth } = useCalendarMonths();
  const { setDate, selectedDate, setAnchor, selectedAnchor } = useCalendarStore();
  const { anchor, setAnchorFromEvent } = useAnchor();

  const handleSelect = (date: Date | undefined) => {
    if (!date) {
      setDate(null);
      return;
    }
    if (selectedDate && date && date.getTime() === selectedDate.getTime()) {
      setDate(null);
      return;
    }
    setDate(date);
  };

  useEffect(() => setAnchor(anchor), [selectedDate]);

  return (
    <div className={styles.calendarsWrapper} data-calendar-container>
      {/* Добавляем data-атрибут, чтобы BookingFlow знал о календаре */}
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
                  onDayClick={(day, modifier, e) => {
                    setAnchorFromEvent(e as React.MouseEvent<HTMLElement>);
                  }}
                  mode="single"
                  selected={selectedDate || undefined}
                  onSelect={handleSelect}
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

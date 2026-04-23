"use client";

import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "@/shared/shadcn/ui/calendar";
import styles from "./CalendarsContainer.module.scss";
import { ru } from "date-fns/locale";
import TimeMenu from "@/shared/components/timeMenu/TimeMenu";
import {
  useCalendarMonths,
  isSameDay,
  formatMonthCaptionRu,
} from "@/entities/calendar";
import FloatingPanel from "../floatingPanel/FloatingPanel";
import { usePlatformStore } from "@/entities/store/usePlatformStore";
import { useCalendarStore } from "@/entities/store/calendarStore/useCalendarStore";

// Mocking types/interfaces if they are not provided in the context, 
// assuming standard structures based on usage.

interface CalendarsProps {
  quantity?: number;
}

const CalendarsContainer = ({}: CalendarsProps) => {
  const { calendars, addPreviousMonth, addNextMonth } = useCalendarMonths();
  const { setDate, selectedDate } = useCalendarStore();
  const { isMobile } = usePlatformStore();

  const wrapperRef = useRef<HTMLDivElement>(null);

  // We don't need complex anchor calculation for mobile bottom sheet usually,
  // but keeping the structure clean.
  
  const handleSelect = (date: Date | undefined) => {
    if (!date) {
      setDate(null);
      return;
    }

    // Toggle behavior: if clicking the same date, deselect it
    if (selectedDate && isSameDay(selectedDate, date)) {
      setDate(null);
      return;
    }

    setDate(date);
  };

  const handleMenuClose = () => {
    setDate(null);
  };

  const handleTimeSelect = (date: Date, time: string) => {
    console.log("Selected:", date, time);
    // Logic to save selection would go here
    handleMenuClose();
  };

  return (
    <div className={styles.pageLayout}>
      <div className={styles.calendarsWrapper} ref={wrapperRef}>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => {
            handleMenuClose();
            addPreviousMonth();
          }}
          aria-label="Предыдущие месяца"
        >
          ← Предыдущие месяца
        </button>

        <div className={styles.monthCalendars}>
          {calendars.map((cal) => {
            return (
              <div key={cal.id} className={styles.calendarItem}>
                <div className={styles.calendar}>
                  <Calendar
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

                {/* Mobile version: Menu appears at bottom when a date is selected */}
                {isMobile && selectedDate && (
                  <FloatingPanel
                    side="bottom"
                    onClose={handleMenuClose}
                    ignoreRef={wrapperRef}
                  >
                    <TimeMenu
                      date={selectedDate}
                      onClose={handleMenuClose}
                      onTimeSelect={handleTimeSelect}
                    />
                  </FloatingPanel>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className={styles.navButton}
          onClick={() => {
            handleMenuClose();
            addNextMonth();
          }}
          aria-label="Следующие месяца"
        >
          Следующие месяца →
        </button>
      </div>
      
      {/* Desktop version could be implemented here if needed, 
          typically using a portal or absolute positioning based on mouse coordinates,
          but the original code only had mobile logic active in the return. 
          If desktop support is needed, it would likely involve a different UI pattern 
          or a Popover component instead of FloatingPanel for better UX on large screens. */}
    </div>
  );
};

export default CalendarsContainer;
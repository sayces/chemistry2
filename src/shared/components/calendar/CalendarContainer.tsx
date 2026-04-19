"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar } from "@/shared/shadcn/ui/calendar";
import Container from "@/shared/components/container/Container";
import styles from "./Calendar.module.scss";
import { ru } from "date-fns/locale";
import TimeMenu from "@/shared/components/timeMenu/TimeMenu";
import {
  useCalendarMonths,
  isSameDay,
  formatMonthCaptionRu,
} from "@/entities/calendar";

interface MenuState {
  date: Date;
  anchorX: number;
  anchorY: number;
  calendarId: string;
}

const CalendarContainer = () => {
  const { calendars, addPreviousMonth, addNextMonth } = useCalendarMonths();

  const [mounted, setMounted] = useState(false);
  const [menu, setMenu] = useState<MenuState | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    undefined
  );
  const [isMobile, setIsMobile] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const clickPositionRef = useRef<{ x: number; y: number } | null>(null);
  const lastClickedCalendarIdRef = useRef<string | null>(null);

  // ------------------------------------
  // Инициализация
  // ------------------------------------

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ------------------------------------
  // Обработчики
  // ------------------------------------

  const handleDayMouseDown = (calendarId: string, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const dayButton = target.closest(".rdp-day");

    if (!dayButton || !wrapperRef.current) return;

    const rect = dayButton.getBoundingClientRect();
    const wrapperRect = wrapperRef.current.getBoundingClientRect();

    clickPositionRef.current = {
      x: rect.left - wrapperRect.left,
      y: rect.top + rect.height / 2 - wrapperRect.top,
    };
    lastClickedCalendarIdRef.current = calendarId;
  };

  const handleSelect = (date: Date | undefined, calendarId: string) => {
    if (!date) {
      setSelectedDate(undefined);
      setMenu(null);
      return;
    }

    if (isSameDay(selectedDate, date)) {
      setSelectedDate(undefined);
      setMenu(null);
      return;
    }

    setSelectedDate(date);

    if (wrapperRef.current && clickPositionRef.current) {
      setMenu({
        date,
        anchorX: clickPositionRef.current.x,
        anchorY: clickPositionRef.current.y,
        calendarId: lastClickedCalendarIdRef.current ?? calendarId,
      });
    }
  };

  const handleMenuClose = () => {
    setMenu(null);
    setSelectedDate(undefined);
  };

  const handleTimeSelect = (date: Date, time: string) => {
    console.log("Selected:", date, time);
  };

  if (!mounted) {
    return (
      <Container variant="default">
        <div className={styles.calendarsWrapper}>
          <div style={{ height: "20rem" }} />
        </div>
      </Container>
    );
  }

  return (
    <Container variant="default">
      <div className={styles.pageLayout}>
        <div className={styles.calendarsWrapper} ref={wrapperRef}>

          <button
            type="button"
            className={styles.navButton}
            onClick={addPreviousMonth}
          >
            ← Предыдущие месяца
          </button>

          <div className={styles.monthCalendars}>
            {calendars.map((cal) => (
              <div key={cal.id} className="w-full">

                <div
                  className={styles.calendar}
                  onMouseDownCapture={(e) => handleDayMouseDown(cal.id, e)}
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => handleSelect(date, cal.id)}
                    month={new Date(cal.year, cal.month)}
                    locale={ru}
                    showOutsideDays={false}
                    className="w-full"
                    formatters={{
                      formatCaption: formatMonthCaptionRu,
                    }}
                  />
                </div>

                {/* Мобильная версия: меню под активным календарём */}
                {isMobile && menu?.calendarId === cal.id && (
                  <TimeMenu
                    date={menu.date}
                    anchorX={menu.anchorX}
                    anchorY={menu.anchorY}
                    onClose={handleMenuClose}
                    onTimeSelect={handleTimeSelect}
                    isMobile={true}
                  />
                )}

              </div>
            ))}
          </div>

          <button
            type="button"
            className={styles.navButton}
            onClick={addNextMonth}
          >
            Следующие месяца →
          </button>

        </div>

        {/* Десктопная версия: меню сбоку */}
        {!isMobile && menu && (
          <TimeMenu
            date={menu.date}
            anchorX={menu.anchorX}
            anchorY={menu.anchorY}
            onClose={handleMenuClose}
            onTimeSelect={handleTimeSelect}
            isMobile={false}
          />
        )}

      </div>
    </Container>
  );
};

export default CalendarContainer;
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Calendar } from "@/shared/shadcn/ui/calendar";
import Container from "@/shared/components/container/Container";
import styles from "./Calendar.module.scss";
import { ru } from "date-fns/locale";
import TimeMenu from "@/shared/components/timemenu/TimeMenu";

interface MonthCalendar {
  id: string;
  month: number;
  year: number;
}

interface MenuState {
  date: Date;
  anchorX: number;
  anchorY: number;
  calendarId: string;
}

const CalendarContainer = () => {
  const [calendars, setCalendars] = useState<MonthCalendar[]>([]);
  const [mounted, setMounted] = useState(false);
  const [menu, setMenu] = useState<MenuState | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(false);
  const lastClickedCalendarIdRef = useRef<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const clickPositionRef = useRef<{ x: number; y: number } | null>(null);

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
      },
      {
        id: `${currentYear}-${currentMonth + 1 > 11 ? currentYear + 1 : currentYear}-${currentMonth + 1 > 11 ? 0 : currentMonth + 1}`,
        month: currentMonth + 1 > 11 ? 0 : currentMonth + 1,
        year: currentMonth + 1 > 11 ? currentYear + 1 : currentYear,
      },
    ]);

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const addPreviousMonths = useCallback(() => {
    setCalendars((prev) => {
      const firstCalendar = prev[0];
      const prevMonth = firstCalendar.month - 1;
      const prevYear =
        prevMonth < 0 ? firstCalendar.year - 1 : firstCalendar.year;
      const adjustedMonth = prevMonth < 0 ? 11 : prevMonth;
      return [
        {
          id: `${prevYear}-${adjustedMonth}`,
          month: adjustedMonth,
          year: prevYear,
        },
        ...prev,
      ];
    });
  }, []);

  const addNextMonths = useCallback(() => {
    setCalendars((prev) => {
      const lastCalendar = prev[prev.length - 1];
      const nextMonth = lastCalendar.month + 1;
      const nextYear =
        nextMonth > 11 ? lastCalendar.year + 1 : lastCalendar.year;
      const adjustedMonth = nextMonth > 11 ? 0 : nextMonth;
      return [
        ...prev,
        {
          id: `${nextYear}-${adjustedMonth}`,
          month: adjustedMonth,
          year: nextYear,
        },
      ];
    });
  }, []);

  // Захватываем позицию клика перед тем как Calendar обработает выбор
  const handleDayMouseDown = (calendarId: string, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const dayButton = target.closest(".rdp-day");

    if (dayButton) {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = dayButton.getBoundingClientRect();
      const wrapperRect = wrapper.getBoundingClientRect();

      clickPositionRef.current = {
        x: rect.left - wrapperRect.left,
        y: rect.top + rect.height / 2 - wrapperRect.top,
      };
      lastClickedCalendarIdRef.current = calendarId;
    }
  };

  // Обрабатываем выбор даты
  const handleSelect = (date: Date | undefined, calendarId: string) => {
    const wrapper = wrapperRef.current;

    if (!date) {
      // Клик на уже выбранную дату - снимаем выбор
      setSelectedDate(undefined);
      setMenu(null);
      return;
    }

    // Проверяем, кликнули ли на ту же дату
    const isSameDate =
      selectedDate && selectedDate.toDateString() === date.toDateString();

    if (isSameDate) {
      setSelectedDate(undefined);
      setMenu(null);
    } else {
      setSelectedDate(date);

      if (wrapper && clickPositionRef.current) {
        setMenu({
          date,
          anchorX: clickPositionRef.current.x,
          anchorY: clickPositionRef.current.y,
          calendarId: lastClickedCalendarIdRef.current || calendarId
        });
      }
    }
  };

  const handleTimeSelect = (date: Date, time: string) => {
    console.log("Selected:", date, time);
  };

  if (!mounted || calendars.length === 0) {
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
            onClick={addPreviousMonths}
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
                      formatCaption: (date) => {
                        const monthName = date.toLocaleDateString("ru", {
                          month: "long",
                        });
                        const year = date.getFullYear();
                        return `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;
                      },
                    }}
                  />
                </div>

                {/* Mobile version: show menu under the active calendar */}
                {isMobile && menu && menu.calendarId === cal.id && (
                  <TimeMenu
                    date={menu.date}
                    anchorX={menu.anchorX}
                    anchorY={menu.anchorY}
                    onClose={() => {
                      setMenu(null);
                      setSelectedDate(undefined);
                    }}
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
            onClick={addNextMonths}
          >
            Следующие месяца →
          </button>
        </div>

        {/* Desktop version: show menu on the side */}
        {!isMobile && menu && (
          <TimeMenu
            date={menu.date}
            anchorX={menu.anchorX}
            anchorY={menu.anchorY}
            onClose={() => {
              setMenu(null);
              setSelectedDate(undefined);
            }}
            onTimeSelect={handleTimeSelect}
            isMobile={false}
          />
        )}
      </div>
    </Container>
  );
};

export default CalendarContainer;

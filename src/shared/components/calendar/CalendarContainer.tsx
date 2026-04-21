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
import FloatingPanel from "../floatingPanel/FloatingPanel";
import { usePlatformStore } from "@/shared/store/usePlatformStore";

type PanelSide = "left" | "right";

interface MenuState {
  date: Date;
  anchorX: number;
  anchorY: number;
  side: PanelSide;
  calendarId: string;
}

const CalendarContainer = () => {
  const { calendars, addPreviousMonth, addNextMonth } = useCalendarMonths();

  const [mounted, setMounted] = useState(false);
  const [menu, setMenu] = useState<MenuState | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const pendingAnchorRef = useRef<Omit<MenuState, "date"> | null>(null);

  const { isMobile } = usePlatformStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDayMouseDown = (calendarId: string, e: React.MouseEvent) => {
    if (!wrapperRef.current) return;

    const target = e.target as HTMLElement;
    const dayButton =
      target.closest(".rdp-day_button") ?? target.closest(".rdp-day");

    if (!(dayButton instanceof HTMLElement)) return;

    const rect = dayButton.getBoundingClientRect();
    const wrapperRect = wrapperRef.current.getBoundingClientRect();

    const anchorX = rect.left + rect.width / 2 - wrapperRect.left;
    const anchorY = rect.top + rect.height / 2 - wrapperRect.top;

    const side: PanelSide =
      anchorX < wrapperRect.width / 2 ? "left" : "right";

    pendingAnchorRef.current = {
      anchorX,
      anchorY,
      side,
      calendarId,
    };
  };

  const handleSelect = (date: Date | undefined, calendarId: string) => {
    if (!date) {
      setSelectedDate(undefined);
      setMenu(null);
      return;
    }

    if (selectedDate && isSameDay(selectedDate, date)) {
      setSelectedDate(undefined);
      setMenu(null);
      return;
    }

    setSelectedDate(date);

    const pending = pendingAnchorRef.current;

    setMenu({
      date,
      anchorX: pending?.anchorX ?? 0,
      anchorY: pending?.anchorY ?? 0,
      side: pending?.side ?? "right",
      calendarId: pending?.calendarId ?? calendarId,
    });
  };

  const handleMenuClose = () => {
    setMenu(null);
    setSelectedDate(undefined);
    pendingAnchorRef.current = null;
  };

  const handleTimeSelect = (date: Date, time: string) => {
    console.log("Selected:", date, time);
    handleMenuClose();
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
    
      <div className={styles.pageLayout}>
        <div className={styles.calendarsWrapper} ref={wrapperRef}>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => {
              handleMenuClose();
              addPreviousMonth();
            }}
          >
            ← Предыдущие месяца
          </button>

          <div className={styles.monthCalendars}>
            {calendars.map((cal) => {
              const isActiveCalendar = menu?.calendarId === cal.id;

              return (
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
                  {isMobile && menu && isActiveCalendar && (
                    <FloatingPanel
                      side="bottom"
                      onClose={handleMenuClose}
                      ignoreRef={wrapperRef}
                    >
                      <TimeMenu
                        date={menu.date}
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
          >
            Следующие месяца →
          </button>

          {/* Десктопная версия: меню сбоку */}
          {!isMobile && menu && (
            <FloatingPanel
              side={menu.side}
              anchorY={menu.anchorY}
              ignoreRef={wrapperRef}
              onClose={handleMenuClose}
              umbilicalLine={{
                start: {
                  anchorX: menu.anchorX,
                  anchorY: menu.anchorY,
                },
              }}
            >
              <TimeMenu
                date={menu.date}
                onClose={handleMenuClose}
                onTimeSelect={handleTimeSelect}
              />
            </FloatingPanel>
          )}
        </div>
      </div>
    
  );
};

export default CalendarContainer;
"use client";

import { useState, useEffect, useRef, Suspense } from "react";
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
import { useCalendarStore } from "@/shared/store/calendarStore/useCalendarStore";

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

  const wrapperRef = useRef<HTMLDivElement>(null);
  const pendingAnchorRef = useRef<Omit<MenuState, "date"> | null>(null);

  const { isMobile } = usePlatformStore();
  const { setDate, setTime, selectedDate } = useCalendarStore();

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
      setDate(null);
      setMenu(null);
      return;
    }

    if (selectedDate && isSameDay(selectedDate, date)) {
      setDate(null);
      setMenu(null);
      return;
    }

    setDate(date);

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
    setDate(null);
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
    <Suspense fallback={<p>Loading</p>}>
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
                      selected={selectedDate || undefined}
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
        </div>
      </div>
    </Suspense>
  );
};

export default CalendarContainer;
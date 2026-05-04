"use client";

import { format } from "date-fns";
import { ru } from "date-fns/locale";
import styles from "./TimeMenu.module.scss";
import { useCalendarStore } from "@/entities/store/calendarStore/useCalendarStore";
import { makeDateTime, TIME_SLOTS, TimeSlot } from "./utils/timeSlots";
import Typography from "../typography/Typography";
import Button from "../button/Button";
import { useEffect, useState } from "react";

interface TimeMenuProps {
  // date: Date | null;
  onClose?: () => void;
  onTimeSelect?: (date: Date, time: string) => void;
}

const TimeMenu = ({ onClose, onTimeSelect }: TimeMenuProps) => {
  const { setTime, selectedDate, selectedTime } = useCalendarStore();

  const date = selectedDate;

  const handleSelectTime = (slot: TimeSlot) => {
    const dateTime = makeDateTime(date as Date, slot);

    onTimeSelect?.(date as Date, slot);
    setTime(dateTime);
  };

  return (
    <div className={styles.timeMenu}>
      <div className={styles.header}>
        <Typography as="h4" className={styles.timeMenuTitle}>
          {format(date as Date, "d MMMM", { locale: ru })}
        </Typography>
      </div>

      <ul className={styles.timeSlots}>
        {TIME_SLOTS.map((slot) => {
          const isActive =
            selectedTime && format(selectedTime, "HH:mm") === slot;
          return (
            <li key={slot} className={styles.timeSlot}>
              <Button
                className={`${styles.timeSlotButton} ${isActive ? styles.active : ""}`}
                onClick={() => handleSelectTime(slot)}
              >
                {slot}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TimeMenu;

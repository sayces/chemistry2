"use client";

import { format } from "date-fns";
import { ru } from "date-fns/locale";
import styles from "./TimeMenu.module.scss";
import { useCalendarStore } from "@/entities/store/calendarStore/useCalendarStore";
import { makeDateTime, TIME_SLOTS, TimeSlot } from "./utils/timeSlots";
import Typography from "../typography/Typography";
import { useClickOutside } from "@/shared/hooks/useClickOutside";

interface TimeMenuProps {
  date: Date | null;
  onClose?: () => void;
  onTimeSelect?: (date: Date, time: string) => void;
}

const TimeMenu = ({ date, onClose, onTimeSelect }: TimeMenuProps) => {
  const { setDate, setTime } = useCalendarStore();

  const handleSelectTime = (slot: TimeSlot) => {
    // делаем полную дату из выбранного дня + времени
    const dateTime = makeDateTime(date as Date, slot);

    onTimeSelect?.(date as Date, slot); // строка для UI / бэкенда
    setDate(date); // сохраняем дату
    setTime(dateTime); // сохраняем дату+время как Date
  };

 

  return (
    <div className={styles.timeMenu}>
      <div className={styles.header}>
        <Typography as="h4" className={styles.timeMenuTitle}>
          {format(date as Date, "d MMMM yyyy", { locale: ru })}
        </Typography>
      </div>

      <ul className={styles.timeSlots}>
        {TIME_SLOTS.map((slot) => (
          <li key={slot} className={styles.timeSlot}>
            <button
              type="button"
              className={styles.timeSlotButton}
              onClick={() => handleSelectTime(slot)}
            >
              {slot}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeMenu;

"use client";

import { format } from "date-fns";
import { ru } from "date-fns/locale";
import styles from "./TimeMenu.module.scss";

interface TimeMenuProps {
  date: Date;
  onClose?: () => void;
  onTimeSelect?: (date: Date, time: string) => void;
}

const TIME_SLOTS = ["10:00", "12:00", "14:00", "16:00", "18:00"];

const TimeMenu = ({ date, onClose, onTimeSelect }: TimeMenuProps) => {
  return (
    <div className={styles.timeMenu}>
      <div className={styles.header}>
        <h3 className={styles.timeMenuTitle}>
          {format(date, "d MMMM yyyy", { locale: ru })}
        </h3>
      </div>

      <ul className={styles.timeSlots}>
        {TIME_SLOTS.map((slot) => (
          <li key={slot} className={styles.timeSlot}>
            <button
              type="button"
              className={styles.timeSlotButton}
              onClick={() => onTimeSelect?.(date, slot)}
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

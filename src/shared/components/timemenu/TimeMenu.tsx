'use client';

import { useEffect, useRef, type RefObject } from "react";
import { format, getDay } from "date-fns";
import { ru } from "date-fns/locale";
import styles from './TimeMenu.module.scss';
import { clsx } from "clsx";

interface TimeMenuProps {
  date: Date;
  anchorX: number;
  anchorY: number;
  onClose: () => void;
  onTimeSelect?: (date: Date, time: string) => void;
  isMobile?: boolean;
  ignoreRef?: RefObject<HTMLElement | null>;
}

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00"
];

const TimeMenu = ({
  date,
  anchorX,
  anchorY,
  onClose,
  onTimeSelect,
  isMobile,
  ignoreRef
}: TimeMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const day = getDay(date);
  const side = (day >= 1 && day <= 3) ? 'left' : 'right';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (menuRef.current?.contains(target)) return;
      if (ignoreRef?.current?.contains(target)) return;

      onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, ignoreRef]);

  if (isMobile) {
    return (
      <div
        ref={menuRef}
        className={clsx(styles.timeMenuWrapper, styles.mobile)}
      >
        <div className={styles.timeMenu}>
          <h3 className={styles.timeMenuTitle}>
            {format(date, 'd MMMM yyyy', { locale: ru })}
          </h3>
          <ul className={styles.timeSlots}>
            {TIME_SLOTS.map(slot => (
              <li key={slot} className={styles.timeSlot}>
                <button
                  className={styles.timeSlotButton}
                  onClick={() => onTimeSelect?.(date, slot)}
                >
                  {slot}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const lineStyles = side === 'left'
    ? {
        top: `${anchorY}px`,
        right: `calc(100% - ${anchorX}px - 4rem)`,
        width: `calc(${anchorX}px + 11rem)`,
      }
    : {
        top: `${anchorY}px`,
        left: `${anchorX}px`,
        width: `calc(100% - ${anchorX}px + 6rem)`,
      };

  return (
    <>
      <div
        className={clsx(styles.umbilicalLine, styles[`side_${side}`])}
        style={lineStyles}
      />

      <div
        ref={menuRef}
        className={clsx(styles.timeMenuWrapper, styles[`side_${side}`])}
        style={{
          top: `calc(${anchorY}px - 58px)`,
        }}
      >
        <div className={styles.timeMenu}>
          <h3 className={styles.timeMenuTitle}>
            {format(date, 'd MMMM yyyy', { locale: ru })}
          </h3>

          <ul className={styles.timeSlots}>
            {TIME_SLOTS.map(slot => (
              <li key={slot} className={styles.timeSlot}>
                <button
                  className={styles.timeSlotButton}
                  onClick={() => onTimeSelect?.(date, slot)}
                >
                  {slot}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TimeMenu;
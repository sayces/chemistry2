"use client";

import { useCalendarStore } from "@/entities/store/calendarStore/useCalendarStore";
import SelectionPanel from "../selectionPanel/SelectionPanel";
import TimeMenu from "@/shared/components/timeMenu/TimeMenu";
import ServiceMenu from "../servicesMenu/ServiceMenu";
import { useEffect, useRef } from "react";
import styles from "./BookingFlow.module.scss";
import Button from "../button/Button";
import { selectIsMobile, usePlatformStore, selectIsTablet } from "@/entities/store/usePlatformStore";
import Modal from "../modal/Modal";

// @/shared/components/bookingFlow/BookingFlow.tsx
const BookingFlow = () => {
  const { selectedDate, selectedTime, setDate, clearAll } = useCalendarStore();

  const isMobile = usePlatformStore(selectIsMobile);
  const isTablet = usePlatformStore(selectIsTablet);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Слушатель клика вне для десктопной версии
  useEffect(() => {
    if (isMobile) return; // На мобилке за клики вне отвечает Modal

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (wrapperRef.current && wrapperRef.current.contains(target)) return;
      if (target.closest("[data-calendar-container]")) return;

      clearAll();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setDate, isMobile, clearAll]);

  if (selectedDate === null) return null;

  // Содержимое формы бронирования (чтобы не дублировать код)
  const renderFlowContent = () => (
    <div ref={wrapperRef} className={styles.bookingFlow}>
      <SelectionPanel>
        <TimeMenu />
        {selectedTime && <ServiceMenu />}
      </SelectionPanel>
      <Button className={styles.bookingButton} disabled>
        Подтвердить
      </Button>
    </div>
  );

  if (isMobile || isTablet) {
    return (
      <Modal isOpen={selectedDate !== null} onClose={clearAll}>
        {renderFlowContent()}
      </Modal>
    );
  }

  return renderFlowContent();
};

export default BookingFlow;

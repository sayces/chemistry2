import { useCalendarStore } from "@/entities/store/calendarStore/useCalendarStore";
import SelectionPanel from "../selectionPanel/SelectionPanel";
import TimeMenu from "@/shared/components/timeMenu/TimeMenu";
import ServiceMenu from "../servicesMenu/ServiceMenu";
import { useEffect, useRef } from "react";

const BookingFlow = () => {
  const {
    selectedDate,
    selectedTime,
    setDate,
    setTime,
    setServices,
    clearAll,
  } = useCalendarStore();

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (wrapperRef.current && wrapperRef.current.contains(target)) {
        return;
      }

      if (target.closest('[data-calendar-container]')) {
        return;
      }

      console.log("Клик вне формы и календаря!");
      clearAll();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDate]);

  if (selectedDate === null) return null;

  return (
    <div ref={wrapperRef}>
      <SelectionPanel>
        <TimeMenu />
        {selectedTime && <ServiceMenu />}
      </SelectionPanel>
    </div>
  );
};

export default BookingFlow;

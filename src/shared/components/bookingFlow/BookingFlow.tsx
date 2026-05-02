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
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        console.log("Клик вне формы!");
        clearAll();
        setDate(null);
      }
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
        <TimeMenu date={selectedDate} />
        {selectedTime && <ServiceMenu />}
      </SelectionPanel>
    </div>
  );
};

export default BookingFlow;

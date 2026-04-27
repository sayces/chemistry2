import { useCalendarStore } from "@/entities/store/calendarStore/useCalendarStore";
import SelectionPanel from "../selectionPanel/SelectionPanel";
import TimeMenu from "../timeMenu/TimeMenu";
import ServiceMenu from "../servicesMenu/ServiceMenu";

const BookingFlow = () => {
  const { selectedDate, selectedTime } = useCalendarStore();

  if (!selectedDate) return null;

  return (
    <SelectionPanel>
      <TimeMenu date={selectedDate} />
      {selectedTime && <ServiceMenu />}
    </SelectionPanel>
  );
};

export default BookingFlow;
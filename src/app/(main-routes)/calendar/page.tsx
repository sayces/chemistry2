"use client";

import CalendarsContainer from "@/shared/components/calendar/CalendarsContainer";
import Container from "@/shared/components/container/Container";
import Main from "@/shared/components/main/Main";
import { useCalendarStore } from "@/entities/store/calendarStore/useCalendarStore";
import { useState, useCallback } from "react";
import BookingFlow from "@/shared/components/bookingFlow/BookingFlow";

const CalendarPage = () => {
  const { selectedDate, selectedTime, setDate } = useCalendarStore();
  const [datePosition, setDatePosition] = useState<{
    anchorX: number;
    anchorY: number;
  } | null>(null);

  const handleSelect = (date: Date | undefined) => {
    if (!date) {
      setDate(null);
      return;
    }
    if (selectedDate && date && date.getTime() === selectedDate.getTime()) {
      setDate(null);
      return;
    }
    setDate(date);
    console.log(selectedDate);
  };

  const handleMenuClose = () => {
    setDate(null);
  };

  const handleTimeSelect = (date: Date, time: string) => {
    console.log("Selected:", date, time);
    handleMenuClose();
  };

  const handleDatePositionChange = useCallback(
    (position: { anchorX: number; anchorY: number } | null) => {
      setDatePosition(position);
    },
    [],
  );

  return (
    <Main>
      <Container>123</Container>
      <Container>
        <CalendarsContainer
          selectedDate={selectedDate}
          onSelect={handleSelect}
          onDatePositionChange={handleDatePositionChange}
        ></CalendarsContainer>
      </Container>
      <Container>
        <BookingFlow />
      </Container>
    </Main>
  );
};

export default CalendarPage;

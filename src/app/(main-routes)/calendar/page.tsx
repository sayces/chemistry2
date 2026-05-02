"use client";

import CalendarsContainer from "@/shared/components/calendar/CalendarsContainer";
import Container from "@/shared/components/container/Container";
import Main from "@/shared/components/main/Main";
import { useCalendarStore } from "@/entities/store/calendarStore/useCalendarStore";
import { useState, useCallback } from "react";
import BookingFlow from "@/shared/components/bookingFlow/BookingFlow";

const CalendarPage = () => {
  return (
    <Main>
      <Container>123</Container>
      <Container>
        <CalendarsContainer />
      </Container>
      <Container>
        <BookingFlow />
      </Container>
    </Main>
  );
};

export default CalendarPage;

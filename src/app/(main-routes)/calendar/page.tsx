"use client";

import CalendarsContainer from "@/shared/components/calendar/CalendarsContainer";
import Container from "@/shared/components/container/Container";
import Main from "@/shared/components/main/Main";
import Modal from "@/shared/components/modal/Modal";
import ServiceMenu from "@/shared/components/servicesMenu/ServiceMenu";
import TimeMenu from "@/shared/components/timeMenu/TimeMenu";
import { useCalendarStore } from "@/entities/store/calendarStore/useCalendarStore";
import { usePlatformStore } from "@/entities/store/usePlatformStore";
import { useModalStore } from "@/entities/store/modal/useModalStore";

const CalendarPage = () => {
  const { selectedDate, selectedTime } = useCalendarStore();
  const { isMobile } = usePlatformStore();
  const { isOpen, openModal } = useModalStore();

  return (
    <Main>
      <Container>{selectedDate && !isMobile && <Modal>123</Modal>}</Container>

      <Container>
        <CalendarsContainer />
      </Container>

      <Container>
        <>
          <Modal>
            <TimeMenu date={selectedDate as Date}/>
          </Modal>
          {selectedTime && (
            <Modal>
              <ServiceMenu />
            </Modal>
          )}
        </>
      </Container>
    </Main>
  );
};

export default CalendarPage;

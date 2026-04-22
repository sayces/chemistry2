"use client";

import CalendarContainer from "@/shared/components/calendar/CalendarContainer";
import Container from "@/shared/components/container/Container";
import Main from "@/shared/components/main/Main";
import Modal from "@/shared/components/modal/Modal";
import ServiceMenu from "@/shared/components/servicesMenu/ServiceMenu";
import TimeMenu from "@/shared/components/timeMenu/TimeMenu";
import { useCalendarStore } from "@/shared/store/calendarStore/useCalendarStore";
import { usePlatformStore } from "@/shared/store/usePlatformStore";

const CalendarPage = () => {
  const { selectedDate } = useCalendarStore();
  const { isMobile } = usePlatformStore();

  return (
    <Main>
      <Container>{selectedDate && !isMobile && <Modal>123</Modal>}</Container>

      <Container>
        <Modal>
          <CalendarContainer />
        </Modal>
      </Container>

      <Container>
        {selectedDate && !isMobile && (
          <>
            <Modal>
              <TimeMenu date={selectedDate}></TimeMenu>
            </Modal>
            <Modal>
              <ServiceMenu />
            </Modal>
          </>
        )}
      </Container>
    </Main>
  );
};

export default CalendarPage;

import CalendarContainer from "@/shared/components/calendar/CalendarContainer";
import Container from "@/shared/components/container/Container";
import Main from "@/shared/components/main/Main";
import Modal from "@/shared/components/modal/Modal";

const CalendarPage = () => {
  return (
    <Main>
      <Container>
        <Modal>123</Modal>
      </Container>
      <Container>
        <Modal>
          <CalendarContainer />
        </Modal>
      </Container>

      <Container>
        <Modal>123</Modal>
      </Container>
    </Main>
  );
};

export default CalendarPage;

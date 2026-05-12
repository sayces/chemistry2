import CalendarsContainer from "@/shared/components/main/calendar/CalendarsContainer";
import Container from "@/shared/components/main/container/Container";
import Main from "@/shared/components/main/Main";
import BookingFlow from "@/widgets/bookingFlow/ui/BookingFlow";

const CalendarPage = () => {
  return (
    <Main>
      <Container>{""}</Container>
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

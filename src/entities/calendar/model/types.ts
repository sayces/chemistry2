interface MonthCalendar {
  id: string;
  month: number;
  year: number;
}

interface MenuState {
  date: Date;
  anchorX: number;
  anchorY: number;
  calendarId: string;
}

export type { MonthCalendar, MenuState };
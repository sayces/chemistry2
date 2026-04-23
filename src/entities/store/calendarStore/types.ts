import { Service } from "../serviceStore/types";

export interface CalendarState {
  selectedDate: Date | null;
  selectedTime: Date | null;
  selectedServices: Service[] | null;
}

export interface CalendarActions {
  setDate: (date: Date | null) => void;
  setTime: (time: Date | null) => void;
  setServices: (services: Service[] | null) => void;  // Allow null
  clearAll: () => void;
}

export interface CalendarStore extends CalendarState, CalendarActions {}
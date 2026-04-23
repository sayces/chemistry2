import { create, StateCreator } from "zustand";
import { CalendarState, CalendarStore } from "./types";
import { Service } from "../serviceStore/types";

const initialState: CalendarState = {
  selectedDate: null,
  selectedTime: null,
  selectedServices: null,
};

const calendarStore: StateCreator<CalendarStore> = (set, get) => ({  // Add get for future use
  ...initialState,
  setDate: (date: Date | null) => set({ selectedDate: date }),
  setTime: (time: Date | null) => set({ selectedTime: time }),
  setServices: (services: Service[] | null) => set({ selectedServices: services }),
  clearAll: () => set(initialState),
});

export const useCalendarStore = create<CalendarStore>()(calendarStore);

// Selectors
export const useSelectedDate = () => useCalendarStore((state) => state.selectedDate);
export const useSelectedTime = () => useCalendarStore((state) => state.selectedTime);
export const useSelectedServices = () => useCalendarStore((state) => state.selectedServices);

// Action selector
export const selectDateAction = () => useCalendarStore.getState().setDate;
export const selectTimeAction = () => useCalendarStore.getState().setTime;
export const selectSercivesAction = () => useCalendarStore.getState().setServices;
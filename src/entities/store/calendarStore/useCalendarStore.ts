import { create, StateCreator } from "zustand";
import { CalendarState, CalendarStore } from "./types";
import { Service } from "../serviceStore/types";
import { Anchor } from "@/shared/components/main/calendar/utils/useAnchor";

// const now = new Date()

const initialState: CalendarState = {
  selectedDate: null,
  selectedTime: null,
  selectedServices: null,
  selectedAnchor: null,
};

const calendarStore: StateCreator<CalendarStore> = (set, get) => ({
  // Add get for future use
  ...initialState,
  setDate: (date: Date | null) => set({ selectedDate: date }),
  setTime: (time: Date | null) => set({ selectedTime: time }),
  setServices: (services: Service[] | null) =>
    set({ selectedServices: services }),
  setAnchor: (anchor: Anchor | null) => set({ selectedAnchor: anchor }),
  clearAnchor: () => set({ selectedAnchor: null }),
  clearAll: () => set(initialState),
});

export const useCalendarStore = create<CalendarStore>()(calendarStore);

// Selectors
export const useSelectedDate = () =>
  useCalendarStore((state) => state.selectedDate);
export const useSelectedTime = () =>
  useCalendarStore((state) => state.selectedTime);
export const useSelectedServices = () =>
  useCalendarStore((state) => state.selectedServices);
export const useSelectedAnchor = () =>
  useCalendarStore((state) => state.selectedAnchor);

// Action selector
export const selectDateAction = () => useCalendarStore.getState().setDate;
export const selectTimeAction = () => useCalendarStore.getState().setTime;
export const selectSercivesAction = () =>
  useCalendarStore.getState().setServices;
export const selectAnchorAction = () => useCalendarStore.getState().setAnchor;
